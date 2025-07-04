import { Product } from '../types/product';

export const mockProduct: Product = {
  id: 'premium-wireless-headphones',
  name: 'Premium Wireless Headphones',
  slug: 'premium-wireless-headphones',
  description: 'Experience premium sound quality with our latest wireless headphones featuring active noise cancellation, 30-hour battery life, and exceptional comfort for all-day listening.',
  images: [
    {
      id: 'main',
      src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      alt: 'Premium Wireless Headphones - Main view',
      isMain: true
    },
    {
      id: 'side',
      src: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      alt: 'Premium Wireless Headphones - Side view'
    },
    {
      id: 'wearing',
      src: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
      alt: 'Premium Wireless Headphones - Wearing position'
    }
  ],
  price: {
    current: 299.99,
    original: 399.99,
    currency: 'USD',
    discount: 25
  },
  rating: {
    score: 4.8,
    maxScore: 5,
    reviewCount: 247,
    reviews: [
      {
        id: 'review-1',
        author: 'Sarah M.',
        rating: 5,
        text: 'Absolutely amazing sound quality! The noise cancellation works perfectly and the battery life is exactly as advertised.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 'review-2',
        author: 'Mike R.',
        rating: 4,
        text: 'Great headphones for the price. Very comfortable for long listening sessions. Only minor complaint is they\'re a bit bulky for travel.',
        date: '2024-01-10',
        verified: true
      },
      {
        id: 'review-3',
        author: 'Jennifer L.',
        rating: 5,
        text: 'Best purchase I\'ve made this year! The sound quality is incredible and they\'re so comfortable I forget I\'m wearing them.',
        date: '2024-01-05',
        verified: true
      },
      {
        id: 'review-4',
        author: 'David K.',
        rating: 4,
        text: 'Excellent build quality and the wireless connection is rock solid. The case could be a bit smaller but overall very happy.',
        date: '2023-12-28',
        verified: false
      },
      {
        id: 'review-5',
        author: 'Amanda T.',
        rating: 5,
        text: 'These headphones exceeded my expectations. The active noise cancellation is a game-changer for my daily commute.',
        date: '2023-12-20',
        verified: true
      }
    ]
  },
  colors: [
    {
      id: 'black',
      name: 'Midnight Black',
      value: '#1f2937',
      available: true
    },
    {
      id: 'white',
      name: 'Arctic White',
      value: '#f9fafb',
      available: true
    },
    {
      id: 'blue',
      name: 'Ocean Blue',
      value: '#3b82f6',
      available: true
    }
  ],
  features: [
    {
      id: 'shipping',
      icon: '🚚',
      text: 'Free shipping on orders over $50'
    },
    {
      id: 'returns',
      icon: '↩️',
      text: '30-day free returns'
    },
    {
      id: 'warranty',
      icon: '🛡️',
      text: '2-year warranty included'
    }
  ],
  specifications: [
    {
      category: 'Audio',
      specs: [
        {
          term: 'Driver Size',
          description: '40mm dynamic drivers'
        },
        {
          term: 'Frequency Response',
          description: '20Hz - 20kHz'
        },
        {
          term: 'Impedance',
          description: '32 ohms'
        },
        {
          term: 'Sensitivity',
          description: '105dB SPL/mW'
        }
      ]
    },
    {
      category: 'Battery & Connectivity',
      specs: [
        {
          term: 'Battery Life',
          description: '30 hours (ANC off), 20 hours (ANC on)'
        },
        {
          term: 'Charging Time',
          description: '2 hours (full charge), 15 min (3 hours playback)'
        },
        {
          term: 'Connectivity',
          description: 'Bluetooth 5.2, USB-C, 3.5mm jack'
        },
        {
          term: 'Range',
          description: 'Up to 30 feet (10 meters)'
        }
      ]
    },
    {
      category: 'Physical',
      specs: [
        {
          term: 'Weight',
          description: '290g (10.2 oz)'
        },
        {
          term: 'Dimensions',
          description: '7.1 x 6.7 x 2.6 inches'
        },
        {
          term: 'Materials',
          description: 'Premium aluminum and protein leather'
        },
        {
          term: 'Water Resistance',
          description: 'IPX4 splash resistant'
        }
      ]
    }
  ],
  shipping: {
    options: [
      {
        type: 'Standard',
        duration: '5-7 business days',
        price: 0,
        isFree: true
      },
      {
        type: 'Express',
        duration: '2-3 business days',
        price: 9.99,
        isFree: false
      },
      {
        type: 'Overnight',
        duration: 'Next business day',
        price: 19.99,
        isFree: false
      }
    ],
    returnPolicy: 'We offer a 30-day return policy for all unopened items in original packaging. Items must be in new, unused condition. Return shipping is free for defective items, otherwise customer is responsible for return shipping costs.'
  },
  badges: ['New', 'Bestseller'],
  inStock: true,
  maxQuantity: 10
};

// Additional mock data for development
export const mockCartItems = [
  {
    productId: 'premium-wireless-headphones',
    quantity: 1,
    selectedColor: 'black',
    price: 299.99
  }
];

export const mockWishlistItems = ['premium-wireless-headphones'];

// Mock user preferences for accessibility testing
export const mockUserPreferences = {
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
  preferredLanguage: 'en'
};