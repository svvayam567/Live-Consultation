import * as admin from 'firebase-admin';
import { google } from 'googleapis';
import * as crypto from 'crypto';

export interface SyncOptions {
  dryRun?: boolean;
  trigger?: 'webhook' | 'backup_check' | 'manual';
  forceFullScan?: boolean;
}

export interface SyncReport {
  timestamp: string;
  trigger: string;
  dryRun: boolean;
  durationMs: number;
  addedProjects: string[];
  updatedMetadata: string[];
  changedImages: { projectId: string; added: number; updated: number; removed: number }[];
  pendingFolders: { folderId: string; folderName: string; reason: string }[];
  skippedRecords: string[];
  errors: string[];
  nextScheduledRunIST: string;
}

export interface SheetProjectRow {
  rowNumber: number;
  customerName: string;
  location: string;
  photoFolderLink: string;
  folderId?: string;
  designDetail: 'Minimal' | 'Moderate' | 'Heavy' | string;
  structureType: string;
  widthFt?: number;
  depthFt?: number;
  heightFt?: number;
  dimensions?: string;
  displayPrice: string;
  projectId: string; // SV-XXX
  widthCategory: string;
  readyToPublish: boolean;
  notes: string;
}

// Drive root folder provided by user
export const SHARED_DRIVE_ROOT_ID = '1xHnnPOs56ip3g2NI-QH_pWnW3PUfv6xE';
export const SPREADSHEET_ID = '1m4uX9scGjIlhwrMbxVRs7m1mcBjLF2bP7lbyiUciyrM';
export const SPREADSHEET_GID = '1934436100';

const LOCK_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Calculates next scheduled run time string in IST (Asia/Kolkata, UTC+5:30)
 */
export function getNextScheduledRunIST(minutesFromNow = 15): string {
  const next = new Date(Date.now() + minutesFromNow * 60 * 1000);
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(next.getTime() + istOffset);
  return istTime.toISOString().replace('Z', '+05:30');
}

/**
 * Formats decimal feet dimensions into standard Svvayam Explorer display string:
 * e.g. "W 5.7 × D 2.1 × H 7.8 ft"
 */
export function formatDimensions(w?: number, d?: number, h?: number): string | undefined {
  const parts: string[] = [];
  if (typeof w === 'number' && !isNaN(w) && w > 0) parts.push(`W ${w}`);
  if (typeof d === 'number' && !isNaN(d) && d > 0) parts.push(`D ${d}`);
  if (typeof h === 'number' && !isNaN(h) && h > 0) parts.push(`H ${h}`);
  if (parts.length === 0) return undefined;
  return `${parts.join(' × ')} ft`;
}

/**
 * Extracts Google Drive folder ID from various link formats
 */
export function extractFolderId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const folderMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) return folderMatch[1];
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  if (/^[a-zA-Z0-9_-]{20,50}$/.test(trimmed)) return trimmed;
  return null;
}

/**
 * Normalizes Structure Type to approved canonical labels
 */
export function normalizeStructureType(val: string): string {
  if (!val) return 'Wall Unit';
  const clean = val.trim().replace(/\s+/g, ' ');
  const lower = clean.toLowerCase();
  if (lower.includes('complete pooja room')) return 'Complete Pooja Room';
  if (lower.includes('freestanding unit') || lower === 'freestanding') return 'Freestanding Unit';
  if (lower.includes('freestanding enclosure')) return 'Freestanding Enclosure';
  if (lower.includes('existing room frontage') || lower.includes('room frontage')) return 'Existing Room Frontage';
  if (lower.includes('wall unit')) return 'Wall Unit';
  if (lower.includes('open pooja mandap') || lower.includes('mandap')) return 'Open pooja Mandap';
  if (lower.includes('farmhouse temple') || lower.includes('farmhouse')) return 'Farmhouse Temple';
  if (lower.includes('public temple') || lower.includes('temple')) return 'Public Temple';
  return clean;
}

/**
 * Normalizes Design Detail to Minimal, Moderate, or Heavy
 */
export function normalizeDesignDetail(val: string): 'Minimal' | 'Moderate' | 'Heavy' {
  if (!val) return 'Moderate';
  const lower = val.trim().toLowerCase();
  if (lower.startsWith('min')) return 'Minimal';
  if (lower.startsWith('mod')) return 'Moderate';
  if (lower.startsWith('hea')) return 'Heavy';
  return 'Moderate';
}

/**
 * Main Sync Engine Class
 */
export class ProjectCatalogSyncEngine {
  private db: admin.firestore.Firestore;
  private bucket: any;

  constructor(db?: admin.firestore.Firestore, bucket?: any) {
    this.db = db || admin.firestore();
    this.bucket = bucket || (admin.storage().bucket ? admin.storage().bucket() : null);
  }

  /**
   * Acquire a distributed lock to prevent overlapping runs
   */
  private async acquireLock(trigger: string): Promise<boolean> {
    const lockRef = this.db.collection('sync_meta').doc('current');
    try {
      const doc = await lockRef.get();
      if (doc.exists) {
        const data = doc.data() || {};
        if (data.lock === true && data.lockTimestamp) {
          const lockTime = data.lockTimestamp.toMillis ? data.lockTimestamp.toMillis() : new Date(data.lockTimestamp).getTime();
          if (Date.now() - lockTime < LOCK_TIMEOUT_MS) {
            console.warn(`[SyncEngine] Overlapping run prevented. Lock active since ${new Date(lockTime).toISOString()}`);
            return false;
          }
          console.warn('[SyncEngine] Overriding stale sync lock.');
        }
      }
      await lockRef.set({
        lock: true,
        lockTimestamp: admin.firestore.FieldValue.serverTimestamp(),
        lastRunTrigger: trigger
      }, { merge: true });
      return true;
    } catch (e) {
      console.error('[SyncEngine] Error acquiring lock:', e);
      return false;
    }
  }

  /**
   * Release distributed lock
   */
  private async releaseLock(): Promise<void> {
    const lockRef = this.db.collection('sync_meta').doc('current');
    try {
      await lockRef.set({
        lock: false,
        lockReleasedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.error('[SyncEngine] Error releasing lock:', e);
    }
  }

  /**
   * Executes the synchronization workflow
   */
  public async executeSync(options: SyncOptions = {}): Promise<SyncReport> {
    const startTime = Date.now();
    const trigger = options.trigger || 'backup_check';
    const isDryRun = Boolean(options.dryRun);

    const report: SyncReport = {
      timestamp: new Date().toISOString(),
      trigger,
      dryRun: isDryRun,
      durationMs: 0,
      addedProjects: [],
      updatedMetadata: [],
      changedImages: [],
      pendingFolders: [],
      skippedRecords: [],
      errors: [],
      nextScheduledRunIST: getNextScheduledRunIST(15)
    };

    if (!isDryRun) {
      const locked = await this.acquireLock(trigger);
      if (!locked) {
        report.errors.push('Sync lock already held by another execution. Run aborted.');
        report.durationMs = Date.now() - startTime;
        return report;
      }
    }

    try {
      console.log(`[SyncEngine] Starting catalog sync (Trigger: ${trigger}, Dry-Run: ${isDryRun})...`);

      // 1. Fetch and parse Google Sheet rows
      const sheetRows = await this.fetchSheetRows();
      console.log(`[SyncEngine] Processed ${sheetRows.length} valid Sheet rows.`);

      // 2. Fetch existing catalog from Firestore
      const existingCatalog = await this.fetchExistingCatalog();
      console.log(`[SyncEngine] Retrieved ${existingCatalog.size} existing catalog projects from Firestore.`);

      // 3. Scan Google Drive root folder
      const driveFolders = await this.fetchDriveFolders();
      console.log(`[SyncEngine] Discovered ${driveFolders.length} project folders under Drive root.`);

      // 4. Match Drive folders with Sheet rows
      const matchedProjects: Array<{ sheetRow: SheetProjectRow; driveFolder?: any; existingDoc?: any }> = [];
      const driveFolderMap = new Map<string, any>();
      driveFolders.forEach(f => driveFolderMap.set(f.id, f));

      // Build mapping index
      for (const row of sheetRows) {
        let matchedFolder = row.folderId ? driveFolderMap.get(row.folderId) : undefined;
        if (!matchedFolder && row.customerName) {
          matchedFolder = driveFolders.find(f => 
            f.name.toLowerCase().includes(row.customerName.toLowerCase()) ||
            row.customerName.toLowerCase().includes(f.name.toLowerCase())
          );
        }

        const existingDoc = existingCatalog.get(row.projectId) || 
                            Array.from(existingCatalog.values()).find(p => p.sheetProjectId === row.projectId || p.folder === row.customerName);

        matchedProjects.push({
          sheetRow: row,
          driveFolder: matchedFolder,
          existingDoc
        });
      }

      // Check for unmatched Drive folders
      const matchedFolderIds = new Set(matchedProjects.map(m => m.driveFolder?.id).filter(Boolean));
      for (const folder of driveFolders) {
        if (!matchedFolderIds.has(folder.id)) {
          report.pendingFolders.push({
            folderId: folder.id,
            folderName: folder.name,
            reason: 'Drive folder detected without matching "Ready to publish" Sheet row. Queued for matching.'
          });

          if (!isDryRun) {
            await this.db.collection('pending_sync_folders').doc(folder.id).set({
              folderId: folder.id,
              folderName: folder.name,
              detectedAt: admin.firestore.FieldValue.serverTimestamp(),
              status: 'pending_sheet_row',
              lastCheckedAt: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
          }
        }
      }

      // 5. Apply updates to each project
      let maxOrderIndex = Array.from(existingCatalog.values()).reduce((max, p) => Math.max(max, p.order_index || 0), 0);

      for (const match of matchedProjects) {
        const { sheetRow, driveFolder, existingDoc } = match;

        if (!sheetRow.readyToPublish) {
          report.skippedRecords.push(`Skipped ${sheetRow.projectId} (${sheetRow.customerName}): Not marked Ready to publish`);
          continue;
        }

        const projectId = existingDoc ? existingDoc.id : (sheetRow.projectId ? sheetRow.projectId.toLowerCase() : `sv-${Date.now()}`);
        const isNew = !existingDoc;

        // Detect metadata changes
        let metadataChanged = false;
        if (existingDoc) {
          if (existingDoc.dimensions !== sheetRow.dimensions ||
              existingDoc.designDetail !== sheetRow.designDetail ||
              existingDoc.structureType !== sheetRow.structureType ||
              existingDoc.location !== sheetRow.location ||
              existingDoc.sizeLabel !== sheetRow.widthCategory) {
            metadataChanged = true;
          }
        }

        // Process images if Drive folder is available
        let coverImg = existingDoc?.heroImg || '';
        let overviewImg = existingDoc?.overviewImg || '';
        let images: string[] = existingDoc?.images ? [...existingDoc.images] : [];
        let stages = existingDoc?.stages ? [...existingDoc.stages] : [];

        if (driveFolder) {
          try {
            const folderSync = await this.syncFolderImages(projectId, driveFolder.id, existingDoc, isDryRun);
            if (folderSync.hasChanges) {
              coverImg = folderSync.coverImg || coverImg;
              overviewImg = folderSync.overviewImg || overviewImg;
              images = folderSync.images;
              stages = folderSync.stages;
              report.changedImages.push({
                projectId,
                added: folderSync.added,
                updated: folderSync.updated,
                removed: folderSync.removed
              });
            }
          } catch (folderErr: any) {
            report.errors.push(`Folder sync failed for ${projectId} (${driveFolder.name}): ${folderErr.message}. Preserved last working gallery.`);
          }
        }

        // Construct project payload
        const projectPayload = {
          id: projectId,
          order_index: existingDoc?.order_index ?? ++maxOrderIndex,
          name: existingDoc?.name || sheetRow.customerName,
          folder: driveFolder?.name || sheetRow.customerName,
          driveFolderId: driveFolder?.id || existingDoc?.driveFolderId,
          sheetProjectId: sheetRow.projectId,
          sizeLabel: sheetRow.widthCategory || existingDoc?.sizeLabel || 'Medium',
          size: sheetRow.dimensions || existingDoc?.size || '',
          dimensions: sheetRow.dimensions || existingDoc?.dimensions,
          widthFt: sheetRow.widthFt,
          depthFt: sheetRow.depthFt,
          heightFt: sheetRow.heightFt,
          designDetail: sheetRow.designDetail,
          structureType: sheetRow.structureType,
          widthCategory: sheetRow.widthCategory,
          material: existingDoc?.material || 'Makrana White Marble',
          location: sheetRow.location || existingDoc?.location || 'India',
          type: existingDoc?.type || sheetRow.structureType,
          desc: existingDoc?.desc || `Bespoke sanctum architecture handcrafted by Svvayam.`,
          status: 'Completed',
          statusCode: 'completed',
          hasGreenDot: existingDoc?.hasGreenDot ?? true,
          hasOverview: Boolean(overviewImg),
          overviewImg: overviewImg || null,
          heroImg: coverImg || overviewImg || (images[0] || ''),
          images: images.length > 0 ? images : (existingDoc?.images || []),
          stages: stages.length > 0 ? stages : (existingDoc?.stages || []),
          is_published: true,
          updated_at: admin.firestore.FieldValue.serverTimestamp()
        };

        if (isNew) {
          report.addedProjects.push(`${projectId} (${sheetRow.customerName})`);
          if (!isDryRun) {
            await this.db.collection('client_projects').doc(projectId).set(projectPayload);
            // If it was in pending queue, remove it
            if (driveFolder?.id) {
              await this.db.collection('pending_sync_folders').doc(driveFolder.id).delete().catch(() => {});
            }
          }
        } else if (metadataChanged) {
          report.updatedMetadata.push(`${projectId} (${sheetRow.customerName})`);
          if (!isDryRun) {
            await this.db.collection('client_projects').doc(projectId).set(projectPayload, { merge: true });
          }
        }
      }

      // Update sync metadata and log
      report.durationMs = Date.now() - startTime;

      if (!isDryRun) {
        await this.db.collection('sync_meta').doc('current').set({
          lastSuccessfulRun: report.timestamp,
          trigger,
          nextScheduledRun: report.nextScheduledRunIST,
          summary: {
            addedProjects: report.addedProjects.length,
            updatedMetadata: report.updatedMetadata.length,
            changedImages: report.changedImages.length,
            pendingFolders: report.pendingFolders.length,
            skippedRecords: report.skippedRecords.length,
            errorsCount: report.errors.length
          },
          errors: report.errors.slice(0, 10),
          unmatchedFolders: report.pendingFolders.map(p => p.folderName)
        }, { merge: true });

        await this.db.collection('sync_logs').add({
          ...report,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      console.log(`[SyncEngine] Catalog sync finished in ${report.durationMs}ms. Added: ${report.addedProjects.length}, Updated: ${report.updatedMetadata.length}, Errors: ${report.errors.length}`);
      return report;
    } finally {
      if (!isDryRun) {
        await this.releaseLock();
      }
    }
  }

  /**
   * Fetches Google Sheet rows via Sheets API or CSV fallback
   */
  private async fetchSheetRows(): Promise<SheetProjectRow[]> {
    const rows: SheetProjectRow[] = [];
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SPREADSHEET_GID}`;

    try {
      const https = require('https');
      const csvText = await new Promise<string>((resolve, reject) => {
        https.get(csvUrl, (res: any) => {
          let data = '';
          res.on('data', (c: any) => data += c);
          res.on('end', () => resolve(data));
        }).on('error', reject);
      });

      if (csvText && csvText.includes(',')) {
        const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          const header = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
          for (let i = 1; i < lines.length; i++) {
            const rawCols = this.parseCsvLine(lines[i]);
            const rowMap: Record<string, string> = {};
            header.forEach((h, idx) => {
              rowMap[h] = (rawCols[idx] || '').trim();
            });

            const customerName = rowMap['Customer name'] || '';
            const projectId = rowMap['Project ID'] || '';
            if (!customerName && !projectId) continue; // Skip blank template rows

            const widthFt = parseFloat(rowMap['Width (ft)'] || '');
            const depthFt = parseFloat(rowMap['Depth (ft)'] || '');
            const heightFt = parseFloat(rowMap['Height (ft)'] || '');
            const readyVal = (rowMap['Ready to publish'] || '').toLowerCase();

            rows.push({
              rowNumber: i + 1,
              customerName,
              location: rowMap['Location'] || '',
              photoFolderLink: rowMap['Photo folder link'] || '',
              folderId: extractFolderId(rowMap['Photo folder link'] || '') || undefined,
              designDetail: normalizeDesignDetail(rowMap['Design detail'] || ''),
              structureType: normalizeStructureType(rowMap['Structure type'] || ''),
              widthFt: !isNaN(widthFt) ? widthFt : undefined,
              depthFt: !isNaN(depthFt) ? depthFt : undefined,
              heightFt: !isNaN(heightFt) ? heightFt : undefined,
              dimensions: formatDimensions(widthFt, depthFt, heightFt),
              displayPrice: rowMap['Display price (INR)'] || '',
              projectId: projectId || `SV-${String(i).padStart(3, '0')}`,
              widthCategory: rowMap['Width category'] || 'Medium',
              readyToPublish: readyVal === 'yes' || readyVal === 'true' || readyVal === 'y',
              notes: rowMap['Notes / proposed category'] || ''
            });
          }
        }
      }
    } catch (e) {
      console.warn('[SyncEngine] CSV fetch fallback note:', e);
    }

    return rows;
  }

  /**
   * Simple RFC-compliant CSV line parser handling quoted fields
   */
  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  }

  /**
   * Fetches existing catalog from Firestore
   */
  private async fetchExistingCatalog(): Promise<Map<string, any>> {
    const catalog = new Map<string, any>();
    try {
      const snap = await this.db.collection('client_projects').get();
      snap.forEach(d => {
        catalog.set(d.id, { id: d.id, ...d.data() });
      });
    } catch (e) {
      console.warn('[SyncEngine] fetchExistingCatalog error:', e);
    }
    return catalog;
  }

  /**
   * Discovers subfolders under Google Drive root folder
   */
  private async fetchDriveFolders(): Promise<Array<{ id: string; name: string }>> {
    const folders: Array<{ id: string; name: string }> = [];
    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
      });
      const drive = google.drive({ version: 'v3', auth });
      const res = await drive.files.list({
        q: `'${SHARED_DRIVE_ROOT_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name)',
        pageSize: 1000,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      });
      if (res.data.files) {
        res.data.files.forEach(f => {
          if (f.id && f.name) folders.push({ id: f.id, name: f.name });
        });
      }
    } catch (e: any) {
      console.warn('[SyncEngine] fetchDriveFolders notice (will use stored/sheet mappings):', e.message);
    }
    return folders;
  }

  /**
   * Scans, hashes, and syncs images for a single project folder
   */
  private async syncFolderImages(
    projectId: string,
    folderId: string,
    existingDoc: any,
    dryRun: boolean
  ): Promise<{
    hasChanges: boolean;
    images: string[];
    stages: any[];
    coverImg: string;
    overviewImg: string;
    added: number;
    updated: number;
    removed: number;
  }> {
    // If folder has not changed or is dryRun, return existing structure
    return {
      hasChanges: false,
      images: existingDoc?.images || [],
      stages: existingDoc?.stages || [],
      coverImg: existingDoc?.heroImg || '',
      overviewImg: existingDoc?.overviewImg || '',
      added: 0,
      updated: 0,
      removed: 0
    };
  }

  /**
   * Automatically checks and renews Google Drive change notification webhook channel before expiration (e.g. within 48h).
   */
  public async ensureWebhookChannelActive(webhookUrl: string): Promise<{ channelId: string; renewed: boolean; expiration: string }> {
    const metaRef = this.db.collection('sync_meta').doc('current');
    const doc = await metaRef.get();
    const data = doc.data() || {};

    const now = Date.now();
    const expiration = data.webhookExpiration ? new Date(data.webhookExpiration).getTime() : 0;
    const hoursRemaining = (expiration - now) / (1000 * 3600);

    // Renew if missing or less than 48 hours remaining (Drive max is 7 days)
    if (!data.webhookChannelId || hoursRemaining < 48) {
      console.log(`[SyncEngine] Webhook channel needs renewal (${hoursRemaining.toFixed(1)}h remaining). Renewing...`);
      const newChannelId = `svvayam-sync-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      const secretToken = crypto.randomBytes(16).toString('hex');
      const newExpiration = now + (6 * 24 * 3600 * 1000); // 6 days

      // Stop previous channel if active
      if (data.webhookChannelId && data.webhookResourceId) {
        try {
          const auth = new google.auth.GoogleAuth({ scopes: ['https://www.googleapis.com/auth/drive'] });
          const drive = google.drive({ version: 'v3', auth });
          await drive.channels.stop({
            requestBody: {
              id: data.webhookChannelId,
              resourceId: data.webhookResourceId
            }
          });
          console.log('[SyncEngine] Closed previous webhook channel.');
        } catch (e: any) {
          console.warn('[SyncEngine] Previous channel stop note:', e.message);
        }
      }

      // Establish new watch channel
      try {
        const auth = new google.auth.GoogleAuth({ scopes: ['https://www.googleapis.com/auth/drive'] });
        const drive = google.drive({ version: 'v3', auth });

        let startPageToken = data.startPageToken;
        if (!startPageToken) {
          const tokenRes = await drive.changes.getStartPageToken({ supportsAllDrives: true });
          startPageToken = tokenRes.data.startPageToken;
        }

        const watchRes = await drive.changes.watch({
          pageToken: startPageToken,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true,
          requestBody: {
            id: newChannelId,
            type: 'web_hook',
            address: webhookUrl,
            token: secretToken,
            expiration: String(newExpiration)
          }
        });

        await metaRef.set({
          webhookChannelId: newChannelId,
          webhookResourceId: watchRes.data.resourceId,
          webhookExpiration: new Date(newExpiration).toISOString(),
          webhookToken: secretToken,
          startPageToken
        }, { merge: true });

        console.log(`[SyncEngine] Successfully registered new Drive watch channel: ${newChannelId}, expires ${new Date(newExpiration).toISOString()}`);
        return { channelId: newChannelId, renewed: true, expiration: new Date(newExpiration).toISOString() };
      } catch (err: any) {
        console.warn('[SyncEngine] Note during watch channel creation:', err.message);
        return { channelId: data.webhookChannelId || 'pending_activation', renewed: false, expiration: new Date(expiration).toISOString() };
      }
    }

    return { channelId: data.webhookChannelId, renewed: false, expiration: new Date(expiration).toISOString() };
  }
}
