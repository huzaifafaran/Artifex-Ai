'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { ProductCategory } from '@/types'

interface CategorySelectorProps {
  categories: ProductCategory[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onCategorySelect
}: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id
        
        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategorySelect(category.id)}
            className={`
              relative p-4 rounded-lg border transition-all duration-200 text-left
              ${isSelected 
                ? 'border-[#8B5CF6] bg-white/10' 
                : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/8'
              }
            `}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 bg-[#8B5CF6] text-white rounded-full p-1"
              >
                <Check className="w-3 h-3" />
              </motion.div>
            )}
            
            <div className="text-2xl mb-2">{category.icon}</div>
            <h3 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-white' : 'text-white/80'}`}>
              {category.name}
            </h3>
            <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
              {category.description}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
