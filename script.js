// Current screen tracking
let currentScreen = 1;
let currentQuote = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    
    // Auto-advance quotes
    setInterval(() => {
        if (currentScreen === 5) {
            currentQuote = (currentQuote + 1) % 3;
            showQuote(currentQuote);
        }
    }, 5000);
});

// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;
    
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }, 2000);
}

// Navigate to next screen
function nextScreen(screenNumber) {
    const currentScreenEl = document.getElementById(`screen-${currentScreen}`);
    const nextScreenEl = document.getElementById(`screen-${screenNumber}`);
    
    if (!currentScreenEl || !nextScreenEl) return;
    
    // Scroll to top of page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Exit current screen
    currentScreenEl.classList.add('exit-left');
    currentScreenEl.classList.remove('active');
    
    // Enter next screen
    setTimeout(() => {
        nextScreenEl.classList.add('active');
        currentScreen = screenNumber;
        updateProgressDots();
    }, 300);
    
    // Create heart burst effect
    createHeartBurst();
}

// Handle Yes button click - Screen 7
function handleYes() {
    // Hide question step
    const questionStep = document.getElementById('questionStep');
    if (questionStep) {
        questionStep.style.display = 'none';
    }
    
    // Show gift step
    const giftStep = document.getElementById('giftStep');
    if (giftStep) {
        giftStep.style.display = 'block';
        giftStep.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    // Create heart burst
    createHeartBurst();
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show celebration after gift reveal
function showCelebration() {
    // Hide gift step
    const giftStep = document.getElementById('giftStep');
    if (giftStep) {
        giftStep.style.display = 'none';
    }
    
    // Show celebration step
    const celebrationStep = document.getElementById('celebrationStep');
    if (celebrationStep) {
        celebrationStep.style.display = 'block';
        celebrationStep.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    // Create massive heart burst
    createMassiveHeartBurst();
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Move No button away from cursor - keep within screen bounds
function moveNoButton() {
    const noButton = document.getElementById('noButton');
    const questionStep = document.getElementById('questionStep');
    
    if (!noButton || !questionStep) return;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonRect = noButton.getBoundingClientRect();
    
    // Calculate safe boundaries (keep button fully within visible viewport)
    const padding = 20;
    const minX = padding;
    const maxX = viewportWidth - buttonRect.width - padding;
    const minY = 200; // Keep below the question text
    const maxY = viewportHeight - buttonRect.height - padding - 80;
    
    // Generate random position within safe boundaries
    const randomX = minX + Math.random() * (maxX - minX);
    const randomY = minY + Math.random() * (maxY - minY);
    
    // Apply fixed positioning to stay within viewport
    noButton.style.position = 'fixed';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    noButton.style.transition = 'all 0.3s ease';
    noButton.style.zIndex = '100';
    
    // Add shake animation
    noButton.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        noButton.style.animation = '';
    }, 500);
}

// Create massive heart burst for celebration
function createMassiveHeartBurst() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞', '💟', '♥️'];
    const container = document.body;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = (30 + Math.random() * 40) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 150 + Math.random() * 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            container.appendChild(heart);
            
            // Animate
            heart.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(2) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 50);
    }
}

// Update progress dots
function updateProgressDots() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
        if (index < currentScreen) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Show specific quote
function showQuote(index) {
    const slides = document.querySelectorAll('.quote-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    currentQuote = index;
}

// Show modal
function showModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (modal) {
        modal.classList.add('active');
        createHeartBurst();
        
        // Scroll modal to top
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.scrollTop = 0;
            }
        }, 100);
    }
}

// Close modal
function closeModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (modal) {
        modal.classList.remove('active');
        
        // Pause video when closing song modal
        if (type === 'song') {
            const video = document.getElementById('songVideo');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    }
}

// Close modal on background click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        
        // Pause video if song modal is closed
        const video = document.getElementById('songVideo');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
});

// Restart experience
function restartExperience() {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active', 'exit-left');
    });
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    currentScreen = 1;
    document.getElementById('screen-1').classList.add('active');
    updateProgressDots();
    createHeartBurst();
}

// Create heart burst effect
function createHeartBurst() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];
    const container = document.body;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        container.appendChild(heart);
        
        // Animate
        heart.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 1
            },
            { 
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        if (currentScreen < 6) {
            nextScreen(currentScreen + 1);
        }
    } else if (e.key === 'ArrowLeft') {
        if (currentScreen > 1) {
            nextScreen(currentScreen - 1);
        }
    }
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next screen
        if (currentScreen < 6) {
            nextScreen(currentScreen + 1);
        }
    }
    
    if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous screen
        if (currentScreen > 1) {
            nextScreen(currentScreen - 1);
        }
    }
}
