'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, Sparkles, Download, Loader2 } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import CategorySelector from '@/components/CategorySelector'
import { PRODUCT_CATEGORIES } from '@/types'
import type { GenerationRequest, GenerationResponse, GeneratedImage } from '@/types'

export default function Home() {
  const [productImage, setProductImage] = useState<string | null>(null)
  const [modelImage, setModelImage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [customCategory, setCustomCategory] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loadingMessage, setLoadingMessage] = useState(0)

  // Sassy loading messages to keep users engaged
  const loadingMessages = [
    "✨ AI is working its magic...",
    "🎨 Crafting your masterpiece...",
    "🚀 Generating pure marketing gold...",
    "💫 Channeling creative genius...",
    "🔥 Creating poster perfection...",
    "⚡ Almost there, hang tight...",
    "🎯 Fine-tuning every pixel...",
    "🌟 Making it absolutely stunning...",
    "💎 Polishing to perfection...",
    "🎪 The magic is happening..."
  ]

  // Cycle through loading messages
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingMessage(prev => (prev + 1) % loadingMessages.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isGenerating, loadingMessages.length])

  const handleGenerate = async () => {
    if (!productImage || !selectedCategory) {
      setError('Please upload a product image and select a category')
      return
    }

    // Check if "Other" category is selected but no custom category is provided
    if (selectedCategory === 'other' && !customCategory.trim()) {
      setError('Please specify what type of product this is')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const request: GenerationRequest = {
        productImage,
        modelImage: modelImage || undefined,
        category: selectedCategory,
        customPrompt: selectedCategory === 'other' ? customCategory : undefined,
      }

      const response = await fetch('/api/generate-poster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      const result: GenerationResponse = await response.json()
      console.log('API Response:', result) // Debug logging

      if (result.success && result.images) {
        setGeneratedImages(result.images)
      } else if (result.success && result.imageUrl) {
        // Legacy support for single image
        setGeneratedImages([{
          imageUrl: result.imageUrl,
          filename: result.filename || 'generated-poster.png',
          version: 1
        }])
      } else {
        console.error('API Error:', result.error) // Debug logging
        setError(result.error || 'Failed to generate poster')
      }
    } catch (err) {
      setError('An error occurred while generating the poster')
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement('a')
    link.href = image.imageUrl
    link.download = image.filename
    link.click()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6"
        >
          <div className="nyrix-badge">
            Powered by Nyrix
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold text-white mb-4"
        >
          Artifex AI
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Create professional marketing posters with AI. Upload your product image, 
          select a category, and generate stunning advertisements in seconds.
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Product Image Upload */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Upload className="w-5 h-5 text-accent" />
              Product Image
            </h2>
            <ImageUpload
              onImageUpload={setProductImage}
              label="Upload your product image"
              accept="image/*"
              required
            />
          </div>

          {/* Category Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              Product Category
            </h2>
            <CategorySelector
              categories={PRODUCT_CATEGORIES}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
            
            {/* Custom Category Input for "Other" */}
            {selectedCategory === 'other' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  What type of product is this?
                </label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g., kitchen appliances, garden tools, pet supplies..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-white placeholder-white/60"
                />
                <p className="text-sm text-white/60 mt-1">
                  Specify the product type to help AI create better marketing content
                </p>
              </motion.div>
            )}
          </div>

          {/* Model Image Upload (Optional) */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Upload className="w-5 h-5 text-accent" />
              Model Image (Optional)
            </h2>
            <p className="text-white/70 mb-4">
              Add a model to create more engaging product advertisements
            </p>
            <ImageUpload
              onImageUpload={setModelImage}
              label="Upload model image (optional)"
              accept="image/*"
            />
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={!productImage || !selectedCategory || (selectedCategory === 'other' && !customCategory.trim()) || isGenerating}
            className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Poster...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Poster
              </>
            )}
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        {/* Right Panel - Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {isGenerating ? (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">
                Generating Posters...
              </h2>
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-6"
                >
                  <div className="w-full h-full border-4 border-white/20 border-t-[#8B5CF6] rounded-full"></div>
                </motion.div>
                
                <motion.div
                  key={loadingMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <p className="text-lg font-medium text-[#8B5CF6] mb-2">
                    {loadingMessages[loadingMessage]}
                  </p>
                </motion.div>
                
                <div className="flex justify-center space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[#8B5CF6] rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                
                <p className="text-sm text-white/50 mt-4">
                  Creating 3 amazing versions for you...
                </p>
              </div>
            </div>
          ) : generatedImages.length > 0 ? (
            generatedImages.map((image, index) => (
              <motion.div
                key={image.filename}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Version {image.version}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    image.version === 1 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : image.version === 2
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {image.version === 1 ? 'Product Focus' : image.version === 2 ? 'Lifestyle Focus' : 'Product Focus'}
                  </span>
                </div>
                
                <div className="aspect-square bg-white/5 rounded-lg overflow-hidden mb-4 border border-white/10">
                  <img
                    src={image.imageUrl}
                    alt={`Generated Poster Version ${image.version}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownload(image)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Version {image.version}
                </motion.button>
              </motion.div>
            ))
          ) : (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">
                Generated Posters
              </h2>
              <div className="text-center py-12 text-white/50">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your generated posters will appear here</p>
                <p className="text-sm mt-2">Three different versions will be created for comparison</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
