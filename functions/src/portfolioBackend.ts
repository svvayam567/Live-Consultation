import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

export interface ProjectStage {
  stage_key: string;
  title: string;
  dir_name: string;
  images: string[];
  count: number;
}

export interface ClientProject {
  id: string;
  order_index?: number;
  name: string;
  folder: string;
  sizeLabel: 'Compact' | 'Medium' | 'Grand' | string;
  size: string;
  dimensions?: string;
  widthFt?: number;
  depthFt?: number;
  heightFt?: number;
  designDetail?: 'Minimal' | 'Moderate' | 'Heavy' | string;
  structureType?: string;
  sheetProjectId?: string;
  widthCategory?: string;
  material: string;
  location: string;
  type: string;
  desc: string;
  status: string;
  statusCode: string;
  hasGreenDot?: boolean;
  hasOverview?: boolean;
  overviewImg?: string | null;
  heroImg: string;
  images: string[];
  stages: ProjectStage[];
  driveFolderId?: string;
  is_published?: boolean;
}

export interface SheetProjectRow {
  rowNumber: number;
  customerName: string;
  location: string;
  photoFolderLink: string;
  folderId?: string;
  designDetail: 'Minimal' | 'Moderate' | 'Heavy';
  structureType: string;
  widthFt?: number;
  depthFt?: number;
  heightFt?: number;
  dimensions?: string;
  displayPrice?: string;
  projectId: string; // SV-XXX
  widthCategory?: string;
  readyToPublish: boolean;
  notes?: string;
}

export interface PendingFolder {
  folderId: string;
  folderName: string;
  reason: string;
}

export interface CatalogResponse {
  timestamp: string;
  source: 'live_federated' | 'cache';
  cacheAgeMs: number;
  totalProjects: number;
  projects: ClientProject[];
  pendingFolders: PendingFolder[];
  warnings: string[];
}

export const SHARED_DRIVE_ROOT_ID = '1xHnnPOs56ip3g2NI-QH_pWnW3PUfv6xE';
export const SPREADSHEET_ID = '1m4uX9scGjIlhwrMbxVRs7m1mcBjLF2bP7lbyiUciyrM';
export const SPREADSHEET_GID = '1934436100';

export function formatDriveImageUrl(fileId: string, version?: string, modifiedTime?: string): string {
  const v = version || (modifiedTime ? new Date(modifiedTime).getTime() : undefined);
  return v ? `/api/portfolio/image?fileId=${fileId}&v=${v}` : `/api/portfolio/image?fileId=${fileId}`;
}

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

export function formatDimensions(w?: number, d?: number, h?: number): string | undefined {
  const parts: string[] = [];
  if (typeof w === 'number' && !isNaN(w) && w > 0) parts.push(`W ${w}`);
  if (typeof d === 'number' && !isNaN(d) && d > 0) parts.push(`D ${d}`);
  if (typeof h === 'number' && !isNaN(h) && h > 0) parts.push(`H ${h}`);
  if (parts.length === 0) return undefined;
  return `${parts.join(' × ')} ft`;
}

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

export function normalizeDesignDetail(val: string): 'Minimal' | 'Moderate' | 'Heavy' {
  if (!val) return 'Moderate';
  const lower = val.trim().toLowerCase();
  if (lower.startsWith('min')) return 'Minimal';
  if (lower.startsWith('mod')) return 'Moderate';
  if (lower.startsWith('hea')) return 'Heavy';
  return 'Moderate';
}

export function parseCsvLine(line: string): string[] {
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

export class PortfolioBackendService {
  private cacheTTLMs = 60 * 1000; // 60-second in-memory cache
  private lastFetchedTime = 0;
  private cachedCatalog: ClientProject[] = [];
  private cachedPendingFolders: PendingFolder[] = [];
  private cachedWarnings: string[] = [];
  private allowedImageFileIds: Set<string> = new Set();
  private mockDriveFiles: Map<string, { buffer: Buffer; mimeType: string }> = new Map();
  private mockSheetRows: SheetProjectRow[] | null = null;
  private baselineManifestPath: string;

  constructor(options?: { baselineManifestPath?: string; cacheTTLMs?: number }) {
    if (options?.cacheTTLMs) {
      this.cacheTTLMs = options.cacheTTLMs;
    }
    this.baselineManifestPath = options?.baselineManifestPath || path.resolve(__dirname, '../../public/assets/clients_manifest.json');
  }

  public setMockDriveFile(fileId: string, buffer: Buffer, mimeType = 'image/jpeg') {
    this.mockDriveFiles.set(fileId, { buffer, mimeType });
    this.allowedImageFileIds.add(fileId);
  }

  public setMockSheetRows(rows: SheetProjectRow[]) {
    this.mockSheetRows = rows;
    this.invalidateCache();
  }

  public invalidateCache() {
    this.lastFetchedTime = 0;
  }

  public getCacheAgeMs(): number {
    return this.lastFetchedTime > 0 ? Date.now() - this.lastFetchedTime : 0;
  }

  public isImageAllowed(fileId: string): boolean {
    return this.allowedImageFileIds.has(fileId);
  }

  /**
   * Fetches the Google Sheet rows.
   * In cloud runtime with ADC, uses Google Sheets API.
   * If local or unauthenticated, falls back to local master CSV.
   */
  public async fetchSpreadsheetRows(): Promise<SheetProjectRow[]> {
    if (this.mockSheetRows) {
      return this.mockSheetRows;
    }

    const rows: SheetProjectRow[] = [];

    // 1. Try Google Sheets API with ADC
    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
      });
      const sheets = google.sheets({ version: 'v4', auth });
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Projects!A1:P250'
      });

      const values = res.data.values;
      if (values && values.length > 1) {
        const header = values[0].map(h => (h || '').toString().trim());
        for (let i = 1; i < values.length; i++) {
          const rowData = values[i] || [];
          const rowMap: Record<string, string> = {};
          header.forEach((h, idx) => {
            rowMap[h] = (rowData[idx] || '').toString().trim();
          });

          const customerName = rowMap['Customer name'] || '';
          const projectId = rowMap['Project ID'] || '';
          if (!customerName) continue; // Skip blank template rows that only contain a preassigned ID

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
        return rows;
      }
    } catch (apiErr: any) {
      // Expected when running locally without active cloud token
    }

    // 2. Fallback to local master CSV file if available
    const candidateCsvPaths = [
      path.resolve(__dirname, '../../scripts/projects_master.csv'),
      path.resolve(__dirname, '../scripts/projects_master.csv'),
      'E:/svvayam/svvayam/WEb/svvayam-live-consultation/scripts/projects_master.csv',
      'e:/svvayam/svvayam/footage/Svvayam Project Catalog — Master Template - Projects.csv'
    ];

    for (const csvPath of candidateCsvPaths) {
      if (fs.existsSync(csvPath)) {
        try {
          const csvText = fs.readFileSync(csvPath, 'utf8');
          const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
          if (lines.length > 1) {
            const header = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
            for (let i = 1; i < lines.length; i++) {
              const rawCols = parseCsvLine(lines[i]);
              const rowMap: Record<string, string> = {};
              header.forEach((h, idx) => {
                rowMap[h] = (rawCols[idx] || '').trim();
              });

              const customerName = rowMap['Customer name'] || '';
              const projectId = rowMap['Project ID'] || '';
              if (!customerName) continue; // Skip blank template rows that only contain a preassigned ID

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
            return rows;
          }
        } catch (csvErr: any) {
          console.warn('[PortfolioBackend] Error reading local CSV fallback:', csvErr.message);
        }
      }
    }

    return rows;
  }

  /**
   * Scans Google Drive root folder to list project subfolders.
   */
  public async fetchDriveFolders(): Promise<Array<{ id: string; name: string }>> {
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
      // Expected if no live ADC token locally
    }

    return folders;
  }

  /**
   * Lists image files in a specific Google Drive project folder.
   */
  public async fetchDriveFolderImages(folderId: string): Promise<Array<{ id: string; name: string; mimeType: string; version?: string; modifiedTime?: string }>> {
    const images: Array<{ id: string; name: string; mimeType: string; version?: string; modifiedTime?: string }> = [];

    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
      });
      const drive = google.drive({ version: 'v3', auth });
      const res = await drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'files(id, name, mimeType, version, modifiedTime)',
        pageSize: 100,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      });

      if (res.data.files) {
        res.data.files.forEach(f => {
          if (f.id && f.name) {
            images.push({
              id: f.id,
              name: f.name,
              mimeType: f.mimeType || 'image/jpeg',
              version: (f as any).version || undefined,
              modifiedTime: f.modifiedTime || undefined
            });
            this.allowedImageFileIds.add(f.id);
          }
        });
      }
    } catch (e: any) {
      // Expected if no live ADC token locally
    }

    // Sort images naturally: e.g. OVERVIEW first, then 1, 2, 3...
    images.sort((a, b) => {
      const aIsOverview = a.name.toLowerCase().includes('overview') || a.name.toLowerCase().includes('cover');
      const bIsOverview = b.name.toLowerCase().includes('overview') || b.name.toLowerCase().includes('cover');
      if (aIsOverview && !bIsOverview) return -1;
      if (!aIsOverview && bIsOverview) return 1;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    return images;
  }

  /**
   * Loads the static baseline manifest containing the canonical 90 projects.
   */
  public loadBaselineManifest(): ClientProject[] {
    const candidatePaths = [
      this.baselineManifestPath,
      path.resolve(process.cwd(), 'public/assets/clients_manifest.json'),
      'E:/svvayam/svvayam/WEb/svvayam-live-consultation/public/assets/clients_manifest.json'
    ];

    for (const p of candidatePaths) {
      if (p && fs.existsSync(p)) {
        try {
          const raw = fs.readFileSync(p, 'utf8');
          const data: ClientProject[] = JSON.parse(raw);
          return data;
        } catch (e: any) {
          console.warn('[PortfolioBackend] Error parsing baseline manifest:', e.message);
        }
      }
    }

    return [];
  }

  /**
   * Builds the live catalog response, caching in memory for TTL.
   */
  public async getCatalog(forceRefresh = false): Promise<CatalogResponse> {
    const now = Date.now();
    const isCacheValid = !forceRefresh && (now - this.lastFetchedTime < this.cacheTTLMs) && this.cachedCatalog.length > 0;

    if (isCacheValid) {
      return {
        timestamp: new Date().toISOString(),
        source: 'cache',
        cacheAgeMs: now - this.lastFetchedTime,
        totalProjects: this.cachedCatalog.length,
        projects: this.cachedCatalog,
        pendingFolders: this.cachedPendingFolders,
        warnings: this.cachedWarnings
      };
    }

    const baseline = this.loadBaselineManifest();
    const sheetRows = await this.fetchSpreadsheetRows();
    const driveFolders = await this.fetchDriveFolders();

    const pendingFolders: PendingFolder[] = [];
    const warnings: string[] = [];

    // Map sheet rows by Project ID
    const sheetByProjectId = new Map<string, SheetProjectRow>();
    const seenIds = new Set<string>();

    for (const r of sheetRows) {
      if (seenIds.has(r.projectId)) {
        warnings.push(`Duplicate Project ID detected in spreadsheet: ${r.projectId} (Row ${r.rowNumber})`);
      } else {
        seenIds.add(r.projectId);
      }
      sheetByProjectId.set(r.projectId, r);
    }

    const driveFolderMap = new Map<string, { id: string; name: string }>();
    driveFolders.forEach(f => driveFolderMap.set(f.id, f));

    // Hydrate existing 90 baseline projects in exact preserved order
    const catalogProjects: ClientProject[] = [];
    const matchedDriveFolderIds = new Set<string>();

    for (let i = 0; i < baseline.length; i++) {
      const baseProj = baseline[i];
      const sheetRow = baseProj.sheetProjectId ? sheetByProjectId.get(baseProj.sheetProjectId) : undefined;

      // Match Drive folder
      let matchedFolder: { id: string; name: string } | undefined;
      if (sheetRow?.folderId) {
        matchedFolder = driveFolderMap.get(sheetRow.folderId) || { id: sheetRow.folderId, name: sheetRow.customerName || baseProj.folder };
      }
      if (!matchedFolder) {
        matchedFolder = driveFolders.find(f => 
          f.name.toLowerCase() === baseProj.folder.toLowerCase() ||
          (baseProj.sheetProjectId && f.name.toLowerCase().includes(baseProj.sheetProjectId.toLowerCase())) ||
          (sheetRow?.customerName && f.name.toLowerCase().includes(sheetRow.customerName.toLowerCase()))
        );
      }

      if (matchedFolder) {
        matchedDriveFolderIds.add(matchedFolder.id);
      }

      // Merge Sheet metadata if available
      const widthFt = sheetRow?.widthFt !== undefined ? sheetRow.widthFt : baseProj.widthFt;
      const depthFt = sheetRow?.depthFt !== undefined ? sheetRow.depthFt : baseProj.depthFt;
      const heightFt = sheetRow?.heightFt !== undefined ? sheetRow.heightFt : baseProj.heightFt;
      const dimensions = formatDimensions(widthFt, depthFt, heightFt) || baseProj.dimensions || baseProj.size;
      const designDetail = sheetRow ? sheetRow.designDetail : (baseProj.designDetail || 'Moderate');
      const structureType = sheetRow ? sheetRow.structureType : (baseProj.structureType || 'Wall Unit');
      const widthCategory = sheetRow?.widthCategory || baseProj.widthCategory || baseProj.sizeLabel;
      const location = sheetRow?.location || baseProj.location;

      // Check for live Drive images if folder exists
      let heroImg = baseProj.heroImg;
      let images = baseProj.images;
      let stages = baseProj.stages;

      if (matchedFolder) {
        const driveImgs = await this.fetchDriveFolderImages(matchedFolder.id);
        if (driveImgs.length > 0) {
          heroImg = formatDriveImageUrl(driveImgs[0].id, driveImgs[0].version, driveImgs[0].modifiedTime);
          images = driveImgs.map(img => formatDriveImageUrl(img.id, img.version, img.modifiedTime));
          stages = [
            {
              stage_key: 'overview',
              title: 'Project Overview',
              dir_name: 'overview',
              images: [heroImg],
              count: 1
            },
            {
              stage_key: 'gallery',
              title: 'Project Gallery',
              dir_name: 'gallery',
              images: images,
              count: images.length
            }
          ];
        }
      }

      catalogProjects.push({
        ...baseProj,
        order_index: i,
        dimensions,
        widthFt,
        depthFt,
        heightFt,
        designDetail,
        structureType,
        widthCategory,
        location,
        heroImg,
        images,
        stages,
        driveFolderId: matchedFolder?.id
      });
    }

    // Check for newly approved projects from spreadsheet (rows not in baseline)
    const baselineSheetIds = new Set(baseline.map(p => p.sheetProjectId).filter(Boolean));
    for (const row of sheetRows) {
      if (baselineSheetIds.has(row.projectId)) continue;

      // Only include when marked Ready to publish
      if (!row.readyToPublish) continue;

      let folder = row.folderId ? (driveFolderMap.get(row.folderId) || { id: row.folderId, name: row.customerName }) : undefined;
      if (!folder && row.customerName) {
        folder = driveFolders.find(f => f.name.toLowerCase().includes(row.customerName.toLowerCase()));
      }

      if (!folder) {
        warnings.push(`Row marked Ready to publish has no matching Drive folder: ${row.projectId} (${row.customerName})`);
        continue;
      }

      matchedDriveFolderIds.add(folder.id);
      const folderImages = await this.fetchDriveFolderImages(folder.id);
      if (folderImages.length === 0) {
        warnings.push(`Folder has no usable images yet: ${folder.name} (${row.projectId})`);
        continue;
      }

      const heroImg = formatDriveImageUrl(folderImages[0].id, folderImages[0].version, folderImages[0].modifiedTime);
      const images = folderImages.map(img => formatDriveImageUrl(img.id, img.version, img.modifiedTime));
      const stages = [
        {
          stage_key: 'overview',
          title: 'Project Overview',
          dir_name: 'overview',
          images: [heroImg],
          count: 1
        },
        {
          stage_key: 'gallery',
          title: 'Project Gallery',
          dir_name: 'gallery',
          images: images,
          count: images.length
        }
      ];

      const newProj: ClientProject = {
        id: `proj-${row.projectId.toLowerCase()}`,
        sheetProjectId: row.projectId,
        order_index: catalogProjects.length,
        name: row.customerName ? `${row.customerName} Sanctum` : 'Sanctum',
        folder: folder.name,
        sizeLabel: (row.widthCategory as any) || 'Medium',
        size: row.dimensions || '',
        dimensions: row.dimensions,
        widthFt: row.widthFt,
        depthFt: row.depthFt,
        heightFt: row.heightFt,
        designDetail: row.designDetail,
        structureType: row.structureType,
        widthCategory: row.widthCategory,
        material: 'Makrana White Marble',
        location: row.location || 'India',
        type: 'White Marble Sanctum',
        desc: 'Bespoke marble sanctum design and temple architecture.',
        status: 'Completed',
        statusCode: 'completed',
        hasOverview: true,
        overviewImg: heroImg,
        heroImg: heroImg,
        images: images,
        stages: stages,
        driveFolderId: folder.id,
        is_published: true
      };

      catalogProjects.push(newProj);
    }

    // Detect unmatched Drive folders under root
    for (const f of driveFolders) {
      if (!matchedDriveFolderIds.has(f.id)) {
        pendingFolders.push({
          folderId: f.id,
          folderName: f.name,
          reason: 'Drive folder under root without matching "Ready to publish" Sheet row. Queued for matching.'
        });
      }
    }

    // Update in-memory cache
    this.cachedCatalog = catalogProjects;
    this.cachedPendingFolders = pendingFolders;
    this.cachedWarnings = warnings;
    this.lastFetchedTime = now;

    return {
      timestamp: new Date(now).toISOString(),
      source: 'live_federated',
      cacheAgeMs: 0,
      totalProjects: catalogProjects.length,
      projects: catalogProjects,
      pendingFolders,
      warnings
    };
  }

  /**
   * Streams an image directly from Google Drive API to HTTP response.
   */
  public async streamDriveImage(fileId: string, res: any): Promise<void> {
    if (!fileId || typeof fileId !== 'string') {
      res.status(400).json({ error: 'fileId query parameter is required.' });
      return;
    }

    // Security restriction: fileId must belong to an approved project folder
    if (!this.allowedImageFileIds.has(fileId)) {
      res.status(403).json({ error: 'Access denied: File is not an approved portfolio image.' });
      return;
    }

    // Check mock files first (for local verification without cloud credentials)
    if (this.mockDriveFiles.has(fileId)) {
      const mock = this.mockDriveFiles.get(fileId)!;
      res.setHeader('Content-Type', mock.mimeType);
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      res.status(200).send(mock.buffer);
      return;
    }

    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
      });
      const drive = google.drive({ version: 'v3', auth });

      // Get metadata for MIME type
      const meta = await drive.files.get({
        fileId,
        fields: 'id, name, mimeType',
        supportsAllDrives: true
      });

      const mimeType = meta.data.mimeType || 'image/jpeg';

      // Stream media directly to response
      const driveStream = await drive.files.get(
        { fileId, alt: 'media', supportsAllDrives: true },
        { responseType: 'stream' }
      );

      res.setHeader('Content-Type', mimeType);
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');

      driveStream.data.pipe(res);
    } catch (err: any) {
      console.error(`[PortfolioBackend] Error streaming Drive file ${fileId}:`, err.message);
      res.status(500).json({ error: 'Failed to stream image from Google Drive.', details: err.message });
    }
  }
}

export const defaultPortfolioService = new PortfolioBackendService();
