const https = require('https');

const files = [
  { name: 'Deck 1', id: '1koaMZJizLUmIjonj-Cx3ySB8dHoUci27' },
  { name: 'Deck 2', id: '106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw' },
  { name: 'Deck 3', id: '1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo' }
];

files.forEach(({ name, id }) => {
  const url = `https://drive.google.com/file/d/${id}/preview`;
  https.get(url, (res) => {
    console.log(name, `(${id}):`, 'status code', res.statusCode, 'x-frame-options:', res.headers['x-frame-options']);
  }).on('error', (e) => console.log(name, 'error:', e.message));
});
