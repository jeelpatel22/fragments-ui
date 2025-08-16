// IndexedDB service for offline data persistence
class FragmentDB {
  constructor() {
    this.dbName = 'FragmentsDB';
    this.version = 1;
    this.db = null;
    this.initPromise = null;
  }

  // Initialize the database
  async init() {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Failed to open database:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('Database opened successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create fragments store
        if (!db.objectStoreNames.contains('fragments')) {
          const fragmentStore = db.createObjectStore('fragments', { keyPath: 'id' });
          fragmentStore.createIndex('ownerId', 'ownerId', { unique: false });
          fragmentStore.createIndex('type', 'type', { unique: false });
          fragmentStore.createIndex('created', 'created', { unique: false });
        }

        // Create offline actions store
        if (!db.objectStoreNames.contains('offlineActions')) {
          const actionStore = db.createObjectStore('offlineActions', { keyPath: 'id', autoIncrement: true });
          actionStore.createIndex('type', 'type', { unique: false });
          actionStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Create sync queue store
        if (!db.objectStoreNames.contains('syncQueue')) {
          const syncStore = db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
          syncStore.createIndex('action', 'action', { unique: false });
          syncStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        console.log('Database schema created/updated');
      };
    });

    return this.initPromise;
  }

  // Fragment operations
  async saveFragment(fragment) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['fragments'], 'readwrite');
      const store = transaction.objectStore('fragments');
      const request = store.put(fragment);

      request.onsuccess = () => {
        console.log('Fragment saved to IndexedDB:', fragment.id);
        resolve(fragment);
      };

      request.onerror = () => {
        console.error('Failed to save fragment:', request.error);
        reject(request.error);
      };
    });
  }

  async getFragment(id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['fragments'], 'readonly');
      const store = transaction.objectStore('fragments');
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        console.error('Failed to get fragment:', request.error);
        reject(request.error);
      };
    });
  }

  async getAllFragments(ownerId) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['fragments'], 'readonly');
      const store = transaction.objectStore('fragments');
      const index = store.index('ownerId');
      const request = index.getAll(ownerId);

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('Failed to get fragments:', request.error);
        reject(request.error);
      };
    });
  }

  async deleteFragment(id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['fragments'], 'readwrite');
      const store = transaction.objectStore('fragments');
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log('Fragment deleted from IndexedDB:', id);
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to delete fragment:', request.error);
        reject(request.error);
      };
    });
  }

  // Offline actions management
  async addOfflineAction(action) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['offlineActions'], 'readwrite');
      const store = transaction.objectStore('offlineActions');
      
      const offlineAction = {
        ...action,
        timestamp: Date.now(),
        retryCount: 0
      };

      const request = store.add(offlineAction);

      request.onsuccess = () => {
        console.log('Offline action added:', offlineAction);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('Failed to add offline action:', request.error);
        reject(request.error);
      };
    });
  }

  async getOfflineActions() {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['offlineActions'], 'readonly');
      const store = transaction.objectStore('offlineActions');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('Failed to get offline actions:', request.error);
        reject(request.error);
      };
    });
  }

  async removeOfflineAction(id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['offlineActions'], 'readwrite');
      const store = transaction.objectStore('offlineActions');
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log('Offline action removed:', id);
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to remove offline action:', request.error);
        reject(request.error);
      };
    });
  }

  // Sync queue management
  async addToSyncQueue(syncItem) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');
      
      const queueItem = {
        ...syncItem,
        timestamp: Date.now(),
        status: 'pending'
      };

      const request = store.add(queueItem);

      request.onsuccess = () => {
        console.log('Item added to sync queue:', queueItem);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('Failed to add to sync queue:', request.error);
        reject(request.error);
      };
    });
  }

  async getSyncQueue() {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['syncQueue'], 'readonly');
      const store = transaction.objectStore('syncQueue');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('Failed to get sync queue:', request.error);
        reject(request.error);
      };
    });
  }

  async removeFromSyncQueue(id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log('Item removed from sync queue:', id);
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to remove from sync queue:', request.error);
        reject(request.error);
      };
    });
  }

  // Utility methods
  async clearAll() {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['fragments', 'offlineActions', 'syncQueue'], 'readwrite');
      
      const fragmentStore = transaction.objectStore('fragments');
      const actionStore = transaction.objectStore('offlineActions');
      const syncStore = transaction.objectStore('syncQueue');

      const fragmentRequest = fragmentStore.clear();
      const actionRequest = actionStore.clear();
      const syncRequest = syncStore.clear();

      transaction.oncomplete = () => {
        console.log('All data cleared from IndexedDB');
        resolve();
      };

      transaction.onerror = () => {
        console.error('Failed to clear data:', transaction.error);
        reject(transaction.error);
      };
    });
  }

  async getDatabaseSize() {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['fragments', 'offlineActions', 'syncQueue'], 'readonly');
      
      const fragmentStore = transaction.objectStore('fragments');
      const actionStore = transaction.objectStore('offlineActions');
      const syncStore = transaction.objectStore('syncQueue');

      const fragmentRequest = fragmentStore.count();
      const actionRequest = actionStore.count();
      const syncRequest = syncStore.count();

      let counts = { fragments: 0, actions: 0, sync: 0 };

      fragmentRequest.onsuccess = () => {
        counts.fragments = fragmentRequest.result;
      };

      actionRequest.onsuccess = () => {
        counts.actions = actionRequest.result;
      };

      syncRequest.onsuccess = () => {
        counts.sync = syncRequest.result;
      };

      transaction.oncomplete = () => {
        resolve(counts);
      };

      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  }
}

// Export singleton instance
const fragmentDB = new FragmentDB();
export default fragmentDB;

