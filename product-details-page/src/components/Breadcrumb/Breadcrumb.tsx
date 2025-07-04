import React from 'react';
import { BreadcrumbProps } from '../../types/product';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb navigation">
      <div className="breadcrumb__container">
        <ol className="breadcrumb__list">
          {items.map((item, index) => (
            <li 
              key={index} 
              className={`breadcrumb__item ${item.current ? 'breadcrumb__item--current' : ''}`}
              {...(item.current && { 'aria-current': 'page' })}
            >
              {item.current ? (
                <span className="breadcrumb__text">{item.label}</span>
              ) : (
                <a href={item.href} className="breadcrumb__link">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};