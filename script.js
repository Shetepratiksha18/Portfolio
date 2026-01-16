// DOM Elements
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling and Active Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(nav => nav.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Smooth scroll to target section
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Update active navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing Animation
const typedTextSpan = document.querySelector('.typed-text');
const words = ['Python Developer', 'Web Designer', 'Sql Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeAnimation, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    typeAnimation();
});

// Skills Animation
const skillsSection = document.querySelector('#skills');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;

    // Animate progress bars
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const percentageText = item.querySelector('.skill-percentage').innerText; // e.g. "88%"
        const percentageValue = parseInt(percentageText.replace('%', '')); // convert "88%" → 88

        const bar = item.querySelector('.skill-progress');
        bar.style.width = percentageValue + '%';
        bar.style.setProperty('--skill-width', percentageValue + '%');
    });


    // Animate circular skills
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        const percentage = circle.getAttribute('data-percentage');
        const degree = (percentage / 100) * 360;
        circle.style.setProperty('--circle-degree', degree + 'deg');
        circle.style.background = `conic-gradient(#1abc9c ${degree}deg, rgba(255, 255, 255, 0.1) ${degree}deg)`;
    });

    skillsAnimated = true;
}

// Intersection Observer for Skills Animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

document.addEventListener("DOMContentLoaded", () => {

    let currentProject = 0;
    const projectCards = document.querySelectorAll('.project-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carousel = document.querySelector('.projects-carousel');

function updateCarousel() {
    // toggle active card
    projectCards.forEach((c, i) =>
        c.classList.toggle('active', i === currentProject)
    );

    // toggle indicators
    indicators.forEach((dot, i) =>
        dot.classList.toggle('active', i === currentProject)
    );

    // Slide cards - each card is 45% + 20px margin = ~48%
    const translateX = currentProject * -48;
    carousel.style.transform = `translateX(${translateX}%)`;
}
    function nextProject() {
        currentProject = (currentProject + 1) % projectCards.length;
        updateCarousel();
    }

    function prevProject() {
        currentProject = currentProject === 0
            ? projectCards.length - 1
            : currentProject - 1;
        updateCarousel();
    }

    nextBtn.addEventListener('click', nextProject);
    prevBtn.addEventListener('click', prevProject);

    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentProject = index;
            updateCarousel();
        });
    });

    updateCarousel();
});



// Contact Form
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[type="text"]:nth-of-type(2)').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Social Icons Hover Effect
const socialIcons = document.querySelectorAll('.social-icon, .social-link');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) scale(1.1)';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Remove initial animation styles from home section
const homeSection = document.querySelector('#home');
if (homeSection) {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
}

// Parallax effect for background (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.image-container');

    parallaxElements.forEach(element => {
        const speed = 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Responsive carousel handling
function handleResize() {
    if (window.innerWidth <= 768) {
        carousel.style.transform = 'translateX(0)';
        carousel.style.flexDirection = 'column';
        carousel.style.alignItems = 'center';
    } else {
        carousel.style.flexDirection = 'row';
        carousel.style.alignItems = 'stretch';
        updateCarousel();
    }
}

window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
});