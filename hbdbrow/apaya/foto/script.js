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

  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalImages = slider.children.length;
    const imageWidth = 150; // lebar setiap gambar
    let currentIndex = 0;

    function updateSlider() {
      const offset = -currentIndex * imageWidth;
      slider.style.transform = `translateX(${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalImages - 1;
      }
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex >= totalImages) {
        currentIndex = 0;
      }
      updateSlider();
    });
  });