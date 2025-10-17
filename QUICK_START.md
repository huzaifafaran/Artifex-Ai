# ⚡ Quick Start Guide

Get up and running with Artifex AI in 3 minutes!

---

## 🚀 Setup (Choose One Method)

### Method 1: Automated Setup (Recommended)

```bash
# Install dependencies
npm install

# Run the setup script
npm run setup

# Start the app
npm run dev
```

The setup script will:
- ✅ Guide you through API key setup
- ✅ Create `.env.local` automatically
- ✅ Validate your API key format

---

### Method 2: Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file** in the project root:
   ```bash
   # Windows PowerShell
   New-Item -Path .env.local -ItemType File

   # Linux/Mac
   touch .env.local
   ```

3. **Add your API key** to `.env.local`:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

4. **Get your API key** from:
   - 🔗 https://makersuite.google.com/app/apikey

5. **Start the app:**
   ```bash
   npm run dev
   ```

---

## 🎨 Using the Application

1. Open http://localhost:3000
2. Upload your product image (drag & drop or click)
3. Select product category
4. (Optional) Add a model image
5. Click "Generate Poster"
6. Wait ~10-30 seconds for 3 poster variations
7. Download your favorites!

---

## 🧪 Test the API (Optional)

Test the standalone script with sample images:

```bash
# Make sure coat.jpeg and model.png exist
npm run test-api
```

This will generate a marketing poster and save it as `marketing-poster-[timestamp].png`

---

## 📋 Example API Key Format

Your Google AI API key should look like this:

```
AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
```

- **Starts with**: `AIzaSy`
- **Length**: 39 characters
- **Contains**: Letters and numbers (case-sensitive)

---

## ❌ Troubleshooting

### "GOOGLE_API_KEY environment variable is not set"

**Fix**: Run `npm run setup` or manually create `.env.local`

### "API key not configured"

**Fix**: Check that `.env.local` exists and contains your API key

### Port 3000 already in use

**Fix**: Use a different port:
```bash
PORT=3001 npm run dev
```

### Script won't run (index.js)

**Fix**: Make sure dotenv is installed:
```bash
npm install dotenv
```

---

## 🔒 Security Reminder

- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ Never share your API key publicly
- ✅ Keep your API key secure

---

## 💡 Need Help?

- 📖 Full documentation: See `README.md`
- 🔐 Environment setup: See `ENV_SETUP.md`
- 🐛 Issues: Check the console for error messages

---

## 🎉 You're Ready!

Everything set up? Start creating amazing marketing posters with AI! 🚀



