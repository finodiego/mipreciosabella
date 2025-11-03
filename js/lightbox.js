document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption'); // 🆕 Pie de imagen
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  let currentIndex = 0;

  const showImage = (index) => {
    const img = triggers[index].querySelector('img');
    const imgSrc = img.getAttribute('src');
    const imgAlt = img.getAttribute('alt'); // 🆕 Tomar texto del alt

    // Reiniciar animación si existe
    lightboxImg.classList.remove('lightbox-content');
    void lightboxImg.offsetWidth; // forzar reflow

    lightboxImg.setAttribute('src', imgSrc);
    caption.textContent = imgAlt || ''; // 🆕 Mostrar pie de imagen
    lightbox.classList.add('open');

    lightboxImg.classList.add('lightbox-content');
    currentIndex = index;
  };

  // Abrir lightbox
  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      showImage(index);
    });
  });

  // Cerrar lightbox
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightboxImg.setAttribute('src', '');
    caption.textContent = '';
  });

  // Imagen anterior
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    showImage(currentIndex);
  });

  // Imagen siguiente
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % triggers.length;
    showImage(currentIndex);
  });

  // Cerrar si clic fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      lightboxImg.setAttribute('src', '');
      caption.textContent = '';
    }
  });

  // Controles por teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  });
});
