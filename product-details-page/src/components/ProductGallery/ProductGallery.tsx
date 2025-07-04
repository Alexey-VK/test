import React, { useState } from 'react';
import { ProductGalleryProps } from '../../types/product';

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const mainImage = images[activeImageIndex] || images[0];

  return (
    <div className="product__gallery">
      <div className="gallery">
        <div className="gallery__main">
          <img 
            src={mainImage.src} 
            alt={mainImage.alt} 
            className="gallery__main-image"
            id="main-product-image"
          />
          <button className="gallery__zoom" aria-label="Zoom image">
            <span aria-hidden="true">🔍</span>
          </button>
        </div>
        
        <div className="gallery__thumbnails" role="tablist" aria-label="Product image gallery">
          {images.map((image, index) => (
            <button 
              key={image.id}
              className={`gallery__thumbnail ${index === activeImageIndex ? 'gallery__thumbnail--active' : ''}`}
              role="tab" 
              aria-selected={index === activeImageIndex}
              aria-controls="main-product-image"
              aria-label={`View ${image.alt}`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img src={image.src.replace('w=600&h=600', 'w=100&h=100')} alt={`${image.alt} thumbnail`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};