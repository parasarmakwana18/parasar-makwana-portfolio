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

  copyIfExists(path.join(repoRoot, '.nojekyll'), path.join(distDir, '.nojekyll'));
  copyIfExists(path.join(repoRoot, 'CNAME'), path.join(distDir, 'CNAME'));
}

main();

