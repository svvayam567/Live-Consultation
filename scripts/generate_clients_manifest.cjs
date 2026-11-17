const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const clientsDir = path.join(projectRoot, 'public/assets/clients');
const csvPath = path.join(__dirname, 'customer_list.csv');
const oldManifestPath = path.join(projectRoot, 'public/assets/clients_manifest.json');

const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg', '.bmp']);

function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i+1] === '"') {
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

// 1. Parse spreadsheet
const sheetCompact = [];
const sheetMedium = [];
const sheetGrand = [];

if (fs.existsSync(csvPath)) {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split(/\r?\n/).filter(l => l.trim().length > 0);
  const rows = lines.map(parseCSVLine);
  for (let r = 2; r < rows.length; r++) {
    const row = rows[r];
    if (row[0]) sheetCompact.push({ name: row[0].trim(), city: (row[1] || '').trim(), size: (row[2] || '').trim() });
    if (row[3]) sheetMedium.push({ name: row[3].trim(), city: (row[4] || '').trim(), size: (row[5] || '').trim() });
    if (row[6]) sheetGrand.push({ name: row[6].trim(), city: (row[7] || '').trim(), size: (row[8] || '').trim() });
  }
}

// 2. Read existing manifest
let oldProjects = [];
if (fs.existsSync(oldManifestPath)) {
  try {
    oldProjects = JSON.parse(fs.readFileSync(oldManifestPath, 'utf8'));
  } catch (e) {
    console.warn('Could not parse old manifest:', e);
  }
}

function normalizeKey(s) {
  return (s || '').toLowerCase()
    .replace(/^(mr\.|mrs\.|ms\.|dr\.|mr|mrs|ms|dr)\s*/i, '')
    .replace(/\s+(chennai|anantapur|sanctuary|sanctum|thane)$/i, '')
    .replace(/[^a-z0-9]/g, '');
}

const oldProjectsMap = {};
oldProjects.forEach(p => {
  oldProjectsMap[normalizeKey(p.folder)] = p;
  oldProjectsMap[p.id] = p;
});
if (oldProjectsMap['sujana']) oldProjectsMap['sujanareddy'] = oldProjectsMap['sujana'];
if (oldProjectsMap['nagesh']) oldProjectsMap['nageshchidambaramurthy'] = oldProjectsMap['nagesh'];

// Stage classification
function classifyImage(relPath) {
  const normalized = relPath.replace(/\\/g, '/');
  const parts = normalized.split('/');
  const fileName = parts[parts.length - 1];
  const fileStem = path.parse(fileName).name.toLowerCase();
  const dirName = parts.length > 1 ? parts[0].toLowerCase() : '';

  if (dirName) {
    if (dirName.includes('overview') || dirName.startsWith('01_overview')) return { stage: 1, stageKey: 'overview', stageName: 'Project Overview' };
    if (dirName.includes('requirement') || dirName.includes('site') || dirName.includes('survey') || dirName.includes('visit') || dirName.includes('dimension')) {
      return { stage: 2, stageKey: 'requirement', stageName: 'Client Requirement & Site Survey' };
    }
    if (dirName.includes('cad') || dirName.includes('blueprint') || dirName.includes('2d')) {
      return { stage: 4, stageKey: 'cad', stageName: '2D CAD Working Blueprint' };
    }
    if (dirName.includes('concept') || dirName.includes('sketch') || dirName.includes('design') || dirName.includes('layout') || dirName.includes('3d') || dirName.includes('render')) {
      return { stage: 3, stageKey: 'concept', stageName: 'Concept & Design' };
    }
    if (dirName.includes('manufactur') || dirName.includes('factory')) {
      return { stage: 5, stageKey: 'manufacturing', stageName: 'Manufacturing' };
    }
    if (dirName.includes('install')) {
      return { stage: 6, stageKey: 'installation', stageName: 'Installation' };
    }
    if (dirName.includes('final') || dirName.includes('complet')) {
      return { stage: 7, stageKey: 'final', stageName: 'Final & Completed' };
    }
  }

  if (fileStem.includes('overview') || fileStem.startsWith('01_overview') || fileStem === 'hero' || fileStem === 'thumbnail') {
    return { stage: 1, stageKey: 'overview', stageName: 'Project Overview' };
  }
  if (fileStem.includes('requirement') || fileStem.includes('site') || fileStem.includes('survey') || fileStem.includes('visit') || fileStem.includes('dimension')) {
    return { stage: 2, stageKey: 'requirement', stageName: 'Client Requirement & Site Survey' };
  }
  if (fileStem.includes('cad') || fileStem.includes('blueprint') || fileStem.includes('2d')) {
    return { stage: 4, stageKey: 'cad', stageName: '2D CAD Working Blueprint' };
  }
  if (fileStem.includes('concept') || fileStem.includes('sketch') || fileStem.includes('design') || fileStem.includes('layout') || fileStem.includes('3d') || fileStem.includes('render')) {
    return { stage: 3, stageKey: 'concept', stageName: 'Concept & Design' };
  }
  if (fileStem.includes('manufactur') || fileStem.includes('factory')) {
    return { stage: 5, stageKey: 'manufacturing', stageName: 'Manufacturing' };
  }
  if (fileStem.includes('install')) {
    return { stage: 6, stageKey: 'installation', stageName: 'Installation' };
  }
  if (fileStem.includes('final') || fileStem.includes('complet')) {
    return { stage: 7, stageKey: 'final', stageName: 'Final & Completed' };
  }

  return { stage: 8, stageKey: 'additional', stageName: 'Additional Images' };
}

function scanProjectImages(projDir, categoryFolder, projectFolderName) {
  const discovered = [];

  function recurse(currentDir, relPrefix) {
    if (!fs.existsSync(currentDir)) return;
    const items = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const item of items) {
      if (item.name.toLowerCase() === 'desktop.ini' || item.name.startsWith('.') || item.name.endsWith('.tmp')) continue;
      const fullPath = path.join(currentDir, item.name);
      const relPath = relPrefix ? `${relPrefix}/${item.name}` : item.name;
      if (item.isDirectory()) {
        recurse(fullPath, relPath);
      } else {
        const ext = path.extname(item.name).toLowerCase();
        if (imageExts.has(ext)) {
          const info = classifyImage(relPath);
          const publicUrl = `assets/clients/${categoryFolder}/${projectFolderName}/${relPath.replace(/\\/g, '/')}`;
          discovered.push({
            publicUrl,
            relPath: relPath.replace(/\\/g, '/'),
            fileName: item.name,
            fileStem: path.parse(item.name).name,
            ext,
            stage: info.stage,
            stageKey: info.stageKey,
            stageName: info.stageName
          });
        }
      }
    }
  }

  recurse(projDir, '');

  discovered.sort((a, b) => {
    const aStem = path.parse(a.fileName).name.toLowerCase();
    const bStem = path.parse(b.fileName).name.toLowerCase();
    const aIsOverview = aStem === 'overview';
    const bIsOverview = bStem === 'overview';
    if (aIsOverview !== bIsOverview) return bIsOverview ? 1 : -1;

    if (a.stage !== b.stage) return a.stage - b.stage;
    return naturalCompare(a.relPath, b.relPath);
  });

  return discovered;
}

function pickThumbnail(images) {
  if (!images || images.length === 0) return { heroUrl: '', isExactOverview: false };

  const exactOverview = images.filter(img => {
    const stem = path.parse(img.fileName).name.toLowerCase();
    return stem === 'overview';
  });

  if (exactOverview.length > 0) {
    exactOverview.sort((a, b) => {
      const aIsRoot = !a.relPath.includes('/') && !a.relPath.includes('\\');
      const bIsRoot = !b.relPath.includes('/') && !b.relPath.includes('\\');
      if (aIsRoot !== bIsRoot) return bIsRoot ? 1 : -1;
      return naturalCompare(a.relPath, b.relPath);
    });
    return { heroUrl: exactOverview[0].publicUrl, isExactOverview: true };
  }

  return { heroUrl: images[0].publicUrl, isExactOverview: false };
}

// Priority folder orders requested by Svvayam Live Consultation
const categoryPriorityOrders = {
  COMPACT: [
    'Mr. Ram M Chennai',      // 1. Mr. Ram M, Chennai
    'Mr. Rishab Bafna',       // 2. Mr. Rishabh Bafna
    // 'Miss S.S.V' -> Unresolved; reported in summary
    'Ms. Manasa Kuncham',     // 4. Miss Manasa Kuncham
    'Ms. Sujana Reddy'        // 5. Miss Sujana Reddy
  ],
  GRAND: [
    'Dr. Arun Pari',          // 1. Doctor Arun Pari
    'Dr. Chidananda',         // 2. Doctor Chidananda
    'Mr. Atul Mehotra',       // 3. Mr. Atul Mehotra
    'Mr. Chetan Thane',       // 4. Mr. Chetan Tane
    'Mr. Nikhil',             // 5. Mr. Nikhil
    'Mr. Rahul Sanctum',      // 6. Mr. Rahul Sanctum
    'Mr. Rajasekhar M',       // 7. Mr. Rajshekar M
    'Mr. Rakesh Katkar',      // 8. Mr. Rakesh Kutkar
    'Mr. Ravindra',           // 9. Mr. Ravindra
    'Mr. Vishnu Sanctuary',   // 10. Mr. Vishnu Sanctuary
    'Ms. vaishali',           // 11. Mr. Vaishali
    'Ms.Gayatri Pal'          // 12. Miss Gayathri Pal
  ],
  MEDIUM: [
    'Dr. Sanjay',                 // 1. Dr. Sanjay
    'Mr. Amol Khavaskar',         // 2. Mr. Amol Khavaskar
    'Mr. Anil N',                 // 3. Mr. Anil N
    'Mr. Arjun',                  // 4. Mr. Arjun
    'Mr. Dnyaneshwar',            // 5. Mr. Dyaneshwar
    'Mr. Hari Datla',             // 6. Mr. Haridattla
    'Mr. Kalyan sydney',          // 7. Mr. Kalyan Sydney
    'Mr. Karthik',                // 8. Mr. Karthik
    'Mr. Madhava N',              // 9. Mr. Madhava Y N
    'Mr. Nagesh Chidambaramurthy',// 10. Mr. Nagesh Chidambara Murti
    'Mr. Nitesh Panda',           // 11. Mr. Nitesh Panda
    'Mr. Pradeep Reddy',          // 12. Mr. Pradeep Reddy
    'Mr. Raghavendra GP',         // 13. Mr. Raghavendra GP
    'Mr. Rajasekhar',             // 14. Mr. Rajshekar
    'Mr. Rajkumar Subramanian',   // 15. Mr. Rajkumar Subramanyan
    'Mr. Rakesh Chauhan',         // 16. Mr. Rakesh Chouhan
    'Mr. Ravi Reddy',             // 17. Mr. Ravi Reddy
    'Mr. Sandeep de',             // 18. Mr. Sandeep D. E
    'Mr. Sanjay Kumar',           // 19. Mr. Sanjay Kumar
    'Mr. T N Shenoy',             // 20. Mr. T. N. Shenoy
    'Mr. Umesh Wadayar',          // 21. Mr. Umesh Vadayar
    'Mr. Yuva Balakumaran',       // 22. Mr. Yuva Balakumaran
    'Mr.Shyam Chakravarthy'       // 23. Mr. Shyam Chakravarti
  ]
};

// Comprehensive naming dictionary based strictly on:
// 1. Folder identity
// 2. Clear surname -> Mr. [Surname] [Descriptor] (or Ms./Mrs./Dr. [Surname] [Descriptor])
// 3. No clear surname -> [Actual Name] [Descriptor] (do not invent surnames or treat initials/city/material as surname)
// 4. Allowed descriptors: Temple, Sanctum, Mandir, Puja Room, Puja Unit, Puja Door, Puja Entrance
// 5. Existing verified metadata / asset evidence prioritized; fallback Temple.
const canonicalProjectNames = {
  // === COMPACT (19 projects) ===
  'Mr. Girish Rao': 'Mr. Rao Temple',
  'Mr. Manam D': 'Mr. Manam D Temple',
  'Mr. Praveen dyta': 'Mr. Dyta Temple',
  'Mr. Ram M Chennai': 'Mr. Ram M Sanctum',
  'Mr. Ranachandra': 'Mr. Ranachandra Temple',
  'Mr. Rishab Bafna': 'Mr. Bafna Sanctum',
  'Mr. Sachin patil': 'Mr. Patil Temple',
  'Mr. Satish Pradhan': 'Mr. Pradhan Temple',
  'Mr. Shadakshari shala': 'Mr. Shadakshari Shala Temple',
  'Mr. Sudarshan Patil': 'Mr. Patil Mandir',
  'Ms yashaswini': 'Ms. Yashaswini Temple',
  'Ms. Deepthi Kunchey': 'Ms. Kunchey Sanctum',
  'Ms. Mala Sharma': 'Mrs. Sharma Temple',
  'Ms. Manasa Kuncham': 'Ms. Kunchum Mandir',
  'Ms. Netra': 'Ms. Netra Mandir',
  'Ms. Raksha': 'Ms. Raksha Temple',
  'Ms. Snehadeepti': 'Ms. Snehadeepti Mandir',
  'Ms. Sujana Reddy': 'Ms. Reddy Mandir',
  'Ms. Yogalakshmi': 'Ms. Yogalakshmi Sanctum',

  // === MEDIUM (47 projects) ===
  'Dr. Sanjay': 'Dr. Sanjay Temple',
  'Mr. Amol Khavaskar': 'Mr. Khavaskar Temple',
  'Mr. Anil N': 'Mr. Anil N Temple',
  'Mr. Arjun': 'Mr. Arjun Temple',
  'Mr. Dnyaneshwar': 'Mr. Dnyaneshwar Temple',
  'Mr. Hari Datla': 'Mr. Datla Temple',
  'Mr. Kalyan sydney': 'Mr. Kalyan Temple',
  'Mr. Karthik': 'Mr. Karthik Sanctum',
  'Mr. Karthikeyan': 'Mr. Karthikeyan Temple',
  'Mr. Kevin': 'Mr. Kevin Temple',
  'Mr. Kiran': 'Mr. Kiran Temple',
  'Mr. Madhava N': 'Mr. Madhava N Temple',
  'Mr. Nagesh Chidambaramurthy': 'Mr. Chidambaramurthy Mandir',
  'Mr. Nakul shah': 'Mr. Shah Temple',
  'Mr. Nitesh Panda': 'Mr. Panda Sanctum',
  'Mr. Pradeep Reddy': 'Mr. Reddy Mandir',
  'Mr. Raghavendra GP': 'Mr. Raghavendra GP Temple',
  'Mr. Rajasekhar': 'Mr. Rajasekhar Sanctum',
  'Mr. Rajkumar Subramanian': 'Mr. Subramanian Temple',
  'Mr. Rakesh Chauhan': 'Mr. Chauhan Temple',
  'Mr. Rakesh Reddy': 'Mr. Reddy Mandir',
  'Mr. Ravi Reddy': 'Mr. Reddy Temple',
  'Mr. Sandeep de': 'Mr. De Temple',
  'Mr. Sanjay Kumar': 'Mr. Kumar Temple',
  'Mr. Shankarnarayan': 'Mr. Shankarnarayan Sanctum',
  'Mr. Suman': 'Mr. Suman Temple',
  'Mr. Sunil Vitkar': 'Mr. Vitkar Temple',
  'Mr. T N Shenoy': 'Mr. Shenoy Sanctum',
  'Mr. Umesh Wadayar': 'Mr. Wadayar Sanctum',
  'Mr. Vasantha Aditya': 'Mr. Aditya Mandir',
  'Mr. Vikranth': 'Mr. Vikranth Temple',
  'Mr. Vinay Deep': 'Mr. Deep Temple',
  'Mr. Yuva Balakumaran': 'Mr. Balakumaran Mandir',
  'Mr.Shyam Chakravarthy': 'Mr. Chakravarthy Temple',
  'Mrs. Rekha Lokeshwar': 'Mrs. Lokeshwar Mandir',
  'Ms. Dhana Arun': 'Ms. Arun Temple',
  'Ms. Gopika': 'Ms. Gopika Temple',
  'Ms. Kavitha Hegde': 'Ms. Hegde Temple',
  'Ms. Priyanki Gupta': 'Ms. Gupta Sanctum',
  'Ms. Sahana srihari': 'Ms. Srihari Temple',
  'Ms. Santhi Koneru': 'Ms. Koneru Temple',
  'Ms. Saritha reddy': 'Ms. Reddy Temple',
  'Ms. Sonia Reddy': 'Ms. Reddy Sanctum',
  'Ms. Sumita Mishra': 'Ms. Mishra Temple',
  'Ms. Suneetha Nanda Gopal': 'Ms. Gopal Temple',
  'Ms. Vinutha Naik': 'Ms. Naik Mandir',
  'Ms. Yashwitha reddy': 'Ms. Reddy Temple',

  // === GRAND (24 projects) ===
  'Dr. Arun Pari': 'Dr. Pari Sanctum',
  'Dr. Chidananda': 'Dr. Chidananda Sanctum',
  'Mr. Anoop Vaidya': 'Mr. Vaidya Temple',
  'Mr. Atul Mehotra': 'Mr. Mehrotra Sanctum',
  'Mr. Chetan Thane': 'Mr. Chetan Mandir',
  'Mr. Kalyan': 'Mr. Kalyan Temple',
  'Mr. Nikhil': 'Mr. Nikhil Temple',
  'Mr. Rahul Sanctum': 'Mr. Rahul Sanctum',
  'Mr. Rajasekhar M': 'Mr. Rajasekhar M Temple',
  'Mr. Rajesh Stone': 'Mr. Rajesh Temple',
  'Mr. Rakesh Katkar': 'Mr. Katkar Temple',
  'Mr. Ravindra': 'Mr. Ravindra Temple',
  'Mr. Shabari Girish': 'Mr. Girish Temple',
  'Mr. Srivathsan Doraiswamy': 'Mr. Doraiswamy Temple',
  'Mr. Umesh Jethwa': 'Mr. Jethwa Sanctum',
  'Mr. Vishnu Sanctuary': 'Mr. Vishnu Sanctum',
  'Ms. Aditi Pratap': 'Ms. Pratap Temple',
  'Ms. Gayatri Barath': 'Ms. Barath Temple',
  'Ms. Kavya Sundaraja': 'Ms. Sundaraja Temple',
  'Ms. Lakshmi': 'Ms. Lakshmi Temple',
  'Ms. Rutuja Pawar': 'Ms. Pawar Temple',
  'Ms. Tulasi': 'Ms. Tulasi Sanctum',
  'Ms. vaishali': 'Ms. Vaishali Temple',
  'Ms.Gayatri Pal': 'Ms. Pal Sanctum'
};

function buildProjectId(folderName, oldProject, usedIds) {
  if (oldProject && oldProject.id && !usedIds.has(oldProject.id)) {
    usedIds.add(oldProject.id);
    return oldProject.id;
  }
  const base = folderName.toLowerCase()
    .replace(/^(mr\.|mrs\.|ms\.|dr\.|mr|mrs|ms|dr)\s*/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  let id = base || 'project';
  let counter = 1;
  while (usedIds.has(id)) {
    id = `${base}-${counter++}`;
  }
  usedIds.add(id);
  return id;
}

// 3. Process categories
const categoriesConfig = [
  { folderName: 'COMPACT', label: 'Compact', sheetList: sheetCompact },
  { folderName: 'MEDIUM', label: 'Medium', sheetList: sheetMedium },
  { folderName: 'GRAND', label: 'Grand', sheetList: sheetGrand }
];

const allProjects = [];
const usedIds = new Set();
const unmatchedSpreadsheet = [];
const unmatchedFolders = [];
const missingOverviewProjects = [];
const emptyProjects = [];

categoriesConfig.forEach(cat => {
  const catPath = path.join(clientsDir, cat.folderName);
  if (!fs.existsSync(catPath)) return;

  const folders = fs.readdirSync(catPath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort(naturalCompare);

  const usedSheetIndices = new Set();
  const categoryProjects = [];

  folders.forEach(folderName => {
    const projDir = path.join(catPath, folderName);
    const normF = normalizeKey(folderName);

    // Match with spreadsheet row
    let sheetMatch = null;
    let matchedSheetIdx = -1;

    for (let i = 0; i < cat.sheetList.length; i++) {
      if (usedSheetIndices.has(i)) continue;
      const normS = normalizeKey(cat.sheetList[i].name);
      if (normF === normS) {
        matchedSheetIdx = i;
        break;
      }
    }
    if (matchedSheetIdx === -1) {
      for (let i = 0; i < cat.sheetList.length; i++) {
        if (usedSheetIndices.has(i)) continue;
        const normS = normalizeKey(cat.sheetList[i].name);
        if (normF.startsWith(normS) || normS.startsWith(normF)) {
          matchedSheetIdx = i;
          break;
        }
      }
    }
    if (matchedSheetIdx === -1) {
      if (folderName === 'Ms yashaswini') {
        matchedSheetIdx = cat.sheetList.findIndex(s => s.name === 'Ms. Yasashwini');
      } else if (folderName === 'Ms. Manasa Kuncham') {
        matchedSheetIdx = cat.sheetList.findIndex(s => s.name === 'Ms. Manasa Kunchum');
      } else if (folderName === 'Mr. Rajkumar Subramanian') {
        matchedSheetIdx = cat.sheetList.findIndex(s => s.name === 'Mr. Rakjkumar Subramanian');
      } else if (folderName === 'Mr. Atul Mehotra') {
        matchedSheetIdx = cat.sheetList.findIndex(s => s.name === 'Mr. Athul Mehrotra');
      }
    }

    if (matchedSheetIdx !== -1) {
      usedSheetIndices.add(matchedSheetIdx);
      sheetMatch = cat.sheetList[matchedSheetIdx];
    } else {
      unmatchedFolders.push({ category: cat.label, folder: folderName });
    }

    // Match with old project record to preserve IDs, materials, types
    const oldP = oldProjectsMap[normF] || oldProjectsMap[normalizeKey(folderName.replace(/\s+(chennai|anantapur|sanctuary|sanctum|thane|sydney)$/i, ''))];

    // Scan images
    const discoveredImages = scanProjectImages(projDir, cat.folderName, folderName);
    const thumbResult = pickThumbnail(discoveredImages);
    const hasOverview = Boolean(thumbResult.isExactOverview);
    const heroImg = thumbResult.heroUrl;
    const overviewImg = hasOverview ? heroImg : null;
    const imagesList = discoveredImages.map(img => img.publicUrl);

    if (discoveredImages.length > 0 && !hasOverview) {
      missingOverviewProjects.push({ category: cat.label, folder: folderName, fallbackImg: heroImg });
    }
    if (discoveredImages.length === 0) {
      emptyProjects.push({ category: cat.label, folder: folderName });
    }

    // Group images into stages for backwards compatibility
    const stageMap = {};
    discoveredImages.forEach(img => {
      if (!stageMap[img.stageKey]) {
        stageMap[img.stageKey] = {
          stage_key: img.stageKey,
          title: img.stageName,
          dir_name: img.stageKey,
          images: [],
          count: 0
        };
      }
      stageMap[img.stageKey].images.push(img.publicUrl);
      stageMap[img.stageKey].count++;
    });
    const stages = Object.values(stageMap);

    const id = buildProjectId(folderName, oldP, usedIds);
    const name = canonicalProjectNames[folderName] || `${folderName} Temple`;
    
    // Metadata: only from spreadsheet!
    const location = sheetMatch ? sheetMatch.city : (oldP ? oldP.location : '');
    const size = sheetMatch ? sheetMatch.size : (oldP ? oldP.size : '');
    const material = oldP ? oldP.material : '';
    const type = oldP ? oldP.type : '';
    const desc = oldP ? oldP.desc : `A bespoke ${cat.label.toLowerCase()} sanctum architecture by Svvayam.`;

    categoryProjects.push({
      id,
      name,
      folder: folderName,
      sizeLabel: cat.label,
      size: (oldP && oldP.size) ? oldP.size : size,
      dimensions: (oldP && oldP.dimensions) ? oldP.dimensions : (oldP && oldP.size ? oldP.size : size),
      designDetail: oldP ? oldP.designDetail : undefined,
      structureType: oldP ? oldP.structureType : undefined,
      sheetProjectId: oldP ? oldP.sheetProjectId : undefined,
      widthCategory: oldP ? oldP.widthCategory : undefined,
      material,
      location,
      type,
      desc,
      status: oldP ? oldP.status : 'completed',
      statusCode: oldP ? oldP.statusCode : 'COMPLETED',
      hasGreenDot: oldP ? oldP.hasGreenDot : true,
      hasOverview,
      overviewImg,
      heroImg,
      images: imagesList,
      stages
    });
  });

  // Track unmatched sheet records
  cat.sheetList.forEach((s, idx) => {
    if (!usedSheetIndices.has(idx)) {
      unmatchedSpreadsheet.push({ category: cat.label, name: s.name });
    }
  });

  // Primary Sorting Rule (per category):
  // 1. Projects with valid dedicated overview image appear first
  // 2. Projects without one appear afterward
  // 3. Within each group, preserve current relative order
  const catWithOverview = categoryProjects.filter(p => p.hasOverview);
  const catWithoutOverview = categoryProjects.filter(p => !p.hasOverview);
  const sortedCategoryProjects = [...catWithOverview, ...catWithoutOverview];

  allProjects.push(...sortedCategoryProjects);
});

// Primary Sorting Rule across entire dataset for 'All':
// In All, apply the rule across the entire dataset rather than simply concatenating category lists.
const allWithOverview = allProjects.filter(p => p.hasOverview);
const allWithoutOverview = allProjects.filter(p => !p.hasOverview);
const finalAllProjects = [...allWithOverview, ...allWithoutOverview];

console.log('=== Generation Summary ===');
console.log('Total projects generated:', allProjects.length);
console.log('Categories count:', {
  Compact: allProjects.filter(p => p.sizeLabel === 'Compact').length,
  Medium: allProjects.filter(p => p.sizeLabel === 'Medium').length,
  Grand: allProjects.filter(p => p.sizeLabel === 'Grand').length
});
console.log('Projects with hero image:', allProjects.filter(p => !!p.heroImg).length);
console.log('Empty projects (0 images):', emptyProjects.length);
console.log('Projects with exact overview image:', allProjects.filter(p => !!p.heroImg).length - missingOverviewProjects.length);
console.log('Projects using fallback gallery image (no stem=overview):', missingOverviewProjects.length);
console.log('Sample top 5 per category:');
['Compact', 'Grand', 'Medium'].forEach(c => {
  console.log(`-- ${c} --`);
  allProjects.filter(p => p.sizeLabel === c).slice(0, 5).forEach((p, i) => {
    console.log(`   ${i + 1}. [${p.folder}] -> "${p.name}" (hero: ${p.heroImg ? 'YES' : 'NO'}, images: ${p.images.length})`);
  });
});

// Write JSON and JS manifests (using finalAllProjects sorted by overview-first rule)
const jsonStr = JSON.stringify(finalAllProjects, null, 2);
fs.writeFileSync(oldManifestPath, jsonStr, 'utf8');

const jsPath = path.join(projectRoot, 'public/assets/clients_manifest.js');
const jsStr = `window.SVVAYAM_CLIENTS_DATA = ${jsonStr};\n`;
fs.writeFileSync(jsPath, jsStr, 'utf8');

const distAssets = path.join(projectRoot, 'dist/assets');
if (fs.existsSync(distAssets)) {
  fs.writeFileSync(path.join(distAssets, 'clients_manifest.json'), jsonStr, 'utf8');
  fs.writeFileSync(path.join(distAssets, 'clients_manifest.js'), jsStr, 'utf8');
}

console.log('Manifests successfully written to public/assets/ (and dist/assets/)');
