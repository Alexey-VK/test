import React from 'react';
import { HeaderProps } from '../../types/product';

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="header" role="banner">
      <div className="header__container">
        <div className="header__logo">
          <a href="#" className="header__logo-link" aria-label="AudioTech Home">
            <span className="header__logo-text">AudioTech</span>
          </a>
        </div>
        
        <nav className="header__nav" role="navigation" aria-label="Main navigation">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#" className="nav__link">Products</a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">About</a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">Support</a>
            </li>
          </ul>
        </nav>
        
        <div className="header__actions">
          <button 
            className="header__cart" 
            aria-label={`Shopping cart (${cartItemCount} item${cartItemCount !== 1 ? 's' : ''})`}
            onClick={onCartClick}
          >
            <span className="cart__icon" aria-hidden="true">🛒</span>
            <span className="cart__count">{cartItemCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};