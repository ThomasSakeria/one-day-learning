/**
 * Enhanced Image Loading System
 * Handles lazy loading, loading states, and error handling for course images
 */

class ImageLoader {
  constructor() {
    this.images = [];
    this.observer = null;
    this.init();
  }

  init() {
    // Initialize intersection observer for lazy loading
    this.setupIntersectionObserver();
    
    // Handle existing images
    this.loadExistingImages();
    
    // Handle dynamically added images (for filtered results)
    this.observeDynamicImages();
  }

  setupIntersectionObserver() {
    if (!window.IntersectionObserver) {
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before image comes into view
      threshold: 0.1
    });
  }

  loadExistingImages() {
    const courseImages = document.querySelectorAll('.course-image img');
    courseImages.forEach((img) => {
      this.setupImage(img);
    });
  }

  observeDynamicImages() {
    if (!window.MutationObserver) {
      return;
    }

    // Watch for new images added to the DOM (e.g., after filtering)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const newImages = node.querySelectorAll ? node.querySelectorAll('.course-image img') : [];
            newImages.forEach(img => {
              this.setupImage(img);
            });
          }
        });
      });
    });

    // Observe both courses grid and courses section
    const coursesGrid = document.getElementById('coursesGrid');
    const coursesSection = document.querySelector('.courses-section');
    
    if (coursesGrid) {
      observer.observe(coursesGrid, {
        childList: true,
        subtree: true
      });
    }
    
    if (coursesSection) {
      observer.observe(coursesSection, {
        childList: true,
        subtree: true
      });
    }
  }

  setupImage(img) {
    const imageContainer = img.parentElement;
    
    if (!imageContainer) {
      return;
    }
    
    // Add loading state
    imageContainer.classList.add('loading');
    
    // Check if image is already loaded
    if (img.complete && img.naturalWidth > 0) {
      this.handleImageLoad(img);
    } else {
      // Set up event listeners
      img.addEventListener('load', () => this.handleImageLoad(img));
      img.addEventListener('error', () => this.handleImageError(img));
      
      // Start observing for lazy loading if image has loading="lazy"
      if (img.getAttribute('loading') === 'lazy') {
        if (this.observer) {
          this.observer.observe(img);
        }
      } else {
        // For images without lazy loading, load immediately
        this.loadImage(img);
      }
    }
  }

  loadImage(img) {
    // For images that already have src, just trigger the load event
    if (img.src && img.src !== window.location.href) {
      // Image already has src, just check if it's loaded
      if (img.complete && img.naturalWidth > 0) {
        this.handleImageLoad(img);
      }
    } else {
      // If image has no src, set it from data-src
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        img.src = dataSrc;
      }
    }
  }

  handleImageLoad(img) {
    const imageContainer = img.parentElement;
    
    // Remove loading state and add loaded state
    imageContainer.classList.remove('loading');
    imageContainer.classList.add('loaded');
    
    // Add fade-in effect
    img.style.opacity = '0';
    setTimeout(() => {
      img.style.opacity = '1';
    }, 10);
  }

  handleImageError(img) {
    const imageContainer = img.parentElement;
    
    // Remove loading state and add error state
    imageContainer.classList.remove('loading');
    imageContainer.classList.add('error');
    
    // Hide the broken image
    img.style.display = 'none';
    
    // Remove any existing error message
    const existingError = imageContainer.querySelector('.image-error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'image-error-message';
    errorMessage.innerHTML = '<i class="fas fa-image"></i><span>Image not available</span>';
    errorMessage.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #6c757d;
      font-size: 0.9rem;
      z-index: 10;
    `;
    
    const icon = errorMessage.querySelector('i');
    icon.style.cssText = 'display: block; font-size: 2rem; margin-bottom: 0.5rem; color: #dee2e6;';
    
    imageContainer.appendChild(errorMessage);
  }

  // Public method to reload images (useful after filtering)
  reloadImages() {
    const courseImages = document.querySelectorAll('.course-image img');
    courseImages.forEach(img => {
      const imageContainer = img.parentElement;
      
      // Reset states
      imageContainer.classList.remove('loading', 'loaded', 'error');
      
      // Remove any error messages
      const errorMessage = imageContainer.querySelector('.image-error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
      
      // Show image again
      img.style.display = '';
      img.style.opacity = '';
      
      // Setup image again
      this.setupImage(img);
    });
  }
}

// Initialize image loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.imageLoader = new ImageLoader();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageLoader;
} 