const fs = require('fs');
const path = require('path');

function copyIfExists(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return;
  fs.copyFileSync(srcPath, destPath);
}

function replaceInFileIfExists(filePath, searchValue, replaceValue) {
  if (!fs.existsSync(filePath)) return false;
  const contents = fs.readFileSync(filePath, 'utf8');
  if (!contents.includes(searchValue)) return false;
  fs.writeFileSync(filePath, contents.replace(searchValue, replaceValue), 'utf8');
  return true;
}

function main() {
  const repoRoot = path.join(__dirname, '..');
  const distDir = path.join(repoRoot, 'dist', 'parasar-makwana-portfolio', 'browser');

  if (!fs.existsSync(distDir)) {
    // Nothing to do if build output doesn't exist yet.
    return;
  }

  // Ensure the <base href> matches the GitHub Pages subpath, otherwise the app
  // will try to load JS/CSS from the domain root and you'll get a blank screen.
  const indexHtmlPath = path.join(distDir, 'index.html');
  replaceInFileIfExists(
    indexHtmlPath,
    '<base href="/">',
    '<base href="/parasar-makwana-portfolio/">'
  );

  // GitHub Pages serves 404.html for unknown routes. Copy index.html so deep links
  // (e.g. /en) still boot the Angular SPA instead of showing a 404 page.
  copyIfExists(indexHtmlPath, path.join(distDir, '404.html'));

  copyIfExists(path.join(repoRoot, '.nojekyll'), path.join(distDir, '.nojekyll'));
  copyIfExists(path.join(repoRoot, 'CNAME'), path.join(distDir, 'CNAME'));
}

main();

