# Environment Variables Setup Guide

## 🔐 API Key Configuration

This project requires a Google AI API key to generate marketing posters using the Gemini AI model.

---

## 📝 Setup Instructions

### Step 1: Get Your API Key

1. Visit: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy your API key (format: `AIzaSy...`)

---

### Step 2: Create Environment File

Create a file named **`.env.local`** in the project root directory:

```bash
# .env.local
GOOGLE_API_KEY=AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
```

⚠️ **IMPORTANT**: Replace `AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU` with your actual API key!

---

## 📋 Example API Key Format

Your Google AI API key will look like this:

```
AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
```

Structure breakdown:
- **Prefix**: `AIzaSy` (all keys start with this)
- **Length**: 39 characters total
- **Characters**: Alphanumeric (letters and numbers, case-sensitive)

---

## 🚀 Usage

### For Next.js Web Application

Next.js automatically loads `.env.local` files. Just run:

```bash
npm run dev
```

### For Standalone Script (index.js)

The script now uses `dotenv` to load environment variables:

```bash
# Make sure you have dotenv installed
npm install

# Run the script
node index.js
```

**Alternative**: Pass the API key directly in the command:

```bash
GOOGLE_API_KEY=your_api_key_here node index.js
```

---

## ✅ Verification

To verify your setup is working:

1. **Check the file exists**:
   ```bash
   # Windows PowerShell
   Test-Path .env.local
   
   # Linux/Mac
   ls -la .env.local
   ```

2. **Test the application**:
   ```bash
   npm run dev
   ```
   Navigate to http://localhost:3000 and try generating a poster.

---

## 🔒 Security Best Practices

1. ✅ **Never commit** `.env.local` to version control (already in `.gitignore`)
2. ✅ **Don't share** your API key publicly
3. ✅ **Rotate keys regularly** if exposed
4. ✅ **Use different keys** for development and production
5. ✅ **Set usage quotas** in Google Cloud Console

---

## ❌ Troubleshooting

### Error: "GOOGLE_API_KEY environment variable is not set"

**Solution**: Make sure `.env.local` exists in the project root with your API key.

### Error: "API key not configured" 

**Solution**: Verify your API key is correct and active at https://makersuite.google.com/app/apikey

### Error: "Invalid API key"

**Solution**: 
- Check for extra spaces or quotes in `.env.local`
- Ensure you copied the complete key
- Try generating a new API key

---

## 📁 File Location

Place `.env.local` in the **project root directory**:

```
product-to-poster/
├── .env.local          ← Create this file here
├── .env.example        ← Example template
├── app/
├── components/
├── package.json
└── ...
```

---

## 🔄 Updating Your API Key

If you need to change your API key:

1. Open `.env.local`
2. Replace the old key with the new one
3. Save the file
4. Restart the development server (`npm run dev`)

---

## 💡 Additional Resources

- **Get API Key**: https://makersuite.google.com/app/apikey
- **Google AI Documentation**: https://ai.google.dev/
- **Gemini API Pricing**: https://ai.google.dev/pricing



