'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void
  label: string
  accept?: string
  required?: boolean
}

export default function ImageUpload({
  onImageUpload,
  label,
  accept = 'image/*',
  required = false
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setFileName(file.name)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)
        
        // Convert to base64 for API
        const base64 = result.split(',')[1]
        onImageUpload(base64)
      }
      reader.readAsDataURL(file)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const clearImage = () => {
    setPreview(null)
    setFileName('')
    onImageUpload('')
  }

  const rootProps = getRootProps()
  const { 
    onAnimationStart, 
    onDragStart, 
    onDragEnd, 
    onDragEnter, 
    onDragLeave, 
    onDragOver, 
    onDrag,
    onDrop: onDropProp,
    onClick,
    ...safeProps 
  } = rootProps

  return (
    <div className="w-full">
      <motion.div
        onClick={onClick}
        className={`upload-area cursor-pointer ${isDragActive ? 'active' : ''}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg shadow-lg border border-white/20"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                clearImage()
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </motion.button>
            <p className="text-sm text-white/80 mt-2 truncate">{fileName}</p>
          </div>
        ) : (
          <div className="text-center">
            {isDragActive ? (
              <>
                <Upload className="w-12 h-12 text-[#8B5CF6] mx-auto mb-4" />
                <p className="text-lg font-medium text-[#8B5CF6]">Drop your image here</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-lg font-medium text-white mb-2">{label}</p>
                <p className="text-sm text-white/60 mb-4">
                  Drag & drop an image here, or click to select
                </p>
                <div className="btn-secondary inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Choose File
                </div>
              </>
            )}
          </div>
        )}
      </motion.div>
      
      {required && !preview && (
        <p className="text-sm text-red-400 mt-2">This field is required</p>
      )}
      
      <p className="text-xs text-white/60 mt-2">
        Supported formats: PNG, JPG, JPEG, GIF, WebP (max 10MB)
      </p>
    </div>
  )
}
