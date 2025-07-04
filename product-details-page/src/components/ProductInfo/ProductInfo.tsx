import React from 'react';
import { Product, CartItem } from '../../types/product';

interface ProductInfoProps {
  product: Product;
  selectedColor: string;
  quantity: number;
  onColorChange: (colorId: string) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: (item: CartItem) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  isInWishlist: boolean;
  isLoading: boolean;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedColor,
  quantity,
  onColorChange,
  onQuantityChange,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  isInWishlist,
  isLoading
}) => {
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      productId: product.id,
      quantity,
      selectedColor,
      price: product.price.current
    };
    onAddToCart(cartItem);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      onRemoveFromWishlist(product.id);
    } else {
      onAddToWishlist(product.id);
    }
  };

  return (
    <div className="product__info">
      <div className="product__badges">
        {product.badges.map(badge => (
          <span key={badge} className={`badge badge--${badge.toLowerCase()}`}>
            {badge}
          </span>
        ))}
      </div>
      
      <h1 id="product-title" className="product__title">
        {product.name}
      </h1>
      
      <div className="product__rating">
        <div className="rating" aria-label={`${product.rating.score} out of ${product.rating.maxScore} stars`}>
          <span className="rating__stars" aria-hidden="true">★★★★★</span>
          <span className="rating__score">{product.rating.score}</span>
          <a href="#reviews" className="rating__reviews">({product.rating.reviewCount} reviews)</a>
        </div>
      </div>
      
      <div className="product__price">
        <span className="price price--current">${product.price.current}</span>
        {product.price.original && (
          <>
            <span className="price price--original">${product.price.original}</span>
            <span className="price__discount">{product.price.discount}% off</span>
          </>
        )}
      </div>
      
      <div className="product__description">
        <p>{product.description}</p>
      </div>
      
      <div className="product__options">
        <div className="option-group">
          <label className="option-group__label">Color</label>
          <div className="color-picker">
            {product.colors.map(color => (
              <label key={color.id} className="color-picker__option">
                <input
                  type="radio"
                  name="color"
                  value={color.id}
                  checked={selectedColor === color.id}
                  onChange={() => onColorChange(color.id)}
                  className="color-picker__input"
                />
                <span className={`color-picker__color color-picker__option--${color.id}`}></span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="option-group">
          <label className="option-group__label">Quantity</label>
          <div className="quantity-selector">
            <button 
              type="button" 
              className="quantity-selector__btn"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="number" 
              className="quantity-selector__input" 
              value={quantity} 
              min="1" 
              max={product.maxQuantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
            />
            <button 
              type="button" 
              className="quantity-selector__btn"
              onClick={() => onQuantityChange(Math.min(product.maxQuantity, quantity + 1))}
              disabled={quantity >= product.maxQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      <div className="product__actions">
        <button 
          className={`btn btn--primary btn--large ${isLoading ? 'btn--loading' : ''}`}
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
        <button 
          className="btn btn--secondary btn--large"
          onClick={handleWishlistToggle}
        >
          <span aria-hidden="true">{isInWishlist ? '♥' : '♡'}</span>
          <span className="btn__text">{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>
      
      <div className="product__features">
        {product.features.map(feature => (
          <div key={feature.id} className="feature">
            <span className="feature__icon" aria-hidden="true">{feature.icon}</span>
            <span className="feature__text">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};