export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  isMain?: boolean;
}

export interface ProductRating {
  score: number;
  maxScore: number;
  reviewCount: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
}

export interface ProductPrice {
  current: number;
  original?: number;
  currency: string;
  discount?: number;
}

export interface ProductColor {
  id: string;
  name: string;
  value: string;
  available: boolean;
}

export interface ProductFeature {
  icon: string;
  text: string;
  id: string;
}

export interface ProductSpecification {
  category: string;
  specs: Array<{
    term: string;
    description: string;
  }>;
}

export interface ShippingOption {
  type: string;
  duration: string;
  price: number;
  isFree?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: ProductImage[];
  price: ProductPrice;
  rating: ProductRating;
  colors: ProductColor[];
  features: ProductFeature[];
  specifications: ProductSpecification[];
  shipping: {
    options: ShippingOption[];
    returnPolicy: string;
  };
  badges: string[];
  inStock: boolean;
  maxQuantity: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
  price: number;
}

export interface WishlistItem {
  productId: string;
  addedDate: string;
}

// Component Props Types
export interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export interface ProductInfoProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  isInWishlist: boolean;
}

export interface ProductTabsProps {
  specifications: ProductSpecification[];
  reviews: Review[];
  shipping: Product['shipping'];
  rating: ProductRating;
}

export interface ColorPickerProps {
  colors: ProductColor[];
  selectedColor: string;
  onColorChange: (colorId: string) => void;
}

export interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

export interface RatingProps {
  score: number;
  maxScore: number;
  reviewCount: number;
  showReviews?: boolean;
  onReviewsClick?: () => void;
}

export interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
}

export interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export interface FooterProps {
  // Footer typically doesn't need props but keeping for consistency
}

// Accessibility Props
export interface AriaProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-selected'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-hidden'?: boolean;
  'role'?: string;
  'tabIndex'?: number;
}

// Event Handler Types
export type ColorChangeHandler = (colorId: string) => void;
export type QuantityChangeHandler = (quantity: number) => void;
export type AddToCartHandler = (item: CartItem) => void;
export type WishlistHandler = (productId: string) => void;
export type TabChangeHandler = (tabId: string) => void;
export type ImageChangeHandler = (imageId: string) => void;

// Utility Types
export type ProductColor_ID = ProductColor['id'];
export type ProductImage_ID = ProductImage['id'];
export type Review_ID = Review['id'];

// Form Types
export interface ProductFormData {
  selectedColor: ProductColor_ID;
  quantity: number;
}

// API Response Types
export interface ProductApiResponse {
  success: boolean;
  data: Product;
  error?: string;
}

export interface CartApiResponse {
  success: boolean;
  data: {
    itemCount: number;
    items: CartItem[];
  };
  error?: string;
}