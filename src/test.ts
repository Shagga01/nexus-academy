// src/test.ts
import * as path from 'path';
import { fileURLToPath } from 'url'; // Import this utility
import { dirname } from 'path';     // Import dirname specifically

// ES Module equivalents for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('--- Test script started ---');
console.log(`Current directory: ${process.cwd()}`);
console.log(`Resolved path to this file: ${__filename}`); // Use the ES Module __filename
console.log(`Resolved directory of this file: ${__dirname}`); // Use the ES Module __dirname
console.log('--- Test script finished successfully ---');