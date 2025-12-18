import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPng = path.join(__dirname, '..', 'public', 'icons', 'favicon-32x32.png');
const outputIco = path.join(__dirname, '..', 'public', 'favicon.ico');

// Simple copy - most modern browsers accept PNG as .ico
fs.copyFileSync(inputPng, outputIco);
console.log('✅ favicon.ico created at:', outputIco);
