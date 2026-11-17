/**
 * Direct Google Drive & Sheet Verification Test Suite
 * Verifies:
 * 1. Existing portfolio displays correctly (90 projects, order, categories, filters).
 * 2. Scenario A: Sheet-only edit (dimensions, design detail, structure type).
 * 3. Scenario B: Photo add/replacement in Drive (gallery & cover update, secure streaming, 403 on unauthorized).
 * 4. Scenario C: New folder uploaded first (pending), then approved in Sheet (appends after 90 projects).
 * 5. Scenario D: Verify zero writes to Firebase Storage and zero mirroring in Firestore.
 * 6. Scenario E: Measure update delay and response latency.
 */

const fs = require('fs');
const path = require('path');
const { defaultPortfolioService, PortfolioBackendService } = require('../functions/lib/portfolioBackend');

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

async function runTestSuite() {
  console.log('================================================================');
  console.log('SVVAYAM PROJECT EXPLORER: DIRECT DRIVE & SHEET BACKEND VERIFICATION');
  console.log('================================================================\n');

  // -------------------------------------------------------------------------
  // TEST 1: Baseline Catalog Display & Transition Integrity
  // -------------------------------------------------------------------------
  console.log('--- TEST 1: Baseline Portfolio Integrity (90 Projects) ---');
  defaultPortfolioService.invalidateCache();
  const baselineCatalog = await defaultPortfolioService.getCatalog(true);

  assert(baselineCatalog.totalProjects === 90, `Catalog contains exactly 90 baseline projects (found ${baselineCatalog.totalProjects})`);
  assert(baselineCatalog.projects[0].name === 'Mr. Bafna Sanctum', 'Project 0 name preserved: Mr. Bafna Sanctum');
  assert(baselineCatalog.projects[0].sheetProjectId === 'SV-008', 'Project 0 sheetProjectId is SV-008');

  // Verify Design Detail tabs: Minimal, Moderate, Heavy
  const minimal = baselineCatalog.projects.filter(p => (p.designDetail || '').toLowerCase() === 'minimal').length;
  const moderate = baselineCatalog.projects.filter(p => (p.designDetail || '').toLowerCase() === 'moderate').length;
  const heavy = baselineCatalog.projects.filter(p => (p.designDetail || '').toLowerCase() === 'heavy').length;
  console.log(`  Design Detail Breakdown: Minimal=${minimal}, Moderate=${moderate}, Heavy=${heavy}`);
  assert(minimal === 17, `Minimal design count matches baseline (17, found ${minimal})`);
  assert(moderate === 45, `Moderate design count matches baseline (45, found ${moderate})`);
  assert(heavy === 28, `Heavy design count matches baseline (28, found ${heavy})`);

  // Verify Structure Types
  const structureTypes = new Set(baselineCatalog.projects.map(p => p.structureType).filter(Boolean));
  console.log(`  Structure Types detected (${structureTypes.size}):`, Array.from(structureTypes).join(', '));
  assert(structureTypes.has('Existing Room Frontage'), 'Contains "Existing Room Frontage"');
  assert(structureTypes.has('Wall Unit'), 'Contains "Wall Unit"');
  assert(structureTypes.has('Open pooja Mandap'), 'Contains "Open pooja Mandap"');
  assert(structureTypes.has('Complete Pooja Room'), 'Contains "Complete Pooja Room"');

  // -------------------------------------------------------------------------
  // TEST 2: Scenario A - Sheet-Only Edit (Dimensions, Design Detail, Structure Type)
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 2: Scenario A - Sheet-Only Edit ---');
  // Create an isolated backend service instance for testing modifications
  const testService = new PortfolioBackendService();
  const currentSheetRows = await testService.fetchSpreadsheetRows();

  // Clone and edit row SV-002 (Ms. Sujana Reddy)
  const modifiedRows = JSON.parse(JSON.stringify(currentSheetRows));
  const targetRow = modifiedRows.find(r => r.projectId === 'SV-002');
  assert(!!targetRow, 'Found row SV-002 in spreadsheet dataset');

  // Apply edits
  targetRow.widthFt = 5.2;
  targetRow.depthFt = 2.0;
  targetRow.heightFt = 9.0;
  targetRow.dimensions = 'W 5.2 × D 2 × H 9 ft';
  targetRow.designDetail = 'Heavy'; // was Minimal
  targetRow.structureType = 'Complete Pooja Room'; // was Existing Room Frontage

  testService.setMockSheetRows(modifiedRows);
  const updatedCatalog = await testService.getCatalog(true);

  const updatedProject = updatedCatalog.projects.find(p => p.sheetProjectId === 'SV-002');
  assert(!!updatedProject, 'Project SV-002 exists in catalog after sheet edit');
  assert(updatedProject.dimensions === 'W 5.2 × D 2 × H 9 ft', `Dimensions updated from Sheet: ${updatedProject.dimensions}`);
  assert(updatedProject.designDetail === 'Heavy', `Design detail updated from Sheet: ${updatedProject.designDetail}`);
  assert(updatedProject.structureType === 'Complete Pooja Room', `Structure type updated from Sheet: ${updatedProject.structureType}`);
  assert(updatedCatalog.totalProjects === 90, 'Project count remains stable at 90 during sheet edit');

  // -------------------------------------------------------------------------
  // TEST 3: Scenario B - Photo Add / Replacement in Google Drive
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 3: Scenario B - Photo Add/Replacement in Google Drive ---');
  const sujanaFolderId = 'drive_folder_sujana_002';
  targetRow.folderId = sujanaFolderId;
  targetRow.photoFolderLink = `https://drive.google.com/drive/folders/${sujanaFolderId}`;

  const mockImageId1 = 'drive_img_sujana_001_new_overview';
  const mockImageId2 = 'drive_img_sujana_002_new_detail';
  const dummyBuffer = Buffer.from('FAKE_JPEG_IMAGE_BYTES_FOR_SV_002');

  testService.setMockDriveFile(mockImageId1, dummyBuffer, 'image/jpeg');
  testService.setMockDriveFile(mockImageId2, dummyBuffer, 'image/jpeg');

  // Mock fetchDriveFolderImages to return newly uploaded files for Sujana's folder with version
  testService.fetchDriveFolderImages = async (folderId) => {
    return [
      { id: mockImageId1, name: 'OVERVIEW.png', mimeType: 'image/jpeg', version: '1' },
      { id: mockImageId2, name: '2.png', mimeType: 'image/jpeg', version: '1' }
    ];
  };

  testService.setMockSheetRows(modifiedRows);
  testService.invalidateCache();
  const driveUpdatedCatalog = await testService.getCatalog(true);
  const sujanaDriveProj = driveUpdatedCatalog.projects.find(p => p.sheetProjectId === 'SV-002');

  assert(!!sujanaDriveProj, 'Project SV-002 found in Drive-updated catalog');
  assert(sujanaDriveProj.heroImg === `/api/portfolio/image?fileId=${mockImageId1}&v=1`, `Hero image includes Drive file version v=1: ${sujanaDriveProj.heroImg}`);
  assert(sujanaDriveProj.images.length === 2, `Gallery updated with 2 Drive images (found ${sujanaDriveProj.images.length})`);
  assert(sujanaDriveProj.images[1] === `/api/portfolio/image?fileId=${mockImageId2}&v=1`, `Second image points to fileId ${mockImageId2} with v=1`);

  // Simulate in-place replacement under SAME fileId with incremented version (v=2)
  testService.fetchDriveFolderImages = async (folderId) => {
    return [
      { id: mockImageId1, name: 'OVERVIEW.png', mimeType: 'image/jpeg', version: '2' },
      { id: mockImageId2, name: '2.png', mimeType: 'image/jpeg', version: '1' }
    ];
  };
  testService.invalidateCache();
  const driveReplacedCatalog = await testService.getCatalog(true);
  const sujanaReplacedProj = driveReplacedCatalog.projects.find(p => p.sheetProjectId === 'SV-002');
  assert(sujanaReplacedProj.heroImg === `/api/portfolio/image?fileId=${mockImageId1}&v=2`, `Replacement under same fileId updates version to v=2: ${sujanaReplacedProj.heroImg}`);

  // Test streaming endpoint mock
  let streamedHeaders = {};
  let streamedStatus = 0;
  let streamedBody = null;
  const mockRes = {
    setHeader: (k, v) => { streamedHeaders[k] = v; },
    status: (code) => { streamedStatus = code; return mockRes; },
    send: (body) => { streamedBody = body; },
    json: (body) => { streamedBody = body; }
  };

  await testService.streamDriveImage(mockImageId1, mockRes);
  assert(streamedStatus === 200, `Streaming approved image returned HTTP 200 (got ${streamedStatus})`);
  assert(streamedHeaders['Content-Type'] === 'image/jpeg', `MIME type set to image/jpeg (got ${streamedHeaders['Content-Type']})`);
  assert(streamedHeaders['Cache-Control']?.includes('max-age=86400'), `Cache-Control set for browser caching (got ${streamedHeaders['Cache-Control']})`);
  assert(streamedBody?.toString() === 'FAKE_JPEG_IMAGE_BYTES_FOR_SV_002', 'Image binary payload streamed correctly');

  // Test Security Restriction: Unauthorized fileId must return 403 Forbidden
  let unauthorizedStatus = 0;
  let unauthorizedBody = null;
  const mockUnauthRes = {
    setHeader: () => {},
    status: (code) => { unauthorizedStatus = code; return mockUnauthRes; },
    json: (body) => { unauthorizedBody = body; }
  };
  await testService.streamDriveImage('malicious_or_unapproved_file_id_xyz', mockUnauthRes);
  assert(unauthorizedStatus === 403, `Unauthorized fileId returned HTTP 403 Forbidden (got ${unauthorizedStatus})`);

  // -------------------------------------------------------------------------
  // TEST 4: Scenario C - New Folder Uploaded First, then Approved via Sheet Row
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 4: Scenario C - New Folder Uploaded First, then Approved ---');
  // Phase 1: Folder uploaded to Drive, but Sheet row is NOT marked Ready to publish yet
  const newFolderId = 'drive_folder_sv_092_new_client';
  const newFolderImageId = 'drive_img_sv_092_hero';
  testService.setMockDriveFile(newFolderImageId, dummyBuffer, 'image/jpeg');

  // Mock fetchDriveFolders to include new folder
  testService.fetchDriveFolders = async () => {
    return [
      { id: newFolderId, name: 'Mr. Ananya Rao' }
    ];
  };

  testService.fetchDriveFolderImages = async (folderId) => {
    if (folderId === newFolderId) {
      return [{ id: newFolderImageId, name: 'OVERVIEW.png', mimeType: 'image/jpeg', version: '1' }];
    }
    return [
      { id: mockImageId1, name: 'OVERVIEW.png', mimeType: 'image/jpeg', version: '1' },
      { id: mockImageId2, name: '2.png', mimeType: 'image/jpeg', version: '1' }
    ];
  };

  // Sheet row present but readyToPublish = false
  const unapprovedRows = JSON.parse(JSON.stringify(currentSheetRows));
  unapprovedRows.push({
    rowNumber: unapprovedRows.length + 1,
    customerName: 'Mr. Ananya Rao',
    location: 'Bangalore',
    photoFolderLink: `https://drive.google.com/drive/folders/${newFolderId}`,
    folderId: newFolderId,
    designDetail: 'Moderate',
    structureType: 'Freestanding Unit',
    widthFt: 6.5,
    depthFt: 2.5,
    heightFt: 8.0,
    dimensions: 'W 6.5 × D 2.5 × H 8 ft',
    projectId: 'SV-092',
    widthCategory: 'Medium',
    readyToPublish: false, // NOT ready yet
    notes: 'Awaiting customer final signoff'
  });

  testService.setMockSheetRows(unapprovedRows);
  const phase1Catalog = await testService.getCatalog(true);

  // Folder must be detected in pendingFolders, and NOT published in projects
  const isPublishedInPhase1 = phase1Catalog.projects.some(p => p.sheetProjectId === 'SV-092');
  const isReportedInPending = phase1Catalog.pendingFolders.some(f => f.folderId === newFolderId);
  assert(!isPublishedInPhase1, 'New project SV-092 is NOT published while readyToPublish=false');
  assert(isReportedInPending, 'Unpublished Drive folder is reported in pendingFolders queue');

  // Phase 2: Sheet row is marked Ready to publish = true
  const approvedRows = JSON.parse(JSON.stringify(unapprovedRows));
  const newRow = approvedRows.find(r => r.projectId === 'SV-092');
  newRow.readyToPublish = true;

  testService.setMockSheetRows(approvedRows);
  const phase2Catalog = await testService.getCatalog(true);

  assert(phase2Catalog.totalProjects === 91, `Catalog now has exactly 91 projects (90 baseline + 1 new, found ${phase2Catalog.totalProjects})`);
  const publishedNewProj = phase2Catalog.projects.find(p => p.sheetProjectId === 'SV-092');
  assert(!!publishedNewProj, 'Newly approved project SV-092 is published in catalog');
  assert(publishedNewProj.order_index === 90, `New project is appended after existing 90 projects at index 90 (got ${publishedNewProj.order_index})`);
  assert(publishedNewProj.name === 'Mr. Ananya Rao Sanctum', `Project name formatted: ${publishedNewProj.name}`);
  assert(publishedNewProj.dimensions === 'W 6.5 × D 2.5 × H 8 ft', `Dimensions preserved: ${publishedNewProj.dimensions}`);
  assert(publishedNewProj.structureType === 'Freestanding Unit', `Structure type preserved: ${publishedNewProj.structureType}`);
  assert(publishedNewProj.heroImg === `/api/portfolio/image?fileId=${newFolderImageId}&v=1`, `Hero image points to Drive streaming proxy with v=1: ${publishedNewProj.heroImg}`);

  // -------------------------------------------------------------------------
  // TEST 5: Scenario D - Zero Storage Uploads & Zero Firestore Mirroring
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 5: Scenario D - Zero Storage & Zero Firestore Storage ---');
  // Inspect code in functions/src/portfolioBackend.ts to guarantee no firebase/storage or firestore writes
  const backendCode = fs.readFileSync(path.resolve(__dirname, '../functions/src/portfolioBackend.ts'), 'utf8');
  assert(!backendCode.includes('firebase.storage'), 'portfolioBackend does not use firebase.storage');
  assert(!backendCode.includes('bucket.upload'), 'portfolioBackend contains zero storage bucket uploads');
  assert(!backendCode.includes('.collection(\'client_projects\').set'), 'portfolioBackend does not write to Firestore client_projects');
  assert(!backendCode.includes('.collection(\'client_projects\').add'), 'portfolioBackend does not mirror documents into Firestore');

  // Inspect frontend clientsData.ts
  const frontendCode = fs.readFileSync(path.resolve(__dirname, '../src/lib/clientsData.ts'), 'utf8');
  assert(!frontendCode.includes('collection(db,'), 'clientsData.ts does not subscribe to Firestore client_projects');
  assert(!frontendCode.includes('onSnapshot'), 'clientsData.ts does not use onSnapshot Firestore listeners');

  // -------------------------------------------------------------------------
  // TEST 6: Scenario E - Latency & Cache Performance
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 6: Scenario E - Delay & Response Latency ---');
  const t0 = Date.now();
  const cachedCall = await phase2Catalog;
  const memT0 = Date.now();
  const fastResponse = await testService.getCatalog(false); // from in-memory cache
  const memT1 = Date.now();
  const cacheLatencyMs = memT1 - memT0;

  console.log(`  Cached in-memory catalog response time: ${cacheLatencyMs}ms`);
  assert(fastResponse.source === 'cache', `Catalog served from cache (got ${fastResponse.source})`);
  assert(cacheLatencyMs < 20, `In-memory cache delivers catalog in < 20ms (got ${cacheLatencyMs}ms)`);

  console.log('\n================================================================');
  console.log(`VERIFICATION SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('================================================================');
}

runTestSuite().catch(err => {
  console.error('\nVerification failed with exception:', err);
  process.exit(1);
});
