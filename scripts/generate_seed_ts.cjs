const fs = require('fs');

const index = JSON.parse(fs.readFileSync('E:/svvayam/svvayam/workers_preview/drive_folder_index.json', 'utf8'));
const analysis = JSON.parse(fs.readFileSync('E:/svvayam/svvayam/workers_preview/folder_match_analysis.json', 'utf8'));

// Build mapping by sheetProjectId and by folderName
const seedBySheetId = {};
const seedByFolderName = {};

analysis.forEach(a => {
  const item = {
    folderId: a.folderId,
    folderName: a.folderName,
    coverId: a.hasOverview ? a.overviewId : (a.sampleImages?.[0] ? a.sampleImages[0] : null), // we will get actual coverId
    hasDedicatedOverview: a.hasOverview,
    imageCount: a.totalImages
  };
});

// Use initialCoverIndex.js from workers_preview
const initialCoverContent = fs.readFileSync('E:/svvayam/svvayam/workers_preview/src/initialCoverIndex.js', 'utf8');

// We can export PROJECT_COVER_MAP
const tsContent = `// Auto-generated complete Drive folder and cover seed for all 70 Drive folders
export interface FolderCoverSeed {
  folderId: string;
  folderName: string;
  coverId: string | null;
  coverVersion: string;
  coverName: string | null;
  hasDedicatedOverview: boolean;
  imageCount: number;
}

${initialCoverContent.replace('export const INITIAL_COVER_INDEX', 'export const PROJECT_COVER_MAP: Record<string, FolderCoverSeed>')}
`;

fs.writeFileSync('E:/svvayam/svvayam/WEb/svvayam-live-consultation/src/lib/projectCoverSeed.ts', tsContent);
console.log('Generated src/lib/projectCoverSeed.ts successfully!');
