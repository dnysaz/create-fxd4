#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Mengambil nama folder dari argumen terminal (default: my-fxd4-app)
const projectName = process.argv[2] || 'my-fxd4-app';
const projectPath = path.join(process.cwd(), projectName);

console.log(`\x1b[35m%s\x1b[0m`, `\n Initializing fxd4.js project...`);
console.log(`\x1b[34m%s\x1b[0m`, `Creating directory: ${projectName}`);

// Cek jika folder sudah ada
if (fs.existsSync(projectPath)) {
    console.error(`\x1b[31m%s\x1b[0m`, `❌ Error: Directory ${projectName} already exists.`);
    process.exit(1);
}

fs.mkdirSync(projectPath);

// Repo starter fxd4-app milik dnysaz
const STARTER_REPO = "https://github.com/dnysaz/fxd4-app.git";

try {
    console.log('Fetching fxd4 starter files...');
    execSync(`git clone --depth 1 ${STARTER_REPO} "${projectPath}" --quiet`);

    // Bersihkan metadata git starter
    fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });

    process.chdir(projectPath);

    console.log('Installing dependencies and downloading core engine...');
    // Ini akan memicu postinstall: node fx.js run:install
    execSync('npm install', { stdio: 'inherit' });

    console.log(`\x1b[32m%s\x1b[0m`, `\nDone! fxd4.js project is ready.`);
    console.log(`\x1b[36m%s\x1b[0m`, `cd ${projectName}`);
    console.log(`\x1b[36m%s\x1b[0m`, `npm run dev`);

} catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Installation failed:', error.message);
}