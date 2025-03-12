// Carousel Elements
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.querySelectorAll('.dot');
const slideInterval = 5000; // Change slide every 5 seconds

// DOM Elements
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuTabs = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelector('.menu-items');
const reviewsSlider = document.querySelector('.reviews-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contactForm = document.getElementById('contactForm');

let currentSlide = 0;

// Function to show carousel slide
function showCarouselSlide(index) {
    // Remove active class from all slides and dots
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));
    
    // Handle index wrapping
    currentSlide = index;
    if (currentSlide >= carouselSlides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = carouselSlides.length - 1;
    
    // Add active class to current slide and dot
    carouselSlides[currentSlide].classList.add('active');
    carouselDots[currentSlide].classList.add('active');
}

// Event listeners for dots
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showCarouselSlide(index);
    });
});

// Auto advance slides
let slideTimer = setInterval(() => {
    showCarouselSlide(currentSlide + 1);
}, slideInterval);

// Pause auto-advance on hover
const carousel = document.querySelector('.hero-carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(slideTimer);
});

carousel.addEventListener('mouseleave', () => {
    slideTimer = setInterval(() => {
        showCarouselSlide(currentSlide + 1);
    }, slideInterval);
});

// Initialize first slide
showCarouselSlide(0);

// Sample Data
const menuData = {
    starters: [
        { name: 'Bruschetta', price: '$8.99', image: 'images/bruschetta.jpg', description: 'Toasted bread with fresh tomatoes and herbs' },
        { name: 'Calamari', price: '$12.99', image: 'images/calamari.jpg', description: 'Crispy fried squid with marinara sauce' },
        // Add more items
    ],
    main: [
        { name: 'Grilled Salmon', price: '$24.99', image: 'images/salmon.jpg', description: 'Fresh salmon with seasonal vegetables' },
        { name: 'Beef Tenderloin', price: '$29.99', image: 'images/beef.jpg', description: 'Premium cut with red wine sauce' },
        // Add more items
    ],
    desserts: [
        { name: 'Tiramisu', price: '$8.99', image: 'images/tiramisu.jpg', description: 'Classic Italian dessert' },
        { name: 'Chocolate Lava Cake', price: '$9.99', image: 'images/lava-cake.jpg', description: 'Warm chocolate cake with vanilla ice cream' },
        // Add more items
    ],
    beverages: [
        { name: 'House Wine', price: '$7.99', image: 'images/wine.jpg', description: 'Red or white wine' },
        { name: 'Craft Cocktails', price: '$12.99', image: 'images/cocktail.jpg', description: 'Signature mixed drinks' },
        // Add more items
    ]
};

const reviews = [
    {
        name: 'John Doe',
        rating: 5,
        text: 'Amazing food and atmosphere! Will definitely come back.',
        image: 'images/review1.jpg'
    },
    {
        name: 'Jane Smith',
        rating: 4,
        text: 'Great service and delicious dishes. Highly recommended!',
        image: 'images/review2.jpg'
    },
    // Add more reviews
];

// Sticky Header
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Menu Tabs
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Display menu items for selected category
        const category = tab.dataset.category;
        displayMenuItems(category);
    });
});

// Display Menu Items
function displayMenuItems(category) {
    const items = menuData[category];
    menuItems.innerHTML = items.map(item => `
        <div class="menu-item" style="opacity: 0">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <div class="item-header">
                    <h3>${item.name}</h3>
                    <span class="price">${item.price}</span>
                </div>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');

    // Animate items
    const menuItemElements = document.querySelectorAll('.menu-item');
    menuItemElements.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize menu with first category
displayMenuItems('starters');

// Function to show review slide
function showReviewSlide(index) {
    const totalSlides = reviews.length;
    if (index >= totalSlides) currentSlide = 0;
    if (index < 0) currentSlide = totalSlides - 1;

    reviewsSlider.innerHTML = `
        <div class="review-card">
            <img src="${reviews[currentSlide].image}" alt="${reviews[currentSlide].name}">
            <h3>${reviews[currentSlide].name}</h3>
            <div class="stars">
                ${'★'.repeat(reviews[currentSlide].rating)}${'☆'.repeat(5 - reviews[currentSlide].rating)}
            </div>
            <p>${reviews[currentSlide].text}</p>
        </div>
    `;
}

// Initialize first slide
showReviewSlide(currentSlide);

// Slider Controls
prevBtn.addEventListener('click', () => showReviewSlide(--currentSlide));
nextBtn.addEventListener('click', () => showReviewSlide(++currentSlide));

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="close-lightbox">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        setTimeout(() => lightbox.classList.add('active'), 50);
        
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.remove(), 300);
        };
        
        lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    });
});
