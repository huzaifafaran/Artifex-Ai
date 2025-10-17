export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface GenerationRequest {
  productImage: string;
  modelImage?: string;
  category: string;
  customPrompt?: string;
}

export interface GeneratedImage {
  imageUrl: string;
  filename: string;
  version: number;
}

export interface GenerationResponse {
  success: boolean;
  images?: GeneratedImage[];
  count?: number;
  error?: string;
  // Legacy support
  imageUrl?: string;
  filename?: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'clothing',
    name: 'Clothing & Apparel',
    description: 'Shirts, dresses, pants, jackets, etc.',
    icon: '👕'
  },
  {
    id: 'footwear',
    name: 'Footwear',
    description: 'Shoes, sneakers, boots, sandals',
    icon: '👟'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Bags, jewelry, watches, hats',
    icon: '💍'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Gadgets, phones, headphones',
    icon: '📱'
  },
  {
    id: 'beauty',
    name: 'Beauty & Cosmetics',
    description: 'Makeup, skincare, perfumes',
    icon: '💄'
  },
  {
    id: 'home',
    name: 'Home & Decor',
    description: 'Furniture, decorations, kitchenware',
    icon: '🏠'
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    description: 'Equipment, activewear, gear',
    icon: '⚽'
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Custom product category',
    icon: '📦'
  }
];
