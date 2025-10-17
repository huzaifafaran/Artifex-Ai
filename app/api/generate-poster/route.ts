import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import type { GenerationRequest, GenerationResponse } from '@/types'

// Initialize Google GenAI
const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!
})

// Helper function to get category-specific prompts
function getCategoryPrompts(category: string, hasModel: boolean) {
  const basePrompts = {
    clothing: {
      withModel: "Create a professional fashion marketing poster featuring the exact person from the model reference image wearing the clothing item from the product reference. The model should pose elegantly showcasing the garment's fit, style, and details. Use professional fashion photography lighting with a clean, luxury aesthetic.",
      withoutModel: "Create a professional fashion marketing poster featuring the clothing item from the reference image. Style it as a high-end fashion advertisement with elegant presentation, professional lighting, and luxury brand aesthetic. Focus on the garment's style, fit, and quality details."
    },
    footwear: {
      withModel: "Create a professional marketing poster showing the exact person from the model reference image wearing or showcasing the footwear from the product reference. Position the model to highlight the shoes' style, comfort, and design. Use dynamic lighting and modern composition.",
      withoutModel: "Create a professional marketing poster featuring the footwear from the reference image. Present the shoes with dynamic angles, professional lighting, and modern styling that emphasizes comfort, style, and quality craftsmanship."
    },
    accessories: {
      withModel: "Create a professional marketing poster featuring the exact person from the model reference image wearing or holding the accessory from the product reference. Style the model elegantly to complement the accessory, with sophisticated lighting and luxury presentation.",
      withoutModel: "Create a professional marketing poster showcasing the accessory from the reference image. Use elegant styling with sophisticated lighting, luxury presentation, and composition that highlights the item's craftsmanship and style."
    },
    electronics: {
      withModel: "Create a modern tech marketing poster featuring the exact person from the model reference image using or presenting the electronic device from the product reference. Use contemporary styling with clean, modern aesthetics and professional lighting.",
      withoutModel: "Create a modern tech marketing poster showcasing the electronic device from the reference image. Use clean, contemporary design with professional product photography lighting and modern composition that emphasizes innovation and quality."
    },
    beauty: {
      withModel: "Create a professional beauty marketing poster featuring the exact person from the model reference image using or presenting the beauty product from the product reference. Use glamorous lighting and elegant styling that emphasizes beauty and sophistication.",
      withoutModel: "Create a professional beauty marketing poster showcasing the beauty product from the reference image. Use glamorous presentation with elegant styling, soft lighting, and luxurious composition that emphasizes quality and appeal."
    },
    home: {
      withModel: "Create a professional home & lifestyle marketing poster featuring the exact person from the model reference image with the home product from the product reference. Style the scene to show the product in an elegant home setting with warm, inviting lighting.",
      withoutModel: "Create a professional home & lifestyle marketing poster showcasing the home product from the reference image. Present it in an elegant, well-designed home setting with warm lighting and inviting composition."
    },
    sports: {
      withModel: "Create a dynamic sports marketing poster featuring the exact person from the model reference image with the sports product from the product reference. Use energetic composition with dynamic lighting that conveys performance and athleticism.",
      withoutModel: "Create a dynamic sports marketing poster showcasing the sports product from the reference image. Use energetic composition with dynamic lighting and modern styling that emphasizes performance, quality, and athletic appeal."
    },
    other: {
      withModel: "Create a professional marketing poster featuring the exact person from the model reference image with the product from the product reference. Use elegant styling with professional lighting and modern composition suitable for the product type.",
      withoutModel: "Create a professional marketing poster showcasing the product from the reference image. Use elegant presentation with professional lighting and modern composition that highlights the product's quality and appeal."
    }
  }

  return basePrompts[category as keyof typeof basePrompts] || basePrompts.other
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json()
    const { productImage, modelImage, category, customPrompt } = body

    if (!productImage || !category) {
      return NextResponse.json({
        success: false,
        error: 'Product image and category are required'
      })
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Google API key not configured'
      })
    }

    // Get appropriate prompts based on category and model presence
    const prompts = getCategoryPrompts(category, !!modelImage)
    const hasModel = !!modelImage
    
    // Build the base prompt content
    let basePromptText = hasModel ? prompts.withModel : prompts.withoutModel
    
    // If custom category is provided, customize the prompt
    if (category === 'other' && customPrompt) {
      basePromptText = `Create a professional marketing poster for this ${customPrompt.toLowerCase()} product. ${hasModel ? 'Use the exact person from the model reference image wearing or using the product from the product reference.' : 'Feature the product from the reference image.'} Style it with professional photography and modern composition suitable for ${customPrompt.toLowerCase()} marketing.`
    }
    
    // Create three different prompt variations
    const promptVariations = [
      // Version 1: More focused on product details
      `${basePromptText}

CRITICAL REQUIREMENTS:
- DO NOT include ANY text, typography, headlines, slogans, or written content in the image
- Create a clean, text-free visual that focuses purely on the product and model (if provided)
- Use professional photography lighting and composition with emphasis on product details
- Maintain luxury brand aesthetic with modern, clean design
- The image should be ready for text to be added later by design software
${hasModel ? '- Use the EXACT same person from the model reference image - same face, hair, and appearance' : ''}
- Focus on showcasing the product's quality, style, and appeal with close-up details`,

      // Version 2: More lifestyle/fashion oriented
      `${basePromptText}

CRITICAL REQUIREMENTS:
- DO NOT include ANY text, typography, headlines, slogans, or written content in the image
- Create a clean, text-free visual that focuses purely on the product and model (if provided)
- Use lifestyle photography with dynamic composition and artistic lighting
- Maintain luxury brand aesthetic with modern, clean design
- The image should be ready for text to be added later by design software
${hasModel ? '- Use the EXACT same person from the model reference image - same face, hair, and appearance' : ''}
- Focus on lifestyle appeal and fashion-forward presentation`,

      // Version 3: Copy of version 1 (product-focused approach)
      `${basePromptText}

CRITICAL REQUIREMENTS:
- DO NOT include ANY text, typography, headlines, slogans, or written content in the image
- Create a clean, text-free visual that focuses purely on the product and model (if provided)
- Use professional photography lighting and composition with emphasis on product details
- Maintain luxury brand aesthetic with modern, clean design
- The image should be ready for text to be added later by design software
${hasModel ? '- Use the EXACT same person from the model reference image - same face, hair, and appearance' : ''}
- Focus on showcasing the product's quality, style, and appeal with close-up details`
    ]

    const generatedImages = []

    // Generate three different versions
    for (let i = 0; i < 3; i++) {
      // Prepare the content array for the API
      const content: any[] = [{ text: promptVariations[i] }]
      
      // Add product image
      content.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: productImage
        }
      })
      
      // Add model image if provided
      if (modelImage) {
        content.push({
          inlineData: {
            mimeType: 'image/png',
            data: modelImage
          }
        })
      }

      // Generate the poster using Google GenAI
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: content
      })

      // Process the response with proper error handling
      console.log(`Processing response for version ${i + 1}:`, response.candidates?.length)
      if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        console.log(`Found ${response.candidates[0].content.parts.length} parts in response`)
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            console.log(`Processing inline data for version ${i + 1}`)
            const imageData = part.inlineData.data
            const buffer = Buffer.from(imageData, 'base64')
          
          // Generate unique filename
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
          const filename = `marketing-poster-v${i + 1}-${timestamp}.png`
          
          // Convert buffer to base64 data URL for frontend
          const base64Data = buffer.toString('base64')
          const dataUrl = `data:image/png;base64,${base64Data}`
          
            generatedImages.push({
              imageUrl: dataUrl,
              filename,
              version: i + 1
            })
            break
          }
        }
      }
    }

    if (generatedImages.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No images generated in response'
      })
    }

    // Return success response with both images
    return NextResponse.json({
      success: true,
      images: generatedImages,
      count: generatedImages.length
    })

  } catch (error) {
    console.error('Error generating poster:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to generate poster. Please try again.'
    })
  }
}
