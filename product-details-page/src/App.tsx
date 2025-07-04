import React, { useState, useCallback, useEffect } from 'react';
import { Product, CartItem, ProductFormData } from './types/product';
import { Header } from './components/Header/Header';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { ProductInfo } from './components/ProductInfo/ProductInfo';
import { ProductTabs } from './components/ProductTabs/ProductTabs';
import { Footer } from './components/Footer/Footer';
import { mockProduct } from './data/mockData';
import './styles/main.scss';

const App: React.FC = () => {
  // State management
  const [product] = useState<Product>(mockProduct);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Calculate cart item count
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Check if product is in wishlist
  const isInWishlist = wishlistItems.includes(product.id);

  // Breadcrumb data
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Audio', href: '/audio' },
    { label: 'Headphones', href: '/audio/headphones' },
    { label: product.name, current: true }
  ];

  // Handlers
  const handleAddToCart = useCallback((item: CartItem) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCartItems(prev => {
        const existingItem = prev.find(
          cartItem => cartItem.productId === item.productId && 
                     cartItem.selectedColor === item.selectedColor
        );

        if (existingItem) {
          return prev.map(cartItem =>
            cartItem.productId === item.productId && 
            cartItem.selectedColor === item.selectedColor
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        } else {
          return [...prev, item];
        }
      });
      
      // Show success notification
      announceToScreenReader(
        `${item.quantity} item${item.quantity > 1 ? 's' : ''} added to cart. Cart now has ${cartItemCount + item.quantity} item${cartItemCount + item.quantity > 1 ? 's' : ''}.`
      );
      
      setIsLoading(false);
    }, 500);
  }, [cartItemCount]);

  const handleAddToWishlist = useCallback((productId: string) => {
    setWishlistItems(prev => [...prev, productId]);
    announceToScreenReader('Added to wishlist');
  }, []);

  const handleRemoveFromWishlist = useCallback((productId: string) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
    announceToScreenReader('Removed from wishlist');
  }, []);

  const handleCartClick = useCallback(() => {
    // Navigate to cart page or open cart modal
    console.log('Cart clicked', cartItems);
  }, [cartItems]);

  const handleColorChange = useCallback((colorId: string) => {
    setSelectedColor(colorId);
    const selectedColorObj = product.colors.find(color => color.id === colorId);
    if (selectedColorObj) {
      announceToScreenReader(`Color selected: ${selectedColorObj.name}`);
    }
  }, [product.colors]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
    announceToScreenReader(`Quantity: ${newQuantity}`);
  }, []);

  // Utility function for screen reader announcements
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);

  // Add skip link for accessibility
  useEffect(() => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, []);

  // Form data for ProductInfo component
  const formData: ProductFormData = {
    selectedColor,
    quantity
  };

  return (
    <div className="app">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={handleCartClick}
      />
      
      <main id="main-content" className="main" role="main">
        <Breadcrumb items={breadcrumbItems} />
        
        <section className="product" aria-labelledby="product-title">
          <div className="product__container">
            <ProductGallery 
              images={product.images}
              productName={product.name}
            />
            
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              quantity={quantity}
              onColorChange={handleColorChange}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              isInWishlist={isInWishlist}
              isLoading={isLoading}
            />
          </div>
        </section>

        <ProductTabs
          specifications={product.specifications}
          reviews={product.rating.reviews}
          shipping={product.shipping}
          rating={product.rating}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
