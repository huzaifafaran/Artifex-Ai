#!/usr/bin/env node

/**
 * Environment Setup Script
 * Run this script to create your .env.local file
 */

import * as fs from 'node:fs';
import * as readline from 'node:readline';

const ENV_FILE = '.env.local';
const EXAMPLE_KEY = 'AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU';

console.log('\n🚀 Artifex AI - Environment Setup\n');
console.log('═══════════════════════════════════════════════════\n');

// Check if .env.local already exists
if (fs.existsSync(ENV_FILE)) {
  console.log('⚠️  WARNING: .env.local already exists!');
  console.log('📁 Current location:', process.cwd() + '\\' + ENV_FILE);
  console.log('\nYour existing file will NOT be modified.');
  console.log('To update your API key, edit .env.local manually.\n');
  process.exit(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('📝 To get your Google AI API key:');
console.log('   1. Visit: https://makersuite.google.com/app/apikey');
console.log('   2. Sign in with your Google account');
console.log('   3. Click "Create API Key"');
console.log('   4. Copy your API key\n');
console.log('Example API key format: AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU');
console.log('(39 characters, starts with AIzaSy)\n');

rl.question('🔑 Enter your Google AI API key (or press Enter to use example): ', (apiKey) => {
  const key = apiKey.trim() || EXAMPLE_KEY;
  
  // Validate API key format
  if (!key.startsWith('AIzaSy') || key.length !== 39) {
    console.log('\n⚠️  WARNING: API key format looks unusual.');
    console.log('Expected format: AIzaSy... (39 characters)');
    console.log('You entered:', key);
    console.log('\nProceeding anyway, but it may not work.\n');
  }
  
  // Create .env.local file
  const envContent = `# Google AI API Key
# Get your API key from: https://makersuite.google.com/app/apikey
GOOGLE_API_KEY=${key}
`;

  try {
    fs.writeFileSync(ENV_FILE, envContent, 'utf8');
    console.log('\n✅ SUCCESS! Environment file created.');
    console.log('📁 Location:', process.cwd() + '\\' + ENV_FILE);
    console.log('\n🔐 Your API key has been saved securely.');
    console.log('   (This file is in .gitignore and won\'t be committed)\n');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('🚀 Next Steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Open: http://localhost:3000');
    console.log('   3. Start generating amazing posters!\n');
  } catch (error) {
    console.error('\n❌ ERROR: Could not create .env.local file');
    console.error(error.message);
    console.log('\nPlease create the file manually:');
    console.log('1. Create a file named .env.local in the project root');
    console.log('2. Add this line: GOOGLE_API_KEY=' + key + '\n');
  }
  
  rl.close();
});



