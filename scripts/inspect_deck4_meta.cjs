const fs = require('fs');

const buf = fs.readFileSync('C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba\\deck4.pdf');
const content = buf.toString('latin1');

// Extract /Title if any
const titleMatch = content.match(/\/Title\s*\(([^)]+)\)/i) || content.match(/\/Title\s*<([^>]+)>/i);
console.log('Title in PDF metadata:', titleMatch ? titleMatch[1] : 'None');

// Count /Type /Page
const pages = (content.match(/\/Type\s*\/Page\b/g) || []).length;
console.log('Exact Page count:', pages);

// Check /Count in /Pages
const countMatch = content.match(/\/Type\s*\/Pages[^>]*\/Count\s+(\d+)/);
console.log('Pages count in catalog:', countMatch ? countMatch[1] : 'None');
