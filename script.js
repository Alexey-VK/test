// Product Details Page Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initImageGallery();
    initQuantitySelector();
    initTabs();
    initMobileNavigation();
    initColorSelector();
    initAddToCart();
    initAccessibility();
});

/**
 * Image Gallery Functionality
 */
function initImageGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.gallery__thumbnail');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const newImageSrc = this.dataset.image;
            const newImageAlt = this.querySelector('img').alt;

            // Update main image
            mainImage.src = newImageSrc;
            mainImage.alt = newImageAlt;

            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('gallery__thumbnail--active'));
            this.classList.add('gallery__thumbnail--active');

            // Announce change to screen readers
            announceToScreenReader(`Image changed to ${newImageAlt}`);
        });

        // Keyboard support for thumbnails
        thumbnail.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Quantity Selector Functionality
 */
function initQuantitySelector() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.querySelector('.quantity-selector__btn--decrease');
    const increaseBtn = document.querySelector('.quantity-selector__btn--increase');

    if (!quantityInput || !decreaseBtn || !increaseBtn) return;

    decreaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        const minValue = parseInt(quantityInput.min) || 1;
        
        if (currentValue > minValue) {
            quantityInput.value = currentValue - 1;
            announceToScreenReader(`Quantity decreased to ${quantityInput.value}`);
        }
    });

    increaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        const maxValue = parseInt(quantityInput.max) || 10;
        
        if (currentValue < maxValue) {
            quantityInput.value = currentValue + 1;
            announceToScreenReader(`Quantity increased to ${quantityInput.value}`);
        }
    });

    // Validate manual input
    quantityInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        const min = parseInt(this.min) || 1;
        const max = parseInt(this.max) || 10;

        if (isNaN(value) || value < min) {
            this.value = min;
        } else if (value > max) {
            this.value = max;
        }
    });
}

/**
 * Tabs Functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tabs__tab');
    const tabPanels = document.querySelectorAll('.tabs__panel');

    if (tabButtons.length === 0 || tabPanels.length === 0) return;

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const targetPanelId = this.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetPanelId);

            if (!targetPanel) return;

            // Remove active states
            tabButtons.forEach(btn => {
                btn.classList.remove('tabs__tab--active');
                btn.setAttribute('aria-selected', 'false');
            });
            
            tabPanels.forEach(panel => {
                panel.classList.remove('tabs__panel--active');
            });

            // Add active states
            this.classList.add('tabs__tab--active');
            this.setAttribute('aria-selected', 'true');
            targetPanel.classList.add('tabs__panel--active');

            // Focus management
            targetPanel.focus();
            
            // Announce change to screen readers
            announceToScreenReader(`${this.textContent} tab selected`);
        });

        // Keyboard navigation for tabs
        button.addEventListener('keydown', function(e) {
            let targetButton;

            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    targetButton = tabButtons[index + 1] || tabButtons[0];
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    targetButton = tabButtons[index - 1] || tabButtons[tabButtons.length - 1];
                    break;
                case 'Home':
                    e.preventDefault();
                    targetButton = tabButtons[0];
                    break;
                case 'End':
                    e.preventDefault();
                    targetButton = tabButtons[tabButtons.length - 1];
                    break;
            }

            if (targetButton) {
                targetButton.focus();
                targetButton.click();
            }
        });
    });
}

/**
 * Mobile Navigation Functionality
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle states
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('nav__menu--active');
        
        // Toggle hamburger animation
        this.classList.toggle('nav__toggle--active');

        // Manage focus
        if (!isExpanded) {
            // Menu is opening - focus first link
            const firstLink = navMenu.querySelector('.nav__link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }

        // Announce state change
        announceToScreenReader(isExpanded ? 'Navigation menu closed' : 'Navigation menu opened');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('nav__menu--active');
            navToggle.classList.remove('nav__toggle--active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('nav__menu--active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('nav__menu--active');
            navToggle.classList.remove('nav__toggle--active');
            navToggle.focus();
        }
    });
}

/**
 * Color Selector Functionality
 */
function initColorSelector() {
    const colorInputs = document.querySelectorAll('.color-selector__input');
    
    if (colorInputs.length === 0) return;

    colorInputs.forEach(input => {
        input.addEventListener('change', function() {
            const colorName = this.value;
            const colorLabel = this.getAttribute('aria-label');
            
            // Update product images based on color selection
            updateProductImagesForColor(colorName);
            
            // Announce change
            announceToScreenReader(`${colorLabel} color selected`);
        });
    });
}

/**
 * Add to Cart Functionality
 */
function initAddToCart() {
    const addToCartBtn = document.querySelector('.btn--primary');
    const wishlistBtn = document.querySelector('.btn--secondary');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = document.getElementById('quantity')?.value || 1;
            const selectedColor = document.querySelector('.color-selector__input:checked')?.value || 'black';
            
            // Simulate adding to cart
            addToCart(quantity, selectedColor);
            
            // Provide feedback
            this.textContent = 'Added to Cart!';
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);

            announceToScreenReader(`${quantity} item(s) added to cart in ${selectedColor} color`);
        });
    }

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const isAdded = this.textContent.includes('Added');
            
            if (isAdded) {
                this.innerHTML = '♡ Wishlist';
                announceToScreenReader('Item removed from wishlist');
            } else {
                this.innerHTML = '♥ Added to Wishlist';
                announceToScreenReader('Item added to wishlist');
            }
        });
    }
}

/**
 * Accessibility Enhancements
 */
function initAccessibility() {
    // Add skip link
    addSkipLink();
    
    // Enhance focus management
    enhanceFocusManagement();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
}

/**
 * Helper function to update product images based on color
 */
function updateProductImagesForColor(color) {
    // This would typically update images based on the selected color
    // For demo purposes, we'll just log the selection
    console.log(`Color changed to: ${color}`);
    
    // In a real implementation, you would:
    // 1. Update the main image src
    // 2. Update thumbnail images
    // 3. Possibly change the image alt text
}

/**
 * Helper function to simulate adding to cart
 */
function addToCart(quantity, color) {
    // This would typically make an API call to add the item to cart
    console.log(`Added ${quantity} item(s) in ${color} to cart`);
    
    // Update cart count in navigation
    const cartLink = document.querySelector('.nav__link[href="#"]:last-child');
    if (cartLink) {
        const currentCount = parseInt(cartLink.textContent.match(/\d+/) || [0])[0];
        const newCount = currentCount + parseInt(quantity);
        cartLink.textContent = `Cart (${newCount})`;
    }
}

/**
 * Helper function to announce changes to screen readers
 */
function announceToScreenReader(message) {
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

/**
 * Add skip link for accessibility
 */
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    
    // Add ID to main content
    const main = document.querySelector('.main');
    if (main) {
        main.id = 'main-content';
        main.setAttribute('tabindex', '-1');
    }
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Enhance focus management
 */
function enhanceFocusManagement() {
    // Add focus indicators for custom elements
    const customFocusElements = document.querySelectorAll('.gallery__thumbnail, .color-selector__option');
    
    customFocusElements.forEach(element => {
        element.setAttribute('tabindex', '0');
    });
}

/**
 * Add keyboard shortcuts
 */
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Only trigger when not focused on input elements
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case 'c':
                // Focus on add to cart button
                if (e.altKey) {
                    e.preventDefault();
                    const addToCartBtn = document.querySelector('.btn--primary');
                    if (addToCartBtn) addToCartBtn.focus();
                }
                break;
            case 'w':
                // Focus on wishlist button
                if (e.altKey) {
                    e.preventDefault();
                    const wishlistBtn = document.querySelector('.btn--secondary');
                    if (wishlistBtn) wishlistBtn.focus();
                }
                break;
            case 'i':
                // Focus on main product image
                if (e.altKey) {
                    e.preventDefault();
                    const mainImage = document.getElementById('main-image');
                    if (mainImage) mainImage.focus();
                }
                break;
        }
    });
}

/**
 * Smooth scroll polyfill for older browsers
 */
function smoothScrollPolyfill() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize smooth scroll
smoothScrollPolyfill();

// Intersection Observer for animations (progressive enhancement)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.product-card, .review, .tabs__panel');
    animateElements.forEach(el => observer.observe(el));
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Add lazy loading to images that aren't immediately visible
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}