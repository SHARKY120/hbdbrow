document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.querySelector('.envelope-container');
  const letterModal = document.querySelector('.letter-modal');
  const closeBtn = document.querySelector('.close-btn');

  function showLetter() {
    envelope.classList.add('shaking');
    setTimeout(() => {
      letterModal.classList.add('show');
      envelope.classList.remove('shaking');
      closeBtn.focus();
    }, 400);
  }

  function hideLetter() {
    letterModal.classList.remove('show');
    envelope.focus();
  }

  envelope.addEventListener('click', showLetter);

  envelope.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showLetter();
    }
  });

  closeBtn.addEventListener('click', hideLetter);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && letterModal.classList.contains('show')) {
      hideLetter();
    }
  });

  letterModal.addEventListener('click', (e) => {
    if (e.target === letterModal) {
      hideLetter();
    }
  });
});
