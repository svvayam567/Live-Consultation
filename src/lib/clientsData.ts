import { useState, useEffect } from 'react';
import { assetUrl } from './utils';

export interface ProjectStage {
  stage_key: string;
  title: string;
  dir_name: string;
  images: string[];
  count: number;
}

export interface ClientProject {
  id: string;
  name: string;
  folder: string;
  sizeLabel: 'Compact' | 'Medium' | 'Grand' | string;
  size: string;
  material: string;
  location: string;
  type: string;
  desc: string;
  status: string;
  statusCode: string;
  hasGreenDot?: boolean;
  heroImg: string;
  stages: ProjectStage[];
}

let cachedClients: ClientProject[] | null = null;

export const useClientsData = () => {
  const [clients, setClients] = useState<ClientProject[]>(cachedClients || []);
  const [loading, setLoading] = useState<boolean>(!cachedClients);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedClients) {
      setClients(cachedClients);
      setLoading(false);
      return;
    }

    // Check if window.SVVAYAM_CLIENTS_DATA exists from script tag
    const win = window as unknown as { SVVAYAM_CLIENTS_DATA?: ClientProject[] };
    if (Array.isArray(win.SVVAYAM_CLIENTS_DATA) && win.SVVAYAM_CLIENTS_DATA.length > 0) {
      cachedClients = win.SVVAYAM_CLIENTS_DATA;
      setClients(cachedClients);
      setLoading(false);
      return;
    }

    fetch(assetUrl('assets/clients_manifest.json'))
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load clients manifest');
        return res.json();
      })
      .then((data: ClientProject[]) => {
        cachedClients = data;
        setClients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading clients manifest:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { clients, loading, error };
};
