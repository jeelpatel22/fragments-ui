import { login, logout, handleCallback, isAuthenticated } from './auth';
import { listFragments, createFragment, deleteFragment, updateFragment, getFragmentData, getFragmentInfo } from './api';
import fragmentDB from './db.js';
import { registerServiceWorker, setupInstallPrompt } from './sw-register.js';



// PWA and offline support
let isOnline = navigator.onLine;
let offlineActions = [];
let syncInProgress = false;

const conversionTargets = {
  'text/plain': ['text/plain'], // Only allow same format - no conversions
  'text/markdown': ['text/markdown', 'text/html', 'text/plain'],
  'text/html': ['text/html', 'text/plain'], // No conversion to markdown
  'text/csv': ['text/csv', 'text/plain', 'application/json'],
  'application/json': ['application/json', 'application/yaml', 'text/plain'],
  'application/yaml': ['application/yaml', 'text/plain'],
  'image/png': ['image/png', 'image/jpeg', 'image/webp', 'image/avif'], // No gif conversion
  'image/jpeg': ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
  'image/webp': ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
  'image/gif': ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
  'image/avif': ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
};

function getExtensionForType(type) {
  const parts = type.split('/');
  if (parts[0] === 'image') return parts[1];
  if (parts[0] === 'text' && parts[1] === 'plain') return 'txt';
  if (parts[0] === 'text' && parts[1] === 'markdown') return 'md';
  if (parts[0] === 'text' && parts[1] === 'html') return 'html';
  if (parts[0] === 'text' && parts[1] === 'csv') return 'csv';
  if (parts[0] === 'application' && parts[1] === 'json') return 'json';
  if (parts[0] === 'application' && parts[1] === 'yaml') return 'yaml';
  return '';
}

// Enhanced conversion mapping that matches backend exactly
function getConversionExtension(sourceType, targetType) {
  // Handle image conversions
  if (sourceType.startsWith('image/')) {
    if (targetType === 'image/png') return 'png';
    if (targetType === 'image/jpeg') return 'jpg';
    if (targetType === 'image/webp') return 'webp';
    if (targetType === 'image/avif') return 'avif';
    return '';
  }
  
  // Handle text conversions - only allow supported conversions
  if (sourceType.startsWith('text/')) {
    if (targetType === 'text/plain') return 'txt';
    if (targetType === 'text/markdown') return 'md';
    if (targetType === 'text/html') return 'html';
    if (targetType === 'text/csv') return 'csv';
    if (targetType === 'application/json') return 'json';
    if (targetType === 'application/yaml') return 'yaml';
    return '';
  }
  
  // Handle application conversions - only allow supported conversions
  if (sourceType.startsWith('application/')) {
    if (targetType === 'application/json') return 'json';
    if (targetType === 'application/yaml') return 'yaml';
    if (targetType === 'text/plain') return 'txt';
    // Remove unsupported conversions
    return '';
  }
  
  return '';
}

// PWA Offline Support Functions
function updateOfflineStatus() {
  const offlineIndicator = document.getElementById('offline-indicator');
  const onlineStatus = document.getElementById('online-status');
  const offlineStatus = document.getElementById('offline-status');
  const offlineWarning = document.getElementById('offline-warning');
  
  if (isOnline) {
    document.body.classList.remove('offline');
    if (offlineIndicator) offlineIndicator.classList.add('hidden');
    if (offlineWarning) offlineWarning.classList.add('hidden');
    if (onlineStatus) onlineStatus.classList.remove('hidden');
    if (offlineStatus) offlineStatus.classList.add('hidden');
  } else {
    document.body.classList.add('offline');
    if (offlineIndicator) offlineIndicator.classList.remove('hidden');
    if (offlineWarning) offlineWarning.classList.remove('hidden');
    if (onlineStatus) onlineStatus.classList.add('hidden');
    if (offlineStatus) offlineStatus.classList.remove('hidden');
  }
}

async function addOfflineAction(action) {
  try {
    console.log('🔄 Adding offline action:', action);
    await fragmentDB.addOfflineAction(action);
    offlineActions.push(action);
    console.log('✅ Action queued for offline sync:', action);
    
    // Debug: check if action was actually stored
    const storedActions = await fragmentDB.getOfflineActions();
    console.log('📋 Current offline actions after adding:', storedActions);
  } catch (error) {
    console.error('❌ Failed to queue offline action:', error);
  }
}

async function syncOfflineActions() {
  if (syncInProgress) {
    console.log('Sync already in progress, skipping...');
    return;
  }
  
  // Check if we have offline actions first
  const actions = await fragmentDB.getOfflineActions();
  console.log('🔍 Found offline actions:', actions);
  
  if (actions.length === 0) {
    console.log('No offline actions to sync');
    return;
  }
  
  console.log(`🚀 Starting offline sync for ${actions.length} actions...`);
  console.log('📡 Current online status:', isOnline);
  syncInProgress = true;
  
  try {
    for (const action of actions) {
      try {
        console.log(`Processing action: ${action.type}`, action);
        let actionSuccessful = false;
        
        switch (action.type) {
          case 'CREATE':
            await createFragment(action.data.content, action.data.type);
            actionSuccessful = true;
            break;
          case 'UPDATE':
            await updateFragment(action.data.id, action.data.content, action.data.type);
            actionSuccessful = true;
            break;
          case 'DELETE':
            try {
              await deleteFragment(action.data.id);
              actionSuccessful = true;
            } catch (deleteError) {
              // Special handling for DELETE actions that get 404
              if (deleteError.status === 404 || (deleteError.message && deleteError.message.includes('404'))) {
                console.log(`✅ Fragment already deleted (404) - marking DELETE action as successful`);
                actionSuccessful = true; // Fragment is already gone, so DELETE action succeeded
              } else {
                throw deleteError; // Re-throw other errors
              }
            }
            break;
        }
        
        if (actionSuccessful) {
          await fragmentDB.removeOfflineAction(action.id);
          console.log(`✅ Successfully synced action: ${action.type}`);
        }
      } catch (error) {
        console.error(`❌ Failed to sync action: ${action.type}`, action, error);
        
        // Check if this is a retryable error
        const isRetryable = !(error.status === 404) && !error.message?.includes('404') && !error.message?.includes('Not Found');
        
        if (isRetryable && action.retryCount < 3) {
          action.retryCount = (action.retryCount || 0) + 1;
          console.log(`Retrying action ${action.type} (attempt ${action.retryCount})`);
          
          // Remove the old action first to avoid IndexedDB constraint errors
          try {
            await fragmentDB.removeOfflineAction(action.id);
            await fragmentDB.addOfflineAction(action);
          } catch (dbError) {
            console.error(`Failed to update retry count for action ${action.type}:`, dbError);
            // If we can't update the retry count, just remove the action
            await fragmentDB.removeOfflineAction(action.id);
          }
        } else {
          console.log(`Action ${action.type} failed - removing from queue (not retryable or max retries reached)`);
          await fragmentDB.removeOfflineAction(action.id);
        }
      }
    }
    
    console.log('🎉 Offline sync completed');
  } catch (error) {
    console.error('💥 Offline sync failed:', error);
  } finally {
    syncInProgress = false;
  }
}

async function renderFragments() {
  console.log('Available conversion targets:', conversionTargets);
  
  const fragmentsList = document.getElementById('fragments-list');
  fragmentsList.innerHTML = '';
  
  try {
    let fragments = [];
    
    if (isOnline) {
      // Try to get fragments from API
      try {
        const response = await listFragments(true);
        fragments = response.data?.fragments || response.fragments || [];
        
        // Cache fragments locally
        for (const fragment of fragments) {
          await fragmentDB.saveFragment(fragment);
        }
      } catch (error) {
        console.log('API failed, using cached fragments');
        fragments = await fragmentDB.getAllFragments();
      }
    } else {
      // Offline mode - use cached fragments
      fragments = await fragmentDB.getAllFragments();
    }

    if (fragments.length === 0) {
      fragmentsList.innerHTML = '<li>No fragments found.</li>';
      return;
    }

    // Store fragments globally for access in event handlers
    window.currentFragments = fragments;

    fragments.forEach(fragment => {
      const li = document.createElement('li');
      // Parse the fragment type correctly, handling both full type and mimeType
      let type = fragment.type;
      if (type && type.includes(';')) {
        // Handle types like "text/plain; charset=utf-8"
        type = type.split(';')[0].trim();
      }
      
      const targets = conversionTargets[type] || [];
      console.log('Fragment type:', fragment.type, 'Parsed type:', type, 'Available targets:', targets);
      
      // Generate dropdown options manually to ensure they're created
      let dropdownOptions = '';
      if (targets && targets.length > 0) {
        targets.forEach(target => {
          dropdownOptions += `<option value="${target}">${target}</option>`;
        });
        console.log('Generated dropdown options:', dropdownOptions);
      } else {
        console.warn('No targets found for type:', type);
        dropdownOptions = `<option value="${type}">${type}</option>`;
      }
      
      li.innerHTML = `
        <div class="fragment-header">
          <div class="fragment-info">
            <div class="fragment-id">${fragment.id}</div>
            <div class="fragment-type">${fragment.type}</div>
            <div class="fragment-meta">
              <span>📏 ${fragment.size} bytes</span>
              <span>📅 Created: ${new Date(fragment.created).toLocaleString()}</span>
              <span>🔄 Updated: ${new Date(fragment.updated).toLocaleString()}</span>
            </div>
          </div>
          <div class="fragment-actions">
            <button class="btn btn-danger delete-btn" data-id="${fragment.id}">🗑️ Delete</button>
            <button class="btn btn-warning edit-btn" data-id="${fragment.id}" data-type="${fragment.type}">✏️ Edit</button>
          </div>
        </div>
        <div class="fragment-conversion">
          <span>🔄 Convert to:</span>
          <select class="conversion-select" data-id="${fragment.id}">
            ${dropdownOptions}
          </select>
          <button class="btn btn-success view-convert-btn" data-id="${fragment.id}">👁️ View Converted</button>
        </div>
      `;
      
      // Add manual sync button if there are offline actions
      if (window.offlineActions && window.offlineActions.length > 0) {
        const syncButton = document.createElement('button');
        syncButton.textContent = `🔄 Sync ${window.offlineActions.length} Offline Actions`;
        syncButton.className = 'btn btn-warning';
        syncButton.style.marginTop = '10px';
        syncButton.onclick = () => {
          console.log('Manual sync triggered');
          syncOfflineActions();
        };
        li.appendChild(syncButton);
      }
      
      console.log('Final HTML for fragment:', fragment.id, ':', li.innerHTML);
      fragmentsList.appendChild(li);
    });

    // Delete
    fragmentsList.querySelectorAll('.delete-btn').forEach(button => {
      button.onclick = async (e) => {
        const id = e.target.dataset.id;
        try {
          if (isOnline) {
            console.log('🌐 Online mode - deleting fragment directly');
            await deleteFragment(id);
          } else {
            console.log('📱 Offline mode - queuing delete action');
            // Offline mode - queue for sync
            await addOfflineAction({
              type: 'DELETE',
              data: { id }
            });
            alert('Delete queued for sync when online!');
          }
          
          // Remove from local cache
          await fragmentDB.deleteFragment(id);
          await renderFragments();
        } catch (err) {
          alert(`Delete failed: ${err.message}`);
          console.error(err);
        }
      };
    });

    // Edit
    fragmentsList.querySelectorAll('.edit-btn').forEach(button => {
      button.onclick = async (e) => {
        const id = e.target.dataset.id;
        const currentType = e.target.dataset.type;
        try {
          let current;
          
          if (isOnline) {
            const resp = await getFragmentData(id);
            current = await resp.text();
          } else {
            // Offline mode - get from cache
            const fragment = await fragmentDB.getFragment(id);
            current = fragment?._data || 'Content not available offline';
          }
          
          const newContent = prompt(`Edit content for ${id}`, current);
          if (newContent === null) return;
          const newType = prompt('Update type (leave as current if unsure):', currentType) || currentType;
          
          if (isOnline) {
            await updateFragment(id, newContent, newType);
          } else {
            // Offline mode - queue for sync
            await addOfflineAction({
              type: 'UPDATE',
              data: { id, content: newContent, type: newType }
            });
            alert('Update queued for sync when online!');
          }
          
          await renderFragments();
        } catch (err) {
          alert(`Update failed: ${err.message}`);
          console.error(err);
        }
      };
    });

    // Convert/View
    fragmentsList.querySelectorAll('.view-convert-btn').forEach(button => {
      button.onclick = async (e) => {
        const id = e.target.dataset.id;
        const select = e.target.previousElementSibling; // the select
        const targetType = select.value;
        
        // Find the fragment to get its source type
        const fragment = window.currentFragments.find(f => f.id === id);
        if (!fragment) {
          alert('Fragment not found');
          return;
        }
        
        const sourceType = fragment.type.split(';')[0]; // Remove charset if present
        const ext = getConversionExtension(sourceType, targetType);
        
        if (!ext) {
          alert(`Unsupported conversion from ${sourceType} to ${targetType}`);
          return;
        }

        try {
          console.log(`Converting fragment ${id} from ${sourceType} to ${targetType} using extension .${ext}`);
          const response = await getFragmentData(id, ext);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Conversion failed:', response.status, errorText);
            throw new Error(`Conversion failed: ${response.status} - ${errorText}`);
          }
          
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          
          // For text-based conversions, show in new window
          if (targetType.startsWith('text/') || targetType === 'application/json' || targetType === 'application/yaml' || targetType === 'text/csv') {
            const text = await blob.text();
            
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
              <html>
                <head><title>Converted Fragment</title></head>
                <body>
                  <h2>Converted Fragment: ${id}</h2>
                  <p><strong>From:</strong> ${sourceType}</p>
                  <p><strong>To:</strong> ${targetType}</p>
                  <hr>
                  <pre style="white-space: pre-wrap; word-wrap: break-word;">${text}</pre>
                </body>
              </html>
            `);
            newWindow.document.close();
          } else {
            // For images, open directly
            window.open(url, '_blank');
          }
          
          URL.revokeObjectURL(url);
        } catch (err) {
          console.error('Conversion error:', err);
          alert(`Conversion error: ${err.message}`);
        }
      };
    });

  } catch (err) {
    console.error('Failed to load fragments:', err);
    fragmentsList.innerHTML = `<li>Error loading fragments: ${err.message}</li>`;
  }
}

(async function init() {
  // Initialize PWA features
  registerServiceWorker();
  setupInstallPrompt();
  
  // Initialize IndexedDB
  try {
    await fragmentDB.init();
    console.log('IndexedDB initialized successfully');
  } catch (error) {
    console.error('Failed to initialize IndexedDB:', error);
  }
  
  // Set up online/offline event listeners
  window.addEventListener('online', () => {
    console.log('Browser went online - triggering sync');
    isOnline = true;
    updateOfflineStatus();
    // Force sync of offline actions
    setTimeout(() => {
      syncOfflineActions();
    }, 1000); // Small delay to ensure network is ready
  });
  
  window.addEventListener('offline', () => {
    console.log('Browser went offline');
    isOnline = false;
    updateOfflineStatus();
  });
  
  // Initial offline status
  updateOfflineStatus();
  
  // Also listen for visibility changes (when user comes back to tab)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isOnline) {
      console.log('Tab became visible - checking for offline actions');
      syncOfflineActions();
    }
  });
  
  // Add periodic online check for Firefox compatibility
  setInterval(async () => {
    try {
      // Try to make a simple network request to detect online status
      const response = await fetch('/favicon.ico', { method: 'HEAD', cache: 'no-cache' });
      if (response.ok && !isOnline) {
        console.log('Network check detected online status - triggering sync');
        isOnline = true;
        updateOfflineStatus();
        syncOfflineActions();
      }
    } catch (error) {
      // Network request failed, we're offline
      if (isOnline) {
        console.log('Network check detected offline status');
        isOnline = false;
        updateOfflineStatus();
      }
    }
  }, 5000); // Check every 5 seconds
  
  const url = new URL(window.location.href);

  // Handle Hosted UI errors returned as query params
  const oauthError = url.searchParams.get('error');
  const oauthErrorDesc = url.searchParams.get('error_description');
  if (oauthError) {
    alert(`Sign-in error: ${decodeURIComponent(oauthErrorDesc || oauthError)}`);
    history.replaceState({}, '', '/');
  }

  // Handle Cognito callback on any path if code param exists
  if (url.searchParams.get('code')) {
    const success = await handleCallback();
    if (success) {
      console.log('Cognito login successful!');
      // Clear the URL parameters and update the UI
      history.replaceState({}, '', '/');
      // Update the authentication UI to show signed-in state
      updateAuthUI();
      return;
    } else {
      console.error('Cognito login failed or cancelled.');
      alert('Login failed or cancelled.');
      history.replaceState({}, '', '/');
      return;
    }
  }

  // Wire up authentication UI
  const signInBtn = document.getElementById('signin');
  const userStatus = document.getElementById('user-status');
  const signOutBtn = document.getElementById('signout');
  const loadFragmentsBtn = document.getElementById('load-fragments-btn');
  
  function updateAuthUI() {
    if (isAuthenticated()) {
      // User is signed in
      if (signInBtn) signInBtn.classList.add('hidden');
      if (userStatus) userStatus.classList.remove('hidden');
    } else {
      // User is not signed in
      if (signInBtn) signInBtn.classList.remove('hidden');
      if (userStatus) userStatus.classList.add('hidden');
    }
  }
  
  if (signInBtn) {
    signInBtn.onclick = login;
  }
  
  if (signOutBtn) {
    signOutBtn.onclick = () => {
      logout();
      updateAuthUI();
    };
  }
  
  if (loadFragmentsBtn) {
    loadFragmentsBtn.onclick = () => {
      renderFragments();
    };
  }
  
  // Initialize auth UI
  updateAuthUI();
  
  // Periodically check authentication status to keep UI in sync
  setInterval(() => {
    updateAuthUI();
  }, 2000); // Check every 2 seconds


  const typeSelect = document.getElementById('type');
  const textArea = document.getElementById('content');
  const imageDiv = document.getElementById('image-input');
  const imageFile = document.getElementById('image-file');

  // toggle inputs based on selected type
  if (typeSelect) {
    const toggleInputs = () => {
      const t = typeSelect.value;
      if (t.startsWith('image/')) {
        textArea.style.display = 'none';
        imageDiv.style.display = 'block';
      } else {
        textArea.style.display = 'block';
        imageDiv.style.display = 'none';
        
        // Simple placeholder based on type
        let placeholder = '';
        switch (t) {
          case 'text/plain':
            placeholder = 'Enter plain text content...';
            break;
          case 'text/markdown':
            placeholder = 'Enter markdown content...';
            break;
          case 'text/html':
            placeholder = 'Enter HTML content...';
            break;
          case 'text/csv':
            placeholder = 'Enter CSV content (comma-separated values)...';
            break;
          case 'application/json':
            placeholder = 'Enter JSON content...';
            break;
          case 'application/yaml':
            placeholder = 'Enter YAML content...';
            break;
          default:
            placeholder = 'Enter content...';
        }
        
        // Update textarea placeholder only
        if (textArea) {
          textArea.placeholder = placeholder;
          textArea.value = ''; // Clear any existing content
        }
      }
    };
    typeSelect.addEventListener('change', toggleInputs);
    toggleInputs(); // Initialize with current selection
  }

  // Add manual sync button
  const syncBtn = document.createElement('button');
  syncBtn.textContent = '🔄 Manual Sync Offline Actions';
  syncBtn.className = 'btn btn-warning';
  syncBtn.style.margin = '10px';
  syncBtn.onclick = async () => {
    console.log('Manual sync button clicked');
    const actions = await fragmentDB.getOfflineActions();
    console.log('Found offline actions:', actions);
    if (actions.length > 0) {
      await syncOfflineActions();
    } else {
      alert('No offline actions to sync');
    }
  };
  
  // Add clear offline actions button
  const clearBtn = document.createElement('button');
  clearBtn.textContent = '🗑️ Clear All Offline Actions';
  clearBtn.className = 'btn btn-danger';
  clearBtn.style.margin = '10px';
  clearBtn.onclick = async () => {
    console.log('Clear offline actions button clicked');
    const actions = await fragmentDB.getOfflineActions();
    console.log('Current offline actions before clear:', actions);
    
    // Clear all offline actions
    for (const action of actions) {
      await fragmentDB.removeOfflineAction(action.id);
    }
    
    console.log('All offline actions cleared');
    alert(`Cleared ${actions.length} offline actions`);
  };
  
  // Insert sync button before load button
  const loadBtn = document.getElementById('load-fragments');
  if (loadBtn) {
    loadBtn.parentNode.insertBefore(syncBtn, loadBtn);
    loadBtn.parentNode.insertBefore(clearBtn, syncBtn);
    loadBtn.onclick = async () => {
      if (!isAuthenticated()) {
        if (isLocalDevelopment()) {
          // For local development, just load fragments directly
          await renderFragments();
        } else {
          alert('Please sign in first.');
        }
        return;
      }
      await renderFragments();
    };
  }

  const createForm = document.getElementById('create-form');
  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!isAuthenticated()) {
        if (isLocalDevelopment()) {
          // For local development, allow creation without login
        } else {
          alert('Please sign in first.');
          return;
        }
      }
      const type = typeSelect?.value || 'text/plain';

      try {
        if (type.startsWith('image/')) {
          if (!imageFile.files || imageFile.files.length === 0) {
            alert('Please choose an image file.');
            return;
          }
          const buf = await imageFile.files[0].arrayBuffer();
          
          if (isOnline) {
            await createFragment(buf, type);
          } else {
            // Offline mode - queue for sync
            await addOfflineAction({
              type: 'CREATE',
              data: { content: buf, type }
            });
            alert('Fragment queued for sync when online!');
          }
          
          imageFile.value = '';
        } else {
          const content = (textArea?.value || '').trim();
          if (!content) {
            alert('Please enter some content.');
            return;
          }
          
          if (isOnline) {
            await createFragment(content, type);
          } else {
            // Offline mode - queue for sync
            await addOfflineAction({
              type: 'CREATE',
              data: { content, type }
            });
            alert('Fragment queued for sync when online!');
          }
          
          textArea.value = '';
        }
        
        if (isOnline) {
          alert('Fragment created!');
        }
        await renderFragments();
      } catch (err) {
        console.error('Failed to create fragment:', err);
        alert(`Error creating fragment: ${err.message}`);
      }
    });
  }
})();
