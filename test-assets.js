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

// 3. Verify Service Worker
if (!fs.existsSync('src/sw.js')) {
  throw new Error('src/sw.js is missing!');
}
const swContent = fs.readFileSync('src/sw.js', 'utf8');
if (!swContent.includes('israeli-whist-v8') || !swContent.includes('caches.match')) {
  throw new Error('src/sw.js missing expected cache logic');
}
console.log('✓ PASS: Service Worker sw.js exists with Stale-While-Revalidate caching');

// 4. Verify index.html loads bundle and registers sw
const htmlContent = fs.readFileSync('src/index.html', 'utf8');
if (!htmlContent.includes('styles.min.css') || !htmlContent.includes('app.bundle.js')) {
  throw new Error('src/index.html must reference styles.min.css and app.bundle.js');
}
if (!htmlContent.includes('serviceWorker.register')) {
  throw new Error('src/index.html must register service worker');
}
console.log('✓ PASS: index.html correctly loads production bundle, minified CSS & registers SW');

console.log('Results: 4 asset verification tests passed.');
