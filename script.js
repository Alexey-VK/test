// Product Details Page JavaScript
// Implements accessibility-friendly interactions and functionality

class ProductPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupImageGallery();
        this.setupTabs();
        this.setupQuantitySelector();
        this.setupColorPicker();
        this.setupCart();
        this.setupKeyboardNavigation();
    }

    // Image Gallery Functionality
    setupImageGallery() {
        const thumbnails = document.querySelectorAll('.gallery__thumbnail');
        const mainImage = document.getElementById('main-product-image');
        
        if (!thumbnails.length || !mainImage) return;

        // Handle thumbnail clicks
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', (e) => {
                this.switchMainImage(thumbnail, mainImage);
            });

            // Keyboard navigation for gallery
            thumbnail.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.switchMainImage(thumbnail, mainImage);
                }
            });
        });

        // Zoom functionality
        const zoomButton = document.querySelector('.gallery__zoom');
        if (zoomButton) {
            zoomButton.addEventListener('click', () => {
                this.zoomImage(mainImage);
            });
        }
    }

    switchMainImage(thumbnail, mainImage) {
        // Remove active state from all thumbnails
        document.querySelectorAll('.gallery__thumbnail').forEach(thumb => {
            thumb.classList.remove('gallery__thumbnail--active');
            thumb.setAttribute('aria-selected', 'false');
        });

        // Add active state to clicked thumbnail
        thumbnail.classList.add('gallery__thumbnail--active');
        thumbnail.setAttribute('aria-selected', 'true');

        // Update main image
        const thumbnailImg = thumbnail.querySelector('img');
        if (thumbnailImg) {
            const newSrc = thumbnailImg.src.replace('w=100&h=100', 'w=600&h=600');
            mainImage.src = newSrc;
            mainImage.alt = thumbnailImg.alt.replace('thumbnail', 'main view');
        }
    }

    zoomImage(image) {
        // Simple zoom implementation - could be enhanced with a modal
        if (image.style.transform === 'scale(2)') {
            image.style.transform = 'scale(1)';
            image.style.cursor = 'zoom-in';
        } else {
            image.style.transform = 'scale(2)';
            image.style.cursor = 'zoom-out';
        }
    }

    // Tab Navigation Functionality
    setupTabs() {
        const tabs = document.querySelectorAll('.tabs__tab');
        const panels = document.querySelectorAll('.tabs__panel');

        if (!tabs.length || !panels.length) return;

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.switchTab(tab, tabs, panels);
            });

            // Keyboard navigation for tabs
            tab.addEventListener('keydown', (e) => {
                this.handleTabKeydown(e, tabs, index);
            });
        });
    }

    switchTab(activeTab, allTabs, allPanels) {
        const targetPanelId = activeTab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetPanelId);

        if (!targetPanel) return;

        // Update tab states
        allTabs.forEach(tab => {
            tab.classList.remove('tabs__tab--active');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        });

        // Update panel states
        allPanels.forEach(panel => {
            panel.classList.remove('tabs__panel--active');
        });

        // Activate selected tab and panel
        activeTab.classList.add('tabs__tab--active');
        activeTab.setAttribute('aria-selected', 'true');
        activeTab.setAttribute('tabindex', '0');
        targetPanel.classList.add('tabs__panel--active');

        // Announce change to screen readers
        this.announceToScreenReader(`${activeTab.textContent} tab selected`);
    }

    handleTabKeydown(e, tabs, currentIndex) {
        let newIndex = currentIndex;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                break;
            case 'ArrowRight':
                e.preventDefault();
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = tabs.length - 1;
                break;
            default:
                return;
        }

        tabs[newIndex].focus();
        this.switchTab(tabs[newIndex], tabs, document.querySelectorAll('.tabs__panel'));
    }

    // Quantity Selector Functionality
    setupQuantitySelector() {
        const decreaseBtn = document.querySelector('.quantity-selector__btn:first-child');
        const increaseBtn = document.querySelector('.quantity-selector__btn:last-child');
        const quantityInput = document.querySelector('.quantity-selector__input');

        if (!decreaseBtn || !increaseBtn || !quantityInput) return;

        decreaseBtn.addEventListener('click', () => {
            this.updateQuantity(quantityInput, -1);
        });

        increaseBtn.addEventListener('click', () => {
            this.updateQuantity(quantityInput, 1);
        });

        // Handle direct input changes
        quantityInput.addEventListener('change', (e) => {
            this.validateQuantity(e.target);
        });

        quantityInput.addEventListener('blur', (e) => {
            this.validateQuantity(e.target);
        });
    }

    updateQuantity(input, change) {
        const currentValue = parseInt(input.value) || 1;
        const min = parseInt(input.getAttribute('min')) || 1;
        const max = parseInt(input.getAttribute('max')) || 10;
        
        let newValue = currentValue + change;
        newValue = Math.max(min, Math.min(max, newValue));
        
        input.value = newValue;
        this.announceToScreenReader(`Quantity: ${newValue}`);
    }

    validateQuantity(input) {
        const value = parseInt(input.value);
        const min = parseInt(input.getAttribute('min')) || 1;
        const max = parseInt(input.getAttribute('max')) || 10;

        if (isNaN(value) || value < min) {
            input.value = min;
        } else if (value > max) {
            input.value = max;
        }
    }

    // Color Picker Functionality
    setupColorPicker() {
        const colorInputs = document.querySelectorAll('.color-picker__input');
        
        colorInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.updateSelectedColor(e.target);
                }
            });
        });
    }

    updateSelectedColor(selectedInput) {
        const colorName = selectedInput.nextElementSibling.getAttribute('aria-label');
        this.announceToScreenReader(`Color selected: ${colorName}`);

        // Update main product image based on color selection (if different images exist)
        // This could be enhanced to switch to color-specific product images
        const mainImage = document.getElementById('main-product-image');
        if (mainImage && selectedInput.value) {
            // Example: Update image URL based on color
            // mainImage.src = mainImage.src.replace(/color=\w+/, `color=${selectedInput.value}`);
        }
    }

    // Cart Functionality
    setupCart() {
        const addToCartBtn = document.querySelector('.btn--primary');
        const wishlistBtn = document.querySelector('.btn--secondary');
        const cartCountElement = document.querySelector('.cart__count');

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCart(cartCountElement);
            });
        }

        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                this.toggleWishlist(wishlistBtn);
            });
        }
    }

    addToCart(cartCountElement) {
        const quantity = parseInt(document.querySelector('.quantity-selector__input').value) || 1;
        const selectedColor = document.querySelector('.color-picker__input:checked');
        const colorName = selectedColor ? selectedColor.nextElementSibling.getAttribute('aria-label') : 'Default';
        
        // Simulate adding to cart
        const currentCount = parseInt(cartCountElement.textContent) || 0;
        const newCount = currentCount + quantity;
        cartCountElement.textContent = newCount;

        // Update cart button accessibility label
        const cartButton = document.querySelector('.header__cart');
        if (cartButton) {
            cartButton.setAttribute('aria-label', `Shopping cart (${newCount} items)`);
        }

        // Show success feedback
        this.showFeedback('Product added to cart successfully!', 'success');
        this.announceToScreenReader(`${quantity} item${quantity > 1 ? 's' : ''} added to cart. Cart now has ${newCount} item${newCount > 1 ? 's' : ''}.`);
    }

    toggleWishlist(wishlistBtn) {
        const icon = wishlistBtn.querySelector('span[aria-hidden]');
        const isInWishlist = icon.textContent === '♥';
        
        if (isInWishlist) {
            icon.textContent = '♡';
            wishlistBtn.setAttribute('aria-label', 'Add to wishlist');
            this.showFeedback('Removed from wishlist', 'info');
        } else {
            icon.textContent = '♥';
            wishlistBtn.setAttribute('aria-label', 'Remove from wishlist');
            this.showFeedback('Added to wishlist', 'success');
        }
    }

    // Keyboard Navigation Enhancement
    setupKeyboardNavigation() {
        // Improve focus management for complex components
        this.setupFocusTrap();
        this.setupSkipLinks();
    }

    setupFocusTrap() {
        // Add focus trap for modal dialogs (if implemented)
        // This is a placeholder for future modal implementations
    }

    setupSkipLinks() {
        // Add skip link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add id to main content for skip link
        const main = document.querySelector('.main');
        if (main) {
            main.id = 'main-content';
        }
    }

    // Utility Functions
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    showFeedback(message, type = 'info') {
        // Create and show a temporary feedback message
        const feedback = document.createElement('div');
        feedback.className = `feedback feedback--${type}`;
        feedback.textContent = message;
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        
        // Style the feedback element
        Object.assign(feedback.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(feedback);
        
        // Animate in
        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (feedback.parentNode) {
                    document.body.removeChild(feedback);
                }
            }, 300);
        }, 3000);
    }

    // Responsive Image Loading
    setupResponsiveImages() {
        // Implement lazy loading and responsive images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// Initialize the product page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductPage();
});

// Handle resize events for responsive behavior
window.addEventListener('resize', debounce(() => {
    // Handle any resize-specific logic here
}, 250));

// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}