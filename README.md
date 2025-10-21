# LeetCode Helper Browser Extension

A minimal browser extension that enhances the LeetCode experience with a popup UI. This repository contains the manifest and popup assets to run the extension in Chromium-based browsers (Chrome, Edge) and Firefox (with minor changes if needed).

## Features

- Popup UI with HTML/JS (popup.html, popup.js)
- Extension icon (icon.png)
- Manifest v3 configuration (manifest.json)


## Project Structure

```
.
├─ manifest.json     # Extension manifest (v3)
├─ popup.html        # Popup UI
├─ popup.js          # Popup logic
├─ icon.png          # Toolbar icon
└─ .gitignore
```

## Installation (Chrome / Edge)

1. Clone or download this repository.
2. Open the browser and navigate to:
   - Chrome: chrome://extensions/
   - Edge: edge://extensions/
3. Enable "Developer mode" (toggle in the top-right).
4. Click "Load unpacked" and select the project directory.
5. The extension will appear in your toolbar. Pin it if needed and click the icon to open the popup.

## Installation (Firefox)

Firefox uses Manifest V3 with ongoing changes. If your manifest.json is compatible:

1. Go to about:debugging#/runtime/this-firefox
2. Click "Load Temporary Add-on" and select manifest.json (or any file in the directory).
3. If errors appear, review Firefox MV3 compatibility docs and update the manifest accordingly.

## Development

- Edit popup.html and popup.js to update the popup UI and behavior.
- Update manifest.json to declare permissions, icons, and background/service worker behavior as needed for advanced features (e.g., content scripts, host permissions, storage, commands).
- After changes, reload the extension from the extensions page (Reload/Refresh button) and reopen the popup.

### Common Enhancements

- Add content scripts for interacting with LeetCode problem pages.
- Use chrome.storage to persist user preferences.
- Add commands (keyboard shortcuts) in the manifest.
- Use a service worker for background tasks (Manifest V3).

## Permissions

This scaffold does not request special permissions. If you add features that require permissions (e.g., activeTab, storage, scripting), add them to manifest.json under the appropriate fields:

- permissions
- host_permissions
- optional_permissions

Only request what you need to minimize review friction and improve user trust.

## Troubleshooting

- Extension not loading: Check for JSON syntax errors in manifest.json.
- Popup not opening: Ensure popup.html is referenced in manifest.json under `action.default_popup`.
- Icons not showing: Verify icon paths in manifest.json and that files exist.
- MV3 API errors: Confirm you are using supported APIs in your target browser version.

