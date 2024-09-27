// copyAssets.js
import fs from 'fs-extra';

async function copyAssets() {
  await fs.copy('./src/assets/*', './dist/');
}

export default copyAssets;