chrome.storage.local.get(["repo", "folder", "token", "serialNo"], (data) => {
  const { repo, folder, token, serialNo } = data;
  const extraInfoEl = document.getElementById("extra-info");
  if (!repo) {
    extraInfoEl.textContent = "Stored repo is missing";
  }
  if (!folder) {
    extraInfoEl.textContent = "Stored folder is missing";
  }
  if (!token) {
    extraInfoEl.textContent = "Stored token is missing";
  }
  if (!serialNo) {
    extraInfoEl.textContent = "Stored serialNo is missing";
  }
  if (repo && folder && token && serialNo) {
    document.getElementById("settings").style.display = "none";
    extraInfoEl.textContent =
      "Credentials already added. Save again to add different credentials.";
    document.getElementById("show-settings").style.display = "block";
  }
});

document.getElementById("show-settings").addEventListener("click", () => {
  document.getElementById("settings").style.display = "block";
  document.getElementById("show-settings").style.display = "none";
});

// Save GitHub settings
document.getElementById("save").addEventListener("click", async () => {
  const repoInput = document.getElementById("repo").value;
  const folderInput = document.getElementById("folder").value;
  const tokenInput = document.getElementById("token").value;

  // Get existing values from storage
  chrome.storage.local.get(["repo", "folder", "token", "serialNo"], async (data) => {
    const updatedData = { ...data };

    if (repoInput) updatedData.repo = repoInput;
    if (folderInput) updatedData.folder = folderInput;
    if (tokenInput) updatedData.token = tokenInput;

    // Only fetch serialNo from GitHub if repo, folder, and token are available
    if (updatedData.repo && updatedData.folder && updatedData.token) {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${updatedData.repo}/contents/${updatedData.folder}`,
          { headers: { Authorization: `token ${updatedData.token}` } }
        );
        const items = await res.json();
        updatedData.serialNo = Array.isArray(items) && items.length ? items.length + 1 : 1;
      } catch (e) {
        updatedData.serialNo = 1;
      }
    }

    // Save back to storage
    chrome.storage.local.set(updatedData, () => {
      alert("Settings saved!");
    });
  });
});

document.getElementById("push").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Run script in LeetCode tab to get problem info + code
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const viewLines = document.querySelectorAll(".view-lines .view-line");
        if (!viewLines.length) return null;

        const code = Array.from(viewLines)
          .map((lineDiv) => lineDiv.textContent)
          .join("\n"); // join lines with newline

        // --- Extract problem title & number ---
        const titleEl = document.querySelector("div.text-title-large, h1");
        const titleText = titleEl ? titleEl.textContent.trim() : document.title;

        // Try to extract number + name (like "1. Two Sum")
        const match = titleText.match(/^(\d+)\.\s*(.+)$/);
        let problemNumber = match ? match[1].padStart(3, "0") : "000";
        let problemTitle = match ? match[2] : titleText;

        // Format title nicely for filenames
        problemTitle = problemTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        return { code, problemNumber, problemTitle };
      },
    },
    async (results) => {
      const res = results?.[0]?.result;
      if (!res?.code) return alert("Could not fetch code.");

      const { code, problemNumber, problemTitle } = res;

      const header = `// ${problemNumber}. ${problemTitle}`;
      const codeWithHeader = header + "\n\n" + code;

      chrome.storage.local.get(
        ["repo", "folder", "token", "serialNo"],
        async (data) => {
          const { repo, folder, token, serialNo } = data;
          if (!repo || !token) return alert("Set your settings first!");

          const folderPath = folder || "leetcode";
          const apiUrl = `https://api.github.com/repos/${repo}/contents/${folderPath}`;

          // Build file path
          const path = `${folder || "leetcode"}/${String(serialNo).padStart(
            3,
            "0"
          )}-${problemNumber}-${problemTitle}.js`;

          // Upload to GitHub
          const apiUrlUpload = `https://api.github.com/repos/${repo}/contents/${path}`;
          fetch(apiUrlUpload, {
            method: "PUT",
            headers: {
              Authorization: `token ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Add LeetCode solution: ${problemTitle}`,
              content: btoa(unescape(encodeURIComponent(codeWithHeader))),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.content) {
                alert(`✅ Code pushed!\nFile: ${path}`);
                chrome.storage.local.set({ serialNo: serialNo + 1 });
              } else {
                alert(`❌ Failed: ${JSON.stringify(data)}`);
              }
            })
            .catch((err) => alert("Error: " + err.message));
        }
      );
    }
  );
});
