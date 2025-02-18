// Matrix characters
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$><=_\\|/{}[]@#%^&*()?!~';

// Create Matrix rain canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.id = 'matrix-rain';

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix rain effect
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(0);
const glowStrength = 20;

function drawMatrixRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';
    ctx.shadowBlur = glowStrength;
    ctx.shadowColor = '#00ff00';
    
    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Random brightness for characters
        const alpha = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
        
        ctx.fillText(char, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrixRain, 50);

// Glitch text effect
function createGlitchText(element) {
    const originalText = element.textContent;
    const glitchChars = matrixChars;
    
    let intervalId = null;
    
    element.addEventListener('mouseover', () => {
        let counter = 0;
        intervalId = setInterval(() => {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;
            
            counter++;
            if (counter > 20) {
                clearInterval(intervalId);
                element.textContent = originalText;
            }
        }, 50);
    });
    
    element.addEventListener('mouseout', () => {
        if (intervalId) {
            clearInterval(intervalId);
            element.textContent = originalText;
        }
    });
}

// Apply glitch effect to headings
document.querySelectorAll('h1, h2, h3').forEach(createGlitchText);

// Neon hover effect for game cards
const gameCards = document.querySelectorAll('.game-card');
const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');

gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 0 30px #00ff00';
        hoverSound.currentTime = 0;
        hoverSound.play();
        
        // Create matrix code effect inside card
        const codeContainer = document.createElement('div');
        codeContainer.className = 'matrix-code';
        card.appendChild(codeContainer);
        
        for (let i = 0; i < 20; i++) {
            const span = document.createElement('span');
            span.style.left = Math.random() * 100 + '%';
            span.style.animationDuration = (Math.random() * 2 + 1) + 's';
            span.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            codeContainer.appendChild(span);
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.boxShadow = 'none';
        const codeContainer = card.querySelector('.matrix-code');
        if (codeContainer) {
            codeContainer.remove();
        }
    });
});

// Add Matrix-style notification effect
function createMatrixNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'retro-notification';
    notification.style.background = 'rgba(0, 20, 0, 0.9)';
    notification.style.border = '2px solid #00ff00';
    notification.style.boxShadow = '0 0 20px #00ff00';
    
    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.alignItems = 'center';
    content.style.gap = '10px';
    
    const icon = document.createElement('div');
    icon.textContent = '>';
    icon.style.color = '#00ff00';
    icon.style.animation = 'blink 1s steps(1) infinite';
    
    const text = document.createElement('div');
    text.textContent = message;
    
    content.appendChild(icon);
    content.appendChild(text);
    notification.appendChild(content);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Retro cursor and button effects
const cursor = document.createElement('div');
cursor.className = 'pixel-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = Math.floor(e.clientX / 8) * 8 + 'px';
        cursor.style.top = Math.floor(e.clientY / 8) * 8 + 'px';
    });
});

// Initialize all buttons with effects
const buttons = document.querySelectorAll('.retro-button');

buttons.forEach(button => {
    // Add hover effects
    button.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
        button.style.transform = 'translate(-2px, -2px)';
        button.style.boxShadow = '0 0 20px #00ff00';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'none';
        button.style.boxShadow = 'none';
    });
    
    // Add click effects for cart buttons
    if (button.textContent === 'ADD TO CART') {
        button.addEventListener('click', function() {
            const card = this.closest('.game-card');
            const title = card.querySelector('h3').textContent;
            createMatrixNotification(`${title} decoded and uploaded to cart`);
            
            // Create digital disintegration effect
            const rect = card.getBoundingClientRect();
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'matrix-particle';
                particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                particle.style.animation = `matrix-fall ${Math.random() * 2 + 1}s linear`;
                particle.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }
        });
    }
});

// Add pixel art styles
const pixelStyles = document.createElement('style');
pixelStyles.textContent = `
    .pixel-cursor {
        width: 8px;
        height: 8px;
        background: #fff;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        image-rendering: pixelated;
    }
    
    .explosion-pixel {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 1s steps(10);
        image-rendering: pixelated;
    }
    
    @keyframes blink-pixel {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
    }
`;

document.head.appendChild(pixelStyles); 