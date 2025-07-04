import React from 'react';
import { FooterProps } from '../../types/product';

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">AudioTech</h3>
            <p className="footer__text">Premium audio equipment for music enthusiasts worldwide.</p>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__subtitle">Quick Links</h4>
            <ul className="footer__list">
              <li><a href="#" className="footer__link">About Us</a></li>
              <li><a href="#" className="footer__link">Products</a></li>
              <li><a href="#" className="footer__link">Support</a></li>
              <li><a href="#" className="footer__link">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__subtitle">Customer Service</h4>
            <ul className="footer__list">
              <li><a href="#" className="footer__link">Shipping Info</a></li>
              <li><a href="#" className="footer__link">Returns</a></li>
              <li><a href="#" className="footer__link">Warranty</a></li>
              <li><a href="#" className="footer__link">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">&copy; 2024 AudioTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};