# Product Details Page

A modern, accessible, and responsive product details page built with HTML, CSS, and JavaScript following web development best practices.

## 🚀 Features

### Core Functionality
- **Product Image Gallery** with thumbnail navigation and zoom functionality
- **Interactive Tabs** for specifications, reviews, and shipping information
- **Color Selection** with visual color picker
- **Quantity Selector** with increment/decrement controls
- **Add to Cart & Wishlist** functionality
- **Responsive Rating System** with customer reviews

### Design & UX
- **Mobile-First Responsive Design** adapting to all screen sizes
- **Modern UI Components** with clean and intuitive interface
- **Smooth Animations** and hover effects
- **Professional Typography** using Inter font family
- **Consistent Color Scheme** with proper contrast ratios

### Accessibility (WCAG 2.1 AA Compliant)
- **Semantic HTML** structure with proper landmarks
- **ARIA Labels** and attributes for screen readers
- **Keyboard Navigation** support for all interactive elements
- **Focus Management** with visible focus indicators
- **Screen Reader Announcements** for dynamic content changes
- **Skip Links** for keyboard users
- **High Contrast Mode** support
- **Reduced Motion** preferences respected

### Technical Implementation
- **BEM CSS Methodology** for maintainable and scalable styles
- **Modern JavaScript (ES6+)** with class-based architecture
- **Progressive Enhancement** ensuring functionality without JavaScript
- **Performance Optimized** with efficient CSS and JavaScript
- **Cross-Browser Compatible** supporting all modern browsers

## 📁 Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive CSS with BEM methodology
├── script.js           # Interactive functionality
└── README.md           # This documentation
```

## 🎨 CSS Architecture

### BEM Methodology
The project follows BEM (Block Element Modifier) naming convention:

```css
/* Block */
.product { }

/* Element */
.product__title { }
.product__gallery { }

/* Modifier */
.product__title--large { }
.btn--primary { }
```

### Responsive Breakpoints
- **Mobile**: < 768px (base styles)
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1199px
- **Large Desktop**: ≥ 1200px

### CSS Features
- Mobile-first approach with min-width media queries
- CSS Grid and Flexbox for layout
- Custom properties for maintainable theming
- Smooth transitions and animations
- Print styles optimization

## 🔧 JavaScript Features

### Modular Architecture
The JavaScript is organized in a class-based structure for better maintainability:

```javascript
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
}
```

### Key Functionalities

#### Image Gallery
- Thumbnail click to change main image
- Keyboard navigation (Enter/Space)
- Zoom functionality with visual feedback
- Proper ARIA attributes for accessibility

#### Tab Navigation
- ARIA tabs pattern implementation
- Keyboard navigation (Arrow keys, Home, End)
- Screen reader announcements
- Focus management

#### Interactive Controls
- Quantity selector with validation
- Color picker with accessibility support
- Cart functionality with visual feedback
- Wishlist toggle

## 🌐 Browser Support

- **Chrome** 70+
- **Firefox** 65+
- **Safari** 12+
- **Edge** 79+

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked product information
- Touch-friendly interactive elements
- Optimized typography and spacing

### Tablet (768px - 1023px)
- Two-column grid layout
- Enhanced navigation visibility
- Improved thumbnail gallery layout

### Desktop (1024px+)
- Multi-column layouts
- Enhanced hover effects
- Optimized for mouse and keyboard interaction
- Maximum content width for readability

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Perceivable**: High contrast ratios, alternative text for images
- **Operable**: Keyboard accessible, no seizure-inducing content
- **Understandable**: Clear navigation, consistent interface
- **Robust**: Valid HTML, works with assistive technologies

### Screen Reader Support
- Semantic HTML structure
- ARIA landmarks and labels
- Live regions for dynamic content
- Descriptive alt text for images

### Keyboard Navigation
- Tab order follows logical flow
- All interactive elements accessible via keyboard
- Visual focus indicators
- Skip links for efficient navigation

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **Test** the responsive design by resizing the browser window
4. **Validate** accessibility using browser dev tools or screen readers

### Local Development
```bash
# Serve the files using a local server (optional)
npx serve .
# or
python -m http.server 8000
```

## 🔍 Testing

### Manual Testing Checklist
- [ ] Responsive design on different screen sizes
- [ ] Image gallery thumbnail navigation
- [ ] Tab switching functionality
- [ ] Color picker selection
- [ ] Quantity selector controls
- [ ] Add to cart functionality
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

### Accessibility Testing
- Use browser dev tools accessibility audit
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Validate HTML markup
- Check color contrast ratios
- Test keyboard-only navigation

## 🛠️ Customization

### Colors and Branding
Modify CSS custom properties in the `:root` selector:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background-color: #ffffff;
    --text-color: #333333;
}
```

### Typography
Update font families in the body selector:

```css
body {
    font-family: 'Inter', system-ui, sans-serif;
}
```

### Layout
Adjust grid layouts and breakpoints in media queries for different responsive behavior.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For questions or support, please open an issue in the project repository.

---

**Built with ❤️ using modern web standards and accessibility best practices.**