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

  const album1 = document.getElementById('album1');
  const album2 = document.getElementById('album2');
  const audio1 = document.getElementById('audio1');
  const audio2 = document.getElementById('audio2');
  const img1 = album1.querySelector('img');
  const img2 = album2.querySelector('img');

  // To ensure only one song plays at a time
  function pauseAllExcept(exceptAudio) {
    if (audio1 !== exceptAudio) {
      audio1.pause();
    }
    if (audio2 !== exceptAudio) {
      audio2.pause();
    }
  }

  // Toggle play/pause for song 1
  function togglePlay1() {
    if (audio1.paused) {
      pauseAllExcept(audio1);
      audio1.play();
      img1.classList.add('rotating');
      album1.setAttribute('aria-pressed', 'true');
    } else {
      audio1.pause();
      img1.classList.remove('rotating');
      album1.setAttribute('aria-pressed', 'false');
    }
  }
  // Toggle play/pause for song 2
  function togglePlay2() {
    if (audio2.paused) {
      pauseAllExcept(audio2);
      audio2.play();
      img2.classList.add('rotating');
      album2.setAttribute('aria-pressed', 'true');
    } else {
      audio2.pause();
      img2.classList.remove('rotating');
      album2.setAttribute('aria-pressed', 'false');
    }
  }

  // Event listeners for clicking album images
  album1.addEventListener('click', togglePlay1);
  album2.addEventListener('click', togglePlay2);

  // Keyboard accessibility (space or enter to toggle play)
  album1.addEventListener('keydown', e => {
    if(e.key === ' ' || e.key === 'Enter'){
      e.preventDefault();
      togglePlay1();
    }
  });
  album2.addEventListener('keydown', e => {
    if(e.key === ' ' || e.key === 'Enter'){
      e.preventDefault();
      togglePlay2();
    }
  });

  // Cleanup rotation when audio ends
  audio1.addEventListener('ended', () => {
    img1.classList.remove('rotating');
    album1.setAttribute('aria-pressed', 'false');
  });
  audio2.addEventListener('ended', () => {
    img2.classList.remove('rotating');
    album2.setAttribute('aria-pressed', 'false');
  });