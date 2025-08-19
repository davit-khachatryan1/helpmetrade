#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 HelpMeTrade Environment Setup\n');

// Check if .env already exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('   If you want to start fresh, delete the existing .env file and run this script again.\n');
  process.exit(0);
}

// Check if .env.example exists
if (!fs.existsSync(envExamplePath)) {
  console.log('❌ .env.example file not found!');
  console.log('   Please make sure you have the .env.example file in your project root.\n');
  process.exit(1);
}

// Copy .env.example to .env
try {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Created .env file from .env.example');
  console.log('📝 Please edit .env file and add your API keys:');
  console.log('   - VITE_GEMINI_API_KEY: Get from https://makersuite.google.com/app/apikey');
  console.log('\n🔒 Remember: Never commit your .env file to version control!');
  console.log('   The .env file is already added to .gitignore for security.\n');
} catch (error) {
  console.log('❌ Failed to create .env file:', error.message);
  process.exit(1);
}
