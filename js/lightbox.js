document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  let currentIndex = 0;

  const showImage = (index) => {
    const imgSrc = triggers[index].querySelector('img').getAttribute('src');

    // Remover la animación anterior si hay
    lightboxImg.classList.remove('lightbox-content');
    void lightboxImg.offsetWidth; // forzar reflow

    lightboxImg.setAttribute('src', imgSrc);
    lightbox.classList.add('open');

    // Agregar animación al cambiar imagen
    lightboxImg.classList.add('lightbox-content');

    currentIndex = index;
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      showImage(index);
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightboxImg.setAttribute('src', '');
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % triggers.length;
    showImage(currentIndex);
  });

  window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      lightboxImg.setAttribute('src', '');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  });
});
