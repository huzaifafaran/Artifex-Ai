import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function main() {

  // Load API key from environment variable
  const apiKey = process.env.GOOGLE_API_KEY;
  
  if (!apiKey) {
    console.error("❌ ERROR: GOOGLE_API_KEY environment variable is not set");
    console.log("\n📝 To fix this:");
    console.log("1. Create a .env.local file in the project root");
    console.log("2. Add your API key: GOOGLE_API_KEY=your_api_key_here");
    console.log("3. Get an API key from: https://makersuite.google.com/app/apikey");
    console.log("\nOr run with: GOOGLE_API_KEY=your_key node index.js");
    process.exit(1);
  }
  
  const ai = new GoogleGenAI({ apiKey });

  // Load the product and model images
  let productImage, modelImage;
  
  try {
    const productPath = "coat.jpeg";
    const modelPath = "model.png";
    
    const productData = fs.readFileSync(productPath);
    const modelData = fs.readFileSync(modelPath);
    
    productImage = productData.toString("base64");
    modelImage = modelData.toString("base64");
    
    console.log("Successfully loaded product and model images");
  } catch (error) {
    console.error("Error loading images:", error.message);
    console.log("Make sure coat.jpeg and model.png exist in the project directory");
    process.exit(1);
  }

  // Create marketing poster prompt with both images
  const prompt = [
    { text: "Create a professional marketing poster for this stylish white single-breasted blazer. IMPORTANT: You must use the EXACT same person from the model reference image - same face, same hair, same appearance. Do not change the model's appearance at all.\n\n" +
            "Requirements:\n" +
            "1. Use the IDENTICAL person from the model reference image wearing the white blazer from the product reference image\n" +
            "2. Maintain the exact facial features, hair style, and physical appearance of the reference model\n" +
            "3. Pose the model wearing the white blazer in a sophisticated, elegant stance\n" +
            "4. Professional fashion photography lighting and composition\n" +
            "5. Luxury fashion brand aesthetic\n" +
            "6. Clean, minimalist design\n\n" +
            "CRITICAL REQUIREMENTS:\n" +
            "- The final image must show the exact same person from the model reference image, not a different person or a generic model\n" +
            "- DO NOT include ANY text, typography, headlines, slogans, or written content in the image\n" +
            "- Create a clean, text-free visual that focuses purely on the model wearing the white blazer\n" +
            "- The image should be ready for text to be added later by design software" },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: productImage,
      },
    },
    {
      inlineData: {
        mimeType: "image/png", 
        data: modelImage,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      // Generate unique filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const filename = `marketing-poster-${timestamp}.png`;
      
      fs.writeFileSync(filename, buffer);
      console.log(`Marketing poster saved as ${filename}`);
    }
  }
}

main().catch(console.error);
