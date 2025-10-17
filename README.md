# Artifex AI 🎨

A stunning Next.js application that generates professional marketing posters using AI. Upload your product images, optionally add a model, and let our advanced AI create captivating advertisements.

**⚡ Powered by Nyrix**

## Features

✨ **Smart Category Detection** - Choose from 8 product categories for optimized prompts
🎨 **Beautiful UI/UX** - Modern, responsive design with smooth animations
🤖 **AI-Powered Generation** - Uses Google's Gemini AI for high-quality poster creation
👤 **Model Integration** - Optional model images for more engaging advertisements
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
⚡ **Fast Generation** - Quick poster creation with real-time progress feedback
💾 **Easy Download** - One-click download of generated posters

## Getting Started

### Prerequisites

- Node.js 18+ 
- Google AI API Key

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your Google AI API key:**
   - Get your API key from: https://makersuite.google.com/app/apikey
   - Create a `.env.local` file in the project root
   - Add your API key:
     ```
     GOOGLE_API_KEY=your_actual_api_key_here
     ```
   - See `ENV_SETUP.md` for detailed setup instructions and example API key format

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Upload Product Image** - Drag & drop or click to upload your product image
2. **Select Category** - Choose from 8 product categories for better AI prompts
3. **Add Model (Optional)** - Upload a model image for more engaging posters
4. **Generate Poster** - Click "Generate Poster" and wait for AI to create your marketing poster
5. **Download** - Download your generated poster as a PNG file

## Product Categories

- 👕 **Clothing & Apparel** - Shirts, dresses, pants, jackets
- 👟 **Footwear** - Shoes, sneakers, boots, sandals  
- 💍 **Accessories** - Bags, jewelry, watches, hats
- 📱 **Electronics** - Gadgets, phones, headphones
- 💄 **Beauty & Cosmetics** - Makeup, skincare, perfumes
- 🏠 **Home & Decor** - Furniture, decorations, kitchenware
- ⚽ **Sports & Fitness** - Equipment, activewear, gear
- 📦 **Other** - Custom product categories

## Technology Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **AI:** Google GenAI (Gemini)
- **File Handling:** React Dropzone
- **Icons:** Lucide React, Heroicons

## API Routes

- `POST /api/generate-poster` - Generates marketing posters using AI

## Project Structure

```
├── app/
│   ├── api/generate-poster/    # API route for poster generation
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main application page
├── components/
│   ├── ImageUpload.tsx         # Image upload component
│   └── CategorySelector.tsx    # Category selection component
├── types/
│   └── index.ts                # TypeScript type definitions
├── public/
│   └── generated/              # Generated poster storage
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.