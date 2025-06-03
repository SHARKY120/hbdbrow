function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    // Random horizontal start position
    heart.style.left = Math.random() * 100 + 'vw';
    // Random horizontal movement for animation
    const moveX = (Math.random() - 0.5) * 100 + 'px';
    heart.style.setProperty('--moveX', moveX);
    // Random animation duration between 5 and 10 seconds
    const duration = 5000 + Math.random() * 5000;
    heart.style.animation = `floatUp ${duration}ms linear forwards`;
    document.body.appendChild(heart);
    // Remove heart when animation ends
    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }
  // Create hearts continuously
  setInterval(createHeart, 300);

  