import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';

/**
 * Uploads a file for a consultation to Cloud Storage for Firebase.
 */
export async function uploadConsultationFile(
  consultationId: string,
  file: File | Blob,
  fileName: string
): Promise<{ success: boolean; url?: string; storagePath?: string; error?: string }> {
  if (!isFirebaseConfigured || !storage) {
    // Local data URL fallback
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          success: true,
          url: reader.result as string,
          storagePath: `local-drafts/${consultationId}/${fileName}`
        });
      };
      reader.onerror = () => {
        resolve({ success: false, error: 'Failed to read local file.' });
      };
      reader.readAsDataURL(file);
    });
  }

  try {
    const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `consultation-uploads/${consultationId}/${Date.now()}_${cleanName}`;
    const fileRef = ref(storage, storagePath);

    const snapshot = await uploadBytes(fileRef, file, {
      contentType: file.type || 'application/octet-stream',
      customMetadata: {
        consultationId,
        uploadedAt: new Date().toISOString()
      }
    });

    const downloadUrl = await getDownloadURL(snapshot.ref);
    return {
      success: true,
      url: downloadUrl,
      storagePath
    };
  } catch (err: any) {
    console.error('[Firebase Storage] uploadConsultationFile error:', err);
    return {
      success: false,
      error: err?.message || 'Storage upload failed.'
    };
  }
}

/**
 * Generates download URL for a storage path.
 */
export async function getStorageFileUrl(storagePath: string): Promise<string | null> {
  if (!isFirebaseConfigured || !storage) {
    return null;
  }
  try {
    const fileRef = ref(storage, storagePath);
    return await getDownloadURL(fileRef);
  } catch (err) {
    console.warn('[Firebase Storage] getStorageFileUrl error:', err);
    return null;
  }
}
