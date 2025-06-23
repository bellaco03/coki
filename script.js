document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = navLinks.style.display === 'flex';
        
        if (isOpen) {
            navLinks.style.display = 'none';
            navActions.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            navLinks.style.display = 'flex';
            navActions.style.display = 'flex';
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            
            // Adjust for mobile
            if (window.innerWidth <= 768) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                
                navActions.style.flexDirection = 'column';
                navActions.style.position = 'absolute';
                navActions.style.top = 'calc(100% + 200px)';
                navActions.style.left = '0';
                navActions.style.width = '100%';
                navActions.style.padding = '1rem';
                navActions.style.gap = '0.5rem';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navActions.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.width = 'auto';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
            
            navActions.style.flexDirection = 'row';
            navActions.style.position = 'static';
            navActions.style.width = 'auto';
            navActions.style.padding = '0';
            navActions.style.gap = '0.75rem';
            
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                navActions.style.display = 'none';
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    navActions.style.display = 'none';
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        testimonialSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });
        
        testimonialSlider.addEventListener('touchend', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Product card hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const productInfo = this.querySelector('.product-info');
            if (productInfo) {
                productInfo.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const productInfo = this.querySelector('.product-info');
            if (productInfo) {
                productInfo.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add to cart functionality (simplified)
    const addToCartButtons = document.querySelectorAll('.btn.secondary.sm');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // In a real implementation, you would add to a cart array or send to server
            console.log(Added to cart: ${productName});
            
            // Visual feedback
            this.textContent = '¡Agregado!';
            this.style.backgroundColor = 'var(--success-color)';
            this.style.borderColor = 'var(--success-color)';
            
            setTimeout(() => {
                this.textContent = 'Agregar al carrito';
                this.style.backgroundColor = '';
                this.style.borderColor = '';
            }, 2000);
        });
    });
});