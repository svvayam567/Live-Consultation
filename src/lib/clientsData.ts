import { useState, useEffect, useCallback, useRef } from 'react';
import { PROJECT_COVER_MAP, type GalleryMediaItem } from './projectCoverSeed';

const NAME_ALIASES: Record<string, string> = {
  'manasakunchum': 'manasakuncham',
  'yasashwini': 'yashaswini',
  'ranachandra': 'ramachandra',
  'athulmehrotra': 'atulmehotra'
};

function normalizeName(s: string) {
  const norm = (s || '').toLowerCase()
    .replace(/^(mr\.|mrs\.|ms\.|dr\.|mr|mrs|ms|dr)\s*/i, '')
    .replace(/\s+(chennai|anantapur|sanctuary|sanctum|thane|temple|pooja\s*room|mandir)$/i, '')
    .replace(/[^a-z0-9]/g, '');
  return NAME_ALIASES[norm] || norm;
}

function findFolderCoverSeed(project: ClientProject) {
  if (project.driveFolderId && PROJECT_COVER_MAP[project.driveFolderId]) {
    return PROJECT_COVER_MAP[project.driveFolderId];
  }
  const projectNorm = normalizeName(project.folder || project.name);
  for (const item of Object.values(PROJECT_COVER_MAP)) {
    if (normalizeName(item.folderName) === projectNorm) {
      return item;
    }
  }
  return null;
}

export function getProjectPriority(p: ClientProject): 1 | 2 | 3 {
  if (p.priority === 1 || p.priority === 2 || p.priority === 3) return p.priority;
  if (p.hasDedicatedOverview || p.hasOverview) return 1;
  const photoCount = p.photoCount !== undefined 
    ? p.photoCount 
    : (p.media?.filter(m => m.type === 'image').length ?? (p.images?.length ?? (p.heroImg ? 1 : 0)));
  if (photoCount > 0) return 2;
  return 3;
}

function hydrateCatalogProjects(projects: ClientProject[], _apiBase: string): ClientProject[] {
  const hydrated = projects.map((p) => {
    const seed = findFolderCoverSeed(p);
    if (!seed) return p;

    const driveFolderId = p.driveFolderId || seed.folderId;
    const priority = seed.priority || ((seed.hasDedicatedOverview || p.hasDedicatedOverview || p.hasOverview) ? 1 : (seed.photoCount > 0 ? 2 : 3));
    const hasDedicatedOverview = priority === 1;

    let heroImg = p.heroImg;
    let overviewImg = p.overviewImg;

    if (priority === 1) {
      if (!heroImg && seed.coverUrl) heroImg = seed.coverUrl;
      overviewImg = heroImg || seed.coverUrl || null;
      if (!heroImg && overviewImg) heroImg = overviewImg;
    } else if (priority === 2) {
      if (!heroImg && seed.coverUrl) heroImg = seed.coverUrl;
      overviewImg = null;
    } else {
      // Priority 3: no photos, heroImg empty to show clean placeholder
      heroImg = '';
      overviewImg = null;
    }

    const images = (Array.isArray(p.images) && p.images.length > 0) ? p.images : (seed.galleryUrls || []);

    return {
      ...p,
      driveFolderId,
      priority,
      hasDedicatedOverview,
      hasOverview: hasDedicatedOverview,
      heroImg: priority === 3 ? '' : (heroImg || (images.length > 0 ? images[0] : '')),
      overviewImg,
      images,
      media: seed.media || [],
      photoCount: seed.photoCount || (priority === 3 ? 0 : images.length),
      videoCount: seed.videoCount || 0,
      totalMediaCount: seed.totalMediaCount || images.length,
      accessError: seed.accessError || null
    };
  });

  // 3-tier priority sort: Priority 1 first, Priority 2 second, Priority 3 third
  // Within each tier, preserve curated order_index
  hydrated.sort((a, b) => {
    const pA = getProjectPriority(a);
    const pB = getProjectPriority(b);
    if (pA !== pB) return pA - pB;
    return (a.order_index ?? 9999) - (b.order_index ?? 9999);
  });

  return hydrated;
}

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
  hasDedicatedOverview?: boolean;
  priority?: 1 | 2 | 3;
  overviewImg?: string | null;
  heroImg: string;
  images: string[];
  media?: GalleryMediaItem[];
  photoCount?: number;
  videoCount?: number;
  totalMediaCount?: number;
  accessError?: string | null;
  stages: ProjectStage[];
  driveFolderId?: string;
  is_published?: boolean;
}

export interface PendingFolder {
  folderId: string;
  folderName: string;
  reason: string;
}

export interface CatalogApiResponse {
  timestamp: string;
  source: 'live_federated' | 'cache';
  cacheAgeMs: number;
  totalProjects: number;
  projects: ClientProject[];
  pendingFolders?: PendingFolder[];
  warnings?: string[];
}

let cachedClients: ClientProject[] | null = null;
let lastFetchTimestamp = 0;
const REVALIDATION_INTERVAL_MS = 60 * 1000; // 60-second periodic revalidation

export const PORTFOLIO_API_BASE = import.meta.env.VITE_PORTFOLIO_API_URL || 'https://svvayam-project-explorer-api.ringed-thief.workers.dev';

export const useClientsData = () => {
  const [clients, setClients] = useState<ClientProject[]>(cachedClients || []);
  const [loading, setLoading] = useState<boolean>(!cachedClients || cachedClients.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [pendingFolders, setPendingFolders] = useState<PendingFolder[]>([]);
  const isFetchingRef = useRef<boolean>(false);

  // Fetch catalog from read-only backend endpoint (Cloudflare Worker -> Sheet + Drive)
  const fetchLiveCatalog = useCallback(async (isMounted: boolean, force = false) => {
    if (isFetchingRef.current) return;
    const now = Date.now();
    if (!force && now - lastFetchTimestamp < 15000 && cachedClients && cachedClients.length > 0) {
      return; // throttle quick successive focus triggers
    }

    isFetchingRef.current = true;
    if (force && (!cachedClients || cachedClients.length === 0)) {
      setLoading(true);
      setError(null);
    }

    try {
      const apiEndpoint = `${PORTFOLIO_API_BASE}/api/portfolio/catalog${force ? '?refresh=true' : ''}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

      const res = await fetch(apiEndpoint, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data: CatalogApiResponse = await res.json();
      if (isMounted) {
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          const hydratedProjects = hydrateCatalogProjects(data.projects, PORTFOLIO_API_BASE);
          cachedClients = hydratedProjects;
          lastFetchTimestamp = Date.now();
          setClients(hydratedProjects);
          if (data.pendingFolders) {
            setPendingFolders(data.pendingFolders);
          }
          setLoading(false);
          setError(null);
        } else {
          if (!cachedClients || cachedClients.length === 0) {
            setClients([]);
            setLoading(false);
          }
        }
      }
    } catch (err: any) {
      if (isMounted) {
        console.warn('[ProjectExplorer] Catalog fetch note:', err.message);
        setError(err.name === 'AbortError' ? 'Request timed out' : err.message);
        if (!cachedClients || cachedClients.length === 0) {
          setLoading(false);
        }
      }
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // 1. If memory cache already has valid data, use it immediately
    if (cachedClients && cachedClients.length > 0) {
      setClients(cachedClients);
      setLoading(false);
    }

    // 2. Fetch live catalog directly from backend (Google Sheet + Drive)
    fetchLiveCatalog(isMounted);

    // 3. Periodic 60-second revalidation while Project Explorer is open
    const intervalId = setInterval(() => {
      if (isMounted) {
        fetchLiveCatalog(isMounted);
      }
    }, REVALIDATION_INTERVAL_MS);

    // 4. Revalidate whenever the user returns to the tab/window
    const handleFocus = () => {
      if (isMounted) fetchLiveCatalog(isMounted);
    };

    const handleVisibilityChange = () => {
      if (isMounted && document.visibilityState === 'visible') {
        fetchLiveCatalog(isMounted);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchLiveCatalog]);

  const refresh = useCallback(() => {
    setError(null);
    setLoading(true);
    return fetchLiveCatalog(true, true);
  }, [fetchLiveCatalog]);

  return { clients, loading, error, pendingFolders, refresh };
};
