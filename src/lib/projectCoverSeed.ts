// Auto-generated seed file for Svvayam Project Explorer
// 73 client folders, overview-first sorting, continuous gallery with photo + video sync

export interface GalleryMediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  mimeType: string;
  url: string;
  isSubfolder?: boolean;
  subfolder?: string | null;
}

export interface FolderCoverSeed {
  folderId: string;
  folderName: string;
  sheetProjectId: string | null;
  customerName: string;
  location?: string;
  structureType?: string;
  designDetail?: string;
  dimensions?: string;
  coverId: string | null;
  coverUrl: string | null;
  hasDedicatedOverview: boolean;
  priority?: 1 | 2 | 3;
  photoCount?: number;
  imageCount: number;
  videoCount: number;
  totalMediaCount: number;
  accessError?: string | null;
  media: GalleryMediaItem[];
  galleryUrls: string[];
}

export const PROJECT_COVER_MAP: Record<string, FolderCoverSeed> = {
  "1H5MO3GNEoDF-3BvFw8tKi1vB0pVkhJ21": {
    "folderId": "1H5MO3GNEoDF-3BvFw8tKi1vB0pVkhJ21",
    "folderName": "Mr.Yuva Balakumaran",
    "sheetProjectId": "SV-021",
    "customerName": "Mr. Yuva Balakumaran",
    "location": "Erode",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1fIak8gvWYnSnH2gCvNkztCh4qto2z_it",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIak8gvWYnSnH2gCvNkztCh4qto2z_it&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1fIak8gvWYnSnH2gCvNkztCh4qto2z_it",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIak8gvWYnSnH2gCvNkztCh4qto2z_it&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Mjr01EXHlcQoNkLYTYEbmgRRl2Ao7UTu",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Mjr01EXHlcQoNkLYTYEbmgRRl2Ao7UTu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xy0p-02EtF02FdFTeUCG5mBwdI6YE46m",
        "name": "1a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xy0p-02EtF02FdFTeUCG5mBwdI6YE46m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1TBTz-plHI8I0uoTxUE6j-Laf6A_eS7e0",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1TBTz-plHI8I0uoTxUE6j-Laf6A_eS7e0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sSgoEJd9UkDKoq2dzw0w4NacR2hHdnkl",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sSgoEJd9UkDKoq2dzw0w4NacR2hHdnkl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1IJiNoamBlLCWHsmLtHaN1rvqZy65yxw5",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IJiNoamBlLCWHsmLtHaN1rvqZy65yxw5&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIak8gvWYnSnH2gCvNkztCh4qto2z_it&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Mjr01EXHlcQoNkLYTYEbmgRRl2Ao7UTu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xy0p-02EtF02FdFTeUCG5mBwdI6YE46m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1TBTz-plHI8I0uoTxUE6j-Laf6A_eS7e0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sSgoEJd9UkDKoq2dzw0w4NacR2hHdnkl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IJiNoamBlLCWHsmLtHaN1rvqZy65yxw5&v=2"
    ]
  },
  "sv-021": {
    "folderId": "1H5MO3GNEoDF-3BvFw8tKi1vB0pVkhJ21",
    "folderName": "Mr.Yuva Balakumaran",
    "sheetProjectId": "SV-021",
    "customerName": "Mr. Yuva Balakumaran",
    "location": "Erode",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1fIak8gvWYnSnH2gCvNkztCh4qto2z_it",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIak8gvWYnSnH2gCvNkztCh4qto2z_it&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1fIak8gvWYnSnH2gCvNkztCh4qto2z_it",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIak8gvWYnSnH2gCvNkztCh4qto2z_it&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Mjr01EXHlcQoNkLYTYEbmgRRl2Ao7UTu",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Mjr01EXHlcQoNkLYTYEbmgRRl2Ao7UTu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xy0p-02EtF02FdFTeUCG5mBwdI6YE46m",
        "name": "1a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xy0p-02EtF02FdFTeUCG5mBwdI6YE46m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1TBTz-plHI8I0uoTxUE6j-Laf6A_eS7e0",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1TBTz-plHI8I0uoTxUE6j-Laf6A_eS7e0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sSgoEJd9UkDKoq2dzw0w4NacR2hHdnkl",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sSgoEJd9UkDKoq2dzw0w4NacR2hHdnkl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1IJiNoamBlLCWHsmLtHaN1rvqZy65yxw5",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IJiNoamBlLCWHsmLtHaN1rvqZy65yxw5&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIak8gvWYnSnH2gCvNkztCh4qto2z_it&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Mjr01EXHlcQoNkLYTYEbmgRRl2Ao7UTu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xy0p-02EtF02FdFTeUCG5mBwdI6YE46m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1TBTz-plHI8I0uoTxUE6j-Laf6A_eS7e0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sSgoEJd9UkDKoq2dzw0w4NacR2hHdnkl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IJiNoamBlLCWHsmLtHaN1rvqZy65yxw5&v=2"
    ]
  },
  "1EnxAX-GcNHZcFuEgJNkq5blVXMlif6Ip": {
    "folderId": "1EnxAX-GcNHZcFuEgJNkq5blVXMlif6Ip",
    "folderName": "Mr. Rajasekhar",
    "sheetProjectId": "SV-033",
    "customerName": "Mr. Rajasekhar",
    "location": "Anantapur",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 9,
    "totalMediaCount": 13,
    "media": [
      {
        "id": "13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19_5m2qFpVD0w2oEd8OBPjNejR9KfwJl4",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19_5m2qFpVD0w2oEd8OBPjNejR9KfwJl4&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16udQsX9o5GlxvWoLLXRyb4mcHnnHaaZV",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16udQsX9o5GlxvWoLLXRyb4mcHnnHaaZV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1EOcqD3JD833uRGUC2QPkGKQV5TrLOy7f",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EOcqD3JD833uRGUC2QPkGKQV5TrLOy7f&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1dITCKbTc3AdegK5t_Go3FpLiyl6jQjyd",
        "name": "4.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dITCKbTc3AdegK5t_Go3FpLiyl6jQjyd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13F9dChDSPBQYsxXuC7EreW-82sGlZUqL",
        "name": "5.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13F9dChDSPBQYsxXuC7EreW-82sGlZUqL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1TAc0mtQlYG5NUlCtcZqq3NbyWfvtPdlD",
        "name": "6.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1TAc0mtQlYG5NUlCtcZqq3NbyWfvtPdlD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1dvkH_VlJlO6paBUOmVMWDHtFcKTINsiC",
        "name": "7.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dvkH_VlJlO6paBUOmVMWDHtFcKTINsiC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UGp0YRxEbB4lP7A3_5h1XX9Md8kjh1nP",
        "name": "8.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UGp0YRxEbB4lP7A3_5h1XX9Md8kjh1nP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1amXodwanzZ4YJk43n9cTiWkuHNNfi8j-",
        "name": "9.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1amXodwanzZ4YJk43n9cTiWkuHNNfi8j-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1RmEdlF_xjuXqybMgWhAN2vNe-deDhWnY",
        "name": "10.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RmEdlF_xjuXqybMgWhAN2vNe-deDhWnY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1n9BCoiUwLAnX7vkt28BiXeEmVzPWYNSY",
        "name": "11.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n9BCoiUwLAnX7vkt28BiXeEmVzPWYNSY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1H4kLY1B1I1yfW1y7GSlhkTk6m98xmZID",
        "name": "12.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1H4kLY1B1I1yfW1y7GSlhkTk6m98xmZID&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19_5m2qFpVD0w2oEd8OBPjNejR9KfwJl4&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16udQsX9o5GlxvWoLLXRyb4mcHnnHaaZV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EOcqD3JD833uRGUC2QPkGKQV5TrLOy7f&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dITCKbTc3AdegK5t_Go3FpLiyl6jQjyd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13F9dChDSPBQYsxXuC7EreW-82sGlZUqL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1TAc0mtQlYG5NUlCtcZqq3NbyWfvtPdlD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dvkH_VlJlO6paBUOmVMWDHtFcKTINsiC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UGp0YRxEbB4lP7A3_5h1XX9Md8kjh1nP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1amXodwanzZ4YJk43n9cTiWkuHNNfi8j-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RmEdlF_xjuXqybMgWhAN2vNe-deDhWnY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n9BCoiUwLAnX7vkt28BiXeEmVzPWYNSY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1H4kLY1B1I1yfW1y7GSlhkTk6m98xmZID&v=2"
    ]
  },
  "sv-033": {
    "folderId": "1EnxAX-GcNHZcFuEgJNkq5blVXMlif6Ip",
    "folderName": "Mr. Rajasekhar",
    "sheetProjectId": "SV-033",
    "customerName": "Mr. Rajasekhar",
    "location": "Anantapur",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 9,
    "totalMediaCount": 13,
    "media": [
      {
        "id": "13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19_5m2qFpVD0w2oEd8OBPjNejR9KfwJl4",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19_5m2qFpVD0w2oEd8OBPjNejR9KfwJl4&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16udQsX9o5GlxvWoLLXRyb4mcHnnHaaZV",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16udQsX9o5GlxvWoLLXRyb4mcHnnHaaZV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1EOcqD3JD833uRGUC2QPkGKQV5TrLOy7f",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EOcqD3JD833uRGUC2QPkGKQV5TrLOy7f&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1dITCKbTc3AdegK5t_Go3FpLiyl6jQjyd",
        "name": "4.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dITCKbTc3AdegK5t_Go3FpLiyl6jQjyd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13F9dChDSPBQYsxXuC7EreW-82sGlZUqL",
        "name": "5.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13F9dChDSPBQYsxXuC7EreW-82sGlZUqL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1TAc0mtQlYG5NUlCtcZqq3NbyWfvtPdlD",
        "name": "6.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1TAc0mtQlYG5NUlCtcZqq3NbyWfvtPdlD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1dvkH_VlJlO6paBUOmVMWDHtFcKTINsiC",
        "name": "7.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dvkH_VlJlO6paBUOmVMWDHtFcKTINsiC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UGp0YRxEbB4lP7A3_5h1XX9Md8kjh1nP",
        "name": "8.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UGp0YRxEbB4lP7A3_5h1XX9Md8kjh1nP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1amXodwanzZ4YJk43n9cTiWkuHNNfi8j-",
        "name": "9.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1amXodwanzZ4YJk43n9cTiWkuHNNfi8j-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1RmEdlF_xjuXqybMgWhAN2vNe-deDhWnY",
        "name": "10.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RmEdlF_xjuXqybMgWhAN2vNe-deDhWnY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1n9BCoiUwLAnX7vkt28BiXeEmVzPWYNSY",
        "name": "11.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n9BCoiUwLAnX7vkt28BiXeEmVzPWYNSY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1H4kLY1B1I1yfW1y7GSlhkTk6m98xmZID",
        "name": "12.MOV",
        "type": "video",
        "mimeType": "video/quicktime",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1H4kLY1B1I1yfW1y7GSlhkTk6m98xmZID&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WeLo_RKBqMwfcYO5G2EaeAUY1kHV8TP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19_5m2qFpVD0w2oEd8OBPjNejR9KfwJl4&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16udQsX9o5GlxvWoLLXRyb4mcHnnHaaZV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EOcqD3JD833uRGUC2QPkGKQV5TrLOy7f&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dITCKbTc3AdegK5t_Go3FpLiyl6jQjyd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13F9dChDSPBQYsxXuC7EreW-82sGlZUqL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1TAc0mtQlYG5NUlCtcZqq3NbyWfvtPdlD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dvkH_VlJlO6paBUOmVMWDHtFcKTINsiC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UGp0YRxEbB4lP7A3_5h1XX9Md8kjh1nP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1amXodwanzZ4YJk43n9cTiWkuHNNfi8j-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RmEdlF_xjuXqybMgWhAN2vNe-deDhWnY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n9BCoiUwLAnX7vkt28BiXeEmVzPWYNSY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1H4kLY1B1I1yfW1y7GSlhkTk6m98xmZID&v=2"
    ]
  },
  "17lD10QgvFAYMpRFvWs5xFwnwp_GGwqfE": {
    "folderId": "17lD10QgvFAYMpRFvWs5xFwnwp_GGwqfE",
    "folderName": "Mr.Shenoy",
    "sheetProjectId": "SV-022",
    "customerName": "Mr. T N Shenoy",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 8,
    "videoCount": 1,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1e9vqWqk_CyOP3NayJhe7x4qEqVg4RPr4",
        "name": "1a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e9vqWqk_CyOP3NayJhe7x4qEqVg4RPr4&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rEI0EOO67ml9MowPZ2QMOjxLIDxwNcgU",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rEI0EOO67ml9MowPZ2QMOjxLIDxwNcgU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1W74GGi-hcaTAw3obEaM8Z0rLUAPJfu9Y",
        "name": "2a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1W74GGi-hcaTAw3obEaM8Z0rLUAPJfu9Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sAv5WZbatJxeieHyy2Gy0y_rFPb7CT-L",
        "name": "2b.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sAv5WZbatJxeieHyy2Gy0y_rFPb7CT-L&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pcL1jpVJH0_w9ltpufNX0WGdDvvQK_Nr",
        "name": "2c.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pcL1jpVJH0_w9ltpufNX0WGdDvvQK_Nr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VOYZFHwLzA3EsrG5wS9MzqpwiN7IiY2g",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VOYZFHwLzA3EsrG5wS9MzqpwiN7IiY2g&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CMVftO_AVbcUkwqQ9Bl4B1HtAZc8_3xS",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CMVftO_AVbcUkwqQ9Bl4B1HtAZc8_3xS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1M4q7S9CS9bCW6wlrJwGNom0d0kntiN3u",
        "name": "1.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1M4q7S9CS9bCW6wlrJwGNom0d0kntiN3u&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e9vqWqk_CyOP3NayJhe7x4qEqVg4RPr4&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rEI0EOO67ml9MowPZ2QMOjxLIDxwNcgU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1W74GGi-hcaTAw3obEaM8Z0rLUAPJfu9Y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sAv5WZbatJxeieHyy2Gy0y_rFPb7CT-L&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pcL1jpVJH0_w9ltpufNX0WGdDvvQK_Nr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VOYZFHwLzA3EsrG5wS9MzqpwiN7IiY2g&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CMVftO_AVbcUkwqQ9Bl4B1HtAZc8_3xS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1M4q7S9CS9bCW6wlrJwGNom0d0kntiN3u&v=2"
    ]
  },
  "sv-022": {
    "folderId": "17lD10QgvFAYMpRFvWs5xFwnwp_GGwqfE",
    "folderName": "Mr.Shenoy",
    "sheetProjectId": "SV-022",
    "customerName": "Mr. T N Shenoy",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 8,
    "videoCount": 1,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1e9vqWqk_CyOP3NayJhe7x4qEqVg4RPr4",
        "name": "1a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e9vqWqk_CyOP3NayJhe7x4qEqVg4RPr4&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rEI0EOO67ml9MowPZ2QMOjxLIDxwNcgU",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rEI0EOO67ml9MowPZ2QMOjxLIDxwNcgU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1W74GGi-hcaTAw3obEaM8Z0rLUAPJfu9Y",
        "name": "2a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1W74GGi-hcaTAw3obEaM8Z0rLUAPJfu9Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sAv5WZbatJxeieHyy2Gy0y_rFPb7CT-L",
        "name": "2b.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sAv5WZbatJxeieHyy2Gy0y_rFPb7CT-L&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pcL1jpVJH0_w9ltpufNX0WGdDvvQK_Nr",
        "name": "2c.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pcL1jpVJH0_w9ltpufNX0WGdDvvQK_Nr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VOYZFHwLzA3EsrG5wS9MzqpwiN7IiY2g",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VOYZFHwLzA3EsrG5wS9MzqpwiN7IiY2g&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CMVftO_AVbcUkwqQ9Bl4B1HtAZc8_3xS",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CMVftO_AVbcUkwqQ9Bl4B1HtAZc8_3xS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1M4q7S9CS9bCW6wlrJwGNom0d0kntiN3u",
        "name": "1.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1M4q7S9CS9bCW6wlrJwGNom0d0kntiN3u&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1boG6HFRkcAQjw_Wth1wOiDyayRxi4uk1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e9vqWqk_CyOP3NayJhe7x4qEqVg4RPr4&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rEI0EOO67ml9MowPZ2QMOjxLIDxwNcgU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1W74GGi-hcaTAw3obEaM8Z0rLUAPJfu9Y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sAv5WZbatJxeieHyy2Gy0y_rFPb7CT-L&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pcL1jpVJH0_w9ltpufNX0WGdDvvQK_Nr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VOYZFHwLzA3EsrG5wS9MzqpwiN7IiY2g&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CMVftO_AVbcUkwqQ9Bl4B1HtAZc8_3xS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1M4q7S9CS9bCW6wlrJwGNom0d0kntiN3u&v=2"
    ]
  },
  "14syFvt22uPDan3GngEm-vbdrY7D2eRko": {
    "folderId": "14syFvt22uPDan3GngEm-vbdrY7D2eRko",
    "folderName": "Mr. Pradeep Reddy",
    "sheetProjectId": "SV-030",
    "customerName": "Mr. Pradeep Reddy",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hVat3U2xS7M0PAI8EBAq9SlyIl0qac1R",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hVat3U2xS7M0PAI8EBAq9SlyIl0qac1R&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PK0sIIuOeaVa4VhZNP2CHSCriifJryq6",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PK0sIIuOeaVa4VhZNP2CHSCriifJryq6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1QZqzx1fZkA7rehWj0xmROrkTWvELhsjw",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QZqzx1fZkA7rehWj0xmROrkTWvELhsjw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1oXFUb3n3OgEVUWpYwgXkBnG6duVTEEpM",
        "name": "3a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oXFUb3n3OgEVUWpYwgXkBnG6duVTEEpM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Kx8G1tyJlHUoG6OrsTo32ToIMCNeTd4k",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Kx8G1tyJlHUoG6OrsTo32ToIMCNeTd4k&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hVat3U2xS7M0PAI8EBAq9SlyIl0qac1R&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PK0sIIuOeaVa4VhZNP2CHSCriifJryq6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QZqzx1fZkA7rehWj0xmROrkTWvELhsjw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oXFUb3n3OgEVUWpYwgXkBnG6duVTEEpM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Kx8G1tyJlHUoG6OrsTo32ToIMCNeTd4k&v=2"
    ]
  },
  "sv-030": {
    "folderId": "14syFvt22uPDan3GngEm-vbdrY7D2eRko",
    "folderName": "Mr. Pradeep Reddy",
    "sheetProjectId": "SV-030",
    "customerName": "Mr. Pradeep Reddy",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hVat3U2xS7M0PAI8EBAq9SlyIl0qac1R",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hVat3U2xS7M0PAI8EBAq9SlyIl0qac1R&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PK0sIIuOeaVa4VhZNP2CHSCriifJryq6",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PK0sIIuOeaVa4VhZNP2CHSCriifJryq6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1QZqzx1fZkA7rehWj0xmROrkTWvELhsjw",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QZqzx1fZkA7rehWj0xmROrkTWvELhsjw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1oXFUb3n3OgEVUWpYwgXkBnG6duVTEEpM",
        "name": "3a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oXFUb3n3OgEVUWpYwgXkBnG6duVTEEpM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Kx8G1tyJlHUoG6OrsTo32ToIMCNeTd4k",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Kx8G1tyJlHUoG6OrsTo32ToIMCNeTd4k&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KaoIgd5eS3Zbypltqwv-InSWSrxBdcYE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hVat3U2xS7M0PAI8EBAq9SlyIl0qac1R&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PK0sIIuOeaVa4VhZNP2CHSCriifJryq6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QZqzx1fZkA7rehWj0xmROrkTWvELhsjw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oXFUb3n3OgEVUWpYwgXkBnG6duVTEEpM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Kx8G1tyJlHUoG6OrsTo32ToIMCNeTd4k&v=2"
    ]
  },
  "1grOBsxyQsKfQemU7E4IXWhctk_l5Wsxe": {
    "folderId": "1grOBsxyQsKfQemU7E4IXWhctk_l5Wsxe",
    "folderName": "Ms.Shraddha Vispute",
    "sheetProjectId": "SV-092",
    "customerName": "Ms.Shraddha Vispute",
    "location": "",
    "structureType": "",
    "designDetail": "",
    "dimensions": "",
    "coverId": "11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 5,
    "videoCount": 0,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13DNjK4c3RYkVCwUC5vM5zV1qNOE21Jtf",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13DNjK4c3RYkVCwUC5vM5zV1qNOE21Jtf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11FM5rZyY0mmL0gUE2SfWyB-hcOENDCnZ",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11FM5rZyY0mmL0gUE2SfWyB-hcOENDCnZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "14Z9Lda3smcNMmi4hvDC5l0De003Ml24r",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14Z9Lda3smcNMmi4hvDC5l0De003Ml24r&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KwXvGGuWCZysA2QLe_yM-vYIkqPKVrgl",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KwXvGGuWCZysA2QLe_yM-vYIkqPKVrgl&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13DNjK4c3RYkVCwUC5vM5zV1qNOE21Jtf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11FM5rZyY0mmL0gUE2SfWyB-hcOENDCnZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14Z9Lda3smcNMmi4hvDC5l0De003Ml24r&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KwXvGGuWCZysA2QLe_yM-vYIkqPKVrgl&v=2"
    ]
  },
  "sv-092": {
    "folderId": "1grOBsxyQsKfQemU7E4IXWhctk_l5Wsxe",
    "folderName": "Ms.Shraddha Vispute",
    "sheetProjectId": "SV-092",
    "customerName": "Ms.Shraddha Vispute",
    "location": "",
    "structureType": "",
    "designDetail": "",
    "dimensions": "",
    "coverId": "11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 5,
    "videoCount": 0,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13DNjK4c3RYkVCwUC5vM5zV1qNOE21Jtf",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13DNjK4c3RYkVCwUC5vM5zV1qNOE21Jtf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11FM5rZyY0mmL0gUE2SfWyB-hcOENDCnZ",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11FM5rZyY0mmL0gUE2SfWyB-hcOENDCnZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "14Z9Lda3smcNMmi4hvDC5l0De003Ml24r",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14Z9Lda3smcNMmi4hvDC5l0De003Ml24r&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KwXvGGuWCZysA2QLe_yM-vYIkqPKVrgl",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KwXvGGuWCZysA2QLe_yM-vYIkqPKVrgl&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11hnZsEZ2276DNt7CbYfzhmWZnoj3sL2U&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13DNjK4c3RYkVCwUC5vM5zV1qNOE21Jtf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11FM5rZyY0mmL0gUE2SfWyB-hcOENDCnZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14Z9Lda3smcNMmi4hvDC5l0De003Ml24r&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KwXvGGuWCZysA2QLe_yM-vYIkqPKVrgl&v=2"
    ]
  },
  "1I_1UQgQ1jUQ9TgHaR9qYzh9TQwtNkvsK": {
    "folderId": "1I_1UQgQ1jUQ9TgHaR9qYzh9TQwtNkvsK",
    "folderName": "Mr. Nagesh Chidambaramurthy",
    "sheetProjectId": "SV-029",
    "customerName": "Mr. Nagesh Chidambaramurthy",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1etEuERl2t_fZEg8qWak7B2-78iGGY5r-",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1etEuERl2t_fZEg8qWak7B2-78iGGY5r-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nMMjkFJeqbOlWV7Y4v7TQQ8aCLl6YcM6",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nMMjkFJeqbOlWV7Y4v7TQQ8aCLl6YcM6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1g0AHtxvmAcCyFEvRlahAfro_MHbyWyj2",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g0AHtxvmAcCyFEvRlahAfro_MHbyWyj2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19D2roCYjiSEsvy-QEoamZhrgQfv0Kfhc",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19D2roCYjiSEsvy-QEoamZhrgQfv0Kfhc&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZcFmQehKwGL0PWZHXXnNa6-MOWCen-7c",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZcFmQehKwGL0PWZHXXnNa6-MOWCen-7c&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1cV8jwtS2TIiR74vCyS5xPVXDZ3WPIt2T",
        "name": "6.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cV8jwtS2TIiR74vCyS5xPVXDZ3WPIt2T&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1oL4f6fSIALV67aokPiM3VYZj-Zm2b9dY",
        "name": "7.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oL4f6fSIALV67aokPiM3VYZj-Zm2b9dY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16GWvlHzYVPQqYp8NDHCciTrQpt20nZQN",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16GWvlHzYVPQqYp8NDHCciTrQpt20nZQN&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wqhMMKobUF_zqagVDV3Zm4i1tVnQVD_X",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wqhMMKobUF_zqagVDV3Zm4i1tVnQVD_X&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1etEuERl2t_fZEg8qWak7B2-78iGGY5r-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nMMjkFJeqbOlWV7Y4v7TQQ8aCLl6YcM6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g0AHtxvmAcCyFEvRlahAfro_MHbyWyj2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19D2roCYjiSEsvy-QEoamZhrgQfv0Kfhc&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZcFmQehKwGL0PWZHXXnNa6-MOWCen-7c&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cV8jwtS2TIiR74vCyS5xPVXDZ3WPIt2T&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oL4f6fSIALV67aokPiM3VYZj-Zm2b9dY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16GWvlHzYVPQqYp8NDHCciTrQpt20nZQN&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wqhMMKobUF_zqagVDV3Zm4i1tVnQVD_X&v=2"
    ]
  },
  "sv-029": {
    "folderId": "1I_1UQgQ1jUQ9TgHaR9qYzh9TQwtNkvsK",
    "folderName": "Mr. Nagesh Chidambaramurthy",
    "sheetProjectId": "SV-029",
    "customerName": "Mr. Nagesh Chidambaramurthy",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1etEuERl2t_fZEg8qWak7B2-78iGGY5r-",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1etEuERl2t_fZEg8qWak7B2-78iGGY5r-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nMMjkFJeqbOlWV7Y4v7TQQ8aCLl6YcM6",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nMMjkFJeqbOlWV7Y4v7TQQ8aCLl6YcM6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1g0AHtxvmAcCyFEvRlahAfro_MHbyWyj2",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g0AHtxvmAcCyFEvRlahAfro_MHbyWyj2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19D2roCYjiSEsvy-QEoamZhrgQfv0Kfhc",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19D2roCYjiSEsvy-QEoamZhrgQfv0Kfhc&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZcFmQehKwGL0PWZHXXnNa6-MOWCen-7c",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZcFmQehKwGL0PWZHXXnNa6-MOWCen-7c&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1cV8jwtS2TIiR74vCyS5xPVXDZ3WPIt2T",
        "name": "6.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cV8jwtS2TIiR74vCyS5xPVXDZ3WPIt2T&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1oL4f6fSIALV67aokPiM3VYZj-Zm2b9dY",
        "name": "7.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oL4f6fSIALV67aokPiM3VYZj-Zm2b9dY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16GWvlHzYVPQqYp8NDHCciTrQpt20nZQN",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16GWvlHzYVPQqYp8NDHCciTrQpt20nZQN&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wqhMMKobUF_zqagVDV3Zm4i1tVnQVD_X",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wqhMMKobUF_zqagVDV3Zm4i1tVnQVD_X&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VgB1J_PwcOi3TkxB1zFPplTu86jJOI19&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1etEuERl2t_fZEg8qWak7B2-78iGGY5r-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nMMjkFJeqbOlWV7Y4v7TQQ8aCLl6YcM6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g0AHtxvmAcCyFEvRlahAfro_MHbyWyj2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19D2roCYjiSEsvy-QEoamZhrgQfv0Kfhc&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZcFmQehKwGL0PWZHXXnNa6-MOWCen-7c&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cV8jwtS2TIiR74vCyS5xPVXDZ3WPIt2T&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oL4f6fSIALV67aokPiM3VYZj-Zm2b9dY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16GWvlHzYVPQqYp8NDHCciTrQpt20nZQN&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wqhMMKobUF_zqagVDV3Zm4i1tVnQVD_X&v=2"
    ]
  },
  "1g9FkPsF4p4TbMBGdhbwSBARUPBeGCCXL": {
    "folderId": "1g9FkPsF4p4TbMBGdhbwSBARUPBeGCCXL",
    "folderName": "Mr.Amol Khavaskar",
    "sheetProjectId": "SV-047",
    "customerName": "Mr. Amol Khavaskar",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 7,
    "videoCount": 1,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1B8HSUZv0y-1ZhycyInxNCS0b_YGmVKRb",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B8HSUZv0y-1ZhycyInxNCS0b_YGmVKRb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15go6W8mUue0Lw6u28PwbOedvDfVo3CO7",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15go6W8mUue0Lw6u28PwbOedvDfVo3CO7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xzMEGqWdW9q6MhDQhx20ETGGV7_DrqSy",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xzMEGqWdW9q6MhDQhx20ETGGV7_DrqSy&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Y2oKewZs4AF2sNgBUuP5fCZupFT308ga",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Y2oKewZs4AF2sNgBUuP5fCZupFT308ga&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YGsk_lcAFhGp6IFezR_6i_LKX1e4QALh",
        "name": "5.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YGsk_lcAFhGp6IFezR_6i_LKX1e4QALh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Q_RTKQP3urAcq5ZFH867kQqU7YPG5Nz0",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q_RTKQP3urAcq5ZFH867kQqU7YPG5Nz0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "123gIeqanN1QoHya8-A27MYvSQ79iyfkh",
        "name": "7.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=123gIeqanN1QoHya8-A27MYvSQ79iyfkh&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B8HSUZv0y-1ZhycyInxNCS0b_YGmVKRb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15go6W8mUue0Lw6u28PwbOedvDfVo3CO7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xzMEGqWdW9q6MhDQhx20ETGGV7_DrqSy&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Y2oKewZs4AF2sNgBUuP5fCZupFT308ga&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YGsk_lcAFhGp6IFezR_6i_LKX1e4QALh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q_RTKQP3urAcq5ZFH867kQqU7YPG5Nz0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=123gIeqanN1QoHya8-A27MYvSQ79iyfkh&v=2"
    ]
  },
  "sv-047": {
    "folderId": "1g9FkPsF4p4TbMBGdhbwSBARUPBeGCCXL",
    "folderName": "Mr.Amol Khavaskar",
    "sheetProjectId": "SV-047",
    "customerName": "Mr. Amol Khavaskar",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 7,
    "videoCount": 1,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1B8HSUZv0y-1ZhycyInxNCS0b_YGmVKRb",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B8HSUZv0y-1ZhycyInxNCS0b_YGmVKRb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15go6W8mUue0Lw6u28PwbOedvDfVo3CO7",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15go6W8mUue0Lw6u28PwbOedvDfVo3CO7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xzMEGqWdW9q6MhDQhx20ETGGV7_DrqSy",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xzMEGqWdW9q6MhDQhx20ETGGV7_DrqSy&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Y2oKewZs4AF2sNgBUuP5fCZupFT308ga",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Y2oKewZs4AF2sNgBUuP5fCZupFT308ga&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YGsk_lcAFhGp6IFezR_6i_LKX1e4QALh",
        "name": "5.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YGsk_lcAFhGp6IFezR_6i_LKX1e4QALh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Q_RTKQP3urAcq5ZFH867kQqU7YPG5Nz0",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q_RTKQP3urAcq5ZFH867kQqU7YPG5Nz0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "123gIeqanN1QoHya8-A27MYvSQ79iyfkh",
        "name": "7.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=123gIeqanN1QoHya8-A27MYvSQ79iyfkh&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IfBAuJMeQIeKf8z7V4I9wbm5Wkashwlz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B8HSUZv0y-1ZhycyInxNCS0b_YGmVKRb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15go6W8mUue0Lw6u28PwbOedvDfVo3CO7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xzMEGqWdW9q6MhDQhx20ETGGV7_DrqSy&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Y2oKewZs4AF2sNgBUuP5fCZupFT308ga&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YGsk_lcAFhGp6IFezR_6i_LKX1e4QALh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q_RTKQP3urAcq5ZFH867kQqU7YPG5Nz0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=123gIeqanN1QoHya8-A27MYvSQ79iyfkh&v=2"
    ]
  },
  "1MWpbHMi2_iiEWfRO_9I4foInKeHWwBsA": {
    "folderId": "1MWpbHMi2_iiEWfRO_9I4foInKeHWwBsA",
    "folderName": "Ms. Sumita Mishra",
    "sheetProjectId": "SV-065",
    "customerName": "Ms. Sumita Mishra",
    "location": "Bengal",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 7,
    "videoCount": 0,
    "totalMediaCount": 7,
    "media": [
      {
        "id": "15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YyraWBovNFKfxPMNhjKpdeD-_2EribLx",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YyraWBovNFKfxPMNhjKpdeD-_2EribLx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pXtAuzUl7PLoLwrGmARjk8W3Ia0-TJQY",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pXtAuzUl7PLoLwrGmARjk8W3Ia0-TJQY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1yofsTtRTiFB0w-WJBRsJU-ZaHLLM0HuL",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yofsTtRTiFB0w-WJBRsJU-ZaHLLM0HuL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xnxr8Oa4TuuvqnOl0O_7hBt1EXRW39X8",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xnxr8Oa4TuuvqnOl0O_7hBt1EXRW39X8&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jCV6Y2EXVIyW9C-4bhuAhDhW7Wx8H_Jj",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jCV6Y2EXVIyW9C-4bhuAhDhW7Wx8H_Jj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Q0da_TBEV73zJV-by5KrbehfQjdJUict",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q0da_TBEV73zJV-by5KrbehfQjdJUict&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YyraWBovNFKfxPMNhjKpdeD-_2EribLx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pXtAuzUl7PLoLwrGmARjk8W3Ia0-TJQY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yofsTtRTiFB0w-WJBRsJU-ZaHLLM0HuL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xnxr8Oa4TuuvqnOl0O_7hBt1EXRW39X8&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jCV6Y2EXVIyW9C-4bhuAhDhW7Wx8H_Jj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q0da_TBEV73zJV-by5KrbehfQjdJUict&v=2"
    ]
  },
  "sv-065": {
    "folderId": "1MWpbHMi2_iiEWfRO_9I4foInKeHWwBsA",
    "folderName": "Ms. Sumita Mishra",
    "sheetProjectId": "SV-065",
    "customerName": "Ms. Sumita Mishra",
    "location": "Bengal",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 7,
    "videoCount": 0,
    "totalMediaCount": 7,
    "media": [
      {
        "id": "15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YyraWBovNFKfxPMNhjKpdeD-_2EribLx",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YyraWBovNFKfxPMNhjKpdeD-_2EribLx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pXtAuzUl7PLoLwrGmARjk8W3Ia0-TJQY",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pXtAuzUl7PLoLwrGmARjk8W3Ia0-TJQY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1yofsTtRTiFB0w-WJBRsJU-ZaHLLM0HuL",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yofsTtRTiFB0w-WJBRsJU-ZaHLLM0HuL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xnxr8Oa4TuuvqnOl0O_7hBt1EXRW39X8",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xnxr8Oa4TuuvqnOl0O_7hBt1EXRW39X8&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jCV6Y2EXVIyW9C-4bhuAhDhW7Wx8H_Jj",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jCV6Y2EXVIyW9C-4bhuAhDhW7Wx8H_Jj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Q0da_TBEV73zJV-by5KrbehfQjdJUict",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q0da_TBEV73zJV-by5KrbehfQjdJUict&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15d2mC1Ri5T1RBZwmxO8y0E80TqQTCL7S&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YyraWBovNFKfxPMNhjKpdeD-_2EribLx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pXtAuzUl7PLoLwrGmARjk8W3Ia0-TJQY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yofsTtRTiFB0w-WJBRsJU-ZaHLLM0HuL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xnxr8Oa4TuuvqnOl0O_7hBt1EXRW39X8&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jCV6Y2EXVIyW9C-4bhuAhDhW7Wx8H_Jj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q0da_TBEV73zJV-by5KrbehfQjdJUict&v=2"
    ]
  },
  "1xND2JOec26YRuos4v-KGqchw7xua2-46": {
    "folderId": "1xND2JOec26YRuos4v-KGqchw7xua2-46",
    "folderName": "Ms. Suneetha Nanda Gopal",
    "sheetProjectId": "SV-064",
    "customerName": "Ms. Suneetha Nanda Gopal",
    "location": "Salem",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx",
        "name": "1 (1).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1IgN5FwSkuRz3zDp0HtLFCIkwd_YyNT1O",
        "name": "1 (2).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IgN5FwSkuRz3zDp0HtLFCIkwd_YyNT1O&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1EbTmLMMR3FQ4N3dQVUYifjEU7woaHPYK",
        "name": "1 (3).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EbTmLMMR3FQ4N3dQVUYifjEU7woaHPYK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PZ5TUyVg-xA-tynZ5yDt5lQ0zf7gUWsn",
        "name": "1 (4).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PZ5TUyVg-xA-tynZ5yDt5lQ0zf7gUWsn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fAgkj3Z6hv0ey8tGwL04U1tv2nN23-2P",
        "name": "1 (5).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fAgkj3Z6hv0ey8tGwL04U1tv2nN23-2P&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wZP_gsFjWOEG5s2LJ1MGdVntD57o2xkU",
        "name": "1 (6).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wZP_gsFjWOEG5s2LJ1MGdVntD57o2xkU&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IgN5FwSkuRz3zDp0HtLFCIkwd_YyNT1O&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EbTmLMMR3FQ4N3dQVUYifjEU7woaHPYK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PZ5TUyVg-xA-tynZ5yDt5lQ0zf7gUWsn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fAgkj3Z6hv0ey8tGwL04U1tv2nN23-2P&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wZP_gsFjWOEG5s2LJ1MGdVntD57o2xkU&v=2"
    ]
  },
  "sv-064": {
    "folderId": "1xND2JOec26YRuos4v-KGqchw7xua2-46",
    "folderName": "Ms. Suneetha Nanda Gopal",
    "sheetProjectId": "SV-064",
    "customerName": "Ms. Suneetha Nanda Gopal",
    "location": "Salem",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx",
        "name": "1 (1).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1IgN5FwSkuRz3zDp0HtLFCIkwd_YyNT1O",
        "name": "1 (2).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IgN5FwSkuRz3zDp0HtLFCIkwd_YyNT1O&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1EbTmLMMR3FQ4N3dQVUYifjEU7woaHPYK",
        "name": "1 (3).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EbTmLMMR3FQ4N3dQVUYifjEU7woaHPYK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PZ5TUyVg-xA-tynZ5yDt5lQ0zf7gUWsn",
        "name": "1 (4).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PZ5TUyVg-xA-tynZ5yDt5lQ0zf7gUWsn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fAgkj3Z6hv0ey8tGwL04U1tv2nN23-2P",
        "name": "1 (5).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fAgkj3Z6hv0ey8tGwL04U1tv2nN23-2P&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wZP_gsFjWOEG5s2LJ1MGdVntD57o2xkU",
        "name": "1 (6).jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wZP_gsFjWOEG5s2LJ1MGdVntD57o2xkU&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Dd4JycdkkiOnCgOXcF_og2DHqIBX1Zx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IgN5FwSkuRz3zDp0HtLFCIkwd_YyNT1O&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EbTmLMMR3FQ4N3dQVUYifjEU7woaHPYK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PZ5TUyVg-xA-tynZ5yDt5lQ0zf7gUWsn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fAgkj3Z6hv0ey8tGwL04U1tv2nN23-2P&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wZP_gsFjWOEG5s2LJ1MGdVntD57o2xkU&v=2"
    ]
  },
  "1xy0dxsO6NveKfMdzAMcLStyx7MTYItWc": {
    "folderId": "1xy0dxsO6NveKfMdzAMcLStyx7MTYItWc",
    "folderName": "Mrs. Rekha Lokeshwar",
    "sheetProjectId": "SV-039",
    "customerName": "Mrs. Rekha Lokeshwar",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 7,
    "videoCount": 0,
    "totalMediaCount": 7,
    "media": [
      {
        "id": "1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-visX3E5aE3f_459-Fqh7rM5V2ANBJO_",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-visX3E5aE3f_459-Fqh7rM5V2ANBJO_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sDQA1_rC6yBi_vdBpIzOnlWTDRurmcC7",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sDQA1_rC6yBi_vdBpIzOnlWTDRurmcC7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1obmw5qDqY_HB1B3Wn_BdubkSxuXOtsHG",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1obmw5qDqY_HB1B3Wn_BdubkSxuXOtsHG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1o8mkVJR2lEb3MvbI_sSKm2JHj9Z7gaKR",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1o8mkVJR2lEb3MvbI_sSKm2JHj9Z7gaKR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16OukGqQxZ3aq9X3Lc8Zr5xHVmc2dOLru",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16OukGqQxZ3aq9X3Lc8Zr5xHVmc2dOLru&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Yjif1lwGukMQ4EbQrPYaKCfpL-XHetyP",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Yjif1lwGukMQ4EbQrPYaKCfpL-XHetyP&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-visX3E5aE3f_459-Fqh7rM5V2ANBJO_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sDQA1_rC6yBi_vdBpIzOnlWTDRurmcC7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1obmw5qDqY_HB1B3Wn_BdubkSxuXOtsHG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1o8mkVJR2lEb3MvbI_sSKm2JHj9Z7gaKR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16OukGqQxZ3aq9X3Lc8Zr5xHVmc2dOLru&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Yjif1lwGukMQ4EbQrPYaKCfpL-XHetyP&v=2"
    ]
  },
  "sv-039": {
    "folderId": "1xy0dxsO6NveKfMdzAMcLStyx7MTYItWc",
    "folderName": "Mrs. Rekha Lokeshwar",
    "sheetProjectId": "SV-039",
    "customerName": "Mrs. Rekha Lokeshwar",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 7,
    "videoCount": 0,
    "totalMediaCount": 7,
    "media": [
      {
        "id": "1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-visX3E5aE3f_459-Fqh7rM5V2ANBJO_",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-visX3E5aE3f_459-Fqh7rM5V2ANBJO_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sDQA1_rC6yBi_vdBpIzOnlWTDRurmcC7",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sDQA1_rC6yBi_vdBpIzOnlWTDRurmcC7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1obmw5qDqY_HB1B3Wn_BdubkSxuXOtsHG",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1obmw5qDqY_HB1B3Wn_BdubkSxuXOtsHG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1o8mkVJR2lEb3MvbI_sSKm2JHj9Z7gaKR",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1o8mkVJR2lEb3MvbI_sSKm2JHj9Z7gaKR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16OukGqQxZ3aq9X3Lc8Zr5xHVmc2dOLru",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16OukGqQxZ3aq9X3Lc8Zr5xHVmc2dOLru&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Yjif1lwGukMQ4EbQrPYaKCfpL-XHetyP",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Yjif1lwGukMQ4EbQrPYaKCfpL-XHetyP&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ccIxI_-rGsq4HqXtME9DuJVWElI2jTvt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-visX3E5aE3f_459-Fqh7rM5V2ANBJO_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sDQA1_rC6yBi_vdBpIzOnlWTDRurmcC7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1obmw5qDqY_HB1B3Wn_BdubkSxuXOtsHG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1o8mkVJR2lEb3MvbI_sSKm2JHj9Z7gaKR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16OukGqQxZ3aq9X3Lc8Zr5xHVmc2dOLru&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Yjif1lwGukMQ4EbQrPYaKCfpL-XHetyP&v=2"
    ]
  },
  "1p4osuSDDd7n9zGV2gvWrAyQ7xZLeYurY": {
    "folderId": "1p4osuSDDd7n9zGV2gvWrAyQ7xZLeYurY",
    "folderName": "Ms. Sonia Reddy",
    "sheetProjectId": "SV-031",
    "customerName": "Ms. Sonia Reddy",
    "location": "Bengaluru",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 11,
    "videoCount": 0,
    "totalMediaCount": 11,
    "media": [
      {
        "id": "1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "17Sd7qChyJcAP9O6SdjIe3SQy7ugCnBgE",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Sd7qChyJcAP9O6SdjIe3SQy7ugCnBgE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19mta-Q0TxdmhQ2QsKgzvQxeCR0DegeA_",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19mta-Q0TxdmhQ2QsKgzvQxeCR0DegeA_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PsLOCwupUTziCqgSf6Ln8chVcudVedRf",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PsLOCwupUTziCqgSf6Ln8chVcudVedRf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pFQPQlUwPG14Ea6tPfmkxJyJCj1BE10X",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pFQPQlUwPG14Ea6tPfmkxJyJCj1BE10X&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1G7_O2HYmJSPZPRoVB4lpqCfHA1FpgNh3",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G7_O2HYmJSPZPRoVB4lpqCfHA1FpgNh3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1h3tdULzKbs7qIP5sfR3StrIAjh8q9lGE",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h3tdULzKbs7qIP5sfR3StrIAjh8q9lGE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mflhcygCho5JbHOK4q8Eo9imkf0QzyyS",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mflhcygCho5JbHOK4q8Eo9imkf0QzyyS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1a0a4_GDBwkOgnTS5JIbG5vp961Xcrqq1",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a0a4_GDBwkOgnTS5JIbG5vp961Xcrqq1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1z2h3p3eelRR0Ity_FmCCQUmdG7CLai32",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z2h3p3eelRR0Ity_FmCCQUmdG7CLai32&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hRxDAaaGmHms9kKxlylI8csUficM2iHN",
        "name": "10.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hRxDAaaGmHms9kKxlylI8csUficM2iHN&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Sd7qChyJcAP9O6SdjIe3SQy7ugCnBgE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19mta-Q0TxdmhQ2QsKgzvQxeCR0DegeA_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PsLOCwupUTziCqgSf6Ln8chVcudVedRf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pFQPQlUwPG14Ea6tPfmkxJyJCj1BE10X&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G7_O2HYmJSPZPRoVB4lpqCfHA1FpgNh3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h3tdULzKbs7qIP5sfR3StrIAjh8q9lGE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mflhcygCho5JbHOK4q8Eo9imkf0QzyyS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a0a4_GDBwkOgnTS5JIbG5vp961Xcrqq1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z2h3p3eelRR0Ity_FmCCQUmdG7CLai32&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hRxDAaaGmHms9kKxlylI8csUficM2iHN&v=2"
    ]
  },
  "sv-031": {
    "folderId": "1p4osuSDDd7n9zGV2gvWrAyQ7xZLeYurY",
    "folderName": "Ms. Sonia Reddy",
    "sheetProjectId": "SV-031",
    "customerName": "Ms. Sonia Reddy",
    "location": "Bengaluru",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 11,
    "videoCount": 0,
    "totalMediaCount": 11,
    "media": [
      {
        "id": "1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "17Sd7qChyJcAP9O6SdjIe3SQy7ugCnBgE",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Sd7qChyJcAP9O6SdjIe3SQy7ugCnBgE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19mta-Q0TxdmhQ2QsKgzvQxeCR0DegeA_",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19mta-Q0TxdmhQ2QsKgzvQxeCR0DegeA_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PsLOCwupUTziCqgSf6Ln8chVcudVedRf",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PsLOCwupUTziCqgSf6Ln8chVcudVedRf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pFQPQlUwPG14Ea6tPfmkxJyJCj1BE10X",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pFQPQlUwPG14Ea6tPfmkxJyJCj1BE10X&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1G7_O2HYmJSPZPRoVB4lpqCfHA1FpgNh3",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G7_O2HYmJSPZPRoVB4lpqCfHA1FpgNh3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1h3tdULzKbs7qIP5sfR3StrIAjh8q9lGE",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h3tdULzKbs7qIP5sfR3StrIAjh8q9lGE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mflhcygCho5JbHOK4q8Eo9imkf0QzyyS",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mflhcygCho5JbHOK4q8Eo9imkf0QzyyS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1a0a4_GDBwkOgnTS5JIbG5vp961Xcrqq1",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a0a4_GDBwkOgnTS5JIbG5vp961Xcrqq1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1z2h3p3eelRR0Ity_FmCCQUmdG7CLai32",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z2h3p3eelRR0Ity_FmCCQUmdG7CLai32&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hRxDAaaGmHms9kKxlylI8csUficM2iHN",
        "name": "10.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hRxDAaaGmHms9kKxlylI8csUficM2iHN&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UgLzAbXqp-2VwT5eLpIrYEAZuASBuynD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17Sd7qChyJcAP9O6SdjIe3SQy7ugCnBgE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19mta-Q0TxdmhQ2QsKgzvQxeCR0DegeA_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PsLOCwupUTziCqgSf6Ln8chVcudVedRf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pFQPQlUwPG14Ea6tPfmkxJyJCj1BE10X&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G7_O2HYmJSPZPRoVB4lpqCfHA1FpgNh3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h3tdULzKbs7qIP5sfR3StrIAjh8q9lGE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mflhcygCho5JbHOK4q8Eo9imkf0QzyyS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a0a4_GDBwkOgnTS5JIbG5vp961Xcrqq1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z2h3p3eelRR0Ity_FmCCQUmdG7CLai32&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hRxDAaaGmHms9kKxlylI8csUficM2iHN&v=2"
    ]
  },
  "1bZMDsxywHKHL23EPCmHjc0UZ-IYpDiXm": {
    "folderId": "1bZMDsxywHKHL23EPCmHjc0UZ-IYpDiXm",
    "folderName": "Ms. Sahana srihari",
    "sheetProjectId": "SV-044",
    "customerName": "Ms. Sahana srihari",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 7,
    "videoCount": 0,
    "totalMediaCount": 7,
    "media": [
      {
        "id": "1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WjzRrFngPjicuxWsgMg7q6UNi1Gq9cF2",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WjzRrFngPjicuxWsgMg7q6UNi1Gq9cF2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CYncLHokL2fqGPTep0OM3CuAAzP4O4BW",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CYncLHokL2fqGPTep0OM3CuAAzP4O4BW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1W0kmvIKaMdCcv5K5_HYyK_ofy4TP2R68",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1W0kmvIKaMdCcv5K5_HYyK_ofy4TP2R68&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1_X_vNvhfrPAl2OE5G0ZXBVBZyPXaoSuV",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_X_vNvhfrPAl2OE5G0ZXBVBZyPXaoSuV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1GRNW8M2OQl9MtkJDA4ximrcjbP2xWqCS",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GRNW8M2OQl9MtkJDA4ximrcjbP2xWqCS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rJ9oWkO4Ubfu7itMbm2PTHLRD5QFDHRI",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rJ9oWkO4Ubfu7itMbm2PTHLRD5QFDHRI&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WjzRrFngPjicuxWsgMg7q6UNi1Gq9cF2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CYncLHokL2fqGPTep0OM3CuAAzP4O4BW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1W0kmvIKaMdCcv5K5_HYyK_ofy4TP2R68&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_X_vNvhfrPAl2OE5G0ZXBVBZyPXaoSuV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GRNW8M2OQl9MtkJDA4ximrcjbP2xWqCS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rJ9oWkO4Ubfu7itMbm2PTHLRD5QFDHRI&v=2"
    ]
  },
  "sv-044": {
    "folderId": "1bZMDsxywHKHL23EPCmHjc0UZ-IYpDiXm",
    "folderName": "Ms. Sahana srihari",
    "sheetProjectId": "SV-044",
    "customerName": "Ms. Sahana srihari",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 7,
    "videoCount": 0,
    "totalMediaCount": 7,
    "media": [
      {
        "id": "1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WjzRrFngPjicuxWsgMg7q6UNi1Gq9cF2",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WjzRrFngPjicuxWsgMg7q6UNi1Gq9cF2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CYncLHokL2fqGPTep0OM3CuAAzP4O4BW",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CYncLHokL2fqGPTep0OM3CuAAzP4O4BW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1W0kmvIKaMdCcv5K5_HYyK_ofy4TP2R68",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1W0kmvIKaMdCcv5K5_HYyK_ofy4TP2R68&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1_X_vNvhfrPAl2OE5G0ZXBVBZyPXaoSuV",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_X_vNvhfrPAl2OE5G0ZXBVBZyPXaoSuV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1GRNW8M2OQl9MtkJDA4ximrcjbP2xWqCS",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GRNW8M2OQl9MtkJDA4ximrcjbP2xWqCS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rJ9oWkO4Ubfu7itMbm2PTHLRD5QFDHRI",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rJ9oWkO4Ubfu7itMbm2PTHLRD5QFDHRI&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MAjC5_We59wn5-6QqLbMeILWVlXuQ7PZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WjzRrFngPjicuxWsgMg7q6UNi1Gq9cF2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CYncLHokL2fqGPTep0OM3CuAAzP4O4BW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1W0kmvIKaMdCcv5K5_HYyK_ofy4TP2R68&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_X_vNvhfrPAl2OE5G0ZXBVBZyPXaoSuV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GRNW8M2OQl9MtkJDA4ximrcjbP2xWqCS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rJ9oWkO4Ubfu7itMbm2PTHLRD5QFDHRI&v=2"
    ]
  },
  "1vzxhRnquISQpXGdH9T7yDf205EIFHnt9": {
    "folderId": "1vzxhRnquISQpXGdH9T7yDf205EIFHnt9",
    "folderName": "Ms. Gopika",
    "sheetProjectId": "SV-046",
    "customerName": "Ms. Gopika",
    "location": "Dubai",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 1,
    "videoCount": 0,
    "totalMediaCount": 1,
    "media": [
      {
        "id": "1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO&v=2"
    ]
  },
  "sv-046": {
    "folderId": "1vzxhRnquISQpXGdH9T7yDf205EIFHnt9",
    "folderName": "Ms. Gopika",
    "sheetProjectId": "SV-046",
    "customerName": "Ms. Gopika",
    "location": "Dubai",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 1,
    "videoCount": 0,
    "totalMediaCount": 1,
    "media": [
      {
        "id": "1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pvh15ZmpcKSgYyKFOSygcYHh3_eOn9lO&v=2"
    ]
  },
  "1LaqmwogGVbEclYQye4T-CojsMQM2JMCi": {
    "folderId": "1LaqmwogGVbEclYQye4T-CojsMQM2JMCi",
    "folderName": "Ms. Kavitha Hegde",
    "sheetProjectId": "SV-056",
    "customerName": "Ms. Kavitha Hegde",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi",
        "name": "0.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WoeLqLoHifOcBbekxtypzIdZiTOC5rJJ",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WoeLqLoHifOcBbekxtypzIdZiTOC5rJJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1odsra_ICl9KX0ozIn0Y8Q74hIqA0_Zsy",
        "name": "2.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1odsra_ICl9KX0ozIn0Y8Q74hIqA0_Zsy&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JTnJTPAcK0G-ehBmIHumtB8o39_xi7qW",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JTnJTPAcK0G-ehBmIHumtB8o39_xi7qW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1w9h--2u1xUizOf-25OIbdtvi_oWYJsgx",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1w9h--2u1xUizOf-25OIbdtvi_oWYJsgx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O4fERkaY-iA9X5_eyLDX9PNpy5uAfvCM",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O4fERkaY-iA9X5_eyLDX9PNpy5uAfvCM&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WoeLqLoHifOcBbekxtypzIdZiTOC5rJJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1odsra_ICl9KX0ozIn0Y8Q74hIqA0_Zsy&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JTnJTPAcK0G-ehBmIHumtB8o39_xi7qW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1w9h--2u1xUizOf-25OIbdtvi_oWYJsgx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O4fERkaY-iA9X5_eyLDX9PNpy5uAfvCM&v=2"
    ]
  },
  "sv-056": {
    "folderId": "1LaqmwogGVbEclYQye4T-CojsMQM2JMCi",
    "folderName": "Ms. Kavitha Hegde",
    "sheetProjectId": "SV-056",
    "customerName": "Ms. Kavitha Hegde",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi",
        "name": "0.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WoeLqLoHifOcBbekxtypzIdZiTOC5rJJ",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WoeLqLoHifOcBbekxtypzIdZiTOC5rJJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1odsra_ICl9KX0ozIn0Y8Q74hIqA0_Zsy",
        "name": "2.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1odsra_ICl9KX0ozIn0Y8Q74hIqA0_Zsy&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JTnJTPAcK0G-ehBmIHumtB8o39_xi7qW",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JTnJTPAcK0G-ehBmIHumtB8o39_xi7qW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1w9h--2u1xUizOf-25OIbdtvi_oWYJsgx",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1w9h--2u1xUizOf-25OIbdtvi_oWYJsgx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O4fERkaY-iA9X5_eyLDX9PNpy5uAfvCM",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O4fERkaY-iA9X5_eyLDX9PNpy5uAfvCM&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRNjvTxlt1TjduEYle_67hRpxOaMM3Fi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WoeLqLoHifOcBbekxtypzIdZiTOC5rJJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1odsra_ICl9KX0ozIn0Y8Q74hIqA0_Zsy&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JTnJTPAcK0G-ehBmIHumtB8o39_xi7qW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1w9h--2u1xUizOf-25OIbdtvi_oWYJsgx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O4fERkaY-iA9X5_eyLDX9PNpy5uAfvCM&v=2"
    ]
  },
  "1koBLItGlkLylFyeMgkoqXuVxqpKn0wwq": {
    "folderId": "1koBLItGlkLylFyeMgkoqXuVxqpKn0wwq",
    "folderName": "Mr. Vasantha Aditya",
    "sheetProjectId": "SV-027",
    "customerName": "Mr. Vasantha Aditya",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rljTPCvwG1Vj1JOIJJ0YP9fXeDtfCpuf",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rljTPCvwG1Vj1JOIJJ0YP9fXeDtfCpuf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sH7UBvxLgkVzSOKV8SCRzGh16PoJBObc",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sH7UBvxLgkVzSOKV8SCRzGh16PoJBObc&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1DJsLLHIe9axQL6MM6_f_sCXWSTmvwoO3",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DJsLLHIe9axQL6MM6_f_sCXWSTmvwoO3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1iEW26XgV7UWyVXP44HuSlnnlhbZNVYm5",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iEW26XgV7UWyVXP44HuSlnnlhbZNVYm5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sEzBnHIDzBwwZIidQUoMdBmeMvAj15AT",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sEzBnHIDzBwwZIidQUoMdBmeMvAj15AT&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rljTPCvwG1Vj1JOIJJ0YP9fXeDtfCpuf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sH7UBvxLgkVzSOKV8SCRzGh16PoJBObc&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DJsLLHIe9axQL6MM6_f_sCXWSTmvwoO3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iEW26XgV7UWyVXP44HuSlnnlhbZNVYm5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sEzBnHIDzBwwZIidQUoMdBmeMvAj15AT&v=2"
    ]
  },
  "sv-027": {
    "folderId": "1koBLItGlkLylFyeMgkoqXuVxqpKn0wwq",
    "folderName": "Mr. Vasantha Aditya",
    "sheetProjectId": "SV-027",
    "customerName": "Mr. Vasantha Aditya",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rljTPCvwG1Vj1JOIJJ0YP9fXeDtfCpuf",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rljTPCvwG1Vj1JOIJJ0YP9fXeDtfCpuf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sH7UBvxLgkVzSOKV8SCRzGh16PoJBObc",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sH7UBvxLgkVzSOKV8SCRzGh16PoJBObc&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1DJsLLHIe9axQL6MM6_f_sCXWSTmvwoO3",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DJsLLHIe9axQL6MM6_f_sCXWSTmvwoO3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1iEW26XgV7UWyVXP44HuSlnnlhbZNVYm5",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iEW26XgV7UWyVXP44HuSlnnlhbZNVYm5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sEzBnHIDzBwwZIidQUoMdBmeMvAj15AT",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sEzBnHIDzBwwZIidQUoMdBmeMvAj15AT&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ws4cQ8SEKkWxVfpyRktT94-jQmbGqr58&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rljTPCvwG1Vj1JOIJJ0YP9fXeDtfCpuf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sH7UBvxLgkVzSOKV8SCRzGh16PoJBObc&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DJsLLHIe9axQL6MM6_f_sCXWSTmvwoO3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iEW26XgV7UWyVXP44HuSlnnlhbZNVYm5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sEzBnHIDzBwwZIidQUoMdBmeMvAj15AT&v=2"
    ]
  },
  "12_AkeDN4ORBBf2_1MUjA8B2wJ94iO1TK": {
    "folderId": "12_AkeDN4ORBBf2_1MUjA8B2wJ94iO1TK",
    "folderName": "Ms. Saritha reddy",
    "sheetProjectId": "SV-045",
    "customerName": "Ms. Saritha reddy",
    "location": "U S A",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "17G33CXCxj1wDLRI7C12Pkj_PNqJ-WMos",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17G33CXCxj1wDLRI7C12Pkj_PNqJ-WMos&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Pi0jb6k2D1_Ss_u-K53022rXr_8cnkKz",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pi0jb6k2D1_Ss_u-K53022rXr_8cnkKz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lHZwFgsEwPGuhX7aRKWR8uYcT_ftlVy0",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lHZwFgsEwPGuhX7aRKWR8uYcT_ftlVy0&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17G33CXCxj1wDLRI7C12Pkj_PNqJ-WMos&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pi0jb6k2D1_Ss_u-K53022rXr_8cnkKz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lHZwFgsEwPGuhX7aRKWR8uYcT_ftlVy0&v=2"
    ]
  },
  "sv-045": {
    "folderId": "12_AkeDN4ORBBf2_1MUjA8B2wJ94iO1TK",
    "folderName": "Ms. Saritha reddy",
    "sheetProjectId": "SV-045",
    "customerName": "Ms. Saritha reddy",
    "location": "U S A",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "17G33CXCxj1wDLRI7C12Pkj_PNqJ-WMos",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17G33CXCxj1wDLRI7C12Pkj_PNqJ-WMos&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Pi0jb6k2D1_Ss_u-K53022rXr_8cnkKz",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pi0jb6k2D1_Ss_u-K53022rXr_8cnkKz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lHZwFgsEwPGuhX7aRKWR8uYcT_ftlVy0",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lHZwFgsEwPGuhX7aRKWR8uYcT_ftlVy0&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bYRY8j9EcZaad1trG8gJz-lXXVFyhzxb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17G33CXCxj1wDLRI7C12Pkj_PNqJ-WMos&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pi0jb6k2D1_Ss_u-K53022rXr_8cnkKz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lHZwFgsEwPGuhX7aRKWR8uYcT_ftlVy0&v=2"
    ]
  },
  "1TaSv5Jcuwzf1jQSFbByKZUvd3jad_VFR": {
    "folderId": "1TaSv5Jcuwzf1jQSFbByKZUvd3jad_VFR",
    "folderName": "Ms. Santhi Koneru",
    "sheetProjectId": "SV-060",
    "customerName": "Ms. Santhi Koneru",
    "location": "U S A",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1D8DplmyzFu9_2g_482IV666f0PPBFqxo",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1D8DplmyzFu9_2g_482IV666f0PPBFqxo&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1D8DplmyzFu9_2g_482IV666f0PPBFqxo&v=2"
    ]
  },
  "sv-060": {
    "folderId": "1TaSv5Jcuwzf1jQSFbByKZUvd3jad_VFR",
    "folderName": "Ms. Santhi Koneru",
    "sheetProjectId": "SV-060",
    "customerName": "Ms. Santhi Koneru",
    "location": "U S A",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1D8DplmyzFu9_2g_482IV666f0PPBFqxo",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1D8DplmyzFu9_2g_482IV666f0PPBFqxo&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UexMAqBNL-QEtIs2Gd8sYHXHIJriv3cx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1D8DplmyzFu9_2g_482IV666f0PPBFqxo&v=2"
    ]
  },
  "1oPE6BlPl_YzpM8AoPWzS8q1j_P2QT1r5": {
    "folderId": "1oPE6BlPl_YzpM8AoPWzS8q1j_P2QT1r5",
    "folderName": "Ms. Priyanki Gupta",
    "sheetProjectId": "SV-035",
    "customerName": "Ms. Priyanki Gupta",
    "location": "Seattle",
    "structureType": "Existing Room Frontage",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 7,
    "videoCount": 0,
    "totalMediaCount": 7,
    "media": [
      {
        "id": "1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "180HReJ7pr3lI3R2X4wqV7gblpgZi7CMK",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=180HReJ7pr3lI3R2X4wqV7gblpgZi7CMK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rgs9yffsTRjiPXmOewuI1M2SOqIASzdp",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rgs9yffsTRjiPXmOewuI1M2SOqIASzdp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gbIuZ4GO3Dqbg4wcTR2Uu4tPcn9VG-hu",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gbIuZ4GO3Dqbg4wcTR2Uu4tPcn9VG-hu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bA6hwyJMYOS1JpGKtjYvc-KlBcJlGwR6",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bA6hwyJMYOS1JpGKtjYvc-KlBcJlGwR6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "181ET6N1pD0P40BltIb2b3yZLPnxXSQak",
        "name": "7.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=181ET6N1pD0P40BltIb2b3yZLPnxXSQak&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1t1l_p_bREq4D_esF1vbIWe7IDhpsOfgT",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t1l_p_bREq4D_esF1vbIWe7IDhpsOfgT&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=180HReJ7pr3lI3R2X4wqV7gblpgZi7CMK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rgs9yffsTRjiPXmOewuI1M2SOqIASzdp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gbIuZ4GO3Dqbg4wcTR2Uu4tPcn9VG-hu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bA6hwyJMYOS1JpGKtjYvc-KlBcJlGwR6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=181ET6N1pD0P40BltIb2b3yZLPnxXSQak&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t1l_p_bREq4D_esF1vbIWe7IDhpsOfgT&v=2"
    ]
  },
  "sv-035": {
    "folderId": "1oPE6BlPl_YzpM8AoPWzS8q1j_P2QT1r5",
    "folderName": "Ms. Priyanki Gupta",
    "sheetProjectId": "SV-035",
    "customerName": "Ms. Priyanki Gupta",
    "location": "Seattle",
    "structureType": "Existing Room Frontage",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 7,
    "videoCount": 0,
    "totalMediaCount": 7,
    "media": [
      {
        "id": "1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "180HReJ7pr3lI3R2X4wqV7gblpgZi7CMK",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=180HReJ7pr3lI3R2X4wqV7gblpgZi7CMK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rgs9yffsTRjiPXmOewuI1M2SOqIASzdp",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rgs9yffsTRjiPXmOewuI1M2SOqIASzdp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gbIuZ4GO3Dqbg4wcTR2Uu4tPcn9VG-hu",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gbIuZ4GO3Dqbg4wcTR2Uu4tPcn9VG-hu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bA6hwyJMYOS1JpGKtjYvc-KlBcJlGwR6",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bA6hwyJMYOS1JpGKtjYvc-KlBcJlGwR6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "181ET6N1pD0P40BltIb2b3yZLPnxXSQak",
        "name": "7.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=181ET6N1pD0P40BltIb2b3yZLPnxXSQak&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1t1l_p_bREq4D_esF1vbIWe7IDhpsOfgT",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t1l_p_bREq4D_esF1vbIWe7IDhpsOfgT&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OvjhA0T-CevirRNdZRIN2o7qp1vDSzBG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=180HReJ7pr3lI3R2X4wqV7gblpgZi7CMK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rgs9yffsTRjiPXmOewuI1M2SOqIASzdp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gbIuZ4GO3Dqbg4wcTR2Uu4tPcn9VG-hu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bA6hwyJMYOS1JpGKtjYvc-KlBcJlGwR6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=181ET6N1pD0P40BltIb2b3yZLPnxXSQak&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t1l_p_bREq4D_esF1vbIWe7IDhpsOfgT&v=2"
    ]
  },
  "1geDaLa6-aIIdQ_3-wvjsw2eOwLPVg12y": {
    "folderId": "1geDaLa6-aIIdQ_3-wvjsw2eOwLPVg12y",
    "folderName": "Mr. Vikranth",
    "sheetProjectId": "SV-041",
    "customerName": "Mr. Vikranth",
    "location": "Hyderabad",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1egLXEabxu96V-zzWVpcinOMmL0IPbVT1",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1egLXEabxu96V-zzWVpcinOMmL0IPbVT1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nfmuC702Q7o6_thhW8zSO_M60uePEgF-",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfmuC702Q7o6_thhW8zSO_M60uePEgF-&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1egLXEabxu96V-zzWVpcinOMmL0IPbVT1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfmuC702Q7o6_thhW8zSO_M60uePEgF-&v=2"
    ]
  },
  "sv-041": {
    "folderId": "1geDaLa6-aIIdQ_3-wvjsw2eOwLPVg12y",
    "folderName": "Mr. Vikranth",
    "sheetProjectId": "SV-041",
    "customerName": "Mr. Vikranth",
    "location": "Hyderabad",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1egLXEabxu96V-zzWVpcinOMmL0IPbVT1",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1egLXEabxu96V-zzWVpcinOMmL0IPbVT1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nfmuC702Q7o6_thhW8zSO_M60uePEgF-",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfmuC702Q7o6_thhW8zSO_M60uePEgF-&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NC6DAVgiDDkR95eKAVjojPhoy5yt48aW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1egLXEabxu96V-zzWVpcinOMmL0IPbVT1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfmuC702Q7o6_thhW8zSO_M60uePEgF-&v=2"
    ]
  },
  "1DyqQobHk_EJo_fnrnF4QXWBZvxI74hZc": {
    "folderId": "1DyqQobHk_EJo_fnrnF4QXWBZvxI74hZc",
    "folderName": "Mr. Karthikeyan",
    "sheetProjectId": "SV-049",
    "customerName": "Mr. Karthikeyan",
    "location": "Coimbatore",
    "structureType": "Existing Room Frontage",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1a9RZmmxdonEkmPLax50i743SKZj4BTNX",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a9RZmmxdonEkmPLax50i743SKZj4BTNX&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1a9RZmmxdonEkmPLax50i743SKZj4BTNX",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a9RZmmxdonEkmPLax50i743SKZj4BTNX&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1t6EKEcnvOv5f1zG8S6emX9ByAkhav9R6",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t6EKEcnvOv5f1zG8S6emX9ByAkhav9R6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xj-4cW8LZkgE91IkroEoqiHFxBEN0dgp",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xj-4cW8LZkgE91IkroEoqiHFxBEN0dgp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JIyRK4DjAxnRIyG-TDsiyQLz7nOo5OJh",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JIyRK4DjAxnRIyG-TDsiyQLz7nOo5OJh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1b9Ju6KRIYMIIZSa1pyxRq7M4zX1rjPQh",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1b9Ju6KRIYMIIZSa1pyxRq7M4zX1rjPQh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HH_dIecaW6KgGkRSWsy0RyCcrNBdFlk8",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HH_dIecaW6KgGkRSWsy0RyCcrNBdFlk8&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1EzQzbt5pSyDWArtBaiPypS69u_ozm5kr",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EzQzbt5pSyDWArtBaiPypS69u_ozm5kr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "162Knd_bPmw3MNnK85-Z65dbljykk7ZF7",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=162Knd_bPmw3MNnK85-Z65dbljykk7ZF7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1j0JpsSb_xaexWFRSIFeT5nD-nLAxqFOX",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1j0JpsSb_xaexWFRSIFeT5nD-nLAxqFOX&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a9RZmmxdonEkmPLax50i743SKZj4BTNX&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t6EKEcnvOv5f1zG8S6emX9ByAkhav9R6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xj-4cW8LZkgE91IkroEoqiHFxBEN0dgp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JIyRK4DjAxnRIyG-TDsiyQLz7nOo5OJh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1b9Ju6KRIYMIIZSa1pyxRq7M4zX1rjPQh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HH_dIecaW6KgGkRSWsy0RyCcrNBdFlk8&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EzQzbt5pSyDWArtBaiPypS69u_ozm5kr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=162Knd_bPmw3MNnK85-Z65dbljykk7ZF7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1j0JpsSb_xaexWFRSIFeT5nD-nLAxqFOX&v=2"
    ]
  },
  "sv-049": {
    "folderId": "1DyqQobHk_EJo_fnrnF4QXWBZvxI74hZc",
    "folderName": "Mr. Karthikeyan",
    "sheetProjectId": "SV-049",
    "customerName": "Mr. Karthikeyan",
    "location": "Coimbatore",
    "structureType": "Existing Room Frontage",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1a9RZmmxdonEkmPLax50i743SKZj4BTNX",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a9RZmmxdonEkmPLax50i743SKZj4BTNX&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1a9RZmmxdonEkmPLax50i743SKZj4BTNX",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a9RZmmxdonEkmPLax50i743SKZj4BTNX&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1t6EKEcnvOv5f1zG8S6emX9ByAkhav9R6",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t6EKEcnvOv5f1zG8S6emX9ByAkhav9R6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xj-4cW8LZkgE91IkroEoqiHFxBEN0dgp",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xj-4cW8LZkgE91IkroEoqiHFxBEN0dgp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JIyRK4DjAxnRIyG-TDsiyQLz7nOo5OJh",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JIyRK4DjAxnRIyG-TDsiyQLz7nOo5OJh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1b9Ju6KRIYMIIZSa1pyxRq7M4zX1rjPQh",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1b9Ju6KRIYMIIZSa1pyxRq7M4zX1rjPQh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HH_dIecaW6KgGkRSWsy0RyCcrNBdFlk8",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HH_dIecaW6KgGkRSWsy0RyCcrNBdFlk8&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1EzQzbt5pSyDWArtBaiPypS69u_ozm5kr",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EzQzbt5pSyDWArtBaiPypS69u_ozm5kr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "162Knd_bPmw3MNnK85-Z65dbljykk7ZF7",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=162Knd_bPmw3MNnK85-Z65dbljykk7ZF7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1j0JpsSb_xaexWFRSIFeT5nD-nLAxqFOX",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1j0JpsSb_xaexWFRSIFeT5nD-nLAxqFOX&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1a9RZmmxdonEkmPLax50i743SKZj4BTNX&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t6EKEcnvOv5f1zG8S6emX9ByAkhav9R6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xj-4cW8LZkgE91IkroEoqiHFxBEN0dgp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JIyRK4DjAxnRIyG-TDsiyQLz7nOo5OJh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1b9Ju6KRIYMIIZSa1pyxRq7M4zX1rjPQh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HH_dIecaW6KgGkRSWsy0RyCcrNBdFlk8&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EzQzbt5pSyDWArtBaiPypS69u_ozm5kr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=162Knd_bPmw3MNnK85-Z65dbljykk7ZF7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1j0JpsSb_xaexWFRSIFeT5nD-nLAxqFOX&v=2"
    ]
  },
  "1PHNVPHE32Jjvl31ZHu3lsL9st6dzYUAC": {
    "folderId": "1PHNVPHE32Jjvl31ZHu3lsL9st6dzYUAC",
    "folderName": "Mr. Rakesh Reddy",
    "sheetProjectId": "SV-024",
    "customerName": "Mr. Rakesh Reddy",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "103keIRiAHgmrQNXPxozutQdOw4f5s1zH",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=103keIRiAHgmrQNXPxozutQdOw4f5s1zH&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 26,
    "videoCount": 0,
    "totalMediaCount": 26,
    "media": [
      {
        "id": "103keIRiAHgmrQNXPxozutQdOw4f5s1zH",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=103keIRiAHgmrQNXPxozutQdOw4f5s1zH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xhMn5NVH59__k-odL5wumXqEiFnMrwlU",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xhMn5NVH59__k-odL5wumXqEiFnMrwlU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1RDjvpaItyOK0euCGBQePYtfoH5aoPWye",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RDjvpaItyOK0euCGBQePYtfoH5aoPWye&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Z1PzKcPAohatBybXO9aDtCUCUvz7qUHK",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z1PzKcPAohatBybXO9aDtCUCUvz7qUHK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UskFG2TwChK2Ar9zjjUK9AETiGTWFpz1",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UskFG2TwChK2Ar9zjjUK9AETiGTWFpz1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13WrfKGdeQX1qS4ncfGKaJak7u217Isu-",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WrfKGdeQX1qS4ncfGKaJak7u217Isu-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Ft55bD83hgtKkd1rLljk9cP5jGI_buD7",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ft55bD83hgtKkd1rLljk9cP5jGI_buD7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1r3pONYOg-EdniobPBWv0TJ9QKT9qEvW8",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r3pONYOg-EdniobPBWv0TJ9QKT9qEvW8&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ntQAWyO_7uLCIf9wHrfePXFHSc-IIXMp",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ntQAWyO_7uLCIf9wHrfePXFHSc-IIXMp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Ydnq8QM6T1T9AKMEOrfNDraSHoMxObn7",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ydnq8QM6T1T9AKMEOrfNDraSHoMxObn7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1q2v0Rr74l9kUM6YaEdiRlGAflJ9SC7UQ",
        "name": "10.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1q2v0Rr74l9kUM6YaEdiRlGAflJ9SC7UQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12klVsx2cyEnDovtViAa5dBeiQM7cXxfZ",
        "name": "11.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12klVsx2cyEnDovtViAa5dBeiQM7cXxfZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1w1Aw9OSSXP32mWvbluBO_009eXdBVQLQ",
        "name": "12.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1w1Aw9OSSXP32mWvbluBO_009eXdBVQLQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ybUaqgMFHgMJZFODkp-QRs94w1_A1Hk6",
        "name": "13.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ybUaqgMFHgMJZFODkp-QRs94w1_A1Hk6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rysrcKCnBOioJ7gV7YA3pszEIn3l49OP",
        "name": "14.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rysrcKCnBOioJ7gV7YA3pszEIn3l49OP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1djQPdU6LcYGfy5XMK81tqsAby8XWgeAy",
        "name": "15.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1djQPdU6LcYGfy5XMK81tqsAby8XWgeAy&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PBKLFuvapiYt1QtvB34Hsiq8bq2hdnvO",
        "name": "16.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PBKLFuvapiYt1QtvB34Hsiq8bq2hdnvO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Pl8nauoxXnVzooJKt-OU_C6r-DFehzGk",
        "name": "17.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pl8nauoxXnVzooJKt-OU_C6r-DFehzGk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CaH1jHWBCiJdAXQQuNzNL6fVBy9Gs5ch",
        "name": "18.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CaH1jHWBCiJdAXQQuNzNL6fVBy9Gs5ch&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10BZtdodqSMv4L-_6PzB-dr74tc4gEfVp",
        "name": "19.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10BZtdodqSMv4L-_6PzB-dr74tc4gEfVp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1XRwK9-VpHRrd4cJmdBJLkI5UZx5-RY_1",
        "name": "20.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XRwK9-VpHRrd4cJmdBJLkI5UZx5-RY_1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19PtC_wbI8wtvwLUbR7W8foYJNsnik079",
        "name": "21.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19PtC_wbI8wtvwLUbR7W8foYJNsnik079&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xye66aCOes9XU6_2H7uZP_aH4KhnDciJ",
        "name": "22.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xye66aCOes9XU6_2H7uZP_aH4KhnDciJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1BsUSbBDodVUZxRtNOlHLyn7zKx11PPwT",
        "name": "23.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BsUSbBDodVUZxRtNOlHLyn7zKx11PPwT&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12K4CbmGp4kO_F9T6IgQ9uQDFQrRnKutV",
        "name": "24.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12K4CbmGp4kO_F9T6IgQ9uQDFQrRnKutV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eXW3oUAyusZH-3y3aGYTkHWT10D-bMse",
        "name": "25.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eXW3oUAyusZH-3y3aGYTkHWT10D-bMse&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=103keIRiAHgmrQNXPxozutQdOw4f5s1zH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xhMn5NVH59__k-odL5wumXqEiFnMrwlU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RDjvpaItyOK0euCGBQePYtfoH5aoPWye&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z1PzKcPAohatBybXO9aDtCUCUvz7qUHK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UskFG2TwChK2Ar9zjjUK9AETiGTWFpz1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WrfKGdeQX1qS4ncfGKaJak7u217Isu-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ft55bD83hgtKkd1rLljk9cP5jGI_buD7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r3pONYOg-EdniobPBWv0TJ9QKT9qEvW8&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ntQAWyO_7uLCIf9wHrfePXFHSc-IIXMp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ydnq8QM6T1T9AKMEOrfNDraSHoMxObn7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1q2v0Rr74l9kUM6YaEdiRlGAflJ9SC7UQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12klVsx2cyEnDovtViAa5dBeiQM7cXxfZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1w1Aw9OSSXP32mWvbluBO_009eXdBVQLQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ybUaqgMFHgMJZFODkp-QRs94w1_A1Hk6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rysrcKCnBOioJ7gV7YA3pszEIn3l49OP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1djQPdU6LcYGfy5XMK81tqsAby8XWgeAy&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PBKLFuvapiYt1QtvB34Hsiq8bq2hdnvO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pl8nauoxXnVzooJKt-OU_C6r-DFehzGk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CaH1jHWBCiJdAXQQuNzNL6fVBy9Gs5ch&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10BZtdodqSMv4L-_6PzB-dr74tc4gEfVp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XRwK9-VpHRrd4cJmdBJLkI5UZx5-RY_1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19PtC_wbI8wtvwLUbR7W8foYJNsnik079&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xye66aCOes9XU6_2H7uZP_aH4KhnDciJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BsUSbBDodVUZxRtNOlHLyn7zKx11PPwT&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12K4CbmGp4kO_F9T6IgQ9uQDFQrRnKutV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eXW3oUAyusZH-3y3aGYTkHWT10D-bMse&v=2"
    ]
  },
  "sv-024": {
    "folderId": "1PHNVPHE32Jjvl31ZHu3lsL9st6dzYUAC",
    "folderName": "Mr. Rakesh Reddy",
    "sheetProjectId": "SV-024",
    "customerName": "Mr. Rakesh Reddy",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "103keIRiAHgmrQNXPxozutQdOw4f5s1zH",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=103keIRiAHgmrQNXPxozutQdOw4f5s1zH&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 26,
    "videoCount": 0,
    "totalMediaCount": 26,
    "media": [
      {
        "id": "103keIRiAHgmrQNXPxozutQdOw4f5s1zH",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=103keIRiAHgmrQNXPxozutQdOw4f5s1zH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xhMn5NVH59__k-odL5wumXqEiFnMrwlU",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xhMn5NVH59__k-odL5wumXqEiFnMrwlU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1RDjvpaItyOK0euCGBQePYtfoH5aoPWye",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RDjvpaItyOK0euCGBQePYtfoH5aoPWye&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Z1PzKcPAohatBybXO9aDtCUCUvz7qUHK",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z1PzKcPAohatBybXO9aDtCUCUvz7qUHK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UskFG2TwChK2Ar9zjjUK9AETiGTWFpz1",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UskFG2TwChK2Ar9zjjUK9AETiGTWFpz1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13WrfKGdeQX1qS4ncfGKaJak7u217Isu-",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WrfKGdeQX1qS4ncfGKaJak7u217Isu-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Ft55bD83hgtKkd1rLljk9cP5jGI_buD7",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ft55bD83hgtKkd1rLljk9cP5jGI_buD7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1r3pONYOg-EdniobPBWv0TJ9QKT9qEvW8",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r3pONYOg-EdniobPBWv0TJ9QKT9qEvW8&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ntQAWyO_7uLCIf9wHrfePXFHSc-IIXMp",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ntQAWyO_7uLCIf9wHrfePXFHSc-IIXMp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Ydnq8QM6T1T9AKMEOrfNDraSHoMxObn7",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ydnq8QM6T1T9AKMEOrfNDraSHoMxObn7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1q2v0Rr74l9kUM6YaEdiRlGAflJ9SC7UQ",
        "name": "10.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1q2v0Rr74l9kUM6YaEdiRlGAflJ9SC7UQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12klVsx2cyEnDovtViAa5dBeiQM7cXxfZ",
        "name": "11.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12klVsx2cyEnDovtViAa5dBeiQM7cXxfZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1w1Aw9OSSXP32mWvbluBO_009eXdBVQLQ",
        "name": "12.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1w1Aw9OSSXP32mWvbluBO_009eXdBVQLQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ybUaqgMFHgMJZFODkp-QRs94w1_A1Hk6",
        "name": "13.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ybUaqgMFHgMJZFODkp-QRs94w1_A1Hk6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rysrcKCnBOioJ7gV7YA3pszEIn3l49OP",
        "name": "14.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rysrcKCnBOioJ7gV7YA3pszEIn3l49OP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1djQPdU6LcYGfy5XMK81tqsAby8XWgeAy",
        "name": "15.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1djQPdU6LcYGfy5XMK81tqsAby8XWgeAy&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PBKLFuvapiYt1QtvB34Hsiq8bq2hdnvO",
        "name": "16.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PBKLFuvapiYt1QtvB34Hsiq8bq2hdnvO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Pl8nauoxXnVzooJKt-OU_C6r-DFehzGk",
        "name": "17.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pl8nauoxXnVzooJKt-OU_C6r-DFehzGk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CaH1jHWBCiJdAXQQuNzNL6fVBy9Gs5ch",
        "name": "18.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CaH1jHWBCiJdAXQQuNzNL6fVBy9Gs5ch&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10BZtdodqSMv4L-_6PzB-dr74tc4gEfVp",
        "name": "19.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10BZtdodqSMv4L-_6PzB-dr74tc4gEfVp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1XRwK9-VpHRrd4cJmdBJLkI5UZx5-RY_1",
        "name": "20.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XRwK9-VpHRrd4cJmdBJLkI5UZx5-RY_1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19PtC_wbI8wtvwLUbR7W8foYJNsnik079",
        "name": "21.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19PtC_wbI8wtvwLUbR7W8foYJNsnik079&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xye66aCOes9XU6_2H7uZP_aH4KhnDciJ",
        "name": "22.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xye66aCOes9XU6_2H7uZP_aH4KhnDciJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1BsUSbBDodVUZxRtNOlHLyn7zKx11PPwT",
        "name": "23.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BsUSbBDodVUZxRtNOlHLyn7zKx11PPwT&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12K4CbmGp4kO_F9T6IgQ9uQDFQrRnKutV",
        "name": "24.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12K4CbmGp4kO_F9T6IgQ9uQDFQrRnKutV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eXW3oUAyusZH-3y3aGYTkHWT10D-bMse",
        "name": "25.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eXW3oUAyusZH-3y3aGYTkHWT10D-bMse&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=103keIRiAHgmrQNXPxozutQdOw4f5s1zH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xhMn5NVH59__k-odL5wumXqEiFnMrwlU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RDjvpaItyOK0euCGBQePYtfoH5aoPWye&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z1PzKcPAohatBybXO9aDtCUCUvz7qUHK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UskFG2TwChK2Ar9zjjUK9AETiGTWFpz1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13WrfKGdeQX1qS4ncfGKaJak7u217Isu-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ft55bD83hgtKkd1rLljk9cP5jGI_buD7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r3pONYOg-EdniobPBWv0TJ9QKT9qEvW8&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ntQAWyO_7uLCIf9wHrfePXFHSc-IIXMp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ydnq8QM6T1T9AKMEOrfNDraSHoMxObn7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1q2v0Rr74l9kUM6YaEdiRlGAflJ9SC7UQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12klVsx2cyEnDovtViAa5dBeiQM7cXxfZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1w1Aw9OSSXP32mWvbluBO_009eXdBVQLQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ybUaqgMFHgMJZFODkp-QRs94w1_A1Hk6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rysrcKCnBOioJ7gV7YA3pszEIn3l49OP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1djQPdU6LcYGfy5XMK81tqsAby8XWgeAy&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PBKLFuvapiYt1QtvB34Hsiq8bq2hdnvO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pl8nauoxXnVzooJKt-OU_C6r-DFehzGk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CaH1jHWBCiJdAXQQuNzNL6fVBy9Gs5ch&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10BZtdodqSMv4L-_6PzB-dr74tc4gEfVp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XRwK9-VpHRrd4cJmdBJLkI5UZx5-RY_1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19PtC_wbI8wtvwLUbR7W8foYJNsnik079&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xye66aCOes9XU6_2H7uZP_aH4KhnDciJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BsUSbBDodVUZxRtNOlHLyn7zKx11PPwT&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12K4CbmGp4kO_F9T6IgQ9uQDFQrRnKutV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eXW3oUAyusZH-3y3aGYTkHWT10D-bMse&v=2"
    ]
  },
  "1NG72VdBD7wrT7ZXYugLTA3phF1KfkO_a": {
    "folderId": "1NG72VdBD7wrT7ZXYugLTA3phF1KfkO_a",
    "folderName": "Mr. Suman",
    "sheetProjectId": "SV-061",
    "customerName": "Mr. Suman",
    "location": "RamanthaPuram / Rameswaram",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U",
        "name": "0.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1imYwoEv__ckWxAm5jwpm3HxNuwdHKzD_",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1imYwoEv__ckWxAm5jwpm3HxNuwdHKzD_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "14V5UvdGEd6NLShfjko55K0Nt_Svw4fCa",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14V5UvdGEd6NLShfjko55K0Nt_Svw4fCa&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1caleCuUao0FCOk46bfKbDvIopT_k5c3j",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1caleCuUao0FCOk46bfKbDvIopT_k5c3j&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1zhrNgd96dscSapFMwsqVmmIgu0FfXXWS",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zhrNgd96dscSapFMwsqVmmIgu0FfXXWS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jfHg9pAd5J-UVqd4MU8ZI5TbbVRAYrmU",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jfHg9pAd5J-UVqd4MU8ZI5TbbVRAYrmU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x5dMcpXgSVUSrq7ISmsY3i_Tg0QbTJJi",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x5dMcpXgSVUSrq7ISmsY3i_Tg0QbTJJi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1QZFroJDmiLhoWzrnRpaVf7ZrllC7PaKe",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QZFroJDmiLhoWzrnRpaVf7ZrllC7PaKe&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1imYwoEv__ckWxAm5jwpm3HxNuwdHKzD_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14V5UvdGEd6NLShfjko55K0Nt_Svw4fCa&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1caleCuUao0FCOk46bfKbDvIopT_k5c3j&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zhrNgd96dscSapFMwsqVmmIgu0FfXXWS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jfHg9pAd5J-UVqd4MU8ZI5TbbVRAYrmU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x5dMcpXgSVUSrq7ISmsY3i_Tg0QbTJJi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QZFroJDmiLhoWzrnRpaVf7ZrllC7PaKe&v=2"
    ]
  },
  "sv-061": {
    "folderId": "1NG72VdBD7wrT7ZXYugLTA3phF1KfkO_a",
    "folderName": "Mr. Suman",
    "sheetProjectId": "SV-061",
    "customerName": "Mr. Suman",
    "location": "RamanthaPuram / Rameswaram",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U",
        "name": "0.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1imYwoEv__ckWxAm5jwpm3HxNuwdHKzD_",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1imYwoEv__ckWxAm5jwpm3HxNuwdHKzD_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "14V5UvdGEd6NLShfjko55K0Nt_Svw4fCa",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14V5UvdGEd6NLShfjko55K0Nt_Svw4fCa&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1caleCuUao0FCOk46bfKbDvIopT_k5c3j",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1caleCuUao0FCOk46bfKbDvIopT_k5c3j&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1zhrNgd96dscSapFMwsqVmmIgu0FfXXWS",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zhrNgd96dscSapFMwsqVmmIgu0FfXXWS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jfHg9pAd5J-UVqd4MU8ZI5TbbVRAYrmU",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jfHg9pAd5J-UVqd4MU8ZI5TbbVRAYrmU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x5dMcpXgSVUSrq7ISmsY3i_Tg0QbTJJi",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x5dMcpXgSVUSrq7ISmsY3i_Tg0QbTJJi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1QZFroJDmiLhoWzrnRpaVf7ZrllC7PaKe",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QZFroJDmiLhoWzrnRpaVf7ZrllC7PaKe&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-Wn2Mps4GrS4rSBhiDQFS_CKg0Xzg4U&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1imYwoEv__ckWxAm5jwpm3HxNuwdHKzD_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14V5UvdGEd6NLShfjko55K0Nt_Svw4fCa&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1caleCuUao0FCOk46bfKbDvIopT_k5c3j&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zhrNgd96dscSapFMwsqVmmIgu0FfXXWS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jfHg9pAd5J-UVqd4MU8ZI5TbbVRAYrmU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x5dMcpXgSVUSrq7ISmsY3i_Tg0QbTJJi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QZFroJDmiLhoWzrnRpaVf7ZrllC7PaKe&v=2"
    ]
  },
  "1FJ0xx2Nc6xlrYrBiwhkHsf_RXsoPdTyH": {
    "folderId": "1FJ0xx2Nc6xlrYrBiwhkHsf_RXsoPdTyH",
    "folderName": "Mr. Sunil Vitkar",
    "sheetProjectId": "SV-059",
    "customerName": "Mr. Sunil Vitkar",
    "location": "Pune",
    "structureType": "Freestanding Unit",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 1,
    "videoCount": 0,
    "totalMediaCount": 1,
    "media": [
      {
        "id": "10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D&v=2"
    ]
  },
  "sv-059": {
    "folderId": "1FJ0xx2Nc6xlrYrBiwhkHsf_RXsoPdTyH",
    "folderName": "Mr. Sunil Vitkar",
    "sheetProjectId": "SV-059",
    "customerName": "Mr. Sunil Vitkar",
    "location": "Pune",
    "structureType": "Freestanding Unit",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 1,
    "videoCount": 0,
    "totalMediaCount": 1,
    "media": [
      {
        "id": "10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10h1fMq1pmC5i3HWLJ_mPCSuyMiBCwG0D&v=2"
    ]
  },
  "1Ku_zAota0elWcmKX_ATU-MslAqGy5GCt": {
    "folderId": "1Ku_zAota0elWcmKX_ATU-MslAqGy5GCt",
    "folderName": "Mr. Kiran",
    "sheetProjectId": "SV-052",
    "customerName": "Mr. Kiran",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qUVTYsTCcR0wbB1RfdBMEt5yZPaKPmyP",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qUVTYsTCcR0wbB1RfdBMEt5yZPaKPmyP&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qUVTYsTCcR0wbB1RfdBMEt5yZPaKPmyP&v=2"
    ]
  },
  "sv-052": {
    "folderId": "1Ku_zAota0elWcmKX_ATU-MslAqGy5GCt",
    "folderName": "Mr. Kiran",
    "sheetProjectId": "SV-052",
    "customerName": "Mr. Kiran",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qUVTYsTCcR0wbB1RfdBMEt5yZPaKPmyP",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qUVTYsTCcR0wbB1RfdBMEt5yZPaKPmyP&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19j8bj91SRcgW74HtCgN0ZJbJtRyRANaq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qUVTYsTCcR0wbB1RfdBMEt5yZPaKPmyP&v=2"
    ]
  },
  "1Ppm29czTUGTvSSR_9if1Qxykq3kZabxO": {
    "folderId": "1Ppm29czTUGTvSSR_9if1Qxykq3kZabxO",
    "folderName": "Mr. Dhana Arun",
    "sheetProjectId": "SV-063",
    "customerName": "Ms. Dhana Arun",
    "location": "Chennai",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "17nOJz932mQhXLITj52KIoeboZwQ16cTo",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17nOJz932mQhXLITj52KIoeboZwQ16cTo&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "17nOJz932mQhXLITj52KIoeboZwQ16cTo",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17nOJz932mQhXLITj52KIoeboZwQ16cTo&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Giag5GyAvhNwDxDr4oA2G-26K7GxfDDM",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Giag5GyAvhNwDxDr4oA2G-26K7GxfDDM&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17nOJz932mQhXLITj52KIoeboZwQ16cTo&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Giag5GyAvhNwDxDr4oA2G-26K7GxfDDM&v=2"
    ]
  },
  "sv-063": {
    "folderId": "1Ppm29czTUGTvSSR_9if1Qxykq3kZabxO",
    "folderName": "Mr. Dhana Arun",
    "sheetProjectId": "SV-063",
    "customerName": "Ms. Dhana Arun",
    "location": "Chennai",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "17nOJz932mQhXLITj52KIoeboZwQ16cTo",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17nOJz932mQhXLITj52KIoeboZwQ16cTo&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "17nOJz932mQhXLITj52KIoeboZwQ16cTo",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17nOJz932mQhXLITj52KIoeboZwQ16cTo&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Giag5GyAvhNwDxDr4oA2G-26K7GxfDDM",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Giag5GyAvhNwDxDr4oA2G-26K7GxfDDM&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17nOJz932mQhXLITj52KIoeboZwQ16cTo&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Giag5GyAvhNwDxDr4oA2G-26K7GxfDDM&v=2"
    ]
  },
  "1IXD_z_HZX6E37fubHvPh49WLvNmreft7": {
    "folderId": "1IXD_z_HZX6E37fubHvPh49WLvNmreft7",
    "folderName": "Mr. Shankarnarayan",
    "sheetProjectId": "SV-036",
    "customerName": "Mr. Shankarnarayan",
    "location": "Chennai",
    "structureType": "Freestanding Unit",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 5,
    "videoCount": 0,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PJ7kQUMIvzPE8j9XtinItgJKvGWkluYq",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PJ7kQUMIvzPE8j9XtinItgJKvGWkluYq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1MyUuE9EYFjClckviWQqf8DWTYKLOsqmj",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MyUuE9EYFjClckviWQqf8DWTYKLOsqmj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sz9ip-XhUcxIB57t8ukhPeHlXydOdCbp",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sz9ip-XhUcxIB57t8ukhPeHlXydOdCbp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1g7_byIZu5rfLLEF-qs4LMKR4JB-oLgUg",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g7_byIZu5rfLLEF-qs4LMKR4JB-oLgUg&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PJ7kQUMIvzPE8j9XtinItgJKvGWkluYq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MyUuE9EYFjClckviWQqf8DWTYKLOsqmj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sz9ip-XhUcxIB57t8ukhPeHlXydOdCbp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g7_byIZu5rfLLEF-qs4LMKR4JB-oLgUg&v=2"
    ]
  },
  "sv-036": {
    "folderId": "1IXD_z_HZX6E37fubHvPh49WLvNmreft7",
    "folderName": "Mr. Shankarnarayan",
    "sheetProjectId": "SV-036",
    "customerName": "Mr. Shankarnarayan",
    "location": "Chennai",
    "structureType": "Freestanding Unit",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 5,
    "videoCount": 0,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PJ7kQUMIvzPE8j9XtinItgJKvGWkluYq",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PJ7kQUMIvzPE8j9XtinItgJKvGWkluYq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1MyUuE9EYFjClckviWQqf8DWTYKLOsqmj",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MyUuE9EYFjClckviWQqf8DWTYKLOsqmj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sz9ip-XhUcxIB57t8ukhPeHlXydOdCbp",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sz9ip-XhUcxIB57t8ukhPeHlXydOdCbp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1g7_byIZu5rfLLEF-qs4LMKR4JB-oLgUg",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g7_byIZu5rfLLEF-qs4LMKR4JB-oLgUg&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14IcheoFPq8mLFoZLqA1OKTjN2JLJYgCk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PJ7kQUMIvzPE8j9XtinItgJKvGWkluYq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MyUuE9EYFjClckviWQqf8DWTYKLOsqmj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sz9ip-XhUcxIB57t8ukhPeHlXydOdCbp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g7_byIZu5rfLLEF-qs4LMKR4JB-oLgUg&v=2"
    ]
  },
  "1j6fcLWEsiqbwRUxMWCwySxB-uqYs-JAG": {
    "folderId": "1j6fcLWEsiqbwRUxMWCwySxB-uqYs-JAG",
    "folderName": "Ms. Yashwitha reddy",
    "sheetProjectId": "SV-048",
    "customerName": "Ms. Yashwitha reddy",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 5,
    "videoCount": 0,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY",
        "name": "0.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vka3_9fgxMs1rxp00fJegD3CYAFiZiIY",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vka3_9fgxMs1rxp00fJegD3CYAFiZiIY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xS6cY3NBBR5pD2_HU5cGNH-m6E2mqjOk",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xS6cY3NBBR5pD2_HU5cGNH-m6E2mqjOk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x1H_CYcqhpqkX3Je9w3rtIOfqqxooLuE",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x1H_CYcqhpqkX3Je9w3rtIOfqqxooLuE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12YEdupaNWCgtQ-kAOW9Y6ftNj4W6oCzf",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12YEdupaNWCgtQ-kAOW9Y6ftNj4W6oCzf&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vka3_9fgxMs1rxp00fJegD3CYAFiZiIY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xS6cY3NBBR5pD2_HU5cGNH-m6E2mqjOk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x1H_CYcqhpqkX3Je9w3rtIOfqqxooLuE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12YEdupaNWCgtQ-kAOW9Y6ftNj4W6oCzf&v=2"
    ]
  },
  "sv-048": {
    "folderId": "1j6fcLWEsiqbwRUxMWCwySxB-uqYs-JAG",
    "folderName": "Ms. Yashwitha reddy",
    "sheetProjectId": "SV-048",
    "customerName": "Ms. Yashwitha reddy",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 5,
    "videoCount": 0,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY",
        "name": "0.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vka3_9fgxMs1rxp00fJegD3CYAFiZiIY",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vka3_9fgxMs1rxp00fJegD3CYAFiZiIY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xS6cY3NBBR5pD2_HU5cGNH-m6E2mqjOk",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xS6cY3NBBR5pD2_HU5cGNH-m6E2mqjOk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x1H_CYcqhpqkX3Je9w3rtIOfqqxooLuE",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x1H_CYcqhpqkX3Je9w3rtIOfqqxooLuE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12YEdupaNWCgtQ-kAOW9Y6ftNj4W6oCzf",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12YEdupaNWCgtQ-kAOW9Y6ftNj4W6oCzf&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10I2KunvuZCfYV-cOHEJnXELLVy9HZ_rY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vka3_9fgxMs1rxp00fJegD3CYAFiZiIY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xS6cY3NBBR5pD2_HU5cGNH-m6E2mqjOk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x1H_CYcqhpqkX3Je9w3rtIOfqqxooLuE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12YEdupaNWCgtQ-kAOW9Y6ftNj4W6oCzf&v=2"
    ]
  },
  "1-fVIJM9eKo7Snqzq-LEAh-XLwu4NNXIx": {
    "folderId": "1-fVIJM9eKo7Snqzq-LEAh-XLwu4NNXIx",
    "folderName": "Mr. Vinay Deep",
    "sheetProjectId": "SV-057",
    "customerName": "Mr. Vinay Deep",
    "location": "Bengaluru",
    "structureType": "Freestanding Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NsGa3KTkeSB6mXCpfInqN7qOT_QIPZq6",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NsGa3KTkeSB6mXCpfInqN7qOT_QIPZq6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1_wNO0B1URbv8QhnB5yh_m12B7JKOLgMF",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wNO0B1URbv8QhnB5yh_m12B7JKOLgMF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13z7FoftIPye9ORMyEuzX2n6MOM85EaPh",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13z7FoftIPye9ORMyEuzX2n6MOM85EaPh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Oe6JstC-SyCZyyPrVTb83bsDJOoPIX_9",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Oe6JstC-SyCZyyPrVTb83bsDJOoPIX_9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1z7pGkyxfrvdu-l0RXr6dpa95FJOPTg7N",
        "name": "Screenshot 2026-11-07 132524.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z7pGkyxfrvdu-l0RXr6dpa95FJOPTg7N&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NsGa3KTkeSB6mXCpfInqN7qOT_QIPZq6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wNO0B1URbv8QhnB5yh_m12B7JKOLgMF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13z7FoftIPye9ORMyEuzX2n6MOM85EaPh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Oe6JstC-SyCZyyPrVTb83bsDJOoPIX_9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z7pGkyxfrvdu-l0RXr6dpa95FJOPTg7N&v=2"
    ]
  },
  "sv-057": {
    "folderId": "1-fVIJM9eKo7Snqzq-LEAh-XLwu4NNXIx",
    "folderName": "Mr. Vinay Deep",
    "sheetProjectId": "SV-057",
    "customerName": "Mr. Vinay Deep",
    "location": "Bengaluru",
    "structureType": "Freestanding Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NsGa3KTkeSB6mXCpfInqN7qOT_QIPZq6",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NsGa3KTkeSB6mXCpfInqN7qOT_QIPZq6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1_wNO0B1URbv8QhnB5yh_m12B7JKOLgMF",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wNO0B1URbv8QhnB5yh_m12B7JKOLgMF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13z7FoftIPye9ORMyEuzX2n6MOM85EaPh",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13z7FoftIPye9ORMyEuzX2n6MOM85EaPh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Oe6JstC-SyCZyyPrVTb83bsDJOoPIX_9",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Oe6JstC-SyCZyyPrVTb83bsDJOoPIX_9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1z7pGkyxfrvdu-l0RXr6dpa95FJOPTg7N",
        "name": "Screenshot 2026-11-07 132524.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z7pGkyxfrvdu-l0RXr6dpa95FJOPTg7N&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c6bzd4XKF2OTt8hQGzSuWmpyGm_4JHVv&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NsGa3KTkeSB6mXCpfInqN7qOT_QIPZq6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wNO0B1URbv8QhnB5yh_m12B7JKOLgMF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13z7FoftIPye9ORMyEuzX2n6MOM85EaPh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Oe6JstC-SyCZyyPrVTb83bsDJOoPIX_9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z7pGkyxfrvdu-l0RXr6dpa95FJOPTg7N&v=2"
    ]
  },
  "18r1VdTO5QoaXtGVp1HqA6aQ7tMscfJFU": {
    "folderId": "18r1VdTO5QoaXtGVp1HqA6aQ7tMscfJFU",
    "folderName": "Ms. Vinutha Naik",
    "sheetProjectId": "SV-026",
    "customerName": "Ms. Vinutha Naik",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VrowPmENng84q3LrTK1O0XhJC7Gm80_m",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VrowPmENng84q3LrTK1O0XhJC7Gm80_m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1S1WpLEfzrv7tOhNIJthxRaE1Z1mrBNLb",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1S1WpLEfzrv7tOhNIJthxRaE1Z1mrBNLb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1EeNAF5S4q_L-QFt-rIzbqly6Os-8AcGm",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EeNAF5S4q_L-QFt-rIzbqly6Os-8AcGm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1RyukFLATkFrBQ0wHp5M2Kjt_JPB31Rd0",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RyukFLATkFrBQ0wHp5M2Kjt_JPB31Rd0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OXHAQpqatbO45QpCy1cH7cS42m0i0Cj9",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OXHAQpqatbO45QpCy1cH7cS42m0i0Cj9&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VrowPmENng84q3LrTK1O0XhJC7Gm80_m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1S1WpLEfzrv7tOhNIJthxRaE1Z1mrBNLb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EeNAF5S4q_L-QFt-rIzbqly6Os-8AcGm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RyukFLATkFrBQ0wHp5M2Kjt_JPB31Rd0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OXHAQpqatbO45QpCy1cH7cS42m0i0Cj9&v=2"
    ]
  },
  "sv-026": {
    "folderId": "18r1VdTO5QoaXtGVp1HqA6aQ7tMscfJFU",
    "folderName": "Ms. Vinutha Naik",
    "sheetProjectId": "SV-026",
    "customerName": "Ms. Vinutha Naik",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VrowPmENng84q3LrTK1O0XhJC7Gm80_m",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VrowPmENng84q3LrTK1O0XhJC7Gm80_m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1S1WpLEfzrv7tOhNIJthxRaE1Z1mrBNLb",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1S1WpLEfzrv7tOhNIJthxRaE1Z1mrBNLb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1EeNAF5S4q_L-QFt-rIzbqly6Os-8AcGm",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EeNAF5S4q_L-QFt-rIzbqly6Os-8AcGm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1RyukFLATkFrBQ0wHp5M2Kjt_JPB31Rd0",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RyukFLATkFrBQ0wHp5M2Kjt_JPB31Rd0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OXHAQpqatbO45QpCy1cH7cS42m0i0Cj9",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OXHAQpqatbO45QpCy1cH7cS42m0i0Cj9&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NT3bh-2sLlNI-0I8qd1d_Oct-GMvFn0S&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VrowPmENng84q3LrTK1O0XhJC7Gm80_m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1S1WpLEfzrv7tOhNIJthxRaE1Z1mrBNLb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1EeNAF5S4q_L-QFt-rIzbqly6Os-8AcGm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RyukFLATkFrBQ0wHp5M2Kjt_JPB31Rd0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OXHAQpqatbO45QpCy1cH7cS42m0i0Cj9&v=2"
    ]
  },
  "1z05ABfiv023kdXoYagA9JgP-9Z2cVOlf": {
    "folderId": "1z05ABfiv023kdXoYagA9JgP-9Z2cVOlf",
    "folderName": "Mr. Ramachandra",
    "sheetProjectId": "SV-016",
    "customerName": "Mr. Ranachandra",
    "location": "Puttaparthi",
    "structureType": "Wall Unit",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZGe_eZhzYjUjAbQH0YXb9GlCgGgrJ3io",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZGe_eZhzYjUjAbQH0YXb9GlCgGgrJ3io&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1B59p07H0bHtEP9Ux_gjXG2kAHQpjW8XU",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B59p07H0bHtEP9Ux_gjXG2kAHQpjW8XU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gts-uc2LOYRueRGpHUVKbP1n8xUEwG0u",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gts-uc2LOYRueRGpHUVKbP1n8xUEwG0u&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZGe_eZhzYjUjAbQH0YXb9GlCgGgrJ3io&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B59p07H0bHtEP9Ux_gjXG2kAHQpjW8XU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gts-uc2LOYRueRGpHUVKbP1n8xUEwG0u&v=2"
    ]
  },
  "sv-016": {
    "folderId": "1z05ABfiv023kdXoYagA9JgP-9Z2cVOlf",
    "folderName": "Mr. Ramachandra",
    "sheetProjectId": "SV-016",
    "customerName": "Mr. Ranachandra",
    "location": "Puttaparthi",
    "structureType": "Wall Unit",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZGe_eZhzYjUjAbQH0YXb9GlCgGgrJ3io",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZGe_eZhzYjUjAbQH0YXb9GlCgGgrJ3io&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1B59p07H0bHtEP9Ux_gjXG2kAHQpjW8XU",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B59p07H0bHtEP9Ux_gjXG2kAHQpjW8XU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gts-uc2LOYRueRGpHUVKbP1n8xUEwG0u",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gts-uc2LOYRueRGpHUVKbP1n8xUEwG0u&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15JcVO9v0Lm8R6QapBGfkGTGTjxR5Wvqj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZGe_eZhzYjUjAbQH0YXb9GlCgGgrJ3io&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B59p07H0bHtEP9Ux_gjXG2kAHQpjW8XU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gts-uc2LOYRueRGpHUVKbP1n8xUEwG0u&v=2"
    ]
  },
  "1km5ahXFAtHczYzMojZh5v3D_wsue1GzQ": {
    "folderId": "1km5ahXFAtHczYzMojZh5v3D_wsue1GzQ",
    "folderName": "Ms. Aditi Pratap",
    "sheetProjectId": "SV-087",
    "customerName": "Ms. Aditi Pratap",
    "location": "Gurugram",
    "structureType": "Farmhouse Temple",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YwH8EOkRwj6s8BWWcav7gTdjnG_YgKm7",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YwH8EOkRwj6s8BWWcav7gTdjnG_YgKm7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1M4q3AijfHKvHw64NBZZzJr2SJm6Oeryn",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1M4q3AijfHKvHw64NBZZzJr2SJm6Oeryn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HQrzGYRIse-rywm6-DLOOnbfU8RC11zZ",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HQrzGYRIse-rywm6-DLOOnbfU8RC11zZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YwH8EOkRwj6s8BWWcav7gTdjnG_YgKm7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1M4q3AijfHKvHw64NBZZzJr2SJm6Oeryn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HQrzGYRIse-rywm6-DLOOnbfU8RC11zZ&v=2"
    ]
  },
  "sv-087": {
    "folderId": "1km5ahXFAtHczYzMojZh5v3D_wsue1GzQ",
    "folderName": "Ms. Aditi Pratap",
    "sheetProjectId": "SV-087",
    "customerName": "Ms. Aditi Pratap",
    "location": "Gurugram",
    "structureType": "Farmhouse Temple",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YwH8EOkRwj6s8BWWcav7gTdjnG_YgKm7",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YwH8EOkRwj6s8BWWcav7gTdjnG_YgKm7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1M4q3AijfHKvHw64NBZZzJr2SJm6Oeryn",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1M4q3AijfHKvHw64NBZZzJr2SJm6Oeryn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HQrzGYRIse-rywm6-DLOOnbfU8RC11zZ",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HQrzGYRIse-rywm6-DLOOnbfU8RC11zZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B_l-inpyQeltY_DQV1i2jd2unJp1bJsL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YwH8EOkRwj6s8BWWcav7gTdjnG_YgKm7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1M4q3AijfHKvHw64NBZZzJr2SJm6Oeryn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HQrzGYRIse-rywm6-DLOOnbfU8RC11zZ&v=2"
    ]
  },
  "1S72kqPxH1kIVMUwzp1mg7QZOIQYiK-LP": {
    "folderId": "1S72kqPxH1kIVMUwzp1mg7QZOIQYiK-LP",
    "folderName": "Ms.Gayatri Pal",
    "sheetProjectId": "SV-075",
    "customerName": "Ms. Gayatri Pal",
    "location": "Bengaluru",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 31,
    "videoCount": 0,
    "totalMediaCount": 31,
    "media": [
      {
        "id": "1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1R883wnyyFaoZsD-P5oy5CI7Dy5ol5n-P",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1R883wnyyFaoZsD-P5oy5CI7Dy5ol5n-P&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1E-kdSehfe8Sx458Tha4J_RpqQO1hilNn",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1E-kdSehfe8Sx458Tha4J_RpqQO1hilNn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10o-FeS9gn_YIvq4k1TzMe-dHrnD6t-0V",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10o-FeS9gn_YIvq4k1TzMe-dHrnD6t-0V&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZdYzSjz0Zwka8dwpqNI79q_PY60jySx3",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZdYzSjz0Zwka8dwpqNI79q_PY60jySx3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CheQ05Om6_XR9uVmNsJNhqRY-aJWQCm-",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CheQ05Om6_XR9uVmNsJNhqRY-aJWQCm-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1GKOBFJQGlycusQ4hx_5Nl1GJedbJKYJX",
        "name": "6.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GKOBFJQGlycusQ4hx_5Nl1GJedbJKYJX&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qEPlkwhSghrBhSVJu1sCiBqIq3VdgSi5",
        "name": "7.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qEPlkwhSghrBhSVJu1sCiBqIq3VdgSi5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pl5ShIYENnG4JoAZmMmQV_6CiDk30exL",
        "name": "8.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pl5ShIYENnG4JoAZmMmQV_6CiDk30exL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eFupUHOdRyDUYmkWFV69GT3hEV77BNVd",
        "name": "9.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eFupUHOdRyDUYmkWFV69GT3hEV77BNVd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1RBRolKJRY84XpO8ATRP4YnWfUJMKIjog",
        "name": "10.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RBRolKJRY84XpO8ATRP4YnWfUJMKIjog&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11RUC4ZJUYeBEPHgwqXf0N6m5RphQah4D",
        "name": "11.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11RUC4ZJUYeBEPHgwqXf0N6m5RphQah4D&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "18811jGL4lcPgc_-RB6rql3NGdidlK0No",
        "name": "12.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18811jGL4lcPgc_-RB6rql3NGdidlK0No&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ane0RL3HvhKO6tCOPEC9ju4i7gcE1L2M",
        "name": "13.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ane0RL3HvhKO6tCOPEC9ju4i7gcE1L2M&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eGIHOqi9NMXKKO8zPj8qmoH7tpYGgNO6",
        "name": "14.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eGIHOqi9NMXKKO8zPj8qmoH7tpYGgNO6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12w6C7xvXqkhBLhknlz7LJ5ov4yxH5lAl",
        "name": "15.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12w6C7xvXqkhBLhknlz7LJ5ov4yxH5lAl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HHz7LYEzrlL7N4-ssHBuW1k3fvAIZMCJ",
        "name": "16.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HHz7LYEzrlL7N4-ssHBuW1k3fvAIZMCJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Sv3KsUDEEAKaUqiqv3nmI9539wJlXJQW",
        "name": "17.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Sv3KsUDEEAKaUqiqv3nmI9539wJlXJQW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1FpXr_keGiZg8wY7DDf-OVDjRdahjl07e",
        "name": "18.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FpXr_keGiZg8wY7DDf-OVDjRdahjl07e&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "18PpsR6_ifZB8OqULPTGHxREHxpy3MGI0",
        "name": "19.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18PpsR6_ifZB8OqULPTGHxREHxpy3MGI0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bJz3yKU9jDvFQv_hvrQapdEenC5CLKe6",
        "name": "20.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bJz3yKU9jDvFQv_hvrQapdEenC5CLKe6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1_wzX4LgvoV9scv0moXO_ufUGC0Kv5ZEu",
        "name": "21.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wzX4LgvoV9scv0moXO_ufUGC0Kv5ZEu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1t-ecfUPIuEXs6RS7ez2bFIgs2jK8O3Iq",
        "name": "22.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t-ecfUPIuEXs6RS7ez2bFIgs2jK8O3Iq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "185PGjMZLlbNA7AtYtR9st4ZQNoqtYvND",
        "name": "23.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=185PGjMZLlbNA7AtYtR9st4ZQNoqtYvND&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1er1NgN5rXmP2mGdaD2sc0BysrSGm_xdt",
        "name": "24.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1er1NgN5rXmP2mGdaD2sc0BysrSGm_xdt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gE716hvv_hK9_qmslOlfOprJIJEz9PWB",
        "name": "25.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gE716hvv_hK9_qmslOlfOprJIJEz9PWB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HluxuaG5Ndu1ufZl9RuKcTQWf8woXD_R",
        "name": "26.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HluxuaG5Ndu1ufZl9RuKcTQWf8woXD_R&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11jGwWtfFvzoH2z1fTeZv_vsRXKm6Jtfg",
        "name": "27.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11jGwWtfFvzoH2z1fTeZv_vsRXKm6Jtfg&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CEGkpOXxxBI8sAVdZuBA70w0jvoSHl5B",
        "name": "28.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CEGkpOXxxBI8sAVdZuBA70w0jvoSHl5B&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1IiGLd2c5wN26iuXmc79oxNsExq7KIAMC",
        "name": "29.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IiGLd2c5wN26iuXmc79oxNsExq7KIAMC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O7v6q2lba6FOemZIreC7D74imAkpC1VN",
        "name": "31.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O7v6q2lba6FOemZIreC7D74imAkpC1VN&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1R883wnyyFaoZsD-P5oy5CI7Dy5ol5n-P&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1E-kdSehfe8Sx458Tha4J_RpqQO1hilNn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10o-FeS9gn_YIvq4k1TzMe-dHrnD6t-0V&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZdYzSjz0Zwka8dwpqNI79q_PY60jySx3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CheQ05Om6_XR9uVmNsJNhqRY-aJWQCm-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GKOBFJQGlycusQ4hx_5Nl1GJedbJKYJX&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qEPlkwhSghrBhSVJu1sCiBqIq3VdgSi5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pl5ShIYENnG4JoAZmMmQV_6CiDk30exL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eFupUHOdRyDUYmkWFV69GT3hEV77BNVd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RBRolKJRY84XpO8ATRP4YnWfUJMKIjog&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11RUC4ZJUYeBEPHgwqXf0N6m5RphQah4D&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18811jGL4lcPgc_-RB6rql3NGdidlK0No&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ane0RL3HvhKO6tCOPEC9ju4i7gcE1L2M&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eGIHOqi9NMXKKO8zPj8qmoH7tpYGgNO6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12w6C7xvXqkhBLhknlz7LJ5ov4yxH5lAl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HHz7LYEzrlL7N4-ssHBuW1k3fvAIZMCJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Sv3KsUDEEAKaUqiqv3nmI9539wJlXJQW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FpXr_keGiZg8wY7DDf-OVDjRdahjl07e&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18PpsR6_ifZB8OqULPTGHxREHxpy3MGI0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bJz3yKU9jDvFQv_hvrQapdEenC5CLKe6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wzX4LgvoV9scv0moXO_ufUGC0Kv5ZEu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t-ecfUPIuEXs6RS7ez2bFIgs2jK8O3Iq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=185PGjMZLlbNA7AtYtR9st4ZQNoqtYvND&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1er1NgN5rXmP2mGdaD2sc0BysrSGm_xdt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gE716hvv_hK9_qmslOlfOprJIJEz9PWB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HluxuaG5Ndu1ufZl9RuKcTQWf8woXD_R&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11jGwWtfFvzoH2z1fTeZv_vsRXKm6Jtfg&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CEGkpOXxxBI8sAVdZuBA70w0jvoSHl5B&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IiGLd2c5wN26iuXmc79oxNsExq7KIAMC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O7v6q2lba6FOemZIreC7D74imAkpC1VN&v=2"
    ]
  },
  "sv-075": {
    "folderId": "1S72kqPxH1kIVMUwzp1mg7QZOIQYiK-LP",
    "folderName": "Ms.Gayatri Pal",
    "sheetProjectId": "SV-075",
    "customerName": "Ms. Gayatri Pal",
    "location": "Bengaluru",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 31,
    "videoCount": 0,
    "totalMediaCount": 31,
    "media": [
      {
        "id": "1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1R883wnyyFaoZsD-P5oy5CI7Dy5ol5n-P",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1R883wnyyFaoZsD-P5oy5CI7Dy5ol5n-P&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1E-kdSehfe8Sx458Tha4J_RpqQO1hilNn",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1E-kdSehfe8Sx458Tha4J_RpqQO1hilNn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10o-FeS9gn_YIvq4k1TzMe-dHrnD6t-0V",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10o-FeS9gn_YIvq4k1TzMe-dHrnD6t-0V&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZdYzSjz0Zwka8dwpqNI79q_PY60jySx3",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZdYzSjz0Zwka8dwpqNI79q_PY60jySx3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CheQ05Om6_XR9uVmNsJNhqRY-aJWQCm-",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CheQ05Om6_XR9uVmNsJNhqRY-aJWQCm-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1GKOBFJQGlycusQ4hx_5Nl1GJedbJKYJX",
        "name": "6.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GKOBFJQGlycusQ4hx_5Nl1GJedbJKYJX&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qEPlkwhSghrBhSVJu1sCiBqIq3VdgSi5",
        "name": "7.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qEPlkwhSghrBhSVJu1sCiBqIq3VdgSi5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pl5ShIYENnG4JoAZmMmQV_6CiDk30exL",
        "name": "8.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pl5ShIYENnG4JoAZmMmQV_6CiDk30exL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eFupUHOdRyDUYmkWFV69GT3hEV77BNVd",
        "name": "9.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eFupUHOdRyDUYmkWFV69GT3hEV77BNVd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1RBRolKJRY84XpO8ATRP4YnWfUJMKIjog",
        "name": "10.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RBRolKJRY84XpO8ATRP4YnWfUJMKIjog&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11RUC4ZJUYeBEPHgwqXf0N6m5RphQah4D",
        "name": "11.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11RUC4ZJUYeBEPHgwqXf0N6m5RphQah4D&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "18811jGL4lcPgc_-RB6rql3NGdidlK0No",
        "name": "12.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18811jGL4lcPgc_-RB6rql3NGdidlK0No&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ane0RL3HvhKO6tCOPEC9ju4i7gcE1L2M",
        "name": "13.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ane0RL3HvhKO6tCOPEC9ju4i7gcE1L2M&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eGIHOqi9NMXKKO8zPj8qmoH7tpYGgNO6",
        "name": "14.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eGIHOqi9NMXKKO8zPj8qmoH7tpYGgNO6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12w6C7xvXqkhBLhknlz7LJ5ov4yxH5lAl",
        "name": "15.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12w6C7xvXqkhBLhknlz7LJ5ov4yxH5lAl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HHz7LYEzrlL7N4-ssHBuW1k3fvAIZMCJ",
        "name": "16.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HHz7LYEzrlL7N4-ssHBuW1k3fvAIZMCJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Sv3KsUDEEAKaUqiqv3nmI9539wJlXJQW",
        "name": "17.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Sv3KsUDEEAKaUqiqv3nmI9539wJlXJQW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1FpXr_keGiZg8wY7DDf-OVDjRdahjl07e",
        "name": "18.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FpXr_keGiZg8wY7DDf-OVDjRdahjl07e&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "18PpsR6_ifZB8OqULPTGHxREHxpy3MGI0",
        "name": "19.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18PpsR6_ifZB8OqULPTGHxREHxpy3MGI0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bJz3yKU9jDvFQv_hvrQapdEenC5CLKe6",
        "name": "20.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bJz3yKU9jDvFQv_hvrQapdEenC5CLKe6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1_wzX4LgvoV9scv0moXO_ufUGC0Kv5ZEu",
        "name": "21.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wzX4LgvoV9scv0moXO_ufUGC0Kv5ZEu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1t-ecfUPIuEXs6RS7ez2bFIgs2jK8O3Iq",
        "name": "22.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t-ecfUPIuEXs6RS7ez2bFIgs2jK8O3Iq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "185PGjMZLlbNA7AtYtR9st4ZQNoqtYvND",
        "name": "23.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=185PGjMZLlbNA7AtYtR9st4ZQNoqtYvND&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1er1NgN5rXmP2mGdaD2sc0BysrSGm_xdt",
        "name": "24.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1er1NgN5rXmP2mGdaD2sc0BysrSGm_xdt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gE716hvv_hK9_qmslOlfOprJIJEz9PWB",
        "name": "25.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gE716hvv_hK9_qmslOlfOprJIJEz9PWB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HluxuaG5Ndu1ufZl9RuKcTQWf8woXD_R",
        "name": "26.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HluxuaG5Ndu1ufZl9RuKcTQWf8woXD_R&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11jGwWtfFvzoH2z1fTeZv_vsRXKm6Jtfg",
        "name": "27.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11jGwWtfFvzoH2z1fTeZv_vsRXKm6Jtfg&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CEGkpOXxxBI8sAVdZuBA70w0jvoSHl5B",
        "name": "28.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CEGkpOXxxBI8sAVdZuBA70w0jvoSHl5B&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1IiGLd2c5wN26iuXmc79oxNsExq7KIAMC",
        "name": "29.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IiGLd2c5wN26iuXmc79oxNsExq7KIAMC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O7v6q2lba6FOemZIreC7D74imAkpC1VN",
        "name": "31.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O7v6q2lba6FOemZIreC7D74imAkpC1VN&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wpZJWPQaomxGenZCoZqUNFlXQ3H_cMp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1R883wnyyFaoZsD-P5oy5CI7Dy5ol5n-P&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1E-kdSehfe8Sx458Tha4J_RpqQO1hilNn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10o-FeS9gn_YIvq4k1TzMe-dHrnD6t-0V&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZdYzSjz0Zwka8dwpqNI79q_PY60jySx3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CheQ05Om6_XR9uVmNsJNhqRY-aJWQCm-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GKOBFJQGlycusQ4hx_5Nl1GJedbJKYJX&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qEPlkwhSghrBhSVJu1sCiBqIq3VdgSi5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pl5ShIYENnG4JoAZmMmQV_6CiDk30exL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eFupUHOdRyDUYmkWFV69GT3hEV77BNVd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RBRolKJRY84XpO8ATRP4YnWfUJMKIjog&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11RUC4ZJUYeBEPHgwqXf0N6m5RphQah4D&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18811jGL4lcPgc_-RB6rql3NGdidlK0No&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ane0RL3HvhKO6tCOPEC9ju4i7gcE1L2M&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eGIHOqi9NMXKKO8zPj8qmoH7tpYGgNO6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12w6C7xvXqkhBLhknlz7LJ5ov4yxH5lAl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HHz7LYEzrlL7N4-ssHBuW1k3fvAIZMCJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Sv3KsUDEEAKaUqiqv3nmI9539wJlXJQW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FpXr_keGiZg8wY7DDf-OVDjRdahjl07e&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18PpsR6_ifZB8OqULPTGHxREHxpy3MGI0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bJz3yKU9jDvFQv_hvrQapdEenC5CLKe6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_wzX4LgvoV9scv0moXO_ufUGC0Kv5ZEu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t-ecfUPIuEXs6RS7ez2bFIgs2jK8O3Iq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=185PGjMZLlbNA7AtYtR9st4ZQNoqtYvND&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1er1NgN5rXmP2mGdaD2sc0BysrSGm_xdt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gE716hvv_hK9_qmslOlfOprJIJEz9PWB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HluxuaG5Ndu1ufZl9RuKcTQWf8woXD_R&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11jGwWtfFvzoH2z1fTeZv_vsRXKm6Jtfg&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CEGkpOXxxBI8sAVdZuBA70w0jvoSHl5B&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IiGLd2c5wN26iuXmc79oxNsExq7KIAMC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O7v6q2lba6FOemZIreC7D74imAkpC1VN&v=2"
    ]
  },
  "1B5HgT0RudzYrwQu1Qgb3q00rd1zmtvZO": {
    "folderId": "1B5HgT0RudzYrwQu1Qgb3q00rd1zmtvZO",
    "folderName": "Ms. Rutuja Pawar",
    "sheetProjectId": "SV-088",
    "customerName": "Ms. Rutuja Pawar",
    "location": "Mumbai",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 2,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1cVMZxNhA56IIZSC3vPvnKQb_GvR-K2aM",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cVMZxNhA56IIZSC3vPvnKQb_GvR-K2aM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bFrrjh9UMVd30ZVC_XQ1yU5kzYLJIiPv",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bFrrjh9UMVd30ZVC_XQ1yU5kzYLJIiPv&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Z_nkjcuSQ-R59hfepsTs5VZOTsjg0Dbi",
        "name": "4.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z_nkjcuSQ-R59hfepsTs5VZOTsjg0Dbi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1h93Oc4NFi4SpG7RnPf_gwMlatfXo3CWH",
        "name": "5.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h93Oc4NFi4SpG7RnPf_gwMlatfXo3CWH&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cVMZxNhA56IIZSC3vPvnKQb_GvR-K2aM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bFrrjh9UMVd30ZVC_XQ1yU5kzYLJIiPv&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z_nkjcuSQ-R59hfepsTs5VZOTsjg0Dbi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h93Oc4NFi4SpG7RnPf_gwMlatfXo3CWH&v=2"
    ]
  },
  "sv-088": {
    "folderId": "1B5HgT0RudzYrwQu1Qgb3q00rd1zmtvZO",
    "folderName": "Ms. Rutuja Pawar",
    "sheetProjectId": "SV-088",
    "customerName": "Ms. Rutuja Pawar",
    "location": "Mumbai",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 2,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1cVMZxNhA56IIZSC3vPvnKQb_GvR-K2aM",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cVMZxNhA56IIZSC3vPvnKQb_GvR-K2aM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bFrrjh9UMVd30ZVC_XQ1yU5kzYLJIiPv",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bFrrjh9UMVd30ZVC_XQ1yU5kzYLJIiPv&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Z_nkjcuSQ-R59hfepsTs5VZOTsjg0Dbi",
        "name": "4.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z_nkjcuSQ-R59hfepsTs5VZOTsjg0Dbi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1h93Oc4NFi4SpG7RnPf_gwMlatfXo3CWH",
        "name": "5.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h93Oc4NFi4SpG7RnPf_gwMlatfXo3CWH&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zA3Mr4r73MB0STahcy2v-dUnKPux-LcW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cVMZxNhA56IIZSC3vPvnKQb_GvR-K2aM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bFrrjh9UMVd30ZVC_XQ1yU5kzYLJIiPv&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z_nkjcuSQ-R59hfepsTs5VZOTsjg0Dbi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h93Oc4NFi4SpG7RnPf_gwMlatfXo3CWH&v=2"
    ]
  },
  "1-UpLSdpEKiMlFT0ja8nFyXAW36CgZV-H": {
    "folderId": "1-UpLSdpEKiMlFT0ja8nFyXAW36CgZV-H",
    "folderName": "Ms. vaishali",
    "sheetProjectId": "SV-084",
    "customerName": "Ms. Vaishali",
    "location": "Pune",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1u4oXG0EBpy6BZRSTmbO8EDj0vQwWQrcs",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u4oXG0EBpy6BZRSTmbO8EDj0vQwWQrcs&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vK_J-Mdf4yfCY6PPdmaAOBzcwqdSj5lh",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vK_J-Mdf4yfCY6PPdmaAOBzcwqdSj5lh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10IrV-J-e671SpHXSkEwPCe8clX8WbIMi",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10IrV-J-e671SpHXSkEwPCe8clX8WbIMi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1G8vVu_hK3htCIzRBk5dmP9iw0MDyHUyM",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G8vVu_hK3htCIzRBk5dmP9iw0MDyHUyM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "14Q6vkqcMjonZBYpyiGlBAz87ZeZ3c2yf",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14Q6vkqcMjonZBYpyiGlBAz87ZeZ3c2yf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xbSq-Gh2QjlcfQhIza1d_UEQAAXa46_1",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xbSq-Gh2QjlcfQhIza1d_UEQAAXa46_1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pNxeKk9neHXXxM831FZNJp3ozEJsMeFZ",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pNxeKk9neHXXxM831FZNJp3ozEJsMeFZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZPL7Oq5WvNpjZNUC85L2oznyU1Z9X8ht",
        "name": "4587bbbc-40a4-419d-944e-caff797eb095.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZPL7Oq5WvNpjZNUC85L2oznyU1Z9X8ht&v=2",
        "isSubfolder": true,
        "subfolder": "CONCEPT"
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u4oXG0EBpy6BZRSTmbO8EDj0vQwWQrcs&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vK_J-Mdf4yfCY6PPdmaAOBzcwqdSj5lh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10IrV-J-e671SpHXSkEwPCe8clX8WbIMi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G8vVu_hK3htCIzRBk5dmP9iw0MDyHUyM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14Q6vkqcMjonZBYpyiGlBAz87ZeZ3c2yf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xbSq-Gh2QjlcfQhIza1d_UEQAAXa46_1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pNxeKk9neHXXxM831FZNJp3ozEJsMeFZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZPL7Oq5WvNpjZNUC85L2oznyU1Z9X8ht&v=2"
    ]
  },
  "sv-084": {
    "folderId": "1-UpLSdpEKiMlFT0ja8nFyXAW36CgZV-H",
    "folderName": "Ms. vaishali",
    "sheetProjectId": "SV-084",
    "customerName": "Ms. Vaishali",
    "location": "Pune",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1u4oXG0EBpy6BZRSTmbO8EDj0vQwWQrcs",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u4oXG0EBpy6BZRSTmbO8EDj0vQwWQrcs&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vK_J-Mdf4yfCY6PPdmaAOBzcwqdSj5lh",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vK_J-Mdf4yfCY6PPdmaAOBzcwqdSj5lh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10IrV-J-e671SpHXSkEwPCe8clX8WbIMi",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10IrV-J-e671SpHXSkEwPCe8clX8WbIMi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1G8vVu_hK3htCIzRBk5dmP9iw0MDyHUyM",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G8vVu_hK3htCIzRBk5dmP9iw0MDyHUyM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "14Q6vkqcMjonZBYpyiGlBAz87ZeZ3c2yf",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14Q6vkqcMjonZBYpyiGlBAz87ZeZ3c2yf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1xbSq-Gh2QjlcfQhIza1d_UEQAAXa46_1",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xbSq-Gh2QjlcfQhIza1d_UEQAAXa46_1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pNxeKk9neHXXxM831FZNJp3ozEJsMeFZ",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pNxeKk9neHXXxM831FZNJp3ozEJsMeFZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZPL7Oq5WvNpjZNUC85L2oznyU1Z9X8ht",
        "name": "4587bbbc-40a4-419d-944e-caff797eb095.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZPL7Oq5WvNpjZNUC85L2oznyU1Z9X8ht&v=2",
        "isSubfolder": true,
        "subfolder": "CONCEPT"
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e5YMYT3UTXtGVTyF_Qdv4dMi-MLGqLo-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u4oXG0EBpy6BZRSTmbO8EDj0vQwWQrcs&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vK_J-Mdf4yfCY6PPdmaAOBzcwqdSj5lh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10IrV-J-e671SpHXSkEwPCe8clX8WbIMi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G8vVu_hK3htCIzRBk5dmP9iw0MDyHUyM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14Q6vkqcMjonZBYpyiGlBAz87ZeZ3c2yf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xbSq-Gh2QjlcfQhIza1d_UEQAAXa46_1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pNxeKk9neHXXxM831FZNJp3ozEJsMeFZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZPL7Oq5WvNpjZNUC85L2oznyU1Z9X8ht&v=2"
    ]
  },
  "1vXIyubyLkQk8EGviywLaCKAyFEL1BsJ0": {
    "folderId": "1vXIyubyLkQk8EGviywLaCKAyFEL1BsJ0",
    "folderName": "Mr. Vishnu Sanctuary",
    "sheetProjectId": "SV-068",
    "customerName": "Mr. Vishnu",
    "location": "Hosur",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 25,
    "videoCount": 0,
    "totalMediaCount": 25,
    "media": [
      {
        "id": "1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15PP86n3Ff6dBAmfUgsgijzcwg3JQ7b1f",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15PP86n3Ff6dBAmfUgsgijzcwg3JQ7b1f&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1R-_yFs4AADQg03_15Jbiu_jwLTGpjxLR",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1R-_yFs4AADQg03_15Jbiu_jwLTGpjxLR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OeYxoxqHkl6GYygwNhnronCKRJoZghzR",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OeYxoxqHkl6GYygwNhnronCKRJoZghzR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "17olJQfT_gFRogZ9tKr1ObyIY_lhD4vL_",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17olJQfT_gFRogZ9tKr1ObyIY_lhD4vL_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OM1aISisefhaeOw6keaFQiSR1fzKjgSO",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OM1aISisefhaeOw6keaFQiSR1fzKjgSO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-VMoOBEZa3ifA88gy927ZvoWlKRDxYaZ",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-VMoOBEZa3ifA88gy927ZvoWlKRDxYaZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fwH__bYFF8zaAMVWXdFLtu7U76cVN3Q2",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fwH__bYFF8zaAMVWXdFLtu7U76cVN3Q2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nF2mVhJSxP9FiDSXMiMor5I9Bvhm2crF",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nF2mVhJSxP9FiDSXMiMor5I9Bvhm2crF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1z0NqYGM-y8xMUzNIdBoYVurUvQbEoKxM",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z0NqYGM-y8xMUzNIdBoYVurUvQbEoKxM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lPkUQlCV8eQZbwKeN-Rz6VsZuGgkkxK0",
        "name": "11.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lPkUQlCV8eQZbwKeN-Rz6VsZuGgkkxK0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rspp46DCkq9dr-ZtZos6acsocJO4qMlC",
        "name": "12.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rspp46DCkq9dr-ZtZos6acsocJO4qMlC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1BCNRdakhmQBi8bdD-WfoL2ET4B5QI-FF",
        "name": "13.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BCNRdakhmQBi8bdD-WfoL2ET4B5QI-FF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1iT2_b2rG7dgoWTn3o3RoxsWAPXQJCdKl",
        "name": "14.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iT2_b2rG7dgoWTn3o3RoxsWAPXQJCdKl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UqJF9vft8fDsmNqEsa5ss6NYwiHfu7YG",
        "name": "15.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UqJF9vft8fDsmNqEsa5ss6NYwiHfu7YG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ILW_4QBnMj1sKL7ZHUrZcI_a3i0gnIvm",
        "name": "16.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ILW_4QBnMj1sKL7ZHUrZcI_a3i0gnIvm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Z7aS8WM3wLwNrZTbcHeCdrBnZWlu4nXo",
        "name": "17.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z7aS8WM3wLwNrZTbcHeCdrBnZWlu4nXo&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19bMmtzQ5LuBVUS6I32LlL4xpw6BWnggR",
        "name": "18.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19bMmtzQ5LuBVUS6I32LlL4xpw6BWnggR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10A1o_XaP9YbFucX61nt_7aVTIj_D5UMN",
        "name": "19.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10A1o_XaP9YbFucX61nt_7aVTIj_D5UMN&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1upDUumyFT1ULTyAPdLW4OkcTcuTNvtlq",
        "name": "20.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1upDUumyFT1ULTyAPdLW4OkcTcuTNvtlq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mtn-pT1KQHOgJLTjAdhL_vE4V0v2QHCn",
        "name": "22.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mtn-pT1KQHOgJLTjAdhL_vE4V0v2QHCn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gQVdJHmT_A8ta-q-0F7m3fmty-avPXqP",
        "name": "23.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gQVdJHmT_A8ta-q-0F7m3fmty-avPXqP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "181_eRJHtHeTqtsGMepemQ6IGWUpKZKod",
        "name": "24.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=181_eRJHtHeTqtsGMepemQ6IGWUpKZKod&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1c5PdxD293hTvNOS69k5vaW5EjWhsLKye",
        "name": "25.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c5PdxD293hTvNOS69k5vaW5EjWhsLKye&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11bByA_kXOluuD9IpC6_CzvtHNZZdwjWR",
        "name": "26.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11bByA_kXOluuD9IpC6_CzvtHNZZdwjWR&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15PP86n3Ff6dBAmfUgsgijzcwg3JQ7b1f&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1R-_yFs4AADQg03_15Jbiu_jwLTGpjxLR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OeYxoxqHkl6GYygwNhnronCKRJoZghzR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17olJQfT_gFRogZ9tKr1ObyIY_lhD4vL_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OM1aISisefhaeOw6keaFQiSR1fzKjgSO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-VMoOBEZa3ifA88gy927ZvoWlKRDxYaZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fwH__bYFF8zaAMVWXdFLtu7U76cVN3Q2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nF2mVhJSxP9FiDSXMiMor5I9Bvhm2crF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z0NqYGM-y8xMUzNIdBoYVurUvQbEoKxM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lPkUQlCV8eQZbwKeN-Rz6VsZuGgkkxK0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rspp46DCkq9dr-ZtZos6acsocJO4qMlC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BCNRdakhmQBi8bdD-WfoL2ET4B5QI-FF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iT2_b2rG7dgoWTn3o3RoxsWAPXQJCdKl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UqJF9vft8fDsmNqEsa5ss6NYwiHfu7YG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ILW_4QBnMj1sKL7ZHUrZcI_a3i0gnIvm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z7aS8WM3wLwNrZTbcHeCdrBnZWlu4nXo&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19bMmtzQ5LuBVUS6I32LlL4xpw6BWnggR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10A1o_XaP9YbFucX61nt_7aVTIj_D5UMN&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1upDUumyFT1ULTyAPdLW4OkcTcuTNvtlq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mtn-pT1KQHOgJLTjAdhL_vE4V0v2QHCn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gQVdJHmT_A8ta-q-0F7m3fmty-avPXqP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=181_eRJHtHeTqtsGMepemQ6IGWUpKZKod&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c5PdxD293hTvNOS69k5vaW5EjWhsLKye&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11bByA_kXOluuD9IpC6_CzvtHNZZdwjWR&v=2"
    ]
  },
  "sv-068": {
    "folderId": "1vXIyubyLkQk8EGviywLaCKAyFEL1BsJ0",
    "folderName": "Mr. Vishnu Sanctuary",
    "sheetProjectId": "SV-068",
    "customerName": "Mr. Vishnu",
    "location": "Hosur",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 25,
    "videoCount": 0,
    "totalMediaCount": 25,
    "media": [
      {
        "id": "1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15PP86n3Ff6dBAmfUgsgijzcwg3JQ7b1f",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15PP86n3Ff6dBAmfUgsgijzcwg3JQ7b1f&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1R-_yFs4AADQg03_15Jbiu_jwLTGpjxLR",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1R-_yFs4AADQg03_15Jbiu_jwLTGpjxLR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OeYxoxqHkl6GYygwNhnronCKRJoZghzR",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OeYxoxqHkl6GYygwNhnronCKRJoZghzR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "17olJQfT_gFRogZ9tKr1ObyIY_lhD4vL_",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17olJQfT_gFRogZ9tKr1ObyIY_lhD4vL_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OM1aISisefhaeOw6keaFQiSR1fzKjgSO",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OM1aISisefhaeOw6keaFQiSR1fzKjgSO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-VMoOBEZa3ifA88gy927ZvoWlKRDxYaZ",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-VMoOBEZa3ifA88gy927ZvoWlKRDxYaZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fwH__bYFF8zaAMVWXdFLtu7U76cVN3Q2",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fwH__bYFF8zaAMVWXdFLtu7U76cVN3Q2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nF2mVhJSxP9FiDSXMiMor5I9Bvhm2crF",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nF2mVhJSxP9FiDSXMiMor5I9Bvhm2crF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1z0NqYGM-y8xMUzNIdBoYVurUvQbEoKxM",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z0NqYGM-y8xMUzNIdBoYVurUvQbEoKxM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lPkUQlCV8eQZbwKeN-Rz6VsZuGgkkxK0",
        "name": "11.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lPkUQlCV8eQZbwKeN-Rz6VsZuGgkkxK0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rspp46DCkq9dr-ZtZos6acsocJO4qMlC",
        "name": "12.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rspp46DCkq9dr-ZtZos6acsocJO4qMlC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1BCNRdakhmQBi8bdD-WfoL2ET4B5QI-FF",
        "name": "13.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BCNRdakhmQBi8bdD-WfoL2ET4B5QI-FF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1iT2_b2rG7dgoWTn3o3RoxsWAPXQJCdKl",
        "name": "14.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iT2_b2rG7dgoWTn3o3RoxsWAPXQJCdKl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UqJF9vft8fDsmNqEsa5ss6NYwiHfu7YG",
        "name": "15.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UqJF9vft8fDsmNqEsa5ss6NYwiHfu7YG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ILW_4QBnMj1sKL7ZHUrZcI_a3i0gnIvm",
        "name": "16.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ILW_4QBnMj1sKL7ZHUrZcI_a3i0gnIvm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Z7aS8WM3wLwNrZTbcHeCdrBnZWlu4nXo",
        "name": "17.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z7aS8WM3wLwNrZTbcHeCdrBnZWlu4nXo&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19bMmtzQ5LuBVUS6I32LlL4xpw6BWnggR",
        "name": "18.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19bMmtzQ5LuBVUS6I32LlL4xpw6BWnggR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10A1o_XaP9YbFucX61nt_7aVTIj_D5UMN",
        "name": "19.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10A1o_XaP9YbFucX61nt_7aVTIj_D5UMN&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1upDUumyFT1ULTyAPdLW4OkcTcuTNvtlq",
        "name": "20.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1upDUumyFT1ULTyAPdLW4OkcTcuTNvtlq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mtn-pT1KQHOgJLTjAdhL_vE4V0v2QHCn",
        "name": "22.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mtn-pT1KQHOgJLTjAdhL_vE4V0v2QHCn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gQVdJHmT_A8ta-q-0F7m3fmty-avPXqP",
        "name": "23.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gQVdJHmT_A8ta-q-0F7m3fmty-avPXqP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "181_eRJHtHeTqtsGMepemQ6IGWUpKZKod",
        "name": "24.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=181_eRJHtHeTqtsGMepemQ6IGWUpKZKod&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1c5PdxD293hTvNOS69k5vaW5EjWhsLKye",
        "name": "25.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c5PdxD293hTvNOS69k5vaW5EjWhsLKye&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11bByA_kXOluuD9IpC6_CzvtHNZZdwjWR",
        "name": "26.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11bByA_kXOluuD9IpC6_CzvtHNZZdwjWR&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1g_alKFCazHMS7mV3f6hX-mXjJeMWduyf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15PP86n3Ff6dBAmfUgsgijzcwg3JQ7b1f&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1R-_yFs4AADQg03_15Jbiu_jwLTGpjxLR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OeYxoxqHkl6GYygwNhnronCKRJoZghzR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17olJQfT_gFRogZ9tKr1ObyIY_lhD4vL_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OM1aISisefhaeOw6keaFQiSR1fzKjgSO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-VMoOBEZa3ifA88gy927ZvoWlKRDxYaZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fwH__bYFF8zaAMVWXdFLtu7U76cVN3Q2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nF2mVhJSxP9FiDSXMiMor5I9Bvhm2crF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z0NqYGM-y8xMUzNIdBoYVurUvQbEoKxM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lPkUQlCV8eQZbwKeN-Rz6VsZuGgkkxK0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rspp46DCkq9dr-ZtZos6acsocJO4qMlC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BCNRdakhmQBi8bdD-WfoL2ET4B5QI-FF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iT2_b2rG7dgoWTn3o3RoxsWAPXQJCdKl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UqJF9vft8fDsmNqEsa5ss6NYwiHfu7YG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ILW_4QBnMj1sKL7ZHUrZcI_a3i0gnIvm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z7aS8WM3wLwNrZTbcHeCdrBnZWlu4nXo&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19bMmtzQ5LuBVUS6I32LlL4xpw6BWnggR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10A1o_XaP9YbFucX61nt_7aVTIj_D5UMN&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1upDUumyFT1ULTyAPdLW4OkcTcuTNvtlq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mtn-pT1KQHOgJLTjAdhL_vE4V0v2QHCn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gQVdJHmT_A8ta-q-0F7m3fmty-avPXqP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=181_eRJHtHeTqtsGMepemQ6IGWUpKZKod&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1c5PdxD293hTvNOS69k5vaW5EjWhsLKye&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11bByA_kXOluuD9IpC6_CzvtHNZZdwjWR&v=2"
    ]
  },
  "166rTzN2Rb1WysAAUHGisgCmHGmQIcFud": {
    "folderId": "166rTzN2Rb1WysAAUHGisgCmHGmQIcFud",
    "folderName": "Ms. Lakshmi",
    "sheetProjectId": "SV-080",
    "customerName": "Ms. Lakshmi",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1BdVrlOLJInncjgmrP4A4cQ3l1ZYNJKwP",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BdVrlOLJInncjgmrP4A4cQ3l1ZYNJKwP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NFrZV8CCyGw61AEi-XGE3PofSb_TYPcp",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NFrZV8CCyGw61AEi-XGE3PofSb_TYPcp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PUyRe5kRluPCv6bpMelsafZ2k-3tSm2F",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PUyRe5kRluPCv6bpMelsafZ2k-3tSm2F&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BdVrlOLJInncjgmrP4A4cQ3l1ZYNJKwP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NFrZV8CCyGw61AEi-XGE3PofSb_TYPcp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PUyRe5kRluPCv6bpMelsafZ2k-3tSm2F&v=2"
    ]
  },
  "sv-080": {
    "folderId": "166rTzN2Rb1WysAAUHGisgCmHGmQIcFud",
    "folderName": "Ms. Lakshmi",
    "sheetProjectId": "SV-080",
    "customerName": "Ms. Lakshmi",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1BdVrlOLJInncjgmrP4A4cQ3l1ZYNJKwP",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BdVrlOLJInncjgmrP4A4cQ3l1ZYNJKwP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NFrZV8CCyGw61AEi-XGE3PofSb_TYPcp",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NFrZV8CCyGw61AEi-XGE3PofSb_TYPcp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PUyRe5kRluPCv6bpMelsafZ2k-3tSm2F",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PUyRe5kRluPCv6bpMelsafZ2k-3tSm2F&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1xZgE9uikJmjQGRuloXixIuDvmsGqtlhF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1BdVrlOLJInncjgmrP4A4cQ3l1ZYNJKwP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NFrZV8CCyGw61AEi-XGE3PofSb_TYPcp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PUyRe5kRluPCv6bpMelsafZ2k-3tSm2F&v=2"
    ]
  },
  "1vA_cfHKD-NKW6H_XtR5Q2yOtiJ5h38li": {
    "folderId": "1vA_cfHKD-NKW6H_XtR5Q2yOtiJ5h38li",
    "folderName": "Ms. Kavya Sundaraja",
    "sheetProjectId": "SV-078",
    "customerName": "Ms. Kavya Sundaraja",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KsrqtBugXed8YTMoFqcyglcGv0O2hr2Y",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KsrqtBugXed8YTMoFqcyglcGv0O2hr2Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZBq9vn6LSLHvoZg5Yt0iwmkQW8CNKHuj",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZBq9vn6LSLHvoZg5Yt0iwmkQW8CNKHuj&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KsrqtBugXed8YTMoFqcyglcGv0O2hr2Y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZBq9vn6LSLHvoZg5Yt0iwmkQW8CNKHuj&v=2"
    ]
  },
  "sv-078": {
    "folderId": "1vA_cfHKD-NKW6H_XtR5Q2yOtiJ5h38li",
    "folderName": "Ms. Kavya Sundaraja",
    "sheetProjectId": "SV-078",
    "customerName": "Ms. Kavya Sundaraja",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KsrqtBugXed8YTMoFqcyglcGv0O2hr2Y",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KsrqtBugXed8YTMoFqcyglcGv0O2hr2Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZBq9vn6LSLHvoZg5Yt0iwmkQW8CNKHuj",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZBq9vn6LSLHvoZg5Yt0iwmkQW8CNKHuj&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1atJRKWA9JVG5cxqfJxbdRacC7AUmmpN_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KsrqtBugXed8YTMoFqcyglcGv0O2hr2Y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZBq9vn6LSLHvoZg5Yt0iwmkQW8CNKHuj&v=2"
    ]
  },
  "11MKD-gTtmaF3G9SVGO2oxwBBSYQ956p_": {
    "folderId": "11MKD-gTtmaF3G9SVGO2oxwBBSYQ956p_",
    "folderName": "Ms. Tulasi",
    "sheetProjectId": "SV-076",
    "customerName": "Ms. Tulasi",
    "location": "Bengaluru",
    "structureType": "Existing Room Frontage",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OS4GtXeoAMaVq8E-8wSj6qB0qrWFGLTQ",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OS4GtXeoAMaVq8E-8wSj6qB0qrWFGLTQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1oJCqZsOX5FgUJsitEUru0hIOdXm-VOVi",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oJCqZsOX5FgUJsitEUru0hIOdXm-VOVi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lr9lAEYnsyXbLd8rHHsxmTE0vVaZoeEd",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lr9lAEYnsyXbLd8rHHsxmTE0vVaZoeEd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lErngXSwY3GOeQOd0g9C70t6GBhxUSTF",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lErngXSwY3GOeQOd0g9C70t6GBhxUSTF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bI_thK9KwIkkSjOuCp5kISFkH1ZWQhWe",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bI_thK9KwIkkSjOuCp5kISFkH1ZWQhWe&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NSp2bi9EZfsrmo6KhWT1WsmDVAbaxrTD",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NSp2bi9EZfsrmo6KhWT1WsmDVAbaxrTD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13CorcFHPrntuT9EcBId1xXjkd60hVYG0",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13CorcFHPrntuT9EcBId1xXjkd60hVYG0&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OS4GtXeoAMaVq8E-8wSj6qB0qrWFGLTQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oJCqZsOX5FgUJsitEUru0hIOdXm-VOVi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lr9lAEYnsyXbLd8rHHsxmTE0vVaZoeEd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lErngXSwY3GOeQOd0g9C70t6GBhxUSTF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bI_thK9KwIkkSjOuCp5kISFkH1ZWQhWe&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NSp2bi9EZfsrmo6KhWT1WsmDVAbaxrTD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13CorcFHPrntuT9EcBId1xXjkd60hVYG0&v=2"
    ]
  },
  "sv-076": {
    "folderId": "11MKD-gTtmaF3G9SVGO2oxwBBSYQ956p_",
    "folderName": "Ms. Tulasi",
    "sheetProjectId": "SV-076",
    "customerName": "Ms. Tulasi",
    "location": "Bengaluru",
    "structureType": "Existing Room Frontage",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OS4GtXeoAMaVq8E-8wSj6qB0qrWFGLTQ",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OS4GtXeoAMaVq8E-8wSj6qB0qrWFGLTQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1oJCqZsOX5FgUJsitEUru0hIOdXm-VOVi",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oJCqZsOX5FgUJsitEUru0hIOdXm-VOVi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lr9lAEYnsyXbLd8rHHsxmTE0vVaZoeEd",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lr9lAEYnsyXbLd8rHHsxmTE0vVaZoeEd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lErngXSwY3GOeQOd0g9C70t6GBhxUSTF",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lErngXSwY3GOeQOd0g9C70t6GBhxUSTF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bI_thK9KwIkkSjOuCp5kISFkH1ZWQhWe",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bI_thK9KwIkkSjOuCp5kISFkH1ZWQhWe&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NSp2bi9EZfsrmo6KhWT1WsmDVAbaxrTD",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NSp2bi9EZfsrmo6KhWT1WsmDVAbaxrTD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13CorcFHPrntuT9EcBId1xXjkd60hVYG0",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13CorcFHPrntuT9EcBId1xXjkd60hVYG0&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vv41KfKukRCtGiAhF9KVWOc28gvpe1RQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OS4GtXeoAMaVq8E-8wSj6qB0qrWFGLTQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oJCqZsOX5FgUJsitEUru0hIOdXm-VOVi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lr9lAEYnsyXbLd8rHHsxmTE0vVaZoeEd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lErngXSwY3GOeQOd0g9C70t6GBhxUSTF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bI_thK9KwIkkSjOuCp5kISFkH1ZWQhWe&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NSp2bi9EZfsrmo6KhWT1WsmDVAbaxrTD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13CorcFHPrntuT9EcBId1xXjkd60hVYG0&v=2"
    ]
  },
  "14M0iY_SWgDXTFlmehZooHEo-M3b7V_Gq": {
    "folderId": "14M0iY_SWgDXTFlmehZooHEo-M3b7V_Gq",
    "folderName": "Ms. Gayatri Barath",
    "sheetProjectId": "SV-081",
    "customerName": "Ms. Gayatri Barath",
    "location": "Chennai",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KOnFTs37TrtEhWu72EFiR-4ufj3LDbYD",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KOnFTs37TrtEhWu72EFiR-4ufj3LDbYD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1E9Xe163yItBRzEVLcJoIcQJomvbOkXFc",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1E9Xe163yItBRzEVLcJoIcQJomvbOkXFc&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KOnFTs37TrtEhWu72EFiR-4ufj3LDbYD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1E9Xe163yItBRzEVLcJoIcQJomvbOkXFc&v=2"
    ]
  },
  "sv-081": {
    "folderId": "14M0iY_SWgDXTFlmehZooHEo-M3b7V_Gq",
    "folderName": "Ms. Gayatri Barath",
    "sheetProjectId": "SV-081",
    "customerName": "Ms. Gayatri Barath",
    "location": "Chennai",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KOnFTs37TrtEhWu72EFiR-4ufj3LDbYD",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KOnFTs37TrtEhWu72EFiR-4ufj3LDbYD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1E9Xe163yItBRzEVLcJoIcQJomvbOkXFc",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1E9Xe163yItBRzEVLcJoIcQJomvbOkXFc&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15btZNmPgaOJSxvQ8GdZvpAu4kIx0qv4y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KOnFTs37TrtEhWu72EFiR-4ufj3LDbYD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1E9Xe163yItBRzEVLcJoIcQJomvbOkXFc&v=2"
    ]
  },
  "1tn9jTYclVrWI20Voz-PXBQRmvit2MHE8": {
    "folderId": "1tn9jTYclVrWI20Voz-PXBQRmvit2MHE8",
    "folderName": "Mr. Umesh Jethwa",
    "sheetProjectId": "SV-070",
    "customerName": "Mr. Umesh Jethwa",
    "location": "London",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "159FpD7F2ojTBjc8P9tFgZZGYZTKRd4kr",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=159FpD7F2ojTBjc8P9tFgZZGYZTKRd4kr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sIpiLDke5kt49WN8PG5zv65TnQkRo8Wn",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sIpiLDke5kt49WN8PG5zv65TnQkRo8Wn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1V9k8vH-8ieVsoJCwl9xGXQyWggE0ixUw",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1V9k8vH-8ieVsoJCwl9xGXQyWggE0ixUw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Wz97l_IgyWcnOJ0QJjzyagieHdWE8XkV",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Wz97l_IgyWcnOJ0QJjzyagieHdWE8XkV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ctefy7TpRisuJqELs-KjTatfQydst9d3",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ctefy7TpRisuJqELs-KjTatfQydst9d3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1F4cSq8PkGZKlj2sR7ozXp0yttftNw6zG",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F4cSq8PkGZKlj2sR7ozXp0yttftNw6zG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nfzE5a78ZQ_52M6gN-vfxVVpzvOiVhat",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfzE5a78ZQ_52M6gN-vfxVVpzvOiVhat&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1tTH3MOTZo0exGQSZ8Bbxx_p00EfMSWl3",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tTH3MOTZo0exGQSZ8Bbxx_p00EfMSWl3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1u7-22GEvH2C29BWewBKcNdQnWwfWJ51S",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u7-22GEvH2C29BWewBKcNdQnWwfWJ51S&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=159FpD7F2ojTBjc8P9tFgZZGYZTKRd4kr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sIpiLDke5kt49WN8PG5zv65TnQkRo8Wn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1V9k8vH-8ieVsoJCwl9xGXQyWggE0ixUw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Wz97l_IgyWcnOJ0QJjzyagieHdWE8XkV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ctefy7TpRisuJqELs-KjTatfQydst9d3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F4cSq8PkGZKlj2sR7ozXp0yttftNw6zG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfzE5a78ZQ_52M6gN-vfxVVpzvOiVhat&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tTH3MOTZo0exGQSZ8Bbxx_p00EfMSWl3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u7-22GEvH2C29BWewBKcNdQnWwfWJ51S&v=2"
    ]
  },
  "sv-070": {
    "folderId": "1tn9jTYclVrWI20Voz-PXBQRmvit2MHE8",
    "folderName": "Mr. Umesh Jethwa",
    "sheetProjectId": "SV-070",
    "customerName": "Mr. Umesh Jethwa",
    "location": "London",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "159FpD7F2ojTBjc8P9tFgZZGYZTKRd4kr",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=159FpD7F2ojTBjc8P9tFgZZGYZTKRd4kr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sIpiLDke5kt49WN8PG5zv65TnQkRo8Wn",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sIpiLDke5kt49WN8PG5zv65TnQkRo8Wn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1V9k8vH-8ieVsoJCwl9xGXQyWggE0ixUw",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1V9k8vH-8ieVsoJCwl9xGXQyWggE0ixUw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Wz97l_IgyWcnOJ0QJjzyagieHdWE8XkV",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Wz97l_IgyWcnOJ0QJjzyagieHdWE8XkV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ctefy7TpRisuJqELs-KjTatfQydst9d3",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ctefy7TpRisuJqELs-KjTatfQydst9d3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1F4cSq8PkGZKlj2sR7ozXp0yttftNw6zG",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F4cSq8PkGZKlj2sR7ozXp0yttftNw6zG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nfzE5a78ZQ_52M6gN-vfxVVpzvOiVhat",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfzE5a78ZQ_52M6gN-vfxVVpzvOiVhat&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1tTH3MOTZo0exGQSZ8Bbxx_p00EfMSWl3",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tTH3MOTZo0exGQSZ8Bbxx_p00EfMSWl3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1u7-22GEvH2C29BWewBKcNdQnWwfWJ51S",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u7-22GEvH2C29BWewBKcNdQnWwfWJ51S&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OSlr7eoPfmviYNKiJ2uq55Shouy2-T5G&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=159FpD7F2ojTBjc8P9tFgZZGYZTKRd4kr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sIpiLDke5kt49WN8PG5zv65TnQkRo8Wn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1V9k8vH-8ieVsoJCwl9xGXQyWggE0ixUw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Wz97l_IgyWcnOJ0QJjzyagieHdWE8XkV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ctefy7TpRisuJqELs-KjTatfQydst9d3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F4cSq8PkGZKlj2sR7ozXp0yttftNw6zG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfzE5a78ZQ_52M6gN-vfxVVpzvOiVhat&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tTH3MOTZo0exGQSZ8Bbxx_p00EfMSWl3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u7-22GEvH2C29BWewBKcNdQnWwfWJ51S&v=2"
    ]
  },
  "1BdzixEVe_61akjoHPdJJqlsEkVEb4KXX": {
    "folderId": "1BdzixEVe_61akjoHPdJJqlsEkVEb4KXX",
    "folderName": "Mr. Srivathsan Doraiswamy",
    "sheetProjectId": "SV-090",
    "customerName": "Mr. Srivathsan Doraiswamy",
    "location": "Salem",
    "structureType": "Public Temple",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KhG5Nwm0ib_6wlILrx_oSmjzvIhzSI0V",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KhG5Nwm0ib_6wlILrx_oSmjzvIhzSI0V&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CQKH0Uq2GU5RTscicYqmak6sIfLoUSdr",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CQKH0Uq2GU5RTscicYqmak6sIfLoUSdr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YU-UoQeLVrA0WhfhVwOU5dfIfmJ6XR7a",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YU-UoQeLVrA0WhfhVwOU5dfIfmJ6XR7a&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KhG5Nwm0ib_6wlILrx_oSmjzvIhzSI0V&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CQKH0Uq2GU5RTscicYqmak6sIfLoUSdr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YU-UoQeLVrA0WhfhVwOU5dfIfmJ6XR7a&v=2"
    ]
  },
  "sv-090": {
    "folderId": "1BdzixEVe_61akjoHPdJJqlsEkVEb4KXX",
    "folderName": "Mr. Srivathsan Doraiswamy",
    "sheetProjectId": "SV-090",
    "customerName": "Mr. Srivathsan Doraiswamy",
    "location": "Salem",
    "structureType": "Public Temple",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KhG5Nwm0ib_6wlILrx_oSmjzvIhzSI0V",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KhG5Nwm0ib_6wlILrx_oSmjzvIhzSI0V&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CQKH0Uq2GU5RTscicYqmak6sIfLoUSdr",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CQKH0Uq2GU5RTscicYqmak6sIfLoUSdr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YU-UoQeLVrA0WhfhVwOU5dfIfmJ6XR7a",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YU-UoQeLVrA0WhfhVwOU5dfIfmJ6XR7a&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NQSSWTpSEqumuMtyKuiWk23Osz47p0kz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KhG5Nwm0ib_6wlILrx_oSmjzvIhzSI0V&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CQKH0Uq2GU5RTscicYqmak6sIfLoUSdr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YU-UoQeLVrA0WhfhVwOU5dfIfmJ6XR7a&v=2"
    ]
  },
  "1lLUtyH3CIKr6MkwKYP6Q3KQQ9gjflVds": {
    "folderId": "1lLUtyH3CIKr6MkwKYP6Q3KQQ9gjflVds",
    "folderName": "Mr. Ravindra",
    "sheetProjectId": "SV-082",
    "customerName": "Mr. Ravindra",
    "location": "Chintamani",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1enLVY3UmTzhOT4t1weY1g4qf63UN53be",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1enLVY3UmTzhOT4t1weY1g4qf63UN53be&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13tqPUUyiS2LMdV70Ffvb0t-MLMpdcSln",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13tqPUUyiS2LMdV70Ffvb0t-MLMpdcSln&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sOu21Re5H9zAVo9dD5-naLapRQWfFG46",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sOu21Re5H9zAVo9dD5-naLapRQWfFG46&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1B2txQg12fWlAPn9aZuK75RnRildqyxCe",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B2txQg12fWlAPn9aZuK75RnRildqyxCe&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1yEvG3GZqii8faAQeGm9mZXxf8NaQfUei",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yEvG3GZqii8faAQeGm9mZXxf8NaQfUei&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1u5_6SlCgB_v95mwnbU5qXoVswI4ZuQQK",
        "name": "7.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u5_6SlCgB_v95mwnbU5qXoVswI4ZuQQK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1zoeCzLT5-wtO9Va9Cdym9Q4pTKcBBWP5",
        "name": "8.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zoeCzLT5-wtO9Va9Cdym9Q4pTKcBBWP5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1yq6osZ45yMk_D7otqbULwvHKUdJTotYo",
        "name": "9.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yq6osZ45yMk_D7otqbULwvHKUdJTotYo&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mndA_JaYmuk3MYKTlw507cJkfSfaL0K5",
        "name": "10.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mndA_JaYmuk3MYKTlw507cJkfSfaL0K5&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1enLVY3UmTzhOT4t1weY1g4qf63UN53be&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13tqPUUyiS2LMdV70Ffvb0t-MLMpdcSln&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sOu21Re5H9zAVo9dD5-naLapRQWfFG46&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B2txQg12fWlAPn9aZuK75RnRildqyxCe&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yEvG3GZqii8faAQeGm9mZXxf8NaQfUei&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u5_6SlCgB_v95mwnbU5qXoVswI4ZuQQK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zoeCzLT5-wtO9Va9Cdym9Q4pTKcBBWP5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yq6osZ45yMk_D7otqbULwvHKUdJTotYo&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mndA_JaYmuk3MYKTlw507cJkfSfaL0K5&v=2"
    ]
  },
  "sv-082": {
    "folderId": "1lLUtyH3CIKr6MkwKYP6Q3KQQ9gjflVds",
    "folderName": "Mr. Ravindra",
    "sheetProjectId": "SV-082",
    "customerName": "Mr. Ravindra",
    "location": "Chintamani",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1enLVY3UmTzhOT4t1weY1g4qf63UN53be",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1enLVY3UmTzhOT4t1weY1g4qf63UN53be&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13tqPUUyiS2LMdV70Ffvb0t-MLMpdcSln",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13tqPUUyiS2LMdV70Ffvb0t-MLMpdcSln&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sOu21Re5H9zAVo9dD5-naLapRQWfFG46",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sOu21Re5H9zAVo9dD5-naLapRQWfFG46&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1B2txQg12fWlAPn9aZuK75RnRildqyxCe",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B2txQg12fWlAPn9aZuK75RnRildqyxCe&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1yEvG3GZqii8faAQeGm9mZXxf8NaQfUei",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yEvG3GZqii8faAQeGm9mZXxf8NaQfUei&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1u5_6SlCgB_v95mwnbU5qXoVswI4ZuQQK",
        "name": "7.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u5_6SlCgB_v95mwnbU5qXoVswI4ZuQQK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1zoeCzLT5-wtO9Va9Cdym9Q4pTKcBBWP5",
        "name": "8.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zoeCzLT5-wtO9Va9Cdym9Q4pTKcBBWP5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1yq6osZ45yMk_D7otqbULwvHKUdJTotYo",
        "name": "9.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yq6osZ45yMk_D7otqbULwvHKUdJTotYo&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mndA_JaYmuk3MYKTlw507cJkfSfaL0K5",
        "name": "10.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mndA_JaYmuk3MYKTlw507cJkfSfaL0K5&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tB2xd9sP2FmnHOnjacCYDLyrqpVEQwT5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1enLVY3UmTzhOT4t1weY1g4qf63UN53be&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13tqPUUyiS2LMdV70Ffvb0t-MLMpdcSln&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sOu21Re5H9zAVo9dD5-naLapRQWfFG46&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1B2txQg12fWlAPn9aZuK75RnRildqyxCe&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yEvG3GZqii8faAQeGm9mZXxf8NaQfUei&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1u5_6SlCgB_v95mwnbU5qXoVswI4ZuQQK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zoeCzLT5-wtO9Va9Cdym9Q4pTKcBBWP5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yq6osZ45yMk_D7otqbULwvHKUdJTotYo&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mndA_JaYmuk3MYKTlw507cJkfSfaL0K5&v=2"
    ]
  },
  "1FMvrQ1Z6d9EfVzpOnFwoL1-rCtXygRBI": {
    "folderId": "1FMvrQ1Z6d9EfVzpOnFwoL1-rCtXygRBI",
    "folderName": "Mr. Rahul Sanctum",
    "sheetProjectId": "SV-069",
    "customerName": "Mr. Rahul",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bnLBlk766BJ4BpZzs6-U9OEjHiCq5zxq",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bnLBlk766BJ4BpZzs6-U9OEjHiCq5zxq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jyHIQSu2dtDppX15NH9Vzev2np7j4Kyk",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jyHIQSu2dtDppX15NH9Vzev2np7j4Kyk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZIpIGarEz5vjg-2h8IFsguOVjlry1tnt",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZIpIGarEz5vjg-2h8IFsguOVjlry1tnt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fIkYJm8r_R3W9J4qF0dm1nm4MMyO7Zdn",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIkYJm8r_R3W9J4qF0dm1nm4MMyO7Zdn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16pHsRTw9u8j3pLQN3oyhW3Vs5azx2guB",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16pHsRTw9u8j3pLQN3oyhW3Vs5azx2guB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JoCOVWByA0IVYhphP6Hsdoq44Zs55gta",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JoCOVWByA0IVYhphP6Hsdoq44Zs55gta&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1J-CHvMvX-TyhMxGtLUy2StjHV5q2P5CZ",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1J-CHvMvX-TyhMxGtLUy2StjHV5q2P5CZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bnLBlk766BJ4BpZzs6-U9OEjHiCq5zxq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jyHIQSu2dtDppX15NH9Vzev2np7j4Kyk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZIpIGarEz5vjg-2h8IFsguOVjlry1tnt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIkYJm8r_R3W9J4qF0dm1nm4MMyO7Zdn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16pHsRTw9u8j3pLQN3oyhW3Vs5azx2guB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JoCOVWByA0IVYhphP6Hsdoq44Zs55gta&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1J-CHvMvX-TyhMxGtLUy2StjHV5q2P5CZ&v=2"
    ]
  },
  "sv-069": {
    "folderId": "1FMvrQ1Z6d9EfVzpOnFwoL1-rCtXygRBI",
    "folderName": "Mr. Rahul Sanctum",
    "sheetProjectId": "SV-069",
    "customerName": "Mr. Rahul",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bnLBlk766BJ4BpZzs6-U9OEjHiCq5zxq",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bnLBlk766BJ4BpZzs6-U9OEjHiCq5zxq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jyHIQSu2dtDppX15NH9Vzev2np7j4Kyk",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jyHIQSu2dtDppX15NH9Vzev2np7j4Kyk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZIpIGarEz5vjg-2h8IFsguOVjlry1tnt",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZIpIGarEz5vjg-2h8IFsguOVjlry1tnt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fIkYJm8r_R3W9J4qF0dm1nm4MMyO7Zdn",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIkYJm8r_R3W9J4qF0dm1nm4MMyO7Zdn&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16pHsRTw9u8j3pLQN3oyhW3Vs5azx2guB",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16pHsRTw9u8j3pLQN3oyhW3Vs5azx2guB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JoCOVWByA0IVYhphP6Hsdoq44Zs55gta",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JoCOVWByA0IVYhphP6Hsdoq44Zs55gta&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1J-CHvMvX-TyhMxGtLUy2StjHV5q2P5CZ",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1J-CHvMvX-TyhMxGtLUy2StjHV5q2P5CZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-8O85ZgZu0vM5horo1jjLy8kBkq-jKJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bnLBlk766BJ4BpZzs6-U9OEjHiCq5zxq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jyHIQSu2dtDppX15NH9Vzev2np7j4Kyk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZIpIGarEz5vjg-2h8IFsguOVjlry1tnt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fIkYJm8r_R3W9J4qF0dm1nm4MMyO7Zdn&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16pHsRTw9u8j3pLQN3oyhW3Vs5azx2guB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JoCOVWByA0IVYhphP6Hsdoq44Zs55gta&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1J-CHvMvX-TyhMxGtLUy2StjHV5q2P5CZ&v=2"
    ]
  },
  "1Tc2oMafd-p0b6kymtNSQRQ8iCnGJAnLQ": {
    "folderId": "1Tc2oMafd-p0b6kymtNSQRQ8iCnGJAnLQ",
    "folderName": "Mr. Shabari Girish",
    "sheetProjectId": "SV-085",
    "customerName": "Mr. Shabari Girish",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 7,
    "videoCount": 2,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Qvd9Vp-Cm1js3hMHebcacEZMxfs_zQAt",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Qvd9Vp-Cm1js3hMHebcacEZMxfs_zQAt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1De-DvFtOcTmOWf8u7wFA8-joVJAlLnCA",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1De-DvFtOcTmOWf8u7wFA8-joVJAlLnCA&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Y2Hb2122gbHNdYDzDAH7ky36GlypqO9m",
        "name": "4.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Y2Hb2122gbHNdYDzDAH7ky36GlypqO9m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1P_PlpP7i_T-PoT-f9PTJoY8QzCpzIH8h",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1P_PlpP7i_T-PoT-f9PTJoY8QzCpzIH8h&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1cewIysvvVgwPKo3EncXsdOQDcTPQfO2C",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cewIysvvVgwPKo3EncXsdOQDcTPQfO2C&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nPFXLUn0sYkoiOwvdoSxkWxOkjOhY7jL",
        "name": "8.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nPFXLUn0sYkoiOwvdoSxkWxOkjOhY7jL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eT1BoZm78TZAXRnmUmp2heHrUjSo48hU",
        "name": "3.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eT1BoZm78TZAXRnmUmp2heHrUjSo48hU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12BWIb_gWvqeA6UgkLu-hbXNQeDu8nSlW",
        "name": "7.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12BWIb_gWvqeA6UgkLu-hbXNQeDu8nSlW&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Qvd9Vp-Cm1js3hMHebcacEZMxfs_zQAt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1De-DvFtOcTmOWf8u7wFA8-joVJAlLnCA&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Y2Hb2122gbHNdYDzDAH7ky36GlypqO9m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1P_PlpP7i_T-PoT-f9PTJoY8QzCpzIH8h&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cewIysvvVgwPKo3EncXsdOQDcTPQfO2C&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nPFXLUn0sYkoiOwvdoSxkWxOkjOhY7jL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eT1BoZm78TZAXRnmUmp2heHrUjSo48hU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12BWIb_gWvqeA6UgkLu-hbXNQeDu8nSlW&v=2"
    ]
  },
  "sv-085": {
    "folderId": "1Tc2oMafd-p0b6kymtNSQRQ8iCnGJAnLQ",
    "folderName": "Mr. Shabari Girish",
    "sheetProjectId": "SV-085",
    "customerName": "Mr. Shabari Girish",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 7,
    "videoCount": 2,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Qvd9Vp-Cm1js3hMHebcacEZMxfs_zQAt",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Qvd9Vp-Cm1js3hMHebcacEZMxfs_zQAt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1De-DvFtOcTmOWf8u7wFA8-joVJAlLnCA",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1De-DvFtOcTmOWf8u7wFA8-joVJAlLnCA&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Y2Hb2122gbHNdYDzDAH7ky36GlypqO9m",
        "name": "4.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Y2Hb2122gbHNdYDzDAH7ky36GlypqO9m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1P_PlpP7i_T-PoT-f9PTJoY8QzCpzIH8h",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1P_PlpP7i_T-PoT-f9PTJoY8QzCpzIH8h&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1cewIysvvVgwPKo3EncXsdOQDcTPQfO2C",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cewIysvvVgwPKo3EncXsdOQDcTPQfO2C&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nPFXLUn0sYkoiOwvdoSxkWxOkjOhY7jL",
        "name": "8.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nPFXLUn0sYkoiOwvdoSxkWxOkjOhY7jL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eT1BoZm78TZAXRnmUmp2heHrUjSo48hU",
        "name": "3.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eT1BoZm78TZAXRnmUmp2heHrUjSo48hU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12BWIb_gWvqeA6UgkLu-hbXNQeDu8nSlW",
        "name": "7.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12BWIb_gWvqeA6UgkLu-hbXNQeDu8nSlW&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=136mkmzNMCbWUDNPJ6nLSRvCA1eLJbFm9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Qvd9Vp-Cm1js3hMHebcacEZMxfs_zQAt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1De-DvFtOcTmOWf8u7wFA8-joVJAlLnCA&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Y2Hb2122gbHNdYDzDAH7ky36GlypqO9m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1P_PlpP7i_T-PoT-f9PTJoY8QzCpzIH8h&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cewIysvvVgwPKo3EncXsdOQDcTPQfO2C&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nPFXLUn0sYkoiOwvdoSxkWxOkjOhY7jL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eT1BoZm78TZAXRnmUmp2heHrUjSo48hU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12BWIb_gWvqeA6UgkLu-hbXNQeDu8nSlW&v=2"
    ]
  },
  "1vy7M5eCuw72cP9jYiKcT_e_AvjueoES1": {
    "folderId": "1vy7M5eCuw72cP9jYiKcT_e_AvjueoES1",
    "folderName": "Mr. Rakesh Katkar",
    "sheetProjectId": "SV-091",
    "customerName": "Mr.Rakesh Katkar",
    "location": "Pune",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1znH3lfHMfP8OQMr774SuaOislKm_68Fs",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1znH3lfHMfP8OQMr774SuaOislKm_68Fs&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1znH3lfHMfP8OQMr774SuaOislKm_68Fs",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1znH3lfHMfP8OQMr774SuaOislKm_68Fs&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1dF7WALf8kOHbkWV-OxIF3U00tn5F2KWP",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dF7WALf8kOHbkWV-OxIF3U00tn5F2KWP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1A_YQrjAM-zy6TvV8y_MpWV_a_XYlXLVO",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1A_YQrjAM-zy6TvV8y_MpWV_a_XYlXLVO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "145oTeqrvXbGgUS0TQSdr_Id--5H1i98Y",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=145oTeqrvXbGgUS0TQSdr_Id--5H1i98Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x2MTNdE_9nm5uLMeKLUIx92NLXoV44pF",
        "name": "4.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x2MTNdE_9nm5uLMeKLUIx92NLXoV44pF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1aEoWsGSoqO4GRKnZyzRJkoYYj1chmGSO",
        "name": "5.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1aEoWsGSoqO4GRKnZyzRJkoYYj1chmGSO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O-ffgNdRIYw3hr-hzOpFt4JzlckZqKu6",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O-ffgNdRIYw3hr-hzOpFt4JzlckZqKu6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1misjSZ_QSHoipVgstfvHugz-gkJozmdA",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1misjSZ_QSHoipVgstfvHugz-gkJozmdA&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gV4ES9LFPkG8Qlp1khsyhgkgN9-2Xcp9",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gV4ES9LFPkG8Qlp1khsyhgkgN9-2Xcp9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HHEnXeEPUhpDgWUfiqbn9c2CXmcMBioF",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HHEnXeEPUhpDgWUfiqbn9c2CXmcMBioF&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1znH3lfHMfP8OQMr774SuaOislKm_68Fs&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dF7WALf8kOHbkWV-OxIF3U00tn5F2KWP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1A_YQrjAM-zy6TvV8y_MpWV_a_XYlXLVO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=145oTeqrvXbGgUS0TQSdr_Id--5H1i98Y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x2MTNdE_9nm5uLMeKLUIx92NLXoV44pF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1aEoWsGSoqO4GRKnZyzRJkoYYj1chmGSO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O-ffgNdRIYw3hr-hzOpFt4JzlckZqKu6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1misjSZ_QSHoipVgstfvHugz-gkJozmdA&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gV4ES9LFPkG8Qlp1khsyhgkgN9-2Xcp9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HHEnXeEPUhpDgWUfiqbn9c2CXmcMBioF&v=2"
    ]
  },
  "sv-091": {
    "folderId": "1vy7M5eCuw72cP9jYiKcT_e_AvjueoES1",
    "folderName": "Mr. Rakesh Katkar",
    "sheetProjectId": "SV-091",
    "customerName": "Mr.Rakesh Katkar",
    "location": "Pune",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1znH3lfHMfP8OQMr774SuaOislKm_68Fs",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1znH3lfHMfP8OQMr774SuaOislKm_68Fs&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1znH3lfHMfP8OQMr774SuaOislKm_68Fs",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1znH3lfHMfP8OQMr774SuaOislKm_68Fs&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1dF7WALf8kOHbkWV-OxIF3U00tn5F2KWP",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dF7WALf8kOHbkWV-OxIF3U00tn5F2KWP&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1A_YQrjAM-zy6TvV8y_MpWV_a_XYlXLVO",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1A_YQrjAM-zy6TvV8y_MpWV_a_XYlXLVO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "145oTeqrvXbGgUS0TQSdr_Id--5H1i98Y",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=145oTeqrvXbGgUS0TQSdr_Id--5H1i98Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x2MTNdE_9nm5uLMeKLUIx92NLXoV44pF",
        "name": "4.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x2MTNdE_9nm5uLMeKLUIx92NLXoV44pF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1aEoWsGSoqO4GRKnZyzRJkoYYj1chmGSO",
        "name": "5.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1aEoWsGSoqO4GRKnZyzRJkoYYj1chmGSO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O-ffgNdRIYw3hr-hzOpFt4JzlckZqKu6",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O-ffgNdRIYw3hr-hzOpFt4JzlckZqKu6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1misjSZ_QSHoipVgstfvHugz-gkJozmdA",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1misjSZ_QSHoipVgstfvHugz-gkJozmdA&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gV4ES9LFPkG8Qlp1khsyhgkgN9-2Xcp9",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gV4ES9LFPkG8Qlp1khsyhgkgN9-2Xcp9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HHEnXeEPUhpDgWUfiqbn9c2CXmcMBioF",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HHEnXeEPUhpDgWUfiqbn9c2CXmcMBioF&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1znH3lfHMfP8OQMr774SuaOislKm_68Fs&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1dF7WALf8kOHbkWV-OxIF3U00tn5F2KWP&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1A_YQrjAM-zy6TvV8y_MpWV_a_XYlXLVO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=145oTeqrvXbGgUS0TQSdr_Id--5H1i98Y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x2MTNdE_9nm5uLMeKLUIx92NLXoV44pF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1aEoWsGSoqO4GRKnZyzRJkoYYj1chmGSO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O-ffgNdRIYw3hr-hzOpFt4JzlckZqKu6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1misjSZ_QSHoipVgstfvHugz-gkJozmdA&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gV4ES9LFPkG8Qlp1khsyhgkgN9-2Xcp9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HHEnXeEPUhpDgWUfiqbn9c2CXmcMBioF&v=2"
    ]
  },
  "1lgqRX6Ls2y53T8GjyFnVtGL9vWVfonez": {
    "folderId": "1lgqRX6Ls2y53T8GjyFnVtGL9vWVfonez",
    "folderName": "Mr. Rajasekhar M",
    "sheetProjectId": "SV-089",
    "customerName": "Mr. Rajasekhar M",
    "location": "Thanjavur",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi",
        "name": "1.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jyF9zWOg_b8CbYSc7ZHuCgqLDHB5jAgm",
        "name": "2.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jyF9zWOg_b8CbYSc7ZHuCgqLDHB5jAgm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HJm-uC-nQvdsd1l2Fzh0Pu3R6FA5UAYC",
        "name": "3.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HJm-uC-nQvdsd1l2Fzh0Pu3R6FA5UAYC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1uSlWKFX2ftazS2WJmTQ7eJzFOWuwj2X9",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uSlWKFX2ftazS2WJmTQ7eJzFOWuwj2X9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1m2HzwbqLmzKrHPS7lItuuJKHIw9sZRjd",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1m2HzwbqLmzKrHPS7lItuuJKHIw9sZRjd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1v4eNBbIqb_FdkSspfS4D_KyREHsC5SXi",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1v4eNBbIqb_FdkSspfS4D_KyREHsC5SXi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1iDuuG2XblHk9bvCQaOlMI2SzNoK_zYrz",
        "name": "7.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iDuuG2XblHk9bvCQaOlMI2SzNoK_zYrz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Q1uq-iteNYPHxGPB02_j8fZ4bxXoMDbZ",
        "name": "8.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q1uq-iteNYPHxGPB02_j8fZ4bxXoMDbZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YxwwFzP_YesVZqhMhwYjO_QkuEzwjOgB",
        "name": "9.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YxwwFzP_YesVZqhMhwYjO_QkuEzwjOgB&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jyF9zWOg_b8CbYSc7ZHuCgqLDHB5jAgm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HJm-uC-nQvdsd1l2Fzh0Pu3R6FA5UAYC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uSlWKFX2ftazS2WJmTQ7eJzFOWuwj2X9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1m2HzwbqLmzKrHPS7lItuuJKHIw9sZRjd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1v4eNBbIqb_FdkSspfS4D_KyREHsC5SXi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iDuuG2XblHk9bvCQaOlMI2SzNoK_zYrz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q1uq-iteNYPHxGPB02_j8fZ4bxXoMDbZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YxwwFzP_YesVZqhMhwYjO_QkuEzwjOgB&v=2"
    ]
  },
  "sv-089": {
    "folderId": "1lgqRX6Ls2y53T8GjyFnVtGL9vWVfonez",
    "folderName": "Mr. Rajasekhar M",
    "sheetProjectId": "SV-089",
    "customerName": "Mr. Rajasekhar M",
    "location": "Thanjavur",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi",
        "name": "1.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jyF9zWOg_b8CbYSc7ZHuCgqLDHB5jAgm",
        "name": "2.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jyF9zWOg_b8CbYSc7ZHuCgqLDHB5jAgm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HJm-uC-nQvdsd1l2Fzh0Pu3R6FA5UAYC",
        "name": "3.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HJm-uC-nQvdsd1l2Fzh0Pu3R6FA5UAYC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1uSlWKFX2ftazS2WJmTQ7eJzFOWuwj2X9",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uSlWKFX2ftazS2WJmTQ7eJzFOWuwj2X9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1m2HzwbqLmzKrHPS7lItuuJKHIw9sZRjd",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1m2HzwbqLmzKrHPS7lItuuJKHIw9sZRjd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1v4eNBbIqb_FdkSspfS4D_KyREHsC5SXi",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1v4eNBbIqb_FdkSspfS4D_KyREHsC5SXi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1iDuuG2XblHk9bvCQaOlMI2SzNoK_zYrz",
        "name": "7.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iDuuG2XblHk9bvCQaOlMI2SzNoK_zYrz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Q1uq-iteNYPHxGPB02_j8fZ4bxXoMDbZ",
        "name": "8.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q1uq-iteNYPHxGPB02_j8fZ4bxXoMDbZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YxwwFzP_YesVZqhMhwYjO_QkuEzwjOgB",
        "name": "9.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YxwwFzP_YesVZqhMhwYjO_QkuEzwjOgB&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xim2zwy-CHyfmO51zelSTS6xBQ4PPVPi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jyF9zWOg_b8CbYSc7ZHuCgqLDHB5jAgm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HJm-uC-nQvdsd1l2Fzh0Pu3R6FA5UAYC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uSlWKFX2ftazS2WJmTQ7eJzFOWuwj2X9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1m2HzwbqLmzKrHPS7lItuuJKHIw9sZRjd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1v4eNBbIqb_FdkSspfS4D_KyREHsC5SXi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1iDuuG2XblHk9bvCQaOlMI2SzNoK_zYrz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Q1uq-iteNYPHxGPB02_j8fZ4bxXoMDbZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YxwwFzP_YesVZqhMhwYjO_QkuEzwjOgB&v=2"
    ]
  },
  "1jw-oatI68S2gFwdWzjSGBhTWlpFhoRyf": {
    "folderId": "1jw-oatI68S2gFwdWzjSGBhTWlpFhoRyf",
    "folderName": "Mr. Rajesh Stone",
    "sheetProjectId": "SV-077",
    "customerName": "Mr. Rajesh Stone",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 5,
    "videoCount": 0,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bnEH6BaqrEf06dGbVLSAYgIsZNDeo1bT",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bnEH6BaqrEf06dGbVLSAYgIsZNDeo1bT&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hJPE8xhHNIHBWP_Sh1dyfvA85kCz5tXW",
        "name": "3.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hJPE8xhHNIHBWP_Sh1dyfvA85kCz5tXW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Kv8r8HQxQnls57x7fZGAgmVnMFCMckeK",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Kv8r8HQxQnls57x7fZGAgmVnMFCMckeK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JJYzN2Py2QWv_lpc2dRsiW0bme-tfT5E",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JJYzN2Py2QWv_lpc2dRsiW0bme-tfT5E&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bnEH6BaqrEf06dGbVLSAYgIsZNDeo1bT&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hJPE8xhHNIHBWP_Sh1dyfvA85kCz5tXW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Kv8r8HQxQnls57x7fZGAgmVnMFCMckeK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JJYzN2Py2QWv_lpc2dRsiW0bme-tfT5E&v=2"
    ]
  },
  "sv-077": {
    "folderId": "1jw-oatI68S2gFwdWzjSGBhTWlpFhoRyf",
    "folderName": "Mr. Rajesh Stone",
    "sheetProjectId": "SV-077",
    "customerName": "Mr. Rajesh Stone",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 5,
    "videoCount": 0,
    "totalMediaCount": 5,
    "media": [
      {
        "id": "1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bnEH6BaqrEf06dGbVLSAYgIsZNDeo1bT",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bnEH6BaqrEf06dGbVLSAYgIsZNDeo1bT&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hJPE8xhHNIHBWP_Sh1dyfvA85kCz5tXW",
        "name": "3.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hJPE8xhHNIHBWP_Sh1dyfvA85kCz5tXW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Kv8r8HQxQnls57x7fZGAgmVnMFCMckeK",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Kv8r8HQxQnls57x7fZGAgmVnMFCMckeK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JJYzN2Py2QWv_lpc2dRsiW0bme-tfT5E",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JJYzN2Py2QWv_lpc2dRsiW0bme-tfT5E&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQK4zF4WkHp8eSXF2B6sZIKqigSfd0co&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bnEH6BaqrEf06dGbVLSAYgIsZNDeo1bT&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hJPE8xhHNIHBWP_Sh1dyfvA85kCz5tXW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Kv8r8HQxQnls57x7fZGAgmVnMFCMckeK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JJYzN2Py2QWv_lpc2dRsiW0bme-tfT5E&v=2"
    ]
  },
  "1RzBK4xlkAkg1TyJaDC3ioUZ7oARnU7Rr": {
    "folderId": "1RzBK4xlkAkg1TyJaDC3ioUZ7oARnU7Rr",
    "folderName": "Mr. Atul Mehotra",
    "sheetProjectId": "SV-074",
    "customerName": "Mr. Athul Mehrotra",
    "location": "Satna",
    "structureType": "Farmhouse Temple",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 16,
    "videoCount": 2,
    "totalMediaCount": 18,
    "media": [
      {
        "id": "1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11lfgRBv1DrjQAulmBpHSRy4oudSi3IPu",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11lfgRBv1DrjQAulmBpHSRy4oudSi3IPu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PQSNJo_NOtrS2xd1fcwqYyvxSzUmUmOw",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PQSNJo_NOtrS2xd1fcwqYyvxSzUmUmOw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1IXyBg78pKTJz0hPDp8uPFPcI1Z9Zru_T",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IXyBg78pKTJz0hPDp8uPFPcI1Z9Zru_T&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1oSNdgQpxQQQyh4CUijLFmZyw-Zt2qDw5",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oSNdgQpxQQQyh4CUijLFmZyw-Zt2qDw5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hqtKrgeLzadUzza-Ve7M33rsiwnY5ZrQ",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hqtKrgeLzadUzza-Ve7M33rsiwnY5ZrQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1swOfF0_imgq3R9DEER3oaxIyC4vNZCrV",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1swOfF0_imgq3R9DEER3oaxIyC4vNZCrV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1e4d8pJdEp0kiOcGZZQL6ud6rsAFAITF-",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e4d8pJdEp0kiOcGZZQL6ud6rsAFAITF-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10QB44-4_qleu-HEBPKxdHaoHwsJPmzLC",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10QB44-4_qleu-HEBPKxdHaoHwsJPmzLC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WqAFD0t5L003aEDSIhvjsTu3t5ciU-rr",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WqAFD0t5L003aEDSIhvjsTu3t5ciU-rr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1l23IEtnLhGgtfCqyDo9I7V5k0jwC7XOM",
        "name": "12.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l23IEtnLhGgtfCqyDo9I7V5k0jwC7XOM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1X6qGpzGPQsC6iMZ6B-2RT4K-mVZ8XgzM",
        "name": "13.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1X6qGpzGPQsC6iMZ6B-2RT4K-mVZ8XgzM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1l0WqRj7wDiBDZehoR1fQygCs4HVl7jqb",
        "name": "14.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l0WqRj7wDiBDZehoR1fQygCs4HVl7jqb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Wld1d3zBy6YKQ_SrwrN-SIhFQBJOQgh9",
        "name": "15.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Wld1d3zBy6YKQ_SrwrN-SIhFQBJOQgh9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-LX7c1RBzcoNhWWgchOvq66zUqbFKsth",
        "name": "16.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-LX7c1RBzcoNhWWgchOvq66zUqbFKsth&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rAGnkmBmTnQtmcMNa-B83u-KQ21VriOx",
        "name": "fINAL.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rAGnkmBmTnQtmcMNa-B83u-KQ21VriOx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "193B2xc2eI1hF8hq7GhS19KOg7c-rexwV",
        "name": "17.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=193B2xc2eI1hF8hq7GhS19KOg7c-rexwV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qunCFNnFw8CFjvLANhXODcqqIO_UrxVe",
        "name": "18.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qunCFNnFw8CFjvLANhXODcqqIO_UrxVe&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11lfgRBv1DrjQAulmBpHSRy4oudSi3IPu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PQSNJo_NOtrS2xd1fcwqYyvxSzUmUmOw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IXyBg78pKTJz0hPDp8uPFPcI1Z9Zru_T&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oSNdgQpxQQQyh4CUijLFmZyw-Zt2qDw5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hqtKrgeLzadUzza-Ve7M33rsiwnY5ZrQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1swOfF0_imgq3R9DEER3oaxIyC4vNZCrV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e4d8pJdEp0kiOcGZZQL6ud6rsAFAITF-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10QB44-4_qleu-HEBPKxdHaoHwsJPmzLC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WqAFD0t5L003aEDSIhvjsTu3t5ciU-rr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l23IEtnLhGgtfCqyDo9I7V5k0jwC7XOM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1X6qGpzGPQsC6iMZ6B-2RT4K-mVZ8XgzM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l0WqRj7wDiBDZehoR1fQygCs4HVl7jqb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Wld1d3zBy6YKQ_SrwrN-SIhFQBJOQgh9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-LX7c1RBzcoNhWWgchOvq66zUqbFKsth&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rAGnkmBmTnQtmcMNa-B83u-KQ21VriOx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=193B2xc2eI1hF8hq7GhS19KOg7c-rexwV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qunCFNnFw8CFjvLANhXODcqqIO_UrxVe&v=2"
    ]
  },
  "sv-074": {
    "folderId": "1RzBK4xlkAkg1TyJaDC3ioUZ7oARnU7Rr",
    "folderName": "Mr. Atul Mehotra",
    "sheetProjectId": "SV-074",
    "customerName": "Mr. Athul Mehrotra",
    "location": "Satna",
    "structureType": "Farmhouse Temple",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 16,
    "videoCount": 2,
    "totalMediaCount": 18,
    "media": [
      {
        "id": "1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11lfgRBv1DrjQAulmBpHSRy4oudSi3IPu",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11lfgRBv1DrjQAulmBpHSRy4oudSi3IPu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PQSNJo_NOtrS2xd1fcwqYyvxSzUmUmOw",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PQSNJo_NOtrS2xd1fcwqYyvxSzUmUmOw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1IXyBg78pKTJz0hPDp8uPFPcI1Z9Zru_T",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IXyBg78pKTJz0hPDp8uPFPcI1Z9Zru_T&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1oSNdgQpxQQQyh4CUijLFmZyw-Zt2qDw5",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oSNdgQpxQQQyh4CUijLFmZyw-Zt2qDw5&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hqtKrgeLzadUzza-Ve7M33rsiwnY5ZrQ",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hqtKrgeLzadUzza-Ve7M33rsiwnY5ZrQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1swOfF0_imgq3R9DEER3oaxIyC4vNZCrV",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1swOfF0_imgq3R9DEER3oaxIyC4vNZCrV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1e4d8pJdEp0kiOcGZZQL6ud6rsAFAITF-",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e4d8pJdEp0kiOcGZZQL6ud6rsAFAITF-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10QB44-4_qleu-HEBPKxdHaoHwsJPmzLC",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10QB44-4_qleu-HEBPKxdHaoHwsJPmzLC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WqAFD0t5L003aEDSIhvjsTu3t5ciU-rr",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WqAFD0t5L003aEDSIhvjsTu3t5ciU-rr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1l23IEtnLhGgtfCqyDo9I7V5k0jwC7XOM",
        "name": "12.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l23IEtnLhGgtfCqyDo9I7V5k0jwC7XOM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1X6qGpzGPQsC6iMZ6B-2RT4K-mVZ8XgzM",
        "name": "13.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1X6qGpzGPQsC6iMZ6B-2RT4K-mVZ8XgzM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1l0WqRj7wDiBDZehoR1fQygCs4HVl7jqb",
        "name": "14.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l0WqRj7wDiBDZehoR1fQygCs4HVl7jqb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Wld1d3zBy6YKQ_SrwrN-SIhFQBJOQgh9",
        "name": "15.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Wld1d3zBy6YKQ_SrwrN-SIhFQBJOQgh9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-LX7c1RBzcoNhWWgchOvq66zUqbFKsth",
        "name": "16.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-LX7c1RBzcoNhWWgchOvq66zUqbFKsth&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rAGnkmBmTnQtmcMNa-B83u-KQ21VriOx",
        "name": "fINAL.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rAGnkmBmTnQtmcMNa-B83u-KQ21VriOx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "193B2xc2eI1hF8hq7GhS19KOg7c-rexwV",
        "name": "17.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=193B2xc2eI1hF8hq7GhS19KOg7c-rexwV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qunCFNnFw8CFjvLANhXODcqqIO_UrxVe",
        "name": "18.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qunCFNnFw8CFjvLANhXODcqqIO_UrxVe&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cmT4XeJ49wc9UvDL1e7Vr-I4hl9aUquk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11lfgRBv1DrjQAulmBpHSRy4oudSi3IPu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PQSNJo_NOtrS2xd1fcwqYyvxSzUmUmOw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1IXyBg78pKTJz0hPDp8uPFPcI1Z9Zru_T&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1oSNdgQpxQQQyh4CUijLFmZyw-Zt2qDw5&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hqtKrgeLzadUzza-Ve7M33rsiwnY5ZrQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1swOfF0_imgq3R9DEER3oaxIyC4vNZCrV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1e4d8pJdEp0kiOcGZZQL6ud6rsAFAITF-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10QB44-4_qleu-HEBPKxdHaoHwsJPmzLC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WqAFD0t5L003aEDSIhvjsTu3t5ciU-rr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l23IEtnLhGgtfCqyDo9I7V5k0jwC7XOM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1X6qGpzGPQsC6iMZ6B-2RT4K-mVZ8XgzM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l0WqRj7wDiBDZehoR1fQygCs4HVl7jqb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Wld1d3zBy6YKQ_SrwrN-SIhFQBJOQgh9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-LX7c1RBzcoNhWWgchOvq66zUqbFKsth&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rAGnkmBmTnQtmcMNa-B83u-KQ21VriOx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=193B2xc2eI1hF8hq7GhS19KOg7c-rexwV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qunCFNnFw8CFjvLANhXODcqqIO_UrxVe&v=2"
    ]
  },
  "1I5zyyIJGz3ZCRwv5cGxh9TjdH5SZXXOr": {
    "folderId": "1I5zyyIJGz3ZCRwv5cGxh9TjdH5SZXXOr",
    "folderName": "Mr. Nikhil",
    "sheetProjectId": "SV-083",
    "customerName": "Mr. Nikhil",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 16,
    "videoCount": 0,
    "totalMediaCount": 16,
    "media": [
      {
        "id": "1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13UoUWUGyPwugAW7OHHbpEFiZdV-jaka4",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13UoUWUGyPwugAW7OHHbpEFiZdV-jaka4&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1r4L7QGbort-TXPjtqcN1ODEEPJmgTmle",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r4L7QGbort-TXPjtqcN1ODEEPJmgTmle&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1G_3U6nLEe9eAHo9lgtuLKCatHx2dM55F",
        "name": "4.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G_3U6nLEe9eAHo9lgtuLKCatHx2dM55F&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gY5DMcDDDdXef_K7eLuoptTq-8xUz0qK",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gY5DMcDDDdXef_K7eLuoptTq-8xUz0qK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1DVZp-2po2j3j9akk-vHLRTbWftatiVZl",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DVZp-2po2j3j9akk-vHLRTbWftatiVZl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wpkmLqOtSL-3ngAzabQ0FoLbHt2hUi6p",
        "name": "7.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wpkmLqOtSL-3ngAzabQ0FoLbHt2hUi6p&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1kD8k6QDPeArSLF5cRteouY9jSj0yGP2Y",
        "name": "8.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kD8k6QDPeArSLF5cRteouY9jSj0yGP2Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Xjq1Vig85ksF1jUyab28UCR-7awhz0gz",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xjq1Vig85ksF1jUyab28UCR-7awhz0gz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "151ke46qp0wPb4AAs7gA2WcT-sT4p6btt",
        "name": "10.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=151ke46qp0wPb4AAs7gA2WcT-sT4p6btt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KUN8qLoE0l_-1835Yh_slUpPx3yfW6Mk",
        "name": "11.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KUN8qLoE0l_-1835Yh_slUpPx3yfW6Mk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1refErIfTOPZs2rHV03gzKz5qlcfWZfj4",
        "name": "12.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1refErIfTOPZs2rHV03gzKz5qlcfWZfj4&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UhSbZVzS-bK6zOu-IE8wo5Z8iWQezoZf",
        "name": "13.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UhSbZVzS-bK6zOu-IE8wo5Z8iWQezoZf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19ILKoV1e3tjk8RvL8ZRet3Qqk4UbLRhU",
        "name": "14.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19ILKoV1e3tjk8RvL8ZRet3Qqk4UbLRhU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pLs9GsJ5spomag0ybnG_fabp-8lhvz9G",
        "name": "15.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pLs9GsJ5spomag0ybnG_fabp-8lhvz9G&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Sa7WYcPAsVAfrd7pf-xnK1I5g7gRzXQS",
        "name": "16.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Sa7WYcPAsVAfrd7pf-xnK1I5g7gRzXQS&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13UoUWUGyPwugAW7OHHbpEFiZdV-jaka4&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r4L7QGbort-TXPjtqcN1ODEEPJmgTmle&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G_3U6nLEe9eAHo9lgtuLKCatHx2dM55F&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gY5DMcDDDdXef_K7eLuoptTq-8xUz0qK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DVZp-2po2j3j9akk-vHLRTbWftatiVZl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wpkmLqOtSL-3ngAzabQ0FoLbHt2hUi6p&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kD8k6QDPeArSLF5cRteouY9jSj0yGP2Y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xjq1Vig85ksF1jUyab28UCR-7awhz0gz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=151ke46qp0wPb4AAs7gA2WcT-sT4p6btt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KUN8qLoE0l_-1835Yh_slUpPx3yfW6Mk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1refErIfTOPZs2rHV03gzKz5qlcfWZfj4&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UhSbZVzS-bK6zOu-IE8wo5Z8iWQezoZf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19ILKoV1e3tjk8RvL8ZRet3Qqk4UbLRhU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pLs9GsJ5spomag0ybnG_fabp-8lhvz9G&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Sa7WYcPAsVAfrd7pf-xnK1I5g7gRzXQS&v=2"
    ]
  },
  "sv-083": {
    "folderId": "1I5zyyIJGz3ZCRwv5cGxh9TjdH5SZXXOr",
    "folderName": "Mr. Nikhil",
    "sheetProjectId": "SV-083",
    "customerName": "Mr. Nikhil",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 16,
    "videoCount": 0,
    "totalMediaCount": 16,
    "media": [
      {
        "id": "1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13UoUWUGyPwugAW7OHHbpEFiZdV-jaka4",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13UoUWUGyPwugAW7OHHbpEFiZdV-jaka4&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1r4L7QGbort-TXPjtqcN1ODEEPJmgTmle",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r4L7QGbort-TXPjtqcN1ODEEPJmgTmle&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1G_3U6nLEe9eAHo9lgtuLKCatHx2dM55F",
        "name": "4.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G_3U6nLEe9eAHo9lgtuLKCatHx2dM55F&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1gY5DMcDDDdXef_K7eLuoptTq-8xUz0qK",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gY5DMcDDDdXef_K7eLuoptTq-8xUz0qK&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1DVZp-2po2j3j9akk-vHLRTbWftatiVZl",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DVZp-2po2j3j9akk-vHLRTbWftatiVZl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wpkmLqOtSL-3ngAzabQ0FoLbHt2hUi6p",
        "name": "7.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wpkmLqOtSL-3ngAzabQ0FoLbHt2hUi6p&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1kD8k6QDPeArSLF5cRteouY9jSj0yGP2Y",
        "name": "8.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kD8k6QDPeArSLF5cRteouY9jSj0yGP2Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Xjq1Vig85ksF1jUyab28UCR-7awhz0gz",
        "name": "9.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xjq1Vig85ksF1jUyab28UCR-7awhz0gz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "151ke46qp0wPb4AAs7gA2WcT-sT4p6btt",
        "name": "10.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=151ke46qp0wPb4AAs7gA2WcT-sT4p6btt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KUN8qLoE0l_-1835Yh_slUpPx3yfW6Mk",
        "name": "11.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KUN8qLoE0l_-1835Yh_slUpPx3yfW6Mk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1refErIfTOPZs2rHV03gzKz5qlcfWZfj4",
        "name": "12.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1refErIfTOPZs2rHV03gzKz5qlcfWZfj4&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UhSbZVzS-bK6zOu-IE8wo5Z8iWQezoZf",
        "name": "13.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UhSbZVzS-bK6zOu-IE8wo5Z8iWQezoZf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19ILKoV1e3tjk8RvL8ZRet3Qqk4UbLRhU",
        "name": "14.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19ILKoV1e3tjk8RvL8ZRet3Qqk4UbLRhU&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pLs9GsJ5spomag0ybnG_fabp-8lhvz9G",
        "name": "15.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pLs9GsJ5spomag0ybnG_fabp-8lhvz9G&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Sa7WYcPAsVAfrd7pf-xnK1I5g7gRzXQS",
        "name": "16.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Sa7WYcPAsVAfrd7pf-xnK1I5g7gRzXQS&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uiEMUnQxKao-bJczpUWtqCY3Amo9rq8r&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13UoUWUGyPwugAW7OHHbpEFiZdV-jaka4&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r4L7QGbort-TXPjtqcN1ODEEPJmgTmle&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G_3U6nLEe9eAHo9lgtuLKCatHx2dM55F&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1gY5DMcDDDdXef_K7eLuoptTq-8xUz0qK&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DVZp-2po2j3j9akk-vHLRTbWftatiVZl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wpkmLqOtSL-3ngAzabQ0FoLbHt2hUi6p&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kD8k6QDPeArSLF5cRteouY9jSj0yGP2Y&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Xjq1Vig85ksF1jUyab28UCR-7awhz0gz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=151ke46qp0wPb4AAs7gA2WcT-sT4p6btt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KUN8qLoE0l_-1835Yh_slUpPx3yfW6Mk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1refErIfTOPZs2rHV03gzKz5qlcfWZfj4&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UhSbZVzS-bK6zOu-IE8wo5Z8iWQezoZf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19ILKoV1e3tjk8RvL8ZRet3Qqk4UbLRhU&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pLs9GsJ5spomag0ybnG_fabp-8lhvz9G&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Sa7WYcPAsVAfrd7pf-xnK1I5g7gRzXQS&v=2"
    ]
  },
  "18u7espZBhth6opprF9HRmk4q5CfJ2sJU": {
    "folderId": "18u7espZBhth6opprF9HRmk4q5CfJ2sJU",
    "folderName": "Dr. Chidananda",
    "sheetProjectId": "SV-073",
    "customerName": "Dr. Chidananda",
    "location": "Bengaluru",
    "structureType": "Farmhouse Temple",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 3,
    "videoCount": 5,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x4AmuHY4-of1Uedi1nXXq9aZwVaWbvRV",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x4AmuHY4-of1Uedi1nXXq9aZwVaWbvRV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1kE-V14IZmHrvJ4vllFmeDSwE1Mq9zdnE",
        "name": "17.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kE-V14IZmHrvJ4vllFmeDSwE1Mq9zdnE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1h7nrDy2bcXxYSpJr49IKpijAWrOByayI",
        "name": "1.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h7nrDy2bcXxYSpJr49IKpijAWrOByayI&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Z6l2IKrKihCVRYEVqyEL99jg81DCezn9",
        "name": "2.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z6l2IKrKihCVRYEVqyEL99jg81DCezn9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1whkPlnbDdAwAZkusSK6SX7RRMpwB61l6",
        "name": "3.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1whkPlnbDdAwAZkusSK6SX7RRMpwB61l6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1_NLsOotEwH7p01QZKwAdigBttCI84tTl",
        "name": "5.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_NLsOotEwH7p01QZKwAdigBttCI84tTl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JQFWUr17vv03-c5qPWOLMPcsr7FRT3z1",
        "name": "18.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQFWUr17vv03-c5qPWOLMPcsr7FRT3z1&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x4AmuHY4-of1Uedi1nXXq9aZwVaWbvRV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kE-V14IZmHrvJ4vllFmeDSwE1Mq9zdnE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h7nrDy2bcXxYSpJr49IKpijAWrOByayI&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z6l2IKrKihCVRYEVqyEL99jg81DCezn9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1whkPlnbDdAwAZkusSK6SX7RRMpwB61l6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_NLsOotEwH7p01QZKwAdigBttCI84tTl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQFWUr17vv03-c5qPWOLMPcsr7FRT3z1&v=2"
    ]
  },
  "sv-073": {
    "folderId": "18u7espZBhth6opprF9HRmk4q5CfJ2sJU",
    "folderName": "Dr. Chidananda",
    "sheetProjectId": "SV-073",
    "customerName": "Dr. Chidananda",
    "location": "Bengaluru",
    "structureType": "Farmhouse Temple",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 3,
    "videoCount": 5,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x4AmuHY4-of1Uedi1nXXq9aZwVaWbvRV",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x4AmuHY4-of1Uedi1nXXq9aZwVaWbvRV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1kE-V14IZmHrvJ4vllFmeDSwE1Mq9zdnE",
        "name": "17.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kE-V14IZmHrvJ4vllFmeDSwE1Mq9zdnE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1h7nrDy2bcXxYSpJr49IKpijAWrOByayI",
        "name": "1.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h7nrDy2bcXxYSpJr49IKpijAWrOByayI&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Z6l2IKrKihCVRYEVqyEL99jg81DCezn9",
        "name": "2.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z6l2IKrKihCVRYEVqyEL99jg81DCezn9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1whkPlnbDdAwAZkusSK6SX7RRMpwB61l6",
        "name": "3.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1whkPlnbDdAwAZkusSK6SX7RRMpwB61l6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1_NLsOotEwH7p01QZKwAdigBttCI84tTl",
        "name": "5.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_NLsOotEwH7p01QZKwAdigBttCI84tTl&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1JQFWUr17vv03-c5qPWOLMPcsr7FRT3z1",
        "name": "18.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQFWUr17vv03-c5qPWOLMPcsr7FRT3z1&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DzzQVZQ8mEgnOhhxP4T3PNNxplGu-lWC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x4AmuHY4-of1Uedi1nXXq9aZwVaWbvRV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kE-V14IZmHrvJ4vllFmeDSwE1Mq9zdnE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h7nrDy2bcXxYSpJr49IKpijAWrOByayI&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Z6l2IKrKihCVRYEVqyEL99jg81DCezn9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1whkPlnbDdAwAZkusSK6SX7RRMpwB61l6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_NLsOotEwH7p01QZKwAdigBttCI84tTl&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1JQFWUr17vv03-c5qPWOLMPcsr7FRT3z1&v=2"
    ]
  },
  "184SqSJi0H5uTb4eIXmMC7vRFCh7z6nzX": {
    "folderId": "184SqSJi0H5uTb4eIXmMC7vRFCh7z6nzX",
    "folderName": "Dr. Arun Pari",
    "sheetProjectId": "SV-072",
    "customerName": "Dr. Arun Pari",
    "location": "Chennai",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 23,
    "videoCount": 3,
    "totalMediaCount": 26,
    "media": [
      {
        "id": "1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O3numJwO_0xIi8daqwnlWI3CcukqCzmm",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O3numJwO_0xIi8daqwnlWI3CcukqCzmm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1P09X2pXRCpbEizYBpRMqKwCiegRmS3iW",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1P09X2pXRCpbEizYBpRMqKwCiegRmS3iW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vnXDOmWPnDtTBv7C8ZascRV83EwXUzo_",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vnXDOmWPnDtTBv7C8ZascRV83EwXUzo_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1APatdjhwnJH_HG7k9oelDMblIgtYsBII",
        "name": "4.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1APatdjhwnJH_HG7k9oelDMblIgtYsBII&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Tj8jXKs71q3wlqJarPKBv2VQmDlzuUcW",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Tj8jXKs71q3wlqJarPKBv2VQmDlzuUcW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10WRmYT_Y-9AaAN5GzAHOO8FNzvYvGq0m",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10WRmYT_Y-9AaAN5GzAHOO8FNzvYvGq0m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Jn82Sa3rhM1lC7OZnIV2QegAUjummLMJ",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Jn82Sa3rhM1lC7OZnIV2QegAUjummLMJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1I-Rh0ENdV2pmPo4HwQBrzcecM_zU9h5H",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-Rh0ENdV2pmPo4HwQBrzcecM_zU9h5H&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1v6hmCz0Nz7vTi2DfAeacACiaQw7bFsyE",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1v6hmCz0Nz7vTi2DfAeacACiaQw7bFsyE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1L4RaosIxP1nWQKQujzsuDps2Y5taWFZp",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1L4RaosIxP1nWQKQujzsuDps2Y5taWFZp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vDNQ0XXEXtRqDnkuXhDVfWP4u5rh1LxI",
        "name": "11.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vDNQ0XXEXtRqDnkuXhDVfWP4u5rh1LxI&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-sfpkeL1MOstTJ_5w01JPYEMuTxy4Lj-",
        "name": "12.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-sfpkeL1MOstTJ_5w01JPYEMuTxy4Lj-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1l_7IM5WGseWQj4M73z2WbP0ov5FDEoWA",
        "name": "13.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l_7IM5WGseWQj4M73z2WbP0ov5FDEoWA&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "18P58zsONI0kmL1W2A1JdMiV0Q6FK15ib",
        "name": "14.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18P58zsONI0kmL1W2A1JdMiV0Q6FK15ib&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1quVVXb0sZZ7YPdQZCC9QzJgu5Xw2yI5M",
        "name": "15.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1quVVXb0sZZ7YPdQZCC9QzJgu5Xw2yI5M&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1AD6O_J2y1GMFKE6JGIgldAn7PXR1oIgJ",
        "name": "16.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1AD6O_J2y1GMFKE6JGIgldAn7PXR1oIgJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Vf_aOJR4xdqrkcZjv5i7-kEBXB2DYABX",
        "name": "17.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Vf_aOJR4xdqrkcZjv5i7-kEBXB2DYABX&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ClhPFl8K5IUVdV_K8jWDo61nQ4pL4pH_",
        "name": "18.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ClhPFl8K5IUVdV_K8jWDo61nQ4pL4pH_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1txNzh8BFYfo9Bj0HvWfKOnXtiXI446os",
        "name": "22.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1txNzh8BFYfo9Bj0HvWfKOnXtiXI446os&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1N-R4i5sKhnFWEMgeNp0S9MEYi1bzrboe",
        "name": "23.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1N-R4i5sKhnFWEMgeNp0S9MEYi1bzrboe&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1S7mcSP-plF02EmtGhIR9ZeCk0cdHy_r9",
        "name": "24.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1S7mcSP-plF02EmtGhIR9ZeCk0cdHy_r9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VqaOJclTPfOTgjDDrF_uKRXqajoQf6uT",
        "name": "25.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VqaOJclTPfOTgjDDrF_uKRXqajoQf6uT&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pR1u9iA39GjR2FOC5TO0qxGuOGooXdlW",
        "name": "19.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pR1u9iA39GjR2FOC5TO0qxGuOGooXdlW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11t8IAEYd0PfqaezrDchZizyh21w1kNrW",
        "name": "20.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11t8IAEYd0PfqaezrDchZizyh21w1kNrW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ylYy1n8jslyYoqZOROI-bpt2FWNB8rh4",
        "name": "21.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ylYy1n8jslyYoqZOROI-bpt2FWNB8rh4&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O3numJwO_0xIi8daqwnlWI3CcukqCzmm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1P09X2pXRCpbEizYBpRMqKwCiegRmS3iW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vnXDOmWPnDtTBv7C8ZascRV83EwXUzo_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1APatdjhwnJH_HG7k9oelDMblIgtYsBII&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Tj8jXKs71q3wlqJarPKBv2VQmDlzuUcW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10WRmYT_Y-9AaAN5GzAHOO8FNzvYvGq0m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Jn82Sa3rhM1lC7OZnIV2QegAUjummLMJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-Rh0ENdV2pmPo4HwQBrzcecM_zU9h5H&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1v6hmCz0Nz7vTi2DfAeacACiaQw7bFsyE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1L4RaosIxP1nWQKQujzsuDps2Y5taWFZp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vDNQ0XXEXtRqDnkuXhDVfWP4u5rh1LxI&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-sfpkeL1MOstTJ_5w01JPYEMuTxy4Lj-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l_7IM5WGseWQj4M73z2WbP0ov5FDEoWA&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18P58zsONI0kmL1W2A1JdMiV0Q6FK15ib&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1quVVXb0sZZ7YPdQZCC9QzJgu5Xw2yI5M&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1AD6O_J2y1GMFKE6JGIgldAn7PXR1oIgJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Vf_aOJR4xdqrkcZjv5i7-kEBXB2DYABX&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ClhPFl8K5IUVdV_K8jWDo61nQ4pL4pH_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1txNzh8BFYfo9Bj0HvWfKOnXtiXI446os&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1N-R4i5sKhnFWEMgeNp0S9MEYi1bzrboe&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1S7mcSP-plF02EmtGhIR9ZeCk0cdHy_r9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VqaOJclTPfOTgjDDrF_uKRXqajoQf6uT&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pR1u9iA39GjR2FOC5TO0qxGuOGooXdlW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11t8IAEYd0PfqaezrDchZizyh21w1kNrW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ylYy1n8jslyYoqZOROI-bpt2FWNB8rh4&v=2"
    ]
  },
  "sv-072": {
    "folderId": "184SqSJi0H5uTb4eIXmMC7vRFCh7z6nzX",
    "folderName": "Dr. Arun Pari",
    "sheetProjectId": "SV-072",
    "customerName": "Dr. Arun Pari",
    "location": "Chennai",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 23,
    "videoCount": 3,
    "totalMediaCount": 26,
    "media": [
      {
        "id": "1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O3numJwO_0xIi8daqwnlWI3CcukqCzmm",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O3numJwO_0xIi8daqwnlWI3CcukqCzmm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1P09X2pXRCpbEizYBpRMqKwCiegRmS3iW",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1P09X2pXRCpbEizYBpRMqKwCiegRmS3iW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vnXDOmWPnDtTBv7C8ZascRV83EwXUzo_",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vnXDOmWPnDtTBv7C8ZascRV83EwXUzo_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1APatdjhwnJH_HG7k9oelDMblIgtYsBII",
        "name": "4.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1APatdjhwnJH_HG7k9oelDMblIgtYsBII&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Tj8jXKs71q3wlqJarPKBv2VQmDlzuUcW",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Tj8jXKs71q3wlqJarPKBv2VQmDlzuUcW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10WRmYT_Y-9AaAN5GzAHOO8FNzvYvGq0m",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10WRmYT_Y-9AaAN5GzAHOO8FNzvYvGq0m&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Jn82Sa3rhM1lC7OZnIV2QegAUjummLMJ",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Jn82Sa3rhM1lC7OZnIV2QegAUjummLMJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1I-Rh0ENdV2pmPo4HwQBrzcecM_zU9h5H",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-Rh0ENdV2pmPo4HwQBrzcecM_zU9h5H&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1v6hmCz0Nz7vTi2DfAeacACiaQw7bFsyE",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1v6hmCz0Nz7vTi2DfAeacACiaQw7bFsyE&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1L4RaosIxP1nWQKQujzsuDps2Y5taWFZp",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1L4RaosIxP1nWQKQujzsuDps2Y5taWFZp&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vDNQ0XXEXtRqDnkuXhDVfWP4u5rh1LxI",
        "name": "11.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vDNQ0XXEXtRqDnkuXhDVfWP4u5rh1LxI&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-sfpkeL1MOstTJ_5w01JPYEMuTxy4Lj-",
        "name": "12.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-sfpkeL1MOstTJ_5w01JPYEMuTxy4Lj-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1l_7IM5WGseWQj4M73z2WbP0ov5FDEoWA",
        "name": "13.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l_7IM5WGseWQj4M73z2WbP0ov5FDEoWA&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "18P58zsONI0kmL1W2A1JdMiV0Q6FK15ib",
        "name": "14.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18P58zsONI0kmL1W2A1JdMiV0Q6FK15ib&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1quVVXb0sZZ7YPdQZCC9QzJgu5Xw2yI5M",
        "name": "15.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1quVVXb0sZZ7YPdQZCC9QzJgu5Xw2yI5M&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1AD6O_J2y1GMFKE6JGIgldAn7PXR1oIgJ",
        "name": "16.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1AD6O_J2y1GMFKE6JGIgldAn7PXR1oIgJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Vf_aOJR4xdqrkcZjv5i7-kEBXB2DYABX",
        "name": "17.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Vf_aOJR4xdqrkcZjv5i7-kEBXB2DYABX&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ClhPFl8K5IUVdV_K8jWDo61nQ4pL4pH_",
        "name": "18.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ClhPFl8K5IUVdV_K8jWDo61nQ4pL4pH_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1txNzh8BFYfo9Bj0HvWfKOnXtiXI446os",
        "name": "22.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1txNzh8BFYfo9Bj0HvWfKOnXtiXI446os&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1N-R4i5sKhnFWEMgeNp0S9MEYi1bzrboe",
        "name": "23.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1N-R4i5sKhnFWEMgeNp0S9MEYi1bzrboe&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1S7mcSP-plF02EmtGhIR9ZeCk0cdHy_r9",
        "name": "24.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1S7mcSP-plF02EmtGhIR9ZeCk0cdHy_r9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VqaOJclTPfOTgjDDrF_uKRXqajoQf6uT",
        "name": "25.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VqaOJclTPfOTgjDDrF_uKRXqajoQf6uT&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pR1u9iA39GjR2FOC5TO0qxGuOGooXdlW",
        "name": "19.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pR1u9iA39GjR2FOC5TO0qxGuOGooXdlW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11t8IAEYd0PfqaezrDchZizyh21w1kNrW",
        "name": "20.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11t8IAEYd0PfqaezrDchZizyh21w1kNrW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ylYy1n8jslyYoqZOROI-bpt2FWNB8rh4",
        "name": "21.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ylYy1n8jslyYoqZOROI-bpt2FWNB8rh4&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1kSBlrShOfrWXEfzMUdgNF7PSC1DFsW6m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O3numJwO_0xIi8daqwnlWI3CcukqCzmm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1P09X2pXRCpbEizYBpRMqKwCiegRmS3iW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vnXDOmWPnDtTBv7C8ZascRV83EwXUzo_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1APatdjhwnJH_HG7k9oelDMblIgtYsBII&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Tj8jXKs71q3wlqJarPKBv2VQmDlzuUcW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10WRmYT_Y-9AaAN5GzAHOO8FNzvYvGq0m&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Jn82Sa3rhM1lC7OZnIV2QegAUjummLMJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1I-Rh0ENdV2pmPo4HwQBrzcecM_zU9h5H&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1v6hmCz0Nz7vTi2DfAeacACiaQw7bFsyE&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1L4RaosIxP1nWQKQujzsuDps2Y5taWFZp&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vDNQ0XXEXtRqDnkuXhDVfWP4u5rh1LxI&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-sfpkeL1MOstTJ_5w01JPYEMuTxy4Lj-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l_7IM5WGseWQj4M73z2WbP0ov5FDEoWA&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18P58zsONI0kmL1W2A1JdMiV0Q6FK15ib&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1quVVXb0sZZ7YPdQZCC9QzJgu5Xw2yI5M&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1AD6O_J2y1GMFKE6JGIgldAn7PXR1oIgJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Vf_aOJR4xdqrkcZjv5i7-kEBXB2DYABX&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ClhPFl8K5IUVdV_K8jWDo61nQ4pL4pH_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1txNzh8BFYfo9Bj0HvWfKOnXtiXI446os&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1N-R4i5sKhnFWEMgeNp0S9MEYi1bzrboe&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1S7mcSP-plF02EmtGhIR9ZeCk0cdHy_r9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VqaOJclTPfOTgjDDrF_uKRXqajoQf6uT&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pR1u9iA39GjR2FOC5TO0qxGuOGooXdlW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11t8IAEYd0PfqaezrDchZizyh21w1kNrW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ylYy1n8jslyYoqZOROI-bpt2FWNB8rh4&v=2"
    ]
  },
  "1H64Mjbh7GD7IfQvudSP7oAMoQCcWXPGJ": {
    "folderId": "1H64Mjbh7GD7IfQvudSP7oAMoQCcWXPGJ",
    "folderName": "Ms. Yogalakshmi",
    "sheetProjectId": "SV-006",
    "customerName": "Ms. Yogalakshmi",
    "location": "Chennai",
    "structureType": "Existing Room Frontage",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ERPp18WwpPTsNWSMaYg8O86lyoQXmS9p",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ERPp18WwpPTsNWSMaYg8O86lyoQXmS9p&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Rl5ZtEUGe3S-f1YaQUIQstsTYnPVVReB",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Rl5ZtEUGe3S-f1YaQUIQstsTYnPVVReB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O2OGQFyCfAIrthVr2OJLganDLtcTAknO",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O2OGQFyCfAIrthVr2OJLganDLtcTAknO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wVodmt5I8bmYLsjXRRi5Uc3urXi7PKQv",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wVodmt5I8bmYLsjXRRi5Uc3urXi7PKQv&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fB0q67tFRBHABC5-ZbsSUjhjPiPelllO",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fB0q67tFRBHABC5-ZbsSUjhjPiPelllO&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ERPp18WwpPTsNWSMaYg8O86lyoQXmS9p&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Rl5ZtEUGe3S-f1YaQUIQstsTYnPVVReB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O2OGQFyCfAIrthVr2OJLganDLtcTAknO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wVodmt5I8bmYLsjXRRi5Uc3urXi7PKQv&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fB0q67tFRBHABC5-ZbsSUjhjPiPelllO&v=2"
    ]
  },
  "sv-006": {
    "folderId": "1H64Mjbh7GD7IfQvudSP7oAMoQCcWXPGJ",
    "folderName": "Ms. Yogalakshmi",
    "sheetProjectId": "SV-006",
    "customerName": "Ms. Yogalakshmi",
    "location": "Chennai",
    "structureType": "Existing Room Frontage",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ERPp18WwpPTsNWSMaYg8O86lyoQXmS9p",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ERPp18WwpPTsNWSMaYg8O86lyoQXmS9p&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Rl5ZtEUGe3S-f1YaQUIQstsTYnPVVReB",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Rl5ZtEUGe3S-f1YaQUIQstsTYnPVVReB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O2OGQFyCfAIrthVr2OJLganDLtcTAknO",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O2OGQFyCfAIrthVr2OJLganDLtcTAknO&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wVodmt5I8bmYLsjXRRi5Uc3urXi7PKQv",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wVodmt5I8bmYLsjXRRi5Uc3urXi7PKQv&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fB0q67tFRBHABC5-ZbsSUjhjPiPelllO",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fB0q67tFRBHABC5-ZbsSUjhjPiPelllO&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OGUuFs7ZDvfI4ThWRC4mPCurqzwmkAfV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ERPp18WwpPTsNWSMaYg8O86lyoQXmS9p&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Rl5ZtEUGe3S-f1YaQUIQstsTYnPVVReB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O2OGQFyCfAIrthVr2OJLganDLtcTAknO&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wVodmt5I8bmYLsjXRRi5Uc3urXi7PKQv&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fB0q67tFRBHABC5-ZbsSUjhjPiPelllO&v=2"
    ]
  },
  "1VqWIorsBG2Nbm8OBv5TxhEXa_QMKGjWw": {
    "folderId": "1VqWIorsBG2Nbm8OBv5TxhEXa_QMKGjWw",
    "folderName": "Ms. Sujana Reddy",
    "sheetProjectId": "SV-002",
    "customerName": "Ms. Sujana Reddy",
    "location": "Hyderabad",
    "structureType": "Freestanding Unit",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 13,
    "videoCount": 0,
    "totalMediaCount": 13,
    "media": [
      {
        "id": "1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1j8zvRsRELTa8489xMLfFcAs03ugDTfPV",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1j8zvRsRELTa8489xMLfFcAs03ugDTfPV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16lY-DoFKrSvGXPWgvGftv5sjdLQ3yNS2",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16lY-DoFKrSvGXPWgvGftv5sjdLQ3yNS2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1p-OezxUT6VNImTQa5GZ3osP3WBjIIRLq",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-OezxUT6VNImTQa5GZ3osP3WBjIIRLq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1agH7ee4OAxIsXNkLFE4ObwbvKu3pQG2c",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1agH7ee4OAxIsXNkLFE4ObwbvKu3pQG2c&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CCVWN3B0BPfHv1KrJVnjsl6nSOgCgefR",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CCVWN3B0BPfHv1KrJVnjsl6nSOgCgefR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wp-NfmcfS4iAFFqXmIzqZS7GUeBXJeO_",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wp-NfmcfS4iAFFqXmIzqZS7GUeBXJeO_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ATrXAoV0ipml2kkoPAIubQyq1hU4Qspa",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ATrXAoV0ipml2kkoPAIubQyq1hU4Qspa&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vs4I2N6oENqmOyHk0B_CBDnAac2GrkTJ",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vs4I2N6oENqmOyHk0B_CBDnAac2GrkTJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1SN-c2GoWHkfqpTISPI5Cqm12M0Wjptnz",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1SN-c2GoWHkfqpTISPI5Cqm12M0Wjptnz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VIBHyIIHPM1XO4ly147EC7RalmV_dGXG",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VIBHyIIHPM1XO4ly147EC7RalmV_dGXG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16OpATPsAWE4qVp-EHrLRVJBQebvRXUti",
        "name": "11.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16OpATPsAWE4qVp-EHrLRVJBQebvRXUti&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1LK5npmfwGlfihUl-psB0nTKhW1K7Ws_3",
        "name": "12.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1LK5npmfwGlfihUl-psB0nTKhW1K7Ws_3&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1j8zvRsRELTa8489xMLfFcAs03ugDTfPV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16lY-DoFKrSvGXPWgvGftv5sjdLQ3yNS2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-OezxUT6VNImTQa5GZ3osP3WBjIIRLq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1agH7ee4OAxIsXNkLFE4ObwbvKu3pQG2c&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CCVWN3B0BPfHv1KrJVnjsl6nSOgCgefR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wp-NfmcfS4iAFFqXmIzqZS7GUeBXJeO_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ATrXAoV0ipml2kkoPAIubQyq1hU4Qspa&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vs4I2N6oENqmOyHk0B_CBDnAac2GrkTJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1SN-c2GoWHkfqpTISPI5Cqm12M0Wjptnz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VIBHyIIHPM1XO4ly147EC7RalmV_dGXG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16OpATPsAWE4qVp-EHrLRVJBQebvRXUti&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1LK5npmfwGlfihUl-psB0nTKhW1K7Ws_3&v=2"
    ]
  },
  "sv-002": {
    "folderId": "1VqWIorsBG2Nbm8OBv5TxhEXa_QMKGjWw",
    "folderName": "Ms. Sujana Reddy",
    "sheetProjectId": "SV-002",
    "customerName": "Ms. Sujana Reddy",
    "location": "Hyderabad",
    "structureType": "Freestanding Unit",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 13,
    "videoCount": 0,
    "totalMediaCount": 13,
    "media": [
      {
        "id": "1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1j8zvRsRELTa8489xMLfFcAs03ugDTfPV",
        "name": "1.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1j8zvRsRELTa8489xMLfFcAs03ugDTfPV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16lY-DoFKrSvGXPWgvGftv5sjdLQ3yNS2",
        "name": "2.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16lY-DoFKrSvGXPWgvGftv5sjdLQ3yNS2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1p-OezxUT6VNImTQa5GZ3osP3WBjIIRLq",
        "name": "3.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-OezxUT6VNImTQa5GZ3osP3WBjIIRLq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1agH7ee4OAxIsXNkLFE4ObwbvKu3pQG2c",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1agH7ee4OAxIsXNkLFE4ObwbvKu3pQG2c&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1CCVWN3B0BPfHv1KrJVnjsl6nSOgCgefR",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CCVWN3B0BPfHv1KrJVnjsl6nSOgCgefR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wp-NfmcfS4iAFFqXmIzqZS7GUeBXJeO_",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wp-NfmcfS4iAFFqXmIzqZS7GUeBXJeO_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ATrXAoV0ipml2kkoPAIubQyq1hU4Qspa",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ATrXAoV0ipml2kkoPAIubQyq1hU4Qspa&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vs4I2N6oENqmOyHk0B_CBDnAac2GrkTJ",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vs4I2N6oENqmOyHk0B_CBDnAac2GrkTJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1SN-c2GoWHkfqpTISPI5Cqm12M0Wjptnz",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1SN-c2GoWHkfqpTISPI5Cqm12M0Wjptnz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VIBHyIIHPM1XO4ly147EC7RalmV_dGXG",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VIBHyIIHPM1XO4ly147EC7RalmV_dGXG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16OpATPsAWE4qVp-EHrLRVJBQebvRXUti",
        "name": "11.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16OpATPsAWE4qVp-EHrLRVJBQebvRXUti&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1LK5npmfwGlfihUl-psB0nTKhW1K7Ws_3",
        "name": "12.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1LK5npmfwGlfihUl-psB0nTKhW1K7Ws_3&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Pj_zOGuDHEGORFLs6rslCC5jhfSaE8wh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1j8zvRsRELTa8489xMLfFcAs03ugDTfPV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16lY-DoFKrSvGXPWgvGftv5sjdLQ3yNS2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1p-OezxUT6VNImTQa5GZ3osP3WBjIIRLq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1agH7ee4OAxIsXNkLFE4ObwbvKu3pQG2c&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1CCVWN3B0BPfHv1KrJVnjsl6nSOgCgefR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wp-NfmcfS4iAFFqXmIzqZS7GUeBXJeO_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ATrXAoV0ipml2kkoPAIubQyq1hU4Qspa&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vs4I2N6oENqmOyHk0B_CBDnAac2GrkTJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1SN-c2GoWHkfqpTISPI5Cqm12M0Wjptnz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VIBHyIIHPM1XO4ly147EC7RalmV_dGXG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16OpATPsAWE4qVp-EHrLRVJBQebvRXUti&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1LK5npmfwGlfihUl-psB0nTKhW1K7Ws_3&v=2"
    ]
  },
  "1Pnp5hBcQqpiIR73HY0-xqDnAQR3R1Vsp": {
    "folderId": "1Pnp5hBcQqpiIR73HY0-xqDnAQR3R1Vsp",
    "folderName": "Mr. Chetan Thane",
    "sheetProjectId": "SV-071",
    "customerName": "Mr. Chetan",
    "location": "Thane",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 14,
    "videoCount": 0,
    "totalMediaCount": 14,
    "media": [
      {
        "id": "1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eRqUaVnOBmKbEkosDgbfy5nJ54zl4NK2",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eRqUaVnOBmKbEkosDgbfy5nJ54zl4NK2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Ajgug3N2k0j-A6whxMcwiPTxgrEUgGyz",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ajgug3N2k0j-A6whxMcwiPTxgrEUgGyz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1stUzKX6Y4y38Ms-ZETciw4iRSq9jEqMm",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1stUzKX6Y4y38Ms-ZETciw4iRSq9jEqMm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "17MvaOr86bjMHmvzTdon5JKzYIe_BcH_6",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17MvaOr86bjMHmvzTdon5JKzYIe_BcH_6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19bMJNSizuR6FpBpGYNSlQ5t1RU8lmq36",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19bMJNSizuR6FpBpGYNSlQ5t1RU8lmq36&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HMd0ue0uHp3IYkmKn3nOEDdBvkvX-Ktf",
        "name": "7.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HMd0ue0uHp3IYkmKn3nOEDdBvkvX-Ktf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jiIdFsQ7aDpH8rxdcUnzFNktjc9T8HV_",
        "name": "8.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jiIdFsQ7aDpH8rxdcUnzFNktjc9T8HV_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hQ1VlN6lFWQUGS0yRbWDj2HKFiGOjLI9",
        "name": "9.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hQ1VlN6lFWQUGS0yRbWDj2HKFiGOjLI9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-KDlXCuCrWUILjt2OQxQy0AIyTQ86ztF",
        "name": "10.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-KDlXCuCrWUILjt2OQxQy0AIyTQ86ztF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nfBBQhuYn8Y0MJA3DX43Q80mF6J5f68C",
        "name": "11.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfBBQhuYn8Y0MJA3DX43Q80mF6J5f68C&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qPl7sKMDeOmmJDvBovCwKjQu5B2aTLGW",
        "name": "12.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qPl7sKMDeOmmJDvBovCwKjQu5B2aTLGW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1T6plSv-6zpQ1M0K4lOq8ffY0RZUNLKTB",
        "name": "13.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1T6plSv-6zpQ1M0K4lOq8ffY0RZUNLKTB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Nv2-ZNWT0l3b2l9A0a0NmbMuqrIhnQCO",
        "name": "14.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Nv2-ZNWT0l3b2l9A0a0NmbMuqrIhnQCO&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eRqUaVnOBmKbEkosDgbfy5nJ54zl4NK2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ajgug3N2k0j-A6whxMcwiPTxgrEUgGyz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1stUzKX6Y4y38Ms-ZETciw4iRSq9jEqMm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17MvaOr86bjMHmvzTdon5JKzYIe_BcH_6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19bMJNSizuR6FpBpGYNSlQ5t1RU8lmq36&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HMd0ue0uHp3IYkmKn3nOEDdBvkvX-Ktf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jiIdFsQ7aDpH8rxdcUnzFNktjc9T8HV_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hQ1VlN6lFWQUGS0yRbWDj2HKFiGOjLI9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-KDlXCuCrWUILjt2OQxQy0AIyTQ86ztF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfBBQhuYn8Y0MJA3DX43Q80mF6J5f68C&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qPl7sKMDeOmmJDvBovCwKjQu5B2aTLGW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1T6plSv-6zpQ1M0K4lOq8ffY0RZUNLKTB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Nv2-ZNWT0l3b2l9A0a0NmbMuqrIhnQCO&v=2"
    ]
  },
  "sv-071": {
    "folderId": "1Pnp5hBcQqpiIR73HY0-xqDnAQR3R1Vsp",
    "folderName": "Mr. Chetan Thane",
    "sheetProjectId": "SV-071",
    "customerName": "Mr. Chetan",
    "location": "Thane",
    "structureType": "Complete Pooja Room",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 14,
    "videoCount": 0,
    "totalMediaCount": 14,
    "media": [
      {
        "id": "1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1eRqUaVnOBmKbEkosDgbfy5nJ54zl4NK2",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eRqUaVnOBmKbEkosDgbfy5nJ54zl4NK2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Ajgug3N2k0j-A6whxMcwiPTxgrEUgGyz",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ajgug3N2k0j-A6whxMcwiPTxgrEUgGyz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1stUzKX6Y4y38Ms-ZETciw4iRSq9jEqMm",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1stUzKX6Y4y38Ms-ZETciw4iRSq9jEqMm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "17MvaOr86bjMHmvzTdon5JKzYIe_BcH_6",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17MvaOr86bjMHmvzTdon5JKzYIe_BcH_6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19bMJNSizuR6FpBpGYNSlQ5t1RU8lmq36",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19bMJNSizuR6FpBpGYNSlQ5t1RU8lmq36&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HMd0ue0uHp3IYkmKn3nOEDdBvkvX-Ktf",
        "name": "7.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HMd0ue0uHp3IYkmKn3nOEDdBvkvX-Ktf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jiIdFsQ7aDpH8rxdcUnzFNktjc9T8HV_",
        "name": "8.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jiIdFsQ7aDpH8rxdcUnzFNktjc9T8HV_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hQ1VlN6lFWQUGS0yRbWDj2HKFiGOjLI9",
        "name": "9.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hQ1VlN6lFWQUGS0yRbWDj2HKFiGOjLI9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1-KDlXCuCrWUILjt2OQxQy0AIyTQ86ztF",
        "name": "10.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-KDlXCuCrWUILjt2OQxQy0AIyTQ86ztF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nfBBQhuYn8Y0MJA3DX43Q80mF6J5f68C",
        "name": "11.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfBBQhuYn8Y0MJA3DX43Q80mF6J5f68C&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qPl7sKMDeOmmJDvBovCwKjQu5B2aTLGW",
        "name": "12.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qPl7sKMDeOmmJDvBovCwKjQu5B2aTLGW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1T6plSv-6zpQ1M0K4lOq8ffY0RZUNLKTB",
        "name": "13.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1T6plSv-6zpQ1M0K4lOq8ffY0RZUNLKTB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Nv2-ZNWT0l3b2l9A0a0NmbMuqrIhnQCO",
        "name": "14.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Nv2-ZNWT0l3b2l9A0a0NmbMuqrIhnQCO&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1RvuCj9haklNZW6vMpZ12FLKC9SPBpIhC&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eRqUaVnOBmKbEkosDgbfy5nJ54zl4NK2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ajgug3N2k0j-A6whxMcwiPTxgrEUgGyz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1stUzKX6Y4y38Ms-ZETciw4iRSq9jEqMm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=17MvaOr86bjMHmvzTdon5JKzYIe_BcH_6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19bMJNSizuR6FpBpGYNSlQ5t1RU8lmq36&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HMd0ue0uHp3IYkmKn3nOEDdBvkvX-Ktf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jiIdFsQ7aDpH8rxdcUnzFNktjc9T8HV_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hQ1VlN6lFWQUGS0yRbWDj2HKFiGOjLI9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1-KDlXCuCrWUILjt2OQxQy0AIyTQ86ztF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nfBBQhuYn8Y0MJA3DX43Q80mF6J5f68C&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qPl7sKMDeOmmJDvBovCwKjQu5B2aTLGW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1T6plSv-6zpQ1M0K4lOq8ffY0RZUNLKTB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Nv2-ZNWT0l3b2l9A0a0NmbMuqrIhnQCO&v=2"
    ]
  },
  "1EAkYRgUO2fbiKdvrta78s-_YJ6uxZ8WV": {
    "folderId": "1EAkYRgUO2fbiKdvrta78s-_YJ6uxZ8WV",
    "folderName": "Mr. Anoop Vaidya",
    "sheetProjectId": "SV-086",
    "customerName": "Mr. Anoop Vaidya",
    "location": "Chennai",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nGO4am-VndTVXoLZ19E3HyZqggLqS6P1",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nGO4am-VndTVXoLZ19E3HyZqggLqS6P1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1cFHnAt3ZNzscClhHwwCkf3y2IRCL2rYh",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cFHnAt3ZNzscClhHwwCkf3y2IRCL2rYh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x7BJnzyNmYvzxqKSqqP0uAmBJjAEKRaR",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x7BJnzyNmYvzxqKSqqP0uAmBJjAEKRaR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12t2UVlpfnQoQ4qPOpFVGrn3wXI-sPKQH",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12t2UVlpfnQoQ4qPOpFVGrn3wXI-sPKQH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15lahsvuVVrz09FhnyFyjqvy-WluUCSGx",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15lahsvuVVrz09FhnyFyjqvy-WluUCSGx&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nGO4am-VndTVXoLZ19E3HyZqggLqS6P1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cFHnAt3ZNzscClhHwwCkf3y2IRCL2rYh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x7BJnzyNmYvzxqKSqqP0uAmBJjAEKRaR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12t2UVlpfnQoQ4qPOpFVGrn3wXI-sPKQH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15lahsvuVVrz09FhnyFyjqvy-WluUCSGx&v=2"
    ]
  },
  "sv-086": {
    "folderId": "1EAkYRgUO2fbiKdvrta78s-_YJ6uxZ8WV",
    "folderName": "Mr. Anoop Vaidya",
    "sheetProjectId": "SV-086",
    "customerName": "Mr. Anoop Vaidya",
    "location": "Chennai",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 6,
    "videoCount": 0,
    "totalMediaCount": 6,
    "media": [
      {
        "id": "1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1nGO4am-VndTVXoLZ19E3HyZqggLqS6P1",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nGO4am-VndTVXoLZ19E3HyZqggLqS6P1&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1cFHnAt3ZNzscClhHwwCkf3y2IRCL2rYh",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cFHnAt3ZNzscClhHwwCkf3y2IRCL2rYh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1x7BJnzyNmYvzxqKSqqP0uAmBJjAEKRaR",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x7BJnzyNmYvzxqKSqqP0uAmBJjAEKRaR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12t2UVlpfnQoQ4qPOpFVGrn3wXI-sPKQH",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12t2UVlpfnQoQ4qPOpFVGrn3wXI-sPKQH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15lahsvuVVrz09FhnyFyjqvy-WluUCSGx",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15lahsvuVVrz09FhnyFyjqvy-WluUCSGx&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1itOHVFXx5tc9J8I6VKvglhFV_1BYnlZk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nGO4am-VndTVXoLZ19E3HyZqggLqS6P1&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1cFHnAt3ZNzscClhHwwCkf3y2IRCL2rYh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1x7BJnzyNmYvzxqKSqqP0uAmBJjAEKRaR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12t2UVlpfnQoQ4qPOpFVGrn3wXI-sPKQH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15lahsvuVVrz09FhnyFyjqvy-WluUCSGx&v=2"
    ]
  },
  "1aq_KnbGvLlgzE8oPKvC0G11LYAi9YTqp": {
    "folderId": "1aq_KnbGvLlgzE8oPKvC0G11LYAi9YTqp",
    "folderName": "Mr. Kalyan",
    "sheetProjectId": "SV-079",
    "customerName": "Mr. Kalyan",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj",
        "name": "1.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Rk6K3pT19Q5yGvvX7_k4crEGJo_GTXly",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Rk6K3pT19Q5yGvvX7_k4crEGJo_GTXly&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1T_mdmhV6ZDo0KXbK9Tyn1TFtUPTVFO_c",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1T_mdmhV6ZDo0KXbK9Tyn1TFtUPTVFO_c&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pBGwbbkettIEDX48jEtngKUDNRKwsOZ0",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pBGwbbkettIEDX48jEtngKUDNRKwsOZ0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wgqWQ3xckpiDYP_zPbm-5ooGGR9cd_TR",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wgqWQ3xckpiDYP_zPbm-5ooGGR9cd_TR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WuEFNHQ8PwkIVIiHA4FyXEPtPPf40Yw6",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WuEFNHQ8PwkIVIiHA4FyXEPtPPf40Yw6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OAgcsH2KoKYdbYk7llSpAzF1_LVthgeJ",
        "name": "7.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OAgcsH2KoKYdbYk7llSpAzF1_LVthgeJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1QWZA_wIuUy7NpC01_acuvBhLQfxtYcwf",
        "name": "8.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QWZA_wIuUy7NpC01_acuvBhLQfxtYcwf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UhS4ezsANaVLOEUnUgnsXHGer1D8YIE-",
        "name": "9.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UhS4ezsANaVLOEUnUgnsXHGer1D8YIE-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VBDdlrnhyfvTXaYBEWtg3SAPpqfYfeFc",
        "name": "10.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VBDdlrnhyfvTXaYBEWtg3SAPpqfYfeFc&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Rk6K3pT19Q5yGvvX7_k4crEGJo_GTXly&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1T_mdmhV6ZDo0KXbK9Tyn1TFtUPTVFO_c&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pBGwbbkettIEDX48jEtngKUDNRKwsOZ0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wgqWQ3xckpiDYP_zPbm-5ooGGR9cd_TR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WuEFNHQ8PwkIVIiHA4FyXEPtPPf40Yw6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OAgcsH2KoKYdbYk7llSpAzF1_LVthgeJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QWZA_wIuUy7NpC01_acuvBhLQfxtYcwf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UhS4ezsANaVLOEUnUgnsXHGer1D8YIE-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VBDdlrnhyfvTXaYBEWtg3SAPpqfYfeFc&v=2"
    ]
  },
  "sv-079": {
    "folderId": "1aq_KnbGvLlgzE8oPKvC0G11LYAi9YTqp",
    "folderName": "Mr. Kalyan",
    "sheetProjectId": "SV-079",
    "customerName": "Mr. Kalyan",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 10,
    "videoCount": 0,
    "totalMediaCount": 10,
    "media": [
      {
        "id": "1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj",
        "name": "1.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Rk6K3pT19Q5yGvvX7_k4crEGJo_GTXly",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Rk6K3pT19Q5yGvvX7_k4crEGJo_GTXly&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1T_mdmhV6ZDo0KXbK9Tyn1TFtUPTVFO_c",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1T_mdmhV6ZDo0KXbK9Tyn1TFtUPTVFO_c&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pBGwbbkettIEDX48jEtngKUDNRKwsOZ0",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pBGwbbkettIEDX48jEtngKUDNRKwsOZ0&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1wgqWQ3xckpiDYP_zPbm-5ooGGR9cd_TR",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wgqWQ3xckpiDYP_zPbm-5ooGGR9cd_TR&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WuEFNHQ8PwkIVIiHA4FyXEPtPPf40Yw6",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WuEFNHQ8PwkIVIiHA4FyXEPtPPf40Yw6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1OAgcsH2KoKYdbYk7llSpAzF1_LVthgeJ",
        "name": "7.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OAgcsH2KoKYdbYk7llSpAzF1_LVthgeJ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1QWZA_wIuUy7NpC01_acuvBhLQfxtYcwf",
        "name": "8.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QWZA_wIuUy7NpC01_acuvBhLQfxtYcwf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1UhS4ezsANaVLOEUnUgnsXHGer1D8YIE-",
        "name": "9.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UhS4ezsANaVLOEUnUgnsXHGer1D8YIE-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VBDdlrnhyfvTXaYBEWtg3SAPpqfYfeFc",
        "name": "10.JPG",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VBDdlrnhyfvTXaYBEWtg3SAPpqfYfeFc&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WWhUgG8cZdRVSAe7GYXmLbw7ZNHLOXYj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Rk6K3pT19Q5yGvvX7_k4crEGJo_GTXly&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1T_mdmhV6ZDo0KXbK9Tyn1TFtUPTVFO_c&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pBGwbbkettIEDX48jEtngKUDNRKwsOZ0&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wgqWQ3xckpiDYP_zPbm-5ooGGR9cd_TR&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WuEFNHQ8PwkIVIiHA4FyXEPtPPf40Yw6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1OAgcsH2KoKYdbYk7llSpAzF1_LVthgeJ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QWZA_wIuUy7NpC01_acuvBhLQfxtYcwf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1UhS4ezsANaVLOEUnUgnsXHGer1D8YIE-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VBDdlrnhyfvTXaYBEWtg3SAPpqfYfeFc&v=2"
    ]
  },
  "14U1kVkdGHz_PgUvyvPsrVKcGseFXH08h": {
    "folderId": "14U1kVkdGHz_PgUvyvPsrVKcGseFXH08h",
    "folderName": "Ms. Snehadeepti",
    "sheetProjectId": "SV-005",
    "customerName": "Ms. Snehadeepti",
    "location": "Texas",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": null,
    "coverUrl": null,
    "hasDedicatedOverview": false,
    "imageCount": 0,
    "videoCount": 0,
    "totalMediaCount": 0,
    "media": [],
    "galleryUrls": []
  },
  "sv-005": {
    "folderId": "14U1kVkdGHz_PgUvyvPsrVKcGseFXH08h",
    "folderName": "Ms. Snehadeepti",
    "sheetProjectId": "SV-005",
    "customerName": "Ms. Snehadeepti",
    "location": "Texas",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": null,
    "coverUrl": null,
    "hasDedicatedOverview": false,
    "imageCount": 0,
    "videoCount": 0,
    "totalMediaCount": 0,
    "media": [],
    "galleryUrls": []
  },
  "1d5lPtco-5FsaiK40TOhDv-YumEn7Jg7S": {
    "folderId": "1d5lPtco-5FsaiK40TOhDv-YumEn7Jg7S",
    "folderName": "Ms. Manasa Kuncham",
    "sheetProjectId": "SV-003",
    "customerName": "Ms. Manasa Kunchum",
    "location": "Bengaluru",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 9,
    "videoCount": 5,
    "totalMediaCount": 14,
    "media": [
      {
        "id": "1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HYS20YSg4GOmeu17K3OuaOtsMeBQiFAr",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HYS20YSg4GOmeu17K3OuaOtsMeBQiFAr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ufGHym3R410Q9X9oMLse5RznZyO0dcq_",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ufGHym3R410Q9X9oMLse5RznZyO0dcq_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19iI_R4vu9A5yfXQwDJTAtB4ggAJKL3Cd",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19iI_R4vu9A5yfXQwDJTAtB4ggAJKL3Cd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1LYTMJvLgZ3Xk3DsweMBsgd1308iAG4Me",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1LYTMJvLgZ3Xk3DsweMBsgd1308iAG4Me&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1f1P51nDpdfB41MypTJQiRwxVuPEwf8Y9",
        "name": "10.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1f1P51nDpdfB41MypTJQiRwxVuPEwf8Y9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pO4wRsm-PBuhaAv7Jtu80iZMy1AGZqwm",
        "name": "11.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pO4wRsm-PBuhaAv7Jtu80iZMy1AGZqwm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1yehSe0qa44VnnyHQzhhk9cbNwcytO3DW",
        "name": "12.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yehSe0qa44VnnyHQzhhk9cbNwcytO3DW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10rM0277BIF5QIZ31ADU53CnSnXetQWLM",
        "name": "13.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10rM0277BIF5QIZ31ADU53CnSnXetQWLM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sUEqoelt-1t9wQZf2oANwHtC0QZKxpAi",
        "name": "5.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sUEqoelt-1t9wQZf2oANwHtC0QZKxpAi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1r67Qx3mth1LewfbUNdg6uIC3WT3j2gK6",
        "name": "6.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r67Qx3mth1LewfbUNdg6uIC3WT3j2gK6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NoqdJEDxXmvCIpnn5jtfNw1jAUtNpUDh",
        "name": "7.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NoqdJEDxXmvCIpnn5jtfNw1jAUtNpUDh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15h0MELOpxcxu3HnZLI4ZP-cx6qXHeNGY",
        "name": "8.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15h0MELOpxcxu3HnZLI4ZP-cx6qXHeNGY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qrtA9UfDNNvO97_bDEfnpCFKSBDEBLWG",
        "name": "9.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qrtA9UfDNNvO97_bDEfnpCFKSBDEBLWG&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HYS20YSg4GOmeu17K3OuaOtsMeBQiFAr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ufGHym3R410Q9X9oMLse5RznZyO0dcq_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19iI_R4vu9A5yfXQwDJTAtB4ggAJKL3Cd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1LYTMJvLgZ3Xk3DsweMBsgd1308iAG4Me&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1f1P51nDpdfB41MypTJQiRwxVuPEwf8Y9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pO4wRsm-PBuhaAv7Jtu80iZMy1AGZqwm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yehSe0qa44VnnyHQzhhk9cbNwcytO3DW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10rM0277BIF5QIZ31ADU53CnSnXetQWLM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sUEqoelt-1t9wQZf2oANwHtC0QZKxpAi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r67Qx3mth1LewfbUNdg6uIC3WT3j2gK6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NoqdJEDxXmvCIpnn5jtfNw1jAUtNpUDh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15h0MELOpxcxu3HnZLI4ZP-cx6qXHeNGY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qrtA9UfDNNvO97_bDEfnpCFKSBDEBLWG&v=2"
    ]
  },
  "sv-003": {
    "folderId": "1d5lPtco-5FsaiK40TOhDv-YumEn7Jg7S",
    "folderName": "Ms. Manasa Kuncham",
    "sheetProjectId": "SV-003",
    "customerName": "Ms. Manasa Kunchum",
    "location": "Bengaluru",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 9,
    "videoCount": 5,
    "totalMediaCount": 14,
    "media": [
      {
        "id": "1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I",
        "name": "overview.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HYS20YSg4GOmeu17K3OuaOtsMeBQiFAr",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HYS20YSg4GOmeu17K3OuaOtsMeBQiFAr&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ufGHym3R410Q9X9oMLse5RznZyO0dcq_",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ufGHym3R410Q9X9oMLse5RznZyO0dcq_&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19iI_R4vu9A5yfXQwDJTAtB4ggAJKL3Cd",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19iI_R4vu9A5yfXQwDJTAtB4ggAJKL3Cd&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1LYTMJvLgZ3Xk3DsweMBsgd1308iAG4Me",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1LYTMJvLgZ3Xk3DsweMBsgd1308iAG4Me&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1f1P51nDpdfB41MypTJQiRwxVuPEwf8Y9",
        "name": "10.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1f1P51nDpdfB41MypTJQiRwxVuPEwf8Y9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1pO4wRsm-PBuhaAv7Jtu80iZMy1AGZqwm",
        "name": "11.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pO4wRsm-PBuhaAv7Jtu80iZMy1AGZqwm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1yehSe0qa44VnnyHQzhhk9cbNwcytO3DW",
        "name": "12.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yehSe0qa44VnnyHQzhhk9cbNwcytO3DW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10rM0277BIF5QIZ31ADU53CnSnXetQWLM",
        "name": "13.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10rM0277BIF5QIZ31ADU53CnSnXetQWLM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1sUEqoelt-1t9wQZf2oANwHtC0QZKxpAi",
        "name": "5.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sUEqoelt-1t9wQZf2oANwHtC0QZKxpAi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1r67Qx3mth1LewfbUNdg6uIC3WT3j2gK6",
        "name": "6.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r67Qx3mth1LewfbUNdg6uIC3WT3j2gK6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NoqdJEDxXmvCIpnn5jtfNw1jAUtNpUDh",
        "name": "7.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NoqdJEDxXmvCIpnn5jtfNw1jAUtNpUDh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15h0MELOpxcxu3HnZLI4ZP-cx6qXHeNGY",
        "name": "8.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15h0MELOpxcxu3HnZLI4ZP-cx6qXHeNGY&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qrtA9UfDNNvO97_bDEfnpCFKSBDEBLWG",
        "name": "9.mp4",
        "type": "video",
        "mimeType": "video/mp4",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qrtA9UfDNNvO97_bDEfnpCFKSBDEBLWG&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wRO-v0hFY5_IUkih96jZK_2dj9g98C8I&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HYS20YSg4GOmeu17K3OuaOtsMeBQiFAr&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ufGHym3R410Q9X9oMLse5RznZyO0dcq_&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19iI_R4vu9A5yfXQwDJTAtB4ggAJKL3Cd&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1LYTMJvLgZ3Xk3DsweMBsgd1308iAG4Me&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1f1P51nDpdfB41MypTJQiRwxVuPEwf8Y9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1pO4wRsm-PBuhaAv7Jtu80iZMy1AGZqwm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1yehSe0qa44VnnyHQzhhk9cbNwcytO3DW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10rM0277BIF5QIZ31ADU53CnSnXetQWLM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1sUEqoelt-1t9wQZf2oANwHtC0QZKxpAi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1r67Qx3mth1LewfbUNdg6uIC3WT3j2gK6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NoqdJEDxXmvCIpnn5jtfNw1jAUtNpUDh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15h0MELOpxcxu3HnZLI4ZP-cx6qXHeNGY&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qrtA9UfDNNvO97_bDEfnpCFKSBDEBLWG&v=2"
    ]
  },
  "1beRrWMouzvdWrJ5qwmTQsTu3SXOU-AUp": {
    "folderId": "1beRrWMouzvdWrJ5qwmTQsTu3SXOU-AUp",
    "folderName": "Ms. Netra",
    "sheetProjectId": "SV-012",
    "customerName": "Ms. Netra",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HsVnkriluDoXhbusn-EzEMUkU4FkhP92",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HsVnkriluDoXhbusn-EzEMUkU4FkhP92&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1n1zlXUkR3UyJM2LjxOfosH0xjeOBh4JW",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n1zlXUkR3UyJM2LjxOfosH0xjeOBh4JW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NyTKFRmpmyXPPFpiyPKngIsRKjmk-Win",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NyTKFRmpmyXPPFpiyPKngIsRKjmk-Win&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1MKhE2wq7VtLoF3oHrSr4yCNRMaDrRheg",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MKhE2wq7VtLoF3oHrSr4yCNRMaDrRheg&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1XnvZ64q6yzIvC4mVABg1p3zNMwnRNlb9",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XnvZ64q6yzIvC4mVABg1p3zNMwnRNlb9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mR4yNhZUfdAjtaYYaJmivaf2G_qcppHf",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mR4yNhZUfdAjtaYYaJmivaf2G_qcppHf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1FSSf1CL9IggUmaAPHGYjoPa7k4AKYv93",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FSSf1CL9IggUmaAPHGYjoPa7k4AKYv93&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KknOaOEV47a-TIUSqSUCCFpT_gWIj8JI",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KknOaOEV47a-TIUSqSUCCFpT_gWIj8JI&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HsVnkriluDoXhbusn-EzEMUkU4FkhP92&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n1zlXUkR3UyJM2LjxOfosH0xjeOBh4JW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NyTKFRmpmyXPPFpiyPKngIsRKjmk-Win&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MKhE2wq7VtLoF3oHrSr4yCNRMaDrRheg&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XnvZ64q6yzIvC4mVABg1p3zNMwnRNlb9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mR4yNhZUfdAjtaYYaJmivaf2G_qcppHf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FSSf1CL9IggUmaAPHGYjoPa7k4AKYv93&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KknOaOEV47a-TIUSqSUCCFpT_gWIj8JI&v=2"
    ]
  },
  "sv-012": {
    "folderId": "1beRrWMouzvdWrJ5qwmTQsTu3SXOU-AUp",
    "folderName": "Ms. Netra",
    "sheetProjectId": "SV-012",
    "customerName": "Ms. Netra",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HsVnkriluDoXhbusn-EzEMUkU4FkhP92",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HsVnkriluDoXhbusn-EzEMUkU4FkhP92&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1n1zlXUkR3UyJM2LjxOfosH0xjeOBh4JW",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n1zlXUkR3UyJM2LjxOfosH0xjeOBh4JW&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NyTKFRmpmyXPPFpiyPKngIsRKjmk-Win",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NyTKFRmpmyXPPFpiyPKngIsRKjmk-Win&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1MKhE2wq7VtLoF3oHrSr4yCNRMaDrRheg",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MKhE2wq7VtLoF3oHrSr4yCNRMaDrRheg&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1XnvZ64q6yzIvC4mVABg1p3zNMwnRNlb9",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XnvZ64q6yzIvC4mVABg1p3zNMwnRNlb9&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mR4yNhZUfdAjtaYYaJmivaf2G_qcppHf",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mR4yNhZUfdAjtaYYaJmivaf2G_qcppHf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1FSSf1CL9IggUmaAPHGYjoPa7k4AKYv93",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FSSf1CL9IggUmaAPHGYjoPa7k4AKYv93&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1KknOaOEV47a-TIUSqSUCCFpT_gWIj8JI",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KknOaOEV47a-TIUSqSUCCFpT_gWIj8JI&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19H4prW_nvsWy0U4n9SRTbO6nRJcpx2se&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HsVnkriluDoXhbusn-EzEMUkU4FkhP92&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n1zlXUkR3UyJM2LjxOfosH0xjeOBh4JW&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NyTKFRmpmyXPPFpiyPKngIsRKjmk-Win&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1MKhE2wq7VtLoF3oHrSr4yCNRMaDrRheg&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XnvZ64q6yzIvC4mVABg1p3zNMwnRNlb9&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mR4yNhZUfdAjtaYYaJmivaf2G_qcppHf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FSSf1CL9IggUmaAPHGYjoPa7k4AKYv93&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1KknOaOEV47a-TIUSqSUCCFpT_gWIj8JI&v=2"
    ]
  },
  "1BbGgfcC7IhJz5u4aFm8sld3Sl1PExmnA": {
    "folderId": "1BbGgfcC7IhJz5u4aFm8sld3Sl1PExmnA",
    "folderName": "Ms. Raksha",
    "sheetProjectId": "SV-019",
    "customerName": "Ms. Raksha",
    "location": "Bengaluru",
    "structureType": "Freestanding Unit",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ODQIXUmsDruFTEExC_Gs6cvhmG_1ysbh",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ODQIXUmsDruFTEExC_Gs6cvhmG_1ysbh&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ODQIXUmsDruFTEExC_Gs6cvhmG_1ysbh&v=2"
    ]
  },
  "sv-019": {
    "folderId": "1BbGgfcC7IhJz5u4aFm8sld3Sl1PExmnA",
    "folderName": "Ms. Raksha",
    "sheetProjectId": "SV-019",
    "customerName": "Ms. Raksha",
    "location": "Bengaluru",
    "structureType": "Freestanding Unit",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ODQIXUmsDruFTEExC_Gs6cvhmG_1ysbh",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ODQIXUmsDruFTEExC_Gs6cvhmG_1ysbh&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1t7uTzFatsuR-4JYGwrBa8syCakVdU7oj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ODQIXUmsDruFTEExC_Gs6cvhmG_1ysbh&v=2"
    ]
  },
  "1DSZcfQPCmEHJq_uxAc5kJc122JgD6tUc": {
    "folderId": "1DSZcfQPCmEHJq_uxAc5kJc122JgD6tUc",
    "folderName": "Ms. Mala Sharma",
    "sheetProjectId": "SV-004",
    "customerName": "Ms. Mala Sharma",
    "location": "Bengaluru",
    "structureType": "Wall Unit",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lMYQTaqgDIdmpOr8uJb1JVoUdNHBUWjB",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lMYQTaqgDIdmpOr8uJb1JVoUdNHBUWjB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13MbxxykjWRxSe7kTHnIYgDpycAMXHaCF",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13MbxxykjWRxSe7kTHnIYgDpycAMXHaCF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HeelxwaDJQ_fSLw0Ij_KSV3l_YN4KqGV",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HeelxwaDJQ_fSLw0Ij_KSV3l_YN4KqGV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qwTWrelxG31XlrrzqxluJ4Y8-VC7-97o",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qwTWrelxG31XlrrzqxluJ4Y8-VC7-97o&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16QFPuu8oxUMeoJ3FwjZAU_TTu1usQAee",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16QFPuu8oxUMeoJ3FwjZAU_TTu1usQAee&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "14uyr0PfRzz2MCVgO4U-y3ot-r_eJPeqZ",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14uyr0PfRzz2MCVgO4U-y3ot-r_eJPeqZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16fpA7mlIXXMsJ6s3B2LFG3a0Z5GdDce6",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16fpA7mlIXXMsJ6s3B2LFG3a0Z5GdDce6&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lMYQTaqgDIdmpOr8uJb1JVoUdNHBUWjB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13MbxxykjWRxSe7kTHnIYgDpycAMXHaCF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HeelxwaDJQ_fSLw0Ij_KSV3l_YN4KqGV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qwTWrelxG31XlrrzqxluJ4Y8-VC7-97o&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16QFPuu8oxUMeoJ3FwjZAU_TTu1usQAee&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14uyr0PfRzz2MCVgO4U-y3ot-r_eJPeqZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16fpA7mlIXXMsJ6s3B2LFG3a0Z5GdDce6&v=2"
    ]
  },
  "sv-004": {
    "folderId": "1DSZcfQPCmEHJq_uxAc5kJc122JgD6tUc",
    "folderName": "Ms. Mala Sharma",
    "sheetProjectId": "SV-004",
    "customerName": "Ms. Mala Sharma",
    "location": "Bengaluru",
    "structureType": "Wall Unit",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1lMYQTaqgDIdmpOr8uJb1JVoUdNHBUWjB",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lMYQTaqgDIdmpOr8uJb1JVoUdNHBUWjB&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13MbxxykjWRxSe7kTHnIYgDpycAMXHaCF",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13MbxxykjWRxSe7kTHnIYgDpycAMXHaCF&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1HeelxwaDJQ_fSLw0Ij_KSV3l_YN4KqGV",
        "name": "4.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HeelxwaDJQ_fSLw0Ij_KSV3l_YN4KqGV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1qwTWrelxG31XlrrzqxluJ4Y8-VC7-97o",
        "name": "5.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qwTWrelxG31XlrrzqxluJ4Y8-VC7-97o&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16QFPuu8oxUMeoJ3FwjZAU_TTu1usQAee",
        "name": "6.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16QFPuu8oxUMeoJ3FwjZAU_TTu1usQAee&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "14uyr0PfRzz2MCVgO4U-y3ot-r_eJPeqZ",
        "name": "7.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14uyr0PfRzz2MCVgO4U-y3ot-r_eJPeqZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "16fpA7mlIXXMsJ6s3B2LFG3a0Z5GdDce6",
        "name": "8.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16fpA7mlIXXMsJ6s3B2LFG3a0Z5GdDce6&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eacwXg_wG9rczToTOS1U5y9uT4Xeq2rB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1lMYQTaqgDIdmpOr8uJb1JVoUdNHBUWjB&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13MbxxykjWRxSe7kTHnIYgDpycAMXHaCF&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1HeelxwaDJQ_fSLw0Ij_KSV3l_YN4KqGV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1qwTWrelxG31XlrrzqxluJ4Y8-VC7-97o&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16QFPuu8oxUMeoJ3FwjZAU_TTu1usQAee&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=14uyr0PfRzz2MCVgO4U-y3ot-r_eJPeqZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16fpA7mlIXXMsJ6s3B2LFG3a0Z5GdDce6&v=2"
    ]
  },
  "18D_sK0DpYyxXqSp8Ns4qzXYMl8829_s9": {
    "folderId": "18D_sK0DpYyxXqSp8Ns4qzXYMl8829_s9",
    "folderName": "Mr. Sudarshan Patil",
    "sheetProjectId": "SV-011",
    "customerName": "Mr. Sudarshan Patil",
    "location": "Nasik",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "112ahQlgU8kytv2fmnh_1Uyh_qTG0r4F8",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=112ahQlgU8kytv2fmnh_1Uyh_qTG0r4F8&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YMl27NsOgt0NHA-21CU3PrFm_TJDO0GL",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YMl27NsOgt0NHA-21CU3PrFm_TJDO0GL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1uGNX94lNQ6DEQSsioS5X3raJv15q0tAr",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uGNX94lNQ6DEQSsioS5X3raJv15q0tAr&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=112ahQlgU8kytv2fmnh_1Uyh_qTG0r4F8&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YMl27NsOgt0NHA-21CU3PrFm_TJDO0GL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uGNX94lNQ6DEQSsioS5X3raJv15q0tAr&v=2"
    ]
  },
  "sv-011": {
    "folderId": "18D_sK0DpYyxXqSp8Ns4qzXYMl8829_s9",
    "folderName": "Mr. Sudarshan Patil",
    "sheetProjectId": "SV-011",
    "customerName": "Mr. Sudarshan Patil",
    "location": "Nasik",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "112ahQlgU8kytv2fmnh_1Uyh_qTG0r4F8",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=112ahQlgU8kytv2fmnh_1Uyh_qTG0r4F8&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YMl27NsOgt0NHA-21CU3PrFm_TJDO0GL",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YMl27NsOgt0NHA-21CU3PrFm_TJDO0GL&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1uGNX94lNQ6DEQSsioS5X3raJv15q0tAr",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uGNX94lNQ6DEQSsioS5X3raJv15q0tAr&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1eWJEqswwjSwCsulfUuOi5qPgb5PXd8GH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=112ahQlgU8kytv2fmnh_1Uyh_qTG0r4F8&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YMl27NsOgt0NHA-21CU3PrFm_TJDO0GL&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uGNX94lNQ6DEQSsioS5X3raJv15q0tAr&v=2"
    ]
  },
  "1dXjOwiBhzrX6cR5YCXvYTlwRg6yzXV4f": {
    "folderId": "1dXjOwiBhzrX6cR5YCXvYTlwRg6yzXV4f",
    "folderName": "Ms yashaswini",
    "sheetProjectId": "SV-014",
    "customerName": "Ms. Yasashwini",
    "location": "Bengaluru",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 18,
    "videoCount": 0,
    "totalMediaCount": 18,
    "media": [
      {
        "id": "1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ",
        "name": "OVERVIEW.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1DcLtZ0lyvzzTRZltmTMYwzio_SqAYNu6",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DcLtZ0lyvzzTRZltmTMYwzio_SqAYNu6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jesmBo8GAws2FAKP1U40WaAj7XyucvLj",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jesmBo8GAws2FAKP1U40WaAj7XyucvLj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1d3f5gY6OmbzcdBClYnz_EasrP2EoLAvz",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1d3f5gY6OmbzcdBClYnz_EasrP2EoLAvz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bXkKn70S0GLeaQl0droF1wsrAA78yCZZ",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bXkKn70S0GLeaQl0droF1wsrAA78yCZZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NX8X6vD9HtNbCSie1PHrnwEFyBdPYjfv",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NX8X6vD9HtNbCSie1PHrnwEFyBdPYjfv&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1z6DxGAE21DbsNIOLtrkSJxZe7rcSkLZi",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z6DxGAE21DbsNIOLtrkSJxZe7rcSkLZi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NzoJUf7V8-8oXYmZ8KcKq0eqQF6n36Lw",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NzoJUf7V8-8oXYmZ8KcKq0eqQF6n36Lw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rs8cNkTEb66GmUHqmeeuwmTOYW-AkRiA",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rs8cNkTEb66GmUHqmeeuwmTOYW-AkRiA&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1G2lwi7F6H33dn9xOXFQzZx_MF98Ja2Rx",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G2lwi7F6H33dn9xOXFQzZx_MF98Ja2Rx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fGLJNHi8zGjqXygT1Mmg3XYqN7rNFDzw",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fGLJNHi8zGjqXygT1Mmg3XYqN7rNFDzw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1paoAHCGsinf7lhuEdttLXa0SGDMbMpgw",
        "name": "11.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1paoAHCGsinf7lhuEdttLXa0SGDMbMpgw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1zPBlfJM0PxZhXpR4FItolC1I91Pqiq3w",
        "name": "12.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zPBlfJM0PxZhXpR4FItolC1I91Pqiq3w&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PHXTsl9AWDb-Uk1XKN4NWQsELC-VbruS",
        "name": "13.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PHXTsl9AWDb-Uk1XKN4NWQsELC-VbruS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10ZUfwtMshA_YFlARKc2BoSOOsPY8ITRq",
        "name": "14.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10ZUfwtMshA_YFlARKc2BoSOOsPY8ITRq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1uIjfgbmi-OBVnTRJI9t8DUgq8HvrFBIV",
        "name": "15.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uIjfgbmi-OBVnTRJI9t8DUgq8HvrFBIV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1V-oj8Hd6GlQS1pr1cSNtJIgXTm1m1Ysf",
        "name": "16.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1V-oj8Hd6GlQS1pr1cSNtJIgXTm1m1Ysf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1XnNQ2mZXJ2UjHdOq1zK2CfcbQ6hMzI-J",
        "name": "17.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XnNQ2mZXJ2UjHdOq1zK2CfcbQ6hMzI-J&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DcLtZ0lyvzzTRZltmTMYwzio_SqAYNu6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jesmBo8GAws2FAKP1U40WaAj7XyucvLj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1d3f5gY6OmbzcdBClYnz_EasrP2EoLAvz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bXkKn70S0GLeaQl0droF1wsrAA78yCZZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NX8X6vD9HtNbCSie1PHrnwEFyBdPYjfv&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z6DxGAE21DbsNIOLtrkSJxZe7rcSkLZi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NzoJUf7V8-8oXYmZ8KcKq0eqQF6n36Lw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rs8cNkTEb66GmUHqmeeuwmTOYW-AkRiA&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G2lwi7F6H33dn9xOXFQzZx_MF98Ja2Rx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fGLJNHi8zGjqXygT1Mmg3XYqN7rNFDzw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1paoAHCGsinf7lhuEdttLXa0SGDMbMpgw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zPBlfJM0PxZhXpR4FItolC1I91Pqiq3w&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PHXTsl9AWDb-Uk1XKN4NWQsELC-VbruS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10ZUfwtMshA_YFlARKc2BoSOOsPY8ITRq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uIjfgbmi-OBVnTRJI9t8DUgq8HvrFBIV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1V-oj8Hd6GlQS1pr1cSNtJIgXTm1m1Ysf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XnNQ2mZXJ2UjHdOq1zK2CfcbQ6hMzI-J&v=2"
    ]
  },
  "sv-014": {
    "folderId": "1dXjOwiBhzrX6cR5YCXvYTlwRg6yzXV4f",
    "folderName": "Ms yashaswini",
    "sheetProjectId": "SV-014",
    "customerName": "Ms. Yasashwini",
    "location": "Bengaluru",
    "structureType": "Open pooja Mandap",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 18,
    "videoCount": 0,
    "totalMediaCount": 18,
    "media": [
      {
        "id": "1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ",
        "name": "OVERVIEW.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1DcLtZ0lyvzzTRZltmTMYwzio_SqAYNu6",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DcLtZ0lyvzzTRZltmTMYwzio_SqAYNu6&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jesmBo8GAws2FAKP1U40WaAj7XyucvLj",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jesmBo8GAws2FAKP1U40WaAj7XyucvLj&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1d3f5gY6OmbzcdBClYnz_EasrP2EoLAvz",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1d3f5gY6OmbzcdBClYnz_EasrP2EoLAvz&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1bXkKn70S0GLeaQl0droF1wsrAA78yCZZ",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bXkKn70S0GLeaQl0droF1wsrAA78yCZZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NX8X6vD9HtNbCSie1PHrnwEFyBdPYjfv",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NX8X6vD9HtNbCSie1PHrnwEFyBdPYjfv&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1z6DxGAE21DbsNIOLtrkSJxZe7rcSkLZi",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z6DxGAE21DbsNIOLtrkSJxZe7rcSkLZi&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NzoJUf7V8-8oXYmZ8KcKq0eqQF6n36Lw",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NzoJUf7V8-8oXYmZ8KcKq0eqQF6n36Lw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rs8cNkTEb66GmUHqmeeuwmTOYW-AkRiA",
        "name": "8.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rs8cNkTEb66GmUHqmeeuwmTOYW-AkRiA&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1G2lwi7F6H33dn9xOXFQzZx_MF98Ja2Rx",
        "name": "9.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G2lwi7F6H33dn9xOXFQzZx_MF98Ja2Rx&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fGLJNHi8zGjqXygT1Mmg3XYqN7rNFDzw",
        "name": "10.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fGLJNHi8zGjqXygT1Mmg3XYqN7rNFDzw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1paoAHCGsinf7lhuEdttLXa0SGDMbMpgw",
        "name": "11.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1paoAHCGsinf7lhuEdttLXa0SGDMbMpgw&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1zPBlfJM0PxZhXpR4FItolC1I91Pqiq3w",
        "name": "12.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zPBlfJM0PxZhXpR4FItolC1I91Pqiq3w&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1PHXTsl9AWDb-Uk1XKN4NWQsELC-VbruS",
        "name": "13.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PHXTsl9AWDb-Uk1XKN4NWQsELC-VbruS&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "10ZUfwtMshA_YFlARKc2BoSOOsPY8ITRq",
        "name": "14.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10ZUfwtMshA_YFlARKc2BoSOOsPY8ITRq&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1uIjfgbmi-OBVnTRJI9t8DUgq8HvrFBIV",
        "name": "15.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uIjfgbmi-OBVnTRJI9t8DUgq8HvrFBIV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1V-oj8Hd6GlQS1pr1cSNtJIgXTm1m1Ysf",
        "name": "16.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1V-oj8Hd6GlQS1pr1cSNtJIgXTm1m1Ysf&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1XnNQ2mZXJ2UjHdOq1zK2CfcbQ6hMzI-J",
        "name": "17.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XnNQ2mZXJ2UjHdOq1zK2CfcbQ6hMzI-J&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1_UjI-IKs9ZO-9FLRV6Vpn_D_gq0Ra-ZQ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1DcLtZ0lyvzzTRZltmTMYwzio_SqAYNu6&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jesmBo8GAws2FAKP1U40WaAj7XyucvLj&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1d3f5gY6OmbzcdBClYnz_EasrP2EoLAvz&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1bXkKn70S0GLeaQl0droF1wsrAA78yCZZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NX8X6vD9HtNbCSie1PHrnwEFyBdPYjfv&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1z6DxGAE21DbsNIOLtrkSJxZe7rcSkLZi&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NzoJUf7V8-8oXYmZ8KcKq0eqQF6n36Lw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rs8cNkTEb66GmUHqmeeuwmTOYW-AkRiA&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1G2lwi7F6H33dn9xOXFQzZx_MF98Ja2Rx&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fGLJNHi8zGjqXygT1Mmg3XYqN7rNFDzw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1paoAHCGsinf7lhuEdttLXa0SGDMbMpgw&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zPBlfJM0PxZhXpR4FItolC1I91Pqiq3w&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1PHXTsl9AWDb-Uk1XKN4NWQsELC-VbruS&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10ZUfwtMshA_YFlARKc2BoSOOsPY8ITRq&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1uIjfgbmi-OBVnTRJI9t8DUgq8HvrFBIV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1V-oj8Hd6GlQS1pr1cSNtJIgXTm1m1Ysf&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XnNQ2mZXJ2UjHdOq1zK2CfcbQ6hMzI-J&v=2"
    ]
  },
  "12bXvEhuWia0kbHfWvZ3_Kr3oLoqe2bSC": {
    "folderId": "12bXvEhuWia0kbHfWvZ3_Kr3oLoqe2bSC",
    "folderName": "Ms. Deepthi Kunchey",
    "sheetProjectId": "SV-009",
    "customerName": "Ms. Deepthi Kunchey",
    "location": "Texas",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 1,
    "videoCount": 0,
    "totalMediaCount": 1,
    "media": [
      {
        "id": "1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn&v=2"
    ]
  },
  "sv-009": {
    "folderId": "12bXvEhuWia0kbHfWvZ3_Kr3oLoqe2bSC",
    "folderName": "Ms. Deepthi Kunchey",
    "sheetProjectId": "SV-009",
    "customerName": "Ms. Deepthi Kunchey",
    "location": "Texas",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 1,
    "videoCount": 0,
    "totalMediaCount": 1,
    "media": [
      {
        "id": "1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1GtXaeLNf0fyRKIzfqh9ELpJ4utnV-Wbn&v=2"
    ]
  },
  "1Y_RJ3QDAXowV0UZeg4K_v8GOt8JMMVM1": {
    "folderId": "1Y_RJ3QDAXowV0UZeg4K_v8GOt8JMMVM1",
    "folderName": "Mr. Rishab Bafna",
    "sheetProjectId": "SV-008",
    "customerName": "Mr. Rishab Bafna",
    "location": "Coimbatore",
    "structureType": "Existing Room Frontage",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 12,
    "videoCount": 0,
    "totalMediaCount": 12,
    "media": [
      {
        "id": "1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI",
        "name": "OVERVIEW.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1AIhOm9X9l0giek9JdZ52tBO87hG9XPnG",
        "name": "1.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1AIhOm9X9l0giek9JdZ52tBO87hG9XPnG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1n27asyECQqyld5e1ayx9BWxQIKjjIA5I",
        "name": "2.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n27asyECQqyld5e1ayx9BWxQIKjjIA5I&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1phVEENdDWswQUI5WPXNpCNr--GLo2jne",
        "name": "3.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1phVEENdDWswQUI5WPXNpCNr--GLo2jne&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fkGZ5sgUe-D0273HY6LGDHxZq3IdCxbb",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fkGZ5sgUe-D0273HY6LGDHxZq3IdCxbb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1l3j8O2YOvbrDXXXV5-W6rslzD62K8_Rh",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l3j8O2YOvbrDXXXV5-W6rslzD62K8_Rh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1by7t1ze2DGYBV2z2lIr3M9BKnAwRuH00",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1by7t1ze2DGYBV2z2lIr3M9BKnAwRuH00&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jPTLJQUK4t98ezcV17ib3lAwZf4mPUws",
        "name": "6a.webp",
        "type": "image",
        "mimeType": "image/webp",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jPTLJQUK4t98ezcV17ib3lAwZf4mPUws&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15TumNtO7Fi1nxzBOEBtz9NcU69ntLcM7",
        "name": "7.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15TumNtO7Fi1nxzBOEBtz9NcU69ntLcM7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1QlwMJaXx549POz0rf71yaPGzjLLs7dp-",
        "name": "8.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QlwMJaXx549POz0rf71yaPGzjLLs7dp-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WV1PveJP6nBLeFd1-1omWy3bpIo6zKIM",
        "name": "9.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WV1PveJP6nBLeFd1-1omWy3bpIo6zKIM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1zfIEMSfGU-GWGboszoB9Us6ycYbXeq-d",
        "name": "10.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zfIEMSfGU-GWGboszoB9Us6ycYbXeq-d&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1AIhOm9X9l0giek9JdZ52tBO87hG9XPnG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n27asyECQqyld5e1ayx9BWxQIKjjIA5I&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1phVEENdDWswQUI5WPXNpCNr--GLo2jne&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fkGZ5sgUe-D0273HY6LGDHxZq3IdCxbb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l3j8O2YOvbrDXXXV5-W6rslzD62K8_Rh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1by7t1ze2DGYBV2z2lIr3M9BKnAwRuH00&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jPTLJQUK4t98ezcV17ib3lAwZf4mPUws&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15TumNtO7Fi1nxzBOEBtz9NcU69ntLcM7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QlwMJaXx549POz0rf71yaPGzjLLs7dp-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WV1PveJP6nBLeFd1-1omWy3bpIo6zKIM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zfIEMSfGU-GWGboszoB9Us6ycYbXeq-d&v=2"
    ]
  },
  "sv-008": {
    "folderId": "1Y_RJ3QDAXowV0UZeg4K_v8GOt8JMMVM1",
    "folderName": "Mr. Rishab Bafna",
    "sheetProjectId": "SV-008",
    "customerName": "Mr. Rishab Bafna",
    "location": "Coimbatore",
    "structureType": "Existing Room Frontage",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 12,
    "videoCount": 0,
    "totalMediaCount": 12,
    "media": [
      {
        "id": "1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI",
        "name": "OVERVIEW.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1AIhOm9X9l0giek9JdZ52tBO87hG9XPnG",
        "name": "1.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1AIhOm9X9l0giek9JdZ52tBO87hG9XPnG&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1n27asyECQqyld5e1ayx9BWxQIKjjIA5I",
        "name": "2.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n27asyECQqyld5e1ayx9BWxQIKjjIA5I&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1phVEENdDWswQUI5WPXNpCNr--GLo2jne",
        "name": "3.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1phVEENdDWswQUI5WPXNpCNr--GLo2jne&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1fkGZ5sgUe-D0273HY6LGDHxZq3IdCxbb",
        "name": "4.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fkGZ5sgUe-D0273HY6LGDHxZq3IdCxbb&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1l3j8O2YOvbrDXXXV5-W6rslzD62K8_Rh",
        "name": "5.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l3j8O2YOvbrDXXXV5-W6rslzD62K8_Rh&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1by7t1ze2DGYBV2z2lIr3M9BKnAwRuH00",
        "name": "6.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1by7t1ze2DGYBV2z2lIr3M9BKnAwRuH00&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jPTLJQUK4t98ezcV17ib3lAwZf4mPUws",
        "name": "6a.webp",
        "type": "image",
        "mimeType": "image/webp",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jPTLJQUK4t98ezcV17ib3lAwZf4mPUws&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "15TumNtO7Fi1nxzBOEBtz9NcU69ntLcM7",
        "name": "7.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15TumNtO7Fi1nxzBOEBtz9NcU69ntLcM7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1QlwMJaXx549POz0rf71yaPGzjLLs7dp-",
        "name": "8.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QlwMJaXx549POz0rf71yaPGzjLLs7dp-&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WV1PveJP6nBLeFd1-1omWy3bpIo6zKIM",
        "name": "9.jpeg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WV1PveJP6nBLeFd1-1omWy3bpIo6zKIM&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1zfIEMSfGU-GWGboszoB9Us6ycYbXeq-d",
        "name": "10.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zfIEMSfGU-GWGboszoB9Us6ycYbXeq-d&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1F9baubCWo5bvPR6KkpBh4gzY4Qx4vpTI&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1AIhOm9X9l0giek9JdZ52tBO87hG9XPnG&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1n27asyECQqyld5e1ayx9BWxQIKjjIA5I&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1phVEENdDWswQUI5WPXNpCNr--GLo2jne&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1fkGZ5sgUe-D0273HY6LGDHxZq3IdCxbb&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1l3j8O2YOvbrDXXXV5-W6rslzD62K8_Rh&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1by7t1ze2DGYBV2z2lIr3M9BKnAwRuH00&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jPTLJQUK4t98ezcV17ib3lAwZf4mPUws&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=15TumNtO7Fi1nxzBOEBtz9NcU69ntLcM7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1QlwMJaXx549POz0rf71yaPGzjLLs7dp-&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WV1PveJP6nBLeFd1-1omWy3bpIo6zKIM&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1zfIEMSfGU-GWGboszoB9Us6ycYbXeq-d&v=2"
    ]
  },
  "1SpD_ItomD0PdsvmiEZ5bVTh-rFENQlWU": {
    "folderId": "1SpD_ItomD0PdsvmiEZ5bVTh-rFENQlWU",
    "folderName": "Mr. Shadakshari shala",
    "sheetProjectId": "SV-020",
    "customerName": "Mr. Shadakshari shala",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ykOtKFsErJqalMCOh-VjOMgNwQDrwxyf",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ykOtKFsErJqalMCOh-VjOMgNwQDrwxyf&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ykOtKFsErJqalMCOh-VjOMgNwQDrwxyf&v=2"
    ]
  },
  "sv-020": {
    "folderId": "1SpD_ItomD0PdsvmiEZ5bVTh-rFENQlWU",
    "folderName": "Mr. Shadakshari shala",
    "sheetProjectId": "SV-020",
    "customerName": "Mr. Shadakshari shala",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 2,
    "videoCount": 0,
    "totalMediaCount": 2,
    "media": [
      {
        "id": "1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ykOtKFsErJqalMCOh-VjOMgNwQDrwxyf",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ykOtKFsErJqalMCOh-VjOMgNwQDrwxyf&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WrdxLBS5c5OTv4YQ_GwK_uCWlfXRIW5N&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ykOtKFsErJqalMCOh-VjOMgNwQDrwxyf&v=2"
    ]
  },
  "1bbsRd0tttMXWSoSt_u6hhKvgRxQ0fkeQ": {
    "folderId": "1bbsRd0tttMXWSoSt_u6hhKvgRxQ0fkeQ",
    "folderName": "Mr. Praveen dyta",
    "sheetProjectId": "SV-015",
    "customerName": "Mr. Praveen dyta",
    "location": "Hyderabad",
    "structureType": "Complete Pooja Room",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rrhAaG0egTBbXbvSfxDi2PVoATRvoZc7",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rrhAaG0egTBbXbvSfxDi2PVoATRvoZc7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZvZyoeaGpXsGADE9Lm9nLqngzYCrzr1P",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZvZyoeaGpXsGADE9Lm9nLqngzYCrzr1P&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rrhAaG0egTBbXbvSfxDi2PVoATRvoZc7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZvZyoeaGpXsGADE9Lm9nLqngzYCrzr1P&v=2"
    ]
  },
  "sv-015": {
    "folderId": "1bbsRd0tttMXWSoSt_u6hhKvgRxQ0fkeQ",
    "folderName": "Mr. Praveen dyta",
    "sheetProjectId": "SV-015",
    "customerName": "Mr. Praveen dyta",
    "location": "Hyderabad",
    "structureType": "Complete Pooja Room",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1rrhAaG0egTBbXbvSfxDi2PVoATRvoZc7",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rrhAaG0egTBbXbvSfxDi2PVoATRvoZc7&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ZvZyoeaGpXsGADE9Lm9nLqngzYCrzr1P",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZvZyoeaGpXsGADE9Lm9nLqngzYCrzr1P&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VVn2UGHVdYw0_zMof9R7jGTemBfe8COH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1rrhAaG0egTBbXbvSfxDi2PVoATRvoZc7&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ZvZyoeaGpXsGADE9Lm9nLqngzYCrzr1P&v=2"
    ]
  },
  "13KZd-KthsOXmePtFLaxuF6lzYxDIcI-P": {
    "folderId": "13KZd-KthsOXmePtFLaxuF6lzYxDIcI-P",
    "folderName": "Mr. Satish Pradhan",
    "sheetProjectId": "SV-007",
    "customerName": "Mr. Satish Pradhan",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11TkOOY8LxypfRmtlO6EB-7SJ9uhkjMCZ",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11TkOOY8LxypfRmtlO6EB-7SJ9uhkjMCZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NSgrgUMz72T3bwGdRu2cQaGdwSWzwb8Y",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NSgrgUMz72T3bwGdRu2cQaGdwSWzwb8Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11TkOOY8LxypfRmtlO6EB-7SJ9uhkjMCZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NSgrgUMz72T3bwGdRu2cQaGdwSWzwb8Y&v=2"
    ]
  },
  "sv-007": {
    "folderId": "13KZd-KthsOXmePtFLaxuF6lzYxDIcI-P",
    "folderName": "Mr. Satish Pradhan",
    "sheetProjectId": "SV-007",
    "customerName": "Mr. Satish Pradhan",
    "location": "Bengaluru",
    "structureType": "Complete Pooja Room",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "11TkOOY8LxypfRmtlO6EB-7SJ9uhkjMCZ",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11TkOOY8LxypfRmtlO6EB-7SJ9uhkjMCZ&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1NSgrgUMz72T3bwGdRu2cQaGdwSWzwb8Y",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NSgrgUMz72T3bwGdRu2cQaGdwSWzwb8Y&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11aeTOj9rOZ2EVDSbxDleNIHNOzTUcF-F&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=11TkOOY8LxypfRmtlO6EB-7SJ9uhkjMCZ&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1NSgrgUMz72T3bwGdRu2cQaGdwSWzwb8Y&v=2"
    ]
  },
  "1B0g4hif4SnFJKCOautW5G-VpZtFZMTXu": {
    "folderId": "1B0g4hif4SnFJKCOautW5G-VpZtFZMTXu",
    "folderName": "Mr. Sachin patil",
    "sheetProjectId": "SV-017",
    "customerName": "Mr. Sachin patil",
    "location": "Nasik",
    "structureType": "Freestanding Unit",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1tKWLgwjzqGpjYIAKyPT-bLHCRLnFY_jD",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tKWLgwjzqGpjYIAKyPT-bLHCRLnFY_jD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Am8lM93Tg0W3liz4DM0hHtCe8OQqS0_R",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Am8lM93Tg0W3liz4DM0hHtCe8OQqS0_R&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1h-AFNID_pSSOw_LGJ5EQxbron6aYaFv7",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h-AFNID_pSSOw_LGJ5EQxbron6aYaFv7&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tKWLgwjzqGpjYIAKyPT-bLHCRLnFY_jD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Am8lM93Tg0W3liz4DM0hHtCe8OQqS0_R&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h-AFNID_pSSOw_LGJ5EQxbron6aYaFv7&v=2"
    ]
  },
  "sv-017": {
    "folderId": "1B0g4hif4SnFJKCOautW5G-VpZtFZMTXu",
    "folderName": "Mr. Sachin patil",
    "sheetProjectId": "SV-017",
    "customerName": "Mr. Sachin patil",
    "location": "Nasik",
    "structureType": "Freestanding Unit",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1tKWLgwjzqGpjYIAKyPT-bLHCRLnFY_jD",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tKWLgwjzqGpjYIAKyPT-bLHCRLnFY_jD&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Am8lM93Tg0W3liz4DM0hHtCe8OQqS0_R",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Am8lM93Tg0W3liz4DM0hHtCe8OQqS0_R&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1h-AFNID_pSSOw_LGJ5EQxbron6aYaFv7",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h-AFNID_pSSOw_LGJ5EQxbron6aYaFv7&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=10CHQfiV_XyQX72dfLeLVI22Ok0pLtBZV&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1tKWLgwjzqGpjYIAKyPT-bLHCRLnFY_jD&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Am8lM93Tg0W3liz4DM0hHtCe8OQqS0_R&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1h-AFNID_pSSOw_LGJ5EQxbron6aYaFv7&v=2"
    ]
  },
  "1x7ZtEDGDiHI9NvSbrZr46FuHyrQsP6_o": {
    "folderId": "1x7ZtEDGDiHI9NvSbrZr46FuHyrQsP6_o",
    "folderName": "Mr. Manam D",
    "sheetProjectId": "SV-013",
    "customerName": "Mr. Manam D",
    "location": "Tirupattur",
    "structureType": "Freestanding Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1nmhShywX29wqZWDueaQYhnN2rzLkuH0P",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nmhShywX29wqZWDueaQYhnN2rzLkuH0P&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "1nmhShywX29wqZWDueaQYhnN2rzLkuH0P",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nmhShywX29wqZWDueaQYhnN2rzLkuH0P&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12kEFgKp3s-CGLMu0Y0OhHUtad6EFdyue",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12kEFgKp3s-CGLMu0Y0OhHUtad6EFdyue&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Svc9WTq1Da5odPnuXduE4mZy2vG-3erF",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Svc9WTq1Da5odPnuXduE4mZy2vG-3erF&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nmhShywX29wqZWDueaQYhnN2rzLkuH0P&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12kEFgKp3s-CGLMu0Y0OhHUtad6EFdyue&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Svc9WTq1Da5odPnuXduE4mZy2vG-3erF&v=2"
    ]
  },
  "sv-013": {
    "folderId": "1x7ZtEDGDiHI9NvSbrZr46FuHyrQsP6_o",
    "folderName": "Mr. Manam D",
    "sheetProjectId": "SV-013",
    "customerName": "Mr. Manam D",
    "location": "Tirupattur",
    "structureType": "Freestanding Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1nmhShywX29wqZWDueaQYhnN2rzLkuH0P",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nmhShywX29wqZWDueaQYhnN2rzLkuH0P&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 3,
    "videoCount": 0,
    "totalMediaCount": 3,
    "media": [
      {
        "id": "1nmhShywX29wqZWDueaQYhnN2rzLkuH0P",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nmhShywX29wqZWDueaQYhnN2rzLkuH0P&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12kEFgKp3s-CGLMu0Y0OhHUtad6EFdyue",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12kEFgKp3s-CGLMu0Y0OhHUtad6EFdyue&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Svc9WTq1Da5odPnuXduE4mZy2vG-3erF",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Svc9WTq1Da5odPnuXduE4mZy2vG-3erF&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1nmhShywX29wqZWDueaQYhnN2rzLkuH0P&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12kEFgKp3s-CGLMu0Y0OhHUtad6EFdyue&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Svc9WTq1Da5odPnuXduE4mZy2vG-3erF&v=2"
    ]
  },
  "1bFkmicEicq1VJ8f9KuAo-RqoPcWBwVlY": {
    "folderId": "1bFkmicEicq1VJ8f9KuAo-RqoPcWBwVlY",
    "folderName": "Mr. Ram M Chennai",
    "sheetProjectId": "SV-010",
    "customerName": "Mr. Ram M",
    "location": "Chennai",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c",
        "name": "1.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O1rBWK7HBdNKnNDIXYGPHPEQld8LZwgk",
        "name": "2.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O1rBWK7HBdNKnNDIXYGPHPEQld8LZwgk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hfyv3BxW7L9XjbHN29sP0USMe9PDeB7T",
        "name": "03.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hfyv3BxW7L9XjbHN29sP0USMe9PDeB7T&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13HkiFe_O7jBOLT06Y46Mn5oIYguXpyxm",
        "name": "04.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13HkiFe_O7jBOLT06Y46Mn5oIYguXpyxm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Ig3EZxka1-4Y0XEzu5JHXi-rN8MOxElt",
        "name": "05.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ig3EZxka1-4Y0XEzu5JHXi-rN8MOxElt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mU8NV9WicxnMwQ1BqNoV1o1zDv9B-143",
        "name": "06.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mU8NV9WicxnMwQ1BqNoV1o1zDv9B-143&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "18Y_cT3pWf3d890yRsH5wCb2VarWWwWZH",
        "name": "07.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18Y_cT3pWf3d890yRsH5wCb2VarWWwWZH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YBy8WJJlq1rBh0S8GghLpXhumMn4sUad",
        "name": "08.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YBy8WJJlq1rBh0S8GghLpXhumMn4sUad&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O1rBWK7HBdNKnNDIXYGPHPEQld8LZwgk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hfyv3BxW7L9XjbHN29sP0USMe9PDeB7T&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13HkiFe_O7jBOLT06Y46Mn5oIYguXpyxm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ig3EZxka1-4Y0XEzu5JHXi-rN8MOxElt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mU8NV9WicxnMwQ1BqNoV1o1zDv9B-143&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18Y_cT3pWf3d890yRsH5wCb2VarWWwWZH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YBy8WJJlq1rBh0S8GghLpXhumMn4sUad&v=2"
    ]
  },
  "sv-010": {
    "folderId": "1bFkmicEicq1VJ8f9KuAo-RqoPcWBwVlY",
    "folderName": "Mr. Ram M Chennai",
    "sheetProjectId": "SV-010",
    "customerName": "Mr. Ram M",
    "location": "Chennai",
    "structureType": "Wall Unit",
    "designDetail": "Moderate",
    "dimensions": "",
    "coverId": "1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c&v=2",
    "hasDedicatedOverview": false,
    "imageCount": 8,
    "videoCount": 0,
    "totalMediaCount": 8,
    "media": [
      {
        "id": "1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c",
        "name": "1.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1O1rBWK7HBdNKnNDIXYGPHPEQld8LZwgk",
        "name": "2.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O1rBWK7HBdNKnNDIXYGPHPEQld8LZwgk&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1hfyv3BxW7L9XjbHN29sP0USMe9PDeB7T",
        "name": "03.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hfyv3BxW7L9XjbHN29sP0USMe9PDeB7T&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13HkiFe_O7jBOLT06Y46Mn5oIYguXpyxm",
        "name": "04.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13HkiFe_O7jBOLT06Y46Mn5oIYguXpyxm&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Ig3EZxka1-4Y0XEzu5JHXi-rN8MOxElt",
        "name": "05.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ig3EZxka1-4Y0XEzu5JHXi-rN8MOxElt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1mU8NV9WicxnMwQ1BqNoV1o1zDv9B-143",
        "name": "06.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mU8NV9WicxnMwQ1BqNoV1o1zDv9B-143&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "18Y_cT3pWf3d890yRsH5wCb2VarWWwWZH",
        "name": "07.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18Y_cT3pWf3d890yRsH5wCb2VarWWwWZH&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1YBy8WJJlq1rBh0S8GghLpXhumMn4sUad",
        "name": "08.png",
        "type": "image",
        "mimeType": "image/png",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YBy8WJJlq1rBh0S8GghLpXhumMn4sUad&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1wBG9160wtdmiX-eDNdL5oV1qmjTtZ1-c&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1O1rBWK7HBdNKnNDIXYGPHPEQld8LZwgk&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1hfyv3BxW7L9XjbHN29sP0USMe9PDeB7T&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13HkiFe_O7jBOLT06Y46Mn5oIYguXpyxm&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Ig3EZxka1-4Y0XEzu5JHXi-rN8MOxElt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1mU8NV9WicxnMwQ1BqNoV1o1zDv9B-143&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=18Y_cT3pWf3d890yRsH5wCb2VarWWwWZH&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1YBy8WJJlq1rBh0S8GghLpXhumMn4sUad&v=2"
    ]
  },
  "1qjopY-tY3YAugr-SLnwFIRQuGLeadCaQ": {
    "folderId": "1qjopY-tY3YAugr-SLnwFIRQuGLeadCaQ",
    "folderName": "Mr. Girish Rao",
    "sheetProjectId": "SV-018",
    "customerName": "Mr. Girish Rao",
    "location": "Bengaluru",
    "structureType": "Freestanding Unit",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WRyRbybM7epmJkW95e-wMH7vUfI8DhA2",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRyRbybM7epmJkW95e-wMH7vUfI8DhA2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13YFgnPpNA08BZ-MvwkbEeXYGeLq12-hu",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13YFgnPpNA08BZ-MvwkbEeXYGeLq12-hu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19kNJrGvCLjh7NpASGOQz9Su9Ut-_CeMa",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19kNJrGvCLjh7NpASGOQz9Su9Ut-_CeMa&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRyRbybM7epmJkW95e-wMH7vUfI8DhA2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13YFgnPpNA08BZ-MvwkbEeXYGeLq12-hu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19kNJrGvCLjh7NpASGOQz9Su9Ut-_CeMa&v=2"
    ]
  },
  "sv-018": {
    "folderId": "1qjopY-tY3YAugr-SLnwFIRQuGLeadCaQ",
    "folderName": "Mr. Girish Rao",
    "sheetProjectId": "SV-018",
    "customerName": "Mr. Girish Rao",
    "location": "Bengaluru",
    "structureType": "Freestanding Unit",
    "designDetail": "Minimal",
    "dimensions": "",
    "coverId": "16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 4,
    "videoCount": 0,
    "totalMediaCount": 4,
    "media": [
      {
        "id": "16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E",
        "name": "overview.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1WRyRbybM7epmJkW95e-wMH7vUfI8DhA2",
        "name": "1.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRyRbybM7epmJkW95e-wMH7vUfI8DhA2&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "13YFgnPpNA08BZ-MvwkbEeXYGeLq12-hu",
        "name": "2.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13YFgnPpNA08BZ-MvwkbEeXYGeLq12-hu&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "19kNJrGvCLjh7NpASGOQz9Su9Ut-_CeMa",
        "name": "3.jpg",
        "type": "image",
        "mimeType": "image/jpeg",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19kNJrGvCLjh7NpASGOQz9Su9Ut-_CeMa&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=16kgYCXGgn1drM6Grt8O_Fm0fUweguZ-E&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1WRyRbybM7epmJkW95e-wMH7vUfI8DhA2&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=13YFgnPpNA08BZ-MvwkbEeXYGeLq12-hu&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=19kNJrGvCLjh7NpASGOQz9Su9Ut-_CeMa&v=2"
    ]
  },
  "1zz-LEa4VVyeLJnbyQ8PF73vW6lmb16Gy": {
    "folderId": "1zz-LEa4VVyeLJnbyQ8PF73vW6lmb16Gy",
    "folderName": "Mr. Nitesh Panda",
    "sheetProjectId": "SV-023",
    "customerName": "Mr. Nitesh Panda",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1FgecywHgQseftMUApybXuN6WkngkOfkt",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FgecywHgQseftMUApybXuN6WkngkOfkt&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1FgecywHgQseftMUApybXuN6WkngkOfkt",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FgecywHgQseftMUApybXuN6WkngkOfkt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Bl7cNcp4Z2mBUmSB-ozskHoN7AivbB6l",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Bl7cNcp4Z2mBUmSB-ozskHoN7AivbB6l&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1SLA-W28qnSNhk3BYahdmEDKCpj2rxi_a",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1SLA-W28qnSNhk3BYahdmEDKCpj2rxi_a&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VK8iQK3rOd8loqL11L_yXRlg8157gN0l",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VK8iQK3rOd8loqL11L_yXRlg8157gN0l&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12gLTHdCLsXY-Zn3LCFgwtb_puvZKOT2F",
        "name": "3a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12gLTHdCLsXY-Zn3LCFgwtb_puvZKOT2F&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1XvS8aa6ioUTsjNhondxKrQ3GNyBgoQl3",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XvS8aa6ioUTsjNhondxKrQ3GNyBgoQl3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jdIVGOotNNXdTBxz2nBpuynWLGR8bM7T",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jdIVGOotNNXdTBxz2nBpuynWLGR8bM7T&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vKAooJ4RhQlyd0RGUCPlf2hXrQxxGviI",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vKAooJ4RhQlyd0RGUCPlf2hXrQxxGviI&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ggGxaFzV81tDHTYeUN-QHPBzNDTkJ5xb",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ggGxaFzV81tDHTYeUN-QHPBzNDTkJ5xb&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FgecywHgQseftMUApybXuN6WkngkOfkt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Bl7cNcp4Z2mBUmSB-ozskHoN7AivbB6l&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1SLA-W28qnSNhk3BYahdmEDKCpj2rxi_a&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VK8iQK3rOd8loqL11L_yXRlg8157gN0l&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12gLTHdCLsXY-Zn3LCFgwtb_puvZKOT2F&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XvS8aa6ioUTsjNhondxKrQ3GNyBgoQl3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jdIVGOotNNXdTBxz2nBpuynWLGR8bM7T&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vKAooJ4RhQlyd0RGUCPlf2hXrQxxGviI&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ggGxaFzV81tDHTYeUN-QHPBzNDTkJ5xb&v=2"
    ]
  },
  "sv-023": {
    "folderId": "1zz-LEa4VVyeLJnbyQ8PF73vW6lmb16Gy",
    "folderName": "Mr. Nitesh Panda",
    "sheetProjectId": "SV-023",
    "customerName": "Mr. Nitesh Panda",
    "location": "Bengaluru",
    "structureType": "Freestanding Enclosure",
    "designDetail": "Heavy",
    "dimensions": "",
    "coverId": "1FgecywHgQseftMUApybXuN6WkngkOfkt",
    "coverUrl": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FgecywHgQseftMUApybXuN6WkngkOfkt&v=2",
    "hasDedicatedOverview": true,
    "imageCount": 9,
    "videoCount": 0,
    "totalMediaCount": 9,
    "media": [
      {
        "id": "1FgecywHgQseftMUApybXuN6WkngkOfkt",
        "name": "overview.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FgecywHgQseftMUApybXuN6WkngkOfkt&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1Bl7cNcp4Z2mBUmSB-ozskHoN7AivbB6l",
        "name": "1.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Bl7cNcp4Z2mBUmSB-ozskHoN7AivbB6l&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1SLA-W28qnSNhk3BYahdmEDKCpj2rxi_a",
        "name": "2.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1SLA-W28qnSNhk3BYahdmEDKCpj2rxi_a&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1VK8iQK3rOd8loqL11L_yXRlg8157gN0l",
        "name": "3.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VK8iQK3rOd8loqL11L_yXRlg8157gN0l&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "12gLTHdCLsXY-Zn3LCFgwtb_puvZKOT2F",
        "name": "3a.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12gLTHdCLsXY-Zn3LCFgwtb_puvZKOT2F&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1XvS8aa6ioUTsjNhondxKrQ3GNyBgoQl3",
        "name": "4.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XvS8aa6ioUTsjNhondxKrQ3GNyBgoQl3&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1jdIVGOotNNXdTBxz2nBpuynWLGR8bM7T",
        "name": "5.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jdIVGOotNNXdTBxz2nBpuynWLGR8bM7T&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1vKAooJ4RhQlyd0RGUCPlf2hXrQxxGviI",
        "name": "6.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vKAooJ4RhQlyd0RGUCPlf2hXrQxxGviI&v=2",
        "isSubfolder": false,
        "subfolder": null
      },
      {
        "id": "1ggGxaFzV81tDHTYeUN-QHPBzNDTkJ5xb",
        "name": "7.avif",
        "type": "image",
        "mimeType": "image/avif",
        "url": "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ggGxaFzV81tDHTYeUN-QHPBzNDTkJ5xb&v=2",
        "isSubfolder": false,
        "subfolder": null
      }
    ],
    "galleryUrls": [
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1FgecywHgQseftMUApybXuN6WkngkOfkt&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1Bl7cNcp4Z2mBUmSB-ozskHoN7AivbB6l&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1SLA-W28qnSNhk3BYahdmEDKCpj2rxi_a&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1VK8iQK3rOd8loqL11L_yXRlg8157gN0l&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=12gLTHdCLsXY-Zn3LCFgwtb_puvZKOT2F&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1XvS8aa6ioUTsjNhondxKrQ3GNyBgoQl3&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1jdIVGOotNNXdTBxz2nBpuynWLGR8bM7T&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1vKAooJ4RhQlyd0RGUCPlf2hXrQxxGviI&v=2",
      "https://svvayam-project-explorer-api.ringed-thief.workers.dev/api/portfolio/image?fileId=1ggGxaFzV81tDHTYeUN-QHPBzNDTkJ5xb&v=2"
    ]
  }
};
