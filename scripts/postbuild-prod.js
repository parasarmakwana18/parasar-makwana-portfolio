const fs = require('fs');
const path = require('path');

function copyIfExists(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return;
  fs.copyFileSync(srcPath, destPath);
}

function main() {
  const repoRoot = path.join(__dirname, '..');
  const distDir = path.join(repoRoot, 'dist', 'parasar-makwana-portfolio', 'browser');

  if (!fs.existsSync(distDir)) {
    // Nothing to do if build output doesn't exist yet.
    return;
  }

  // GitHub Pages serves 404.html for unknown routes. Copy index.html so deep links
  // (e.g. /en) still boot the Angular SPA instead of showing a 404 page.
  copyIfExists(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));

  copyIfExists(path.join(repoRoot, '.nojekyll'), path.join(distDir, '.nojekyll'));
  copyIfExists(path.join(repoRoot, 'CNAME'), path.join(distDir, 'CNAME'));
}

main();

