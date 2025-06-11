const candle = document.querySelector('.candle');
const flame = candle.querySelector('.flame');
const confettiContainer = document.querySelector('.confetti-container');

// Pastel confetti colors
const confettiColors = ['#dd6b6b', '#e7e7e7', '#96cbd5', '#5d7f99', '#f5bd57'];

let isLit = false;
let confettiInterval = null;

function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');

    const size = 10 + Math.random() * 8;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cornerSize = 120;
    const side = Math.random() < 0.5 ? 'left' : 'right';

    let startX, startY;

    if (side === 'left') {
        startX = Math.random() * cornerSize;
        startY = viewportHeight - (Math.random() * cornerSize);
    } else {
        startX = viewportWidth - cornerSize + Math.random() * cornerSize;
        startY = viewportHeight - (Math.random() * cornerSize);
    }

    confetti.style.left = startX + 'px';
    confetti.style.top = startY + 'px';
    confettiContainer.appendChild(confetti);

    const flightX = side === 'left' ? 250 + Math.random() * 150 : -(250 + Math.random() * 150);
    const flightY = 250 + Math.random() * 150;
    const rotation = (Math.random() * 720) * (Math.random() < 0.5 ? 1 : -1);
    const duration = 2500 + Math.random() * 1500;

    confetti.style.transform = 'translate(0px, 0px) rotate(0deg)';
    confetti.style.opacity = '1';

    let startTime = null;
    function animateConfetti(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        const x = flightX * ease;
        const y = -flightY * ease;
        const rotate = rotation * ease;

        confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        confetti.style.opacity = `${1 - ease}`;

        if (progress < 1) {
            requestAnimationFrame(animateConfetti);
        } else {
            confetti.remove();
        }
    }
    requestAnimationFrame(animateConfetti);
}

function runConfettiBurst(duration = 3500) {
    const intervalTime = 80;
    let elapsed = 0;

    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }

    confettiInterval = setInterval(() => {
        const count = 7 + Math.floor(Math.random() * 6);
        for (let i = 0; i < count; i++) {
            createConfettiPiece();
        }

        elapsed += intervalTime;
        if (elapsed >= duration) {
            clearInterval(confettiInterval);
            confettiInterval = null;
        }
    }, intervalTime);
}

function updateFlameState(lit) {
    isLit = lit;
    if (isLit) {
        flame.classList.add('lit');
        candle.setAttribute('aria-pressed', 'true');
        runConfettiBurst(3500);
    } else {
        flame.classList.remove('lit');
        candle.setAttribute('aria-pressed', 'false');
        if (confettiInterval) {
            clearInterval(confettiInterval);
            confettiInterval = null;
        }
    }
}

candle.addEventListener('click', () => {
    updateFlameState(!isLit);
});
candle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateFlameState(!isLit);
    }
});

// Initialize with candle off
updateFlameState(false);

// Clean on resize to avoid confetti stuck
window.addEventListener('resize', () => {
    while (confettiContainer.firstChild) {
        confettiContainer.firstChild.remove();
    }
    if (isLit) {
        runConfettiBurst(3500);
    }
});
