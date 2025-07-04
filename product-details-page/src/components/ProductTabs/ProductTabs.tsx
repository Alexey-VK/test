import React, { useState } from 'react';
import { ProductTabsProps } from '../../types/product';

export const ProductTabs: React.FC<ProductTabsProps> = ({ specifications, reviews, shipping, rating }) => {
  const [activeTab, setActiveTab] = useState('specifications');

  const tabs = [
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' }
  ];

  return (
    <section className="product-details" aria-labelledby="details-heading">
      <div className="product-details__container">
        <h2 id="details-heading" className="sr-only">Product Details</h2>
        
        <div className="tabs" role="tablist" aria-label="Product information">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tabs__tab ${activeTab === tab.id ? 'tabs__tab--active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="tabs__content">
          {activeTab === 'specifications' && (
            <div id="specifications-panel" className="tabs__panel tabs__panel--active" role="tabpanel" aria-labelledby="specifications-tab">
              <div className="specifications">
                {specifications.map(specGroup => (
                  <div key={specGroup.category} className="spec-group">
                    <h3 className="spec-group__title">{specGroup.category}</h3>
                    <dl className="spec-list">
                      {specGroup.specs.map(spec => (
                        <React.Fragment key={spec.term}>
                          <dt className="spec-list__term">{spec.term}</dt>
                          <dd className="spec-list__desc">{spec.description}</dd>
                        </React.Fragment>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div id="reviews-panel" className="tabs__panel tabs__panel--active" role="tabpanel" aria-labelledby="reviews-tab">
              <div className="reviews" id="reviews">
                <div className="reviews__summary">
                  <div className="reviews__score">
                    <span className="reviews__score-number">{rating.score}</span>
                    <div className="reviews__score-stars" aria-label={`${rating.score} out of ${rating.maxScore} stars`}>★★★★★</div>
                    <span className="reviews__score-count">Based on {rating.reviewCount} reviews</span>
                  </div>
                </div>
                
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-item__header">
                      <strong className="review-item__author">{review.author}</strong>
                      <div className="review-item__rating" aria-label={`${review.rating} out of 5 stars`}>
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="review-item__text">{review.text}</p>
                    <time className="review-item__date" dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div id="shipping-panel" className="tabs__panel tabs__panel--active" role="tabpanel" aria-labelledby="shipping-tab">
              <div className="shipping-info">
                <h3>Shipping Options</h3>
                <ul>
                  {shipping.options.map((option, index) => (
                    <li key={index}>
                      <strong>{option.type}:</strong> {option.duration} 
                      {option.isFree ? ' (Free)' : ` ($${option.price})`}
                    </li>
                  ))}
                </ul>
                
                <h3>Return Policy</h3>
                <p>{shipping.returnPolicy}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};