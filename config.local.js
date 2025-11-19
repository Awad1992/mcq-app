// config.local.js
// Local overrides for MCQ Ultra Pro app.
//
// IMPORTANT SECURITY NOTE:
// - If this project lives on GitHub (especially in a public repo), you should NOT
//   commit a real GitHub Personal Access Token into this file.
// - GitHub will detect and revoke exposed tokens, and anyone who sees the repo
//   could use that token.
// - For GitHub Pages / online use, keep GITHUB_TOKEN as an empty string here
//   and enter your token ONLY inside the app Settings tab (stored in localStorage
//   on your browser, not in the repository).
//
// This file is mainly for fully local/offline use (for example, a copy of the app
// on your own computer that you do NOT push back to GitHub).
//
// Example for a purely local copy (do NOT commit this to GitHub!):
//   window.MCQ_LOCAL_CONFIG = { GITHUB_TOKEN: 'ghp_xxxxxxxxx' };

window.MCQ_LOCAL_CONFIG = window.MCQ_LOCAL_CONFIG || {
  GITHUB_TOKEN: ''
};
