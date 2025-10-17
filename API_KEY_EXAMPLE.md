# 🔑 Google AI API Key - Example & Format

## What is a Google AI API Key?

A Google AI API key is a unique identifier that allows your application to access Google's Gemini AI services for generating images and text.

---

## 📋 API Key Format

### Structure
```
AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
```

### Breakdown
```
AIzaSy  A6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Prefix  Unique Identifier (33 characters)

Total Length: 39 characters
```

### Characteristics
- **Prefix**: Always starts with `AIzaSy`
- **Length**: Always 39 characters total
- **Characters**: Alphanumeric (A-Z, a-z, 0-9)
- **Case-Sensitive**: `AIzaSy...` is different from `aizasy...`
- **No Spaces**: No spaces or special characters except letters/numbers
- **Unique**: Each key is unique to your Google account

---

## 🎯 Example API Keys

### Valid Examples
```
✅ AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
✅ AIzaSyBcdEfgHijKlmNopQrsTuvWxYz1234567
✅ AIzaSyX9Y8Z7A6B5C4D3E2F1G0H9I8J7K6L5M4N
```

### Invalid Examples
```
❌ AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHM       (too short - 35 chars)
❌ AIzaSy A6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU  (has a space)
❌ aizasya6jz7doclresr92eij23wyh8jwhMtl2wU   (wrong prefix/case)
❌ AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU! (has special char)
```

---

## 🌐 Where to Get Your API Key

### Step-by-Step Guide

1. **Visit Google AI Studio**
   ```
   https://makersuite.google.com/app/apikey
   ```

2. **Sign In**
   - Use your Google account
   - Personal or workspace account both work

3. **Create API Key**
   - Click "Create API Key" button
   - Select or create a Google Cloud project
   - Key will be generated instantly

4. **Copy Your Key**
   - Click the copy icon
   - Key format: `AIzaSy...` (39 characters)
   - Store it securely

5. **Add to Your Project**
   ```
   GOOGLE_API_KEY=AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
   ```

---

## 💾 How to Use in This Project

### Option 1: Automated Setup
```bash
npm run setup
```
- Paste your API key when prompted
- Script creates `.env.local` automatically

### Option 2: Manual Setup
Create `.env.local` file:
```env
GOOGLE_API_KEY=AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
```

### Option 3: Command Line (Temporary)
```bash
# PowerShell (Windows)
$env:GOOGLE_API_KEY="AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU"; node index.js

# Bash/Zsh (Mac/Linux)
GOOGLE_API_KEY=AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU node index.js
```

---

## 🔍 Validating Your API Key

### Format Check
```javascript
const apiKey = "AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU";

// Check prefix
console.log(apiKey.startsWith("AIzaSy")); // Should be: true

// Check length
console.log(apiKey.length === 39); // Should be: true

// Valid!
```

### Test in This Project
```bash
# Test with the web app
npm run dev

# Test with standalone script
npm run test-api
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Store in `.env.local` (not tracked by git)
- Keep it private and secure
- Use different keys for dev/production
- Rotate keys if exposed
- Set usage quotas in Google Cloud Console

### ❌ DON'T:
- Commit to version control
- Share in public forums/chats
- Hardcode in source files
- Include in screenshots
- Email or message publicly

---

## 💰 Pricing & Limits

### Free Tier (as of 2025)
- **Gemini API**: Generous free quota
- **Rate Limits**: Requests per minute
- **Monthly Quota**: Check Google AI Studio

### Checking Usage
1. Visit: https://console.cloud.google.com
2. Navigate to: APIs & Services → Credentials
3. View usage and set quotas

---

## 🆘 Troubleshooting

### "Invalid API Key" Error
```
Possible causes:
1. Key is incorrect (check for copy/paste errors)
2. Key is disabled in Google Cloud Console
3. API not enabled for your project
4. Key has restrictions (IP/HTTP referrer)

Solution: Generate a new API key
```

### "Quota Exceeded" Error
```
Cause: You've hit your usage limit

Solutions:
1. Wait for quota to reset (usually monthly)
2. Upgrade to paid tier
3. Request quota increase
```

### "API Key Not Configured" Error
```
Cause: .env.local file missing or incorrect

Solutions:
1. Run: npm run setup
2. Check .env.local exists in project root
3. Verify no extra spaces or quotes in file
```

---

## 📚 Additional Resources

- **Get API Key**: https://makersuite.google.com/app/apikey
- **Documentation**: https://ai.google.dev/docs
- **Pricing**: https://ai.google.dev/pricing
- **Support**: https://support.google.com/

---

## ✨ Example for This Project

Your project currently uses:
```
AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU
```

To use it:
1. Create `.env.local` in project root
2. Add: `GOOGLE_API_KEY=AIzaSyA6JZ7DOCLrEsr92EIJ23wyH8jWHMtl2wU`
3. Run: `npm run dev`
4. Start generating posters! 🎨

---

**Note**: This is an example key format. Replace with your own API key for production use.



