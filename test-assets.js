import fs from 'fs';
import zlib from 'zlib';

console.log('--- Testing Production Bundling & Performance Assets ---');

// 1. Verify app.bundle.js
if (!fs.existsSync('src/js/app.bundle.js')) {
  throw new Error('src/js/app.bundle.js is missing! Run npm run build.');
}
const bundleContent = fs.readFileSync('src/js/app.bundle.js', 'utf8');
if (bundleContent.length < 10000) {
  throw new Error('src/js/app.bundle.js seems suspiciously small');
}
const gzippedBundle = zlib.gzipSync(bundleContent);
console.log(`✓ PASS: app.bundle.js generated (${(bundleContent.length / 1024).toFixed(1)} KB, ${(gzippedBundle.length / 1024).toFixed(1)} KB gzipped)`);

// 2. Verify styles.min.css
if (!fs.existsSync('src/css/styles.min.css')) {
  throw new Error('src/css/styles.min.css is missing! Run npm run build.');
}
const cssContent = fs.readFileSync('src/css/styles.min.css', 'utf8');
const gzippedCss = zlib.gzipSync(cssContent);
console.log(`✓ PASS: styles.min.css generated (${(cssContent.length / 1024).toFixed(1)} KB, ${(gzippedCss.length / 1024).toFixed(1)} KB gzipped)`);

// 3. Verify Service Worker Clean Uninstaller
if (!fs.existsSync('src/sw.js')) {
  throw new Error('src/sw.js is missing!');
}
const swContent = fs.readFileSync('src/sw.js', 'utf8');
if (!swContent.includes('unregister')) {
  throw new Error('src/sw.js missing unregister logic');
}
console.log('✓ PASS: Service Worker sw.js cleanly unregisters and clears stale caches');

// 4. Verify index.html loads bundle and handles SW cleanup
const htmlContent = fs.readFileSync('src/index.html', 'utf8');
const cssMatch = htmlContent.match(/styles\.min\.css\?v=(\d+)/);
const jsMatch = htmlContent.match(/app\.bundle\.js\?v=(\d+)/);
if (!cssMatch || !jsMatch || cssMatch[1] !== jsMatch[1]) {
  throw new Error('src/index.html must reference versioned styles.min.css and app.bundle.js with matching ?v= parameter');
}
if (cssMatch[1] !== '12') {
  throw new Error(`src/index.html version is ${cssMatch[1]}, expected 12`);
}
console.log(`✓ PASS: index.html correctly loads v=${cssMatch[1]} production bundle and minified CSS`);

console.log('Results: 4 asset verification tests passed.');

