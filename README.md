# Product Details Page

A responsive, accessible product details page built with HTML, CSS, and JavaScript following modern web development best practices.

## Features

### 🎨 Design & Layout
- **Mobile-first responsive design** - Optimized for all devices from mobile to desktop
- **Clean, modern UI** - Professional e-commerce product page design
- **Interactive image gallery** - Thumbnail navigation with smooth transitions
- **Product customization** - Color selection and quantity controls
- **Tabbed content** - Description, specifications, and reviews sections
- **Related products** - Showcasing additional items

### ♿ Accessibility (WCAG 2.1 AA Compliant)
- **Semantic HTML** - Proper heading hierarchy and landmark regions
- **Keyboard navigation** - Full functionality accessible via keyboard
- **Screen reader support** - ARIA labels, live regions, and announcements
- **Focus management** - Clear focus indicators and logical tab order
- **High contrast support** - Respects user's contrast preferences
- **Reduced motion support** - Honors user's motion preferences
- **Skip links** - Quick navigation to main content
- **Keyboard shortcuts** - Alt+C (cart), Alt+W (wishlist), Alt+I (image)

### 🏗️ Architecture
- **BEM methodology** - Consistent, maintainable CSS naming convention
- **Component-based structure** - Reusable, modular components
- **Progressive enhancement** - Graceful degradation for older browsers
- **Performance optimized** - Intersection Observer API for lazy loading
- **Responsive images** - Optimized images from Unsplash

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # CSS with BEM methodology
├── script.js           # Interactive functionality
├── README.md           # Project documentation
└── js/
    └── invoice.js      # Legacy file (unrelated to this project)
```

## BEM Methodology

This project follows the **Block Element Modifier (BEM)** naming convention:

### Blocks
- `.header` - Site header
- `.nav` - Navigation menu
- `.breadcrumb` - Breadcrumb navigation
- `.product` - Main product section
- `.gallery` - Image gallery
- `.tabs` - Tabbed content
- `.footer` - Site footer

### Elements
- `.header__container` - Header wrapper
- `.nav__toggle` - Mobile menu toggle
- `.gallery__thumbnail` - Image thumbnail
- `.product-info__title` - Product title
- `.tabs__panel` - Tab content panel

### Modifiers
- `.nav__menu--active` - Active navigation state
- `.gallery__thumbnail--active` - Selected thumbnail
- `.tabs__tab--active` - Active tab
- `.btn--primary` - Primary button style
- `.btn--secondary` - Secondary button style

## Components

### 1. Header Component
```css
.header { /* Block */ }
.header__container { /* Element */ }
.header__logo { /* Element */ }
```

### 2. Navigation Component
```css
.nav { /* Block */ }
.nav__toggle { /* Element */ }
.nav__menu { /* Element */ }
.nav__menu--active { /* Modifier */ }
.nav__item { /* Element */ }
.nav__link { /* Element */ }
```

### 3. Product Gallery Component
```css
.gallery { /* Block */ }
.gallery__main { /* Element */ }
.gallery__main-image { /* Element */ }
.gallery__thumbnails { /* Element */ }
.gallery__thumbnail { /* Element */ }
.gallery__thumbnail--active { /* Modifier */ }
```

### 4. Button Component
```css
.btn { /* Block */ }
.btn--primary { /* Modifier */ }
.btn--secondary { /* Modifier */ }
.btn--large { /* Modifier */ }
```

## Responsive Breakpoints

The design uses a mobile-first approach with the following breakpoints:

```css
/* Mobile First (default) */
/* Small screens: 480px+ */
@media (min-width: 30em) { }

/* Medium screens: 768px+ */
@media (min-width: 48em) { }

/* Large screens: 1024px+ */
@media (min-width: 64em) { }

/* Extra large: 1200px+ */
@media (min-width: 75em) { }
```

## JavaScript Functionality

### Interactive Features
- **Image Gallery**: Click/keyboard navigation through product images
- **Quantity Selector**: Increase/decrease product quantity
- **Color Selection**: Choose product color variants
- **Tab Navigation**: Switch between description, specs, and reviews
- **Mobile Menu**: Responsive navigation toggle
- **Add to Cart**: Simulated cart functionality with feedback
- **Wishlist**: Toggle wishlist state

### Accessibility Features
- **Keyboard Navigation**: Arrow keys for tabs, Enter/Space for activation
- **Screen Reader Announcements**: Live regions for dynamic content updates
- **Focus Management**: Logical focus order and visual indicators
- **ARIA Attributes**: Proper labeling and state management

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Graceful Degradation**: Fallbacks for unsupported features
- **Intersection Observer**: Used with feature detection

## Performance Optimizations

### CSS
- **Critical CSS**: Above-the-fold styles optimized
- **Efficient Selectors**: Minimal nesting and specificity
- **Media Queries**: Mobile-first approach reduces CSS size

### JavaScript
- **Event Delegation**: Efficient event handling
- **Intersection Observer**: Lazy loading and animations
- **Debounced Events**: Optimized scroll and resize handlers
- **Progressive Enhancement**: Non-blocking feature detection

### Images
- **Responsive Images**: Multiple sizes for different devices
- **Lazy Loading**: Off-screen images loaded on demand
- **Optimized Sources**: WebP format with fallbacks

## Accessibility Compliance

This project meets **WCAG 2.1 AA** standards:

### Level A
- ✅ Keyboard accessible
- ✅ No seizure-inducing content
- ✅ Content can be presented in different ways
- ✅ Time-independent access

### Level AA
- ✅ Color contrast ratio > 4.5:1
- ✅ Text can be resized up to 200%
- ✅ Images have alternative text
- ✅ Focus is visible and logical

### Additional Features
- ✅ Skip links for keyboard users
- ✅ ARIA landmarks and labels
- ✅ Screen reader announcements
- ✅ High contrast mode support
- ✅ Reduced motion support

## Usage

1. **Open the page**: Open `index.html` in a web browser
2. **Navigate**: Use mouse, keyboard, or touch to interact
3. **Test accessibility**: Try keyboard-only navigation (Tab, Enter, Arrow keys)
4. **Test responsiveness**: Resize browser or use device emulation
5. **Test features**: Try image gallery, tabs, quantity selector, and add to cart

### Keyboard Shortcuts
- **Tab/Shift+Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate tabs and image thumbnails
- **Alt+C**: Focus add to cart button
- **Alt+W**: Focus wishlist button
- **Alt+I**: Focus main product image
- **Escape**: Close mobile menu

## Development

### Adding New Components
1. Create the HTML structure with semantic elements
2. Style using BEM naming convention:
   ```css
   .component { }
   .component__element { }
   .component__element--modifier { }
   ```
3. Add JavaScript functionality if needed
4. Test keyboard navigation and screen reader compatibility

### Customization
- **Colors**: Update CSS custom properties in the root
- **Fonts**: Modify the font-family stack in body styles
- **Breakpoints**: Adjust media queries for different layouts
- **Images**: Replace Unsplash URLs with your own images

## Browser Testing

Tested and verified on:
- Chrome 120+ ✅
- Firefox 119+ ✅
- Safari 17+ ✅
- Edge 119+ ✅
- Mobile browsers ✅

## License

This project is open source and available under the MIT License.

## Credits

- **Images**: Provided by Unsplash
- **Icons**: Unicode emoji characters
- **Fonts**: System font stack for optimal performance