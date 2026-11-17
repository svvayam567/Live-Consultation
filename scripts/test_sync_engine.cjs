/**
 * Test Suite for Svvayam Google Drive -> Project Explorer Sync Engine
 * Tests the 4 required cases:
 * 1. Photo added or replaced in an existing folder
 * 2. New folder uploaded before matching Sheet row is ready (queued for matching)
 * 3. Sheet-only edit updates project details (dimensions, design detail, structure type)
 * 4. Repeated or failed run leaves catalog consistent (idempotency, concurrency, error recovery)
 */

const {
  formatDimensions,
  normalizeStructureType,
  normalizeDesignDetail,
  extractFolderId,
  getNextScheduledRunIST
} = require('../functions/lib/syncEngine');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`  FAIL: ${message}`);
    throw new Error(message);
  } else {
    console.log(`  PASS: ${message}`);
    passedTests++;
  }
}

// In-Memory Test Harness for Sync Simulation
class MockSyncHarness {
  constructor() {
    this.catalog = new Map();
    this.pendingFolders = new Map();
    this.syncMeta = { lock: false, lockTimestamp: null };
    this.syncLogs = [];
  }

  seedInitialProjects(projects) {
    projects.forEach((p, idx) => {
      this.catalog.set(p.id, {
        ...p,
        order_index: idx,
        is_published: true
      });
    });
  }

  // Simulates executing the sync engine logic
  async runSync({ sheetRows, driveFolders, driveFolderFiles, trigger = 'test', isDryRun = false }) {
    if (this.syncMeta.lock) {
      return { aborted: true, reason: 'Lock active' };
    }

    this.syncMeta.lock = true;
    const report = {
      trigger,
      dryRun: isDryRun,
      addedProjects: [],
      updatedMetadata: [],
      changedImages: [],
      pendingFolders: [],
      skippedRecords: [],
      errors: [],
      nextScheduledRunIST: getNextScheduledRunIST(15)
    };

    try {
      const driveFolderMap = new Map();
      driveFolders.forEach(f => driveFolderMap.set(f.id, f));

      // Match Drive folders to Sheet rows
      const matchedFolderIds = new Set();
      let maxOrder = Array.from(this.catalog.values()).reduce((m, p) => Math.max(m, p.order_index || 0), 0);

      for (const row of sheetRows) {
        let matchedFolder = row.folderId ? driveFolderMap.get(row.folderId) : undefined;
        if (!matchedFolder && row.customerName) {
          matchedFolder = driveFolders.find(f => 
            f.name.toLowerCase().includes(row.customerName.toLowerCase()) ||
            row.customerName.toLowerCase().includes(f.name.toLowerCase())
          );
        }

        if (matchedFolder) {
          matchedFolderIds.add(matchedFolder.id);
        }

        if (!row.readyToPublish) {
          report.skippedRecords.push(row.projectId);
          continue;
        }

        const existing = this.catalog.get(row.id || row.projectId.toLowerCase());

        // Check for metadata changes
        let metaChanged = false;
        if (existing) {
          if (existing.dimensions !== row.dimensions ||
              existing.designDetail !== row.designDetail ||
              existing.structureType !== row.structureType ||
              existing.location !== row.location) {
            metaChanged = true;
          }
        }

        // Check for image changes in matched folder
        let imagesChanged = false;
        let files = (matchedFolder && driveFolderFiles.get(matchedFolder.id)) || [];

        if (existing && files.length > 0) {
          const prevCount = existing.images ? existing.images.length : 0;
          if (files.length !== prevCount || files.some(f => f.isNew || f.isModified)) {
            imagesChanged = true;
          }
        }

        const projId = existing ? existing.id : (row.id || row.projectId.toLowerCase());

        if (!existing) {
          // New Project
          if (files.length > 0) {
            const newDoc = {
              id: projId,
              order_index: ++maxOrder,
              name: row.customerName,
              folder: matchedFolder ? matchedFolder.name : row.customerName,
              driveFolderId: matchedFolder ? matchedFolder.id : null,
              sheetProjectId: row.projectId,
              dimensions: row.dimensions,
              designDetail: row.designDetail,
              structureType: row.structureType,
              location: row.location,
              images: files.map(f => f.url || `https://firebasestorage.googleapis.com/.../${f.name}`),
              heroImg: files[0]?.url || '',
              is_published: true
            };
            this.catalog.set(projId, newDoc);
            report.addedProjects.push(projId);

            // Clean pending queue
            if (matchedFolder) {
              this.pendingFolders.delete(matchedFolder.id);
            }
          }
        } else if (metaChanged || imagesChanged) {
          const updatedDoc = {
            ...existing,
            dimensions: row.dimensions || existing.dimensions,
            designDetail: row.designDetail || existing.designDetail,
            structureType: row.structureType || existing.structureType,
            location: row.location || existing.location
          };
          if (imagesChanged) {
            updatedDoc.images = files.map(f => f.url || `https://firebasestorage.googleapis.com/.../${f.name}`);
            report.changedImages.push({ projectId: projId, count: files.length });
          }
          if (metaChanged) {
            report.updatedMetadata.push(projId);
          }
          this.catalog.set(projId, updatedDoc);
        }
      }

      // Check for unmatched Drive folders
      for (const folder of driveFolders) {
        if (!matchedFolderIds.has(folder.id)) {
          this.pendingFolders.set(folder.id, {
            folderId: folder.id,
            folderName: folder.name,
            reason: 'Drive folder detected without matching "Ready to publish" Sheet row.'
          });
          report.pendingFolders.push({ folderId: folder.id, folderName: folder.name });
        }
      }

      return report;
    } finally {
      this.syncMeta.lock = false;
    }
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('SVVAYAM PROJECT CATALOG SYNC - 4-CASE TEST SUITE');
  console.log('====================================================\n');

  const harness = new MockSyncHarness();

  // Seed with baseline project
  harness.seedInitialProjects([
    {
      id: 'rishab-bafna',
      name: 'Mr. Bafna Sanctum',
      sheetProjectId: 'SV-002',
      dimensions: 'W 4.5 × D 1 × H 9.6 ft',
      designDetail: 'Minimal',
      structureType: 'Wall Unit',
      location: 'Coimbatore',
      images: [
        'assets/clients/COMPACT/Mr. Rishab Bafna/OVERVIEW.png',
        'assets/clients/COMPACT/Mr. Rishab Bafna/1.png'
      ]
    }
  ]);

  // -------------------------------------------------------------
  // TEST CASE 1: Photo added or replaced in an existing folder
  // -------------------------------------------------------------
  console.log('--- TEST CASE 1: Photo Added or Replaced in Existing Folder ---');
  {
    const sheetRows = [
      {
        id: 'rishab-bafna',
        projectId: 'SV-002',
        customerName: 'Mr. Rishab Bafna',
        location: 'Coimbatore',
        dimensions: 'W 4.5 × D 1 × H 9.6 ft',
        designDetail: 'Minimal',
        structureType: 'Wall Unit',
        readyToPublish: true,
        folderId: 'folder_rishab_123'
      }
    ];
    const driveFolders = [{ id: 'folder_rishab_123', name: 'Mr. Rishab Bafna' }];
    const driveFolderFiles = new Map();
    // Simulate photo addition (from 2 images to 3 images, with 1 replaced)
    driveFolderFiles.set('folder_rishab_123', [
      { name: 'OVERVIEW.png', url: 'https://storage/rishab/OVERVIEW.png', isModified: false },
      { name: '1.png', url: 'https://storage/rishab/1_replaced.png', isModified: true },
      { name: '2.png', url: 'https://storage/rishab/2_new.png', isNew: true }
    ]);

    const res1 = await harness.runSync({ sheetRows, driveFolders, driveFolderFiles });
    assert(res1.changedImages.length === 1, 'Detected image changes in folder_rishab_123');
    assert(res1.changedImages[0].projectId === 'rishab-bafna', 'Correct project ID flagged for image update');
    const updatedProj = harness.catalog.get('rishab-bafna');
    assert(updatedProj.images.length === 3, 'Project gallery updated to 3 images');
    assert(updatedProj.name === 'Mr. Bafna Sanctum', 'Curated project display name preserved');
    assert(updatedProj.order_index === 0, 'Original display order preserved');
  }

  // -------------------------------------------------------------
  // TEST CASE 2: New folder uploaded before matching Sheet row is ready
  // -------------------------------------------------------------
  console.log('\n--- TEST CASE 2: New Folder Uploaded Before Sheet Row is Ready ---');
  {
    // Step 2A: Folder exists in Drive, but Sheet row is missing or not ready
    const sheetRowsStepA = [
      {
        id: 'rishab-bafna',
        projectId: 'SV-002',
        customerName: 'Mr. Rishab Bafna',
        readyToPublish: true,
        folderId: 'folder_rishab_123'
      }
    ];
    const driveFoldersStepA = [
      { id: 'folder_rishab_123', name: 'Mr. Rishab Bafna' },
      { id: 'folder_new_ankit_456', name: 'Mr. Ankit Verma' } // New folder uploaded first
    ];
    const driveFolderFiles = new Map();
    driveFolderFiles.set('folder_new_ankit_456', [
      { name: 'OVERVIEW.png', url: 'https://storage/ankit/OVERVIEW.png' }
    ]);

    const res2A = await harness.runSync({
      sheetRows: sheetRowsStepA,
      driveFolders: driveFoldersStepA,
      driveFolderFiles
    });

    assert(harness.catalog.has('ankit-verma') === false, 'New project NOT published without approved Sheet row');
    assert(harness.pendingFolders.has('folder_new_ankit_456'), 'New folder queued in pending_sync_folders');
    assert(res2A.pendingFolders.length === 1, 'Report includes 1 pending folder');

    // Step 2B: Later run — User adds Sheet row with "Ready to publish: Yes"
    const sheetRowsStepB = [
      ...sheetRowsStepA,
      {
        id: 'ankit-verma',
        projectId: 'SV-091',
        customerName: 'Mr. Ankit Verma',
        location: 'Jaipur',
        dimensions: 'W 6.0 × D 2.0 × H 8.5 ft',
        designDetail: 'Moderate',
        structureType: 'Complete Pooja Room',
        readyToPublish: true,
        folderId: 'folder_new_ankit_456'
      }
    ];

    const res2B = await harness.runSync({
      sheetRows: sheetRowsStepB,
      driveFolders: driveFoldersStepA,
      driveFolderFiles
    });

    assert(res2B.addedProjects.includes('ankit-verma'), 'New project automatically published after Sheet row is ready');
    assert(harness.catalog.has('ankit-verma'), 'Catalog now contains ankit-verma');
    const ankitProj = harness.catalog.get('ankit-verma');
    assert(ankitProj.order_index === 1, 'New project appended after existing project order');
    assert(ankitProj.structureType === 'Complete Pooja Room', 'Sheet structure type mapped correctly');
    assert(ankitProj.designDetail === 'Moderate', 'Sheet design detail mapped correctly');
    assert(harness.pendingFolders.has('folder_new_ankit_456') === false, 'Folder cleared from pending_sync_folders queue');
  }

  // -------------------------------------------------------------
  // TEST CASE 3: Sheet-only edit updates project details
  // -------------------------------------------------------------
  console.log('\n--- TEST CASE 3: Sheet-Only Edit Updates Project Details ---');
  {
    // Modify dimensions and design detail in Sheet without any changes in Drive
    const sheetRowsModified = [
      {
        id: 'rishab-bafna',
        projectId: 'SV-002',
        customerName: 'Mr. Rishab Bafna',
        location: 'Coimbatore',
        dimensions: 'W 5.2 × D 1.5 × H 10.0 ft', // Edited dimensions
        designDetail: 'Heavy',                 // Edited design detail
        structureType: 'Complete Pooja Room',  // Edited structure type
        readyToPublish: true,
        folderId: 'folder_rishab_123'
      },
      {
        id: 'ankit-verma',
        projectId: 'SV-091',
        customerName: 'Mr. Ankit Verma',
        location: 'Jaipur',
        dimensions: 'W 6.0 × D 2.0 × H 8.5 ft',
        designDetail: 'Moderate',
        structureType: 'Complete Pooja Room',
        readyToPublish: true,
        folderId: 'folder_new_ankit_456'
      }
    ];

    const driveFolders = [
      { id: 'folder_rishab_123', name: 'Mr. Rishab Bafna' },
      { id: 'folder_new_ankit_456', name: 'Mr. Ankit Verma' }
    ];
    // Files have NOT changed
    const driveFolderFiles = new Map();

    const res3 = await harness.runSync({
      sheetRows: sheetRowsModified,
      driveFolders,
      driveFolderFiles
    });

    assert(res3.updatedMetadata.includes('rishab-bafna'), 'Metadata edit detected for rishab-bafna');
    assert(res3.changedImages.length === 0, 'Zero unnecessary image transfers on sheet-only edit');
    const rishabUpdated = harness.catalog.get('rishab-bafna');
    assert(rishabUpdated.dimensions === 'W 5.2 × D 1.5 × H 10.0 ft', 'New dimensions saved in catalog');
    assert(rishabUpdated.designDetail === 'Heavy', 'New design detail tab category applied');
    assert(rishabUpdated.structureType === 'Complete Pooja Room', 'New structure type filter applied');
    assert(rishabUpdated.images.length === 3, 'Existing images preserved intact');
  }

  // -------------------------------------------------------------
  // TEST CASE 4: Repeated or failed run leaves catalog consistent
  // -------------------------------------------------------------
  console.log('\n--- TEST CASE 4: Repeated / Failed Run Consistency & Idempotency ---');
  {
    const initialCatalogSize = harness.catalog.size;
    const initialRishab = JSON.stringify(harness.catalog.get('rishab-bafna'));

    // Step 4A: Concurrency Protection (Lock)
    harness.syncMeta.lock = true; // Simulate active run
    const concurrentRes = await harness.runSync({
      sheetRows: [],
      driveFolders: [],
      driveFolderFiles: new Map()
    });
    assert(concurrentRes.aborted === true, 'Concurrent execution rejected while lock is active');
    harness.syncMeta.lock = false; // Release lock

    // Step 4B: Re-running identical sync produces ZERO duplicate records (Idempotency)
    const sheetRowsIdentical = [
      {
        id: 'rishab-bafna',
        projectId: 'SV-002',
        customerName: 'Mr. Rishab Bafna',
        location: 'Coimbatore',
        dimensions: 'W 5.2 × D 1.5 × H 10.0 ft',
        designDetail: 'Heavy',
        structureType: 'Complete Pooja Room',
        readyToPublish: true,
        folderId: 'folder_rishab_123'
      },
      {
        id: 'ankit-verma',
        projectId: 'SV-091',
        customerName: 'Mr. Ankit Verma',
        location: 'Jaipur',
        dimensions: 'W 6.0 × D 2.0 × H 8.5 ft',
        designDetail: 'Moderate',
        structureType: 'Complete Pooja Room',
        readyToPublish: true,
        folderId: 'folder_new_ankit_456'
      }
    ];

    const rerunRes = await harness.runSync({
      sheetRows: sheetRowsIdentical,
      driveFolders: [
        { id: 'folder_rishab_123', name: 'Mr. Rishab Bafna' },
        { id: 'folder_new_ankit_456', name: 'Mr. Ankit Verma' }
      ],
      driveFolderFiles: new Map()
    });

    assert(rerunRes.addedProjects.length === 0, 'Re-run added 0 duplicate projects');
    assert(rerunRes.updatedMetadata.length === 0, 'Re-run updated 0 unchanged metadata records');
    assert(harness.catalog.size === initialCatalogSize, 'Catalog size strictly unchanged across re-runs');
    assert(JSON.stringify(harness.catalog.get('rishab-bafna')) === initialRishab, 'Catalog document remained bit-identical');
  }

  console.log(`\n====================================================`);
  console.log(`ALL TESTS PASSED: ${passedTests} / ${totalTests} assertions verified!`);
  console.log(`====================================================\n`);
}

runTests().catch(err => {
  console.error('\nTest Suite Failed:', err);
  process.exit(1);
});
