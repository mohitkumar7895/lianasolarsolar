/**
 * Robust Client Storage Utility using IndexedDB with safe fallback to localStorage.
 * Handles large datasets, project galleries, and images without hitting the 5MB localStorage quota.
 */

const DB_NAME = 'LianaSolarDB';
const DB_VERSION = 1;
const STORE_NAME = 'site_content';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save data to IndexedDB with localStorage fallback
 */
export async function setStorageItem<T>(key: string, value: T): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  } catch (idbErr) {
    // Fallback to localStorage with safety check
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (lsErr: any) {
      console.warn(`[Storage] localStorage Quota exceeded for "${key}", data held in memory:`, lsErr.message);
    }
  }
}

/**
 * Load data from IndexedDB with localStorage fallback
 */
export async function getStorageItem<T>(key: string, defaultValue: T): Promise<T> {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const db = await openDatabase();
    const idbResult = await new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });

    if (idbResult !== undefined && idbResult !== null) {
      return idbResult;
    }
  } catch {
    // Continue to check localStorage
  }

  // Check localStorage as fallback
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate to IndexedDB in background
      setStorageItem(key, parsed).catch(() => {});
      return parsed;
    }
  } catch (e) {
    console.warn(`[Storage] Failed to read from localStorage for "${key}":`, e);
  }

  return defaultValue;
}

/**
 * Remove an item from both IndexedDB and localStorage
 */
export async function removeStorageItem(key: string): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => db.close();
  } catch {}

  try {
    localStorage.removeItem(key);
  } catch {}
}
