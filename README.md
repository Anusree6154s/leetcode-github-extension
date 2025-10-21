<img width="100" height="100" align="left" alt="Untitled design" src="https://github.com/user-attachments/assets/f769ce8f-34fb-43b5-9ec0-cbd8a046e042" />

# LeetCode to Github Browser Extension

<br>
<img width="200" height="250" alt="image" align="right" src="https://github.com/user-attachments/assets/5c35743c-f80b-4248-a94d-fec357f53af3" />


A minimal browser extension that helps push code from LeetCode to GitHub. This repository contains the manifest and popup assets to run the extension in Chromium-based browsers (Chrome, Edge) 


### Features

- Popup UI with HTML/JS (popup.html, popup.js)
- Extension icon (icon.png)
- Manifest v3 configuration (manifest.json)


## Project Structure

```
.
├─ manifest.json     # Extension manifest (v3)
├─ popup.html        # Popup UI
├─ popup.js          # Popup logic
└─  icon.png          # Toolbar icon
```

## Installation (Chrome / Edge)

1. Clone or download this repository: 
   ```bash
   git clone https://github.com/Anusree6154s/leetcode-github-extension
   cd leetcode-github-extension
   ```
3. Open the browser and navigate to:
   - Chrome: chrome://extensions/
   - Edge: edge://extensions/
4. Enable "Developer mode" (toggle in the top-right).
5. Click "Load unpacked" and select the project directory.
6. The extension will appear in your toolbar. Pin it if needed and click the icon to open the popup.


## Development

- Edit popup.html and popup.js to update the popup UI and behavior.
- Update manifest.json to declare permissions, icons, and background/service worker behavior as needed for advanced features (e.g., content scripts, host permissions, storage, commands).
- After changes, reload the extension from the extensions page (Reload/Refresh button) and reopen the popup.


## Troubleshooting

- Extension not loading: Check for JSON syntax errors in manifest.json.
- Popup not opening: Ensure popup.html is referenced in manifest.json under `action.default_popup`.
- Icons not showing: Verify icon paths in manifest.json and that files exist.
- MV3 API errors: Confirm you are using supported APIs in your target browser version.

