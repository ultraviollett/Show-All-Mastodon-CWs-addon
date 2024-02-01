/*
Default settings. Initialize storage to these values.
*/
let settings = {
    isShownAll: false,
    isEnabled: true
}
  

// Load existent stats with the storage API.

function onError(e) { console.error(e); }
  
  /*
  On startup, check whether we have stored settings.
  If we don't, then store the default settings.
  */
  function checkStoredSettings(storedSettings) {
    if (!storedSettings.settings) {
      browser.storage.local.set({settings});
    }
  }
  
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(checkStoredSettings, onError);
