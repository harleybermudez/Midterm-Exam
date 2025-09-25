function addToCart(button) {
  if (button.innerText === "Add to Cart") {
    button.innerText = "Remove from Cart";
    button.style.backgroundColor = "#e74c3c";
  } else {
    button.innerText = "Add to Cart";
    button.style.backgroundColor = "#3498db";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Feature carousel (autoplay, dynamic dots)
  (function featureCarousel() {
    const carousel = document.getElementById('featureCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.feature-slide'));
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (!dotsContainer) return;

    let current = 0;
    let timer = null;
    const autoplayInterval = 3500;

    // build dots dynamically
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('data-slide', String(i));
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.addEventListener('click', () => { goTo(i); resetTimer(); });
      dotsContainer.appendChild(btn);
    });
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

    function goTo(index) {
      if (!slides.length) return;
      index = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      current = index;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
        d.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    function next() { goTo(current + 1); }
    function startTimer() { stopTimer(); timer = setInterval(next, autoplayInterval); }
    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function resetTimer() { stopTimer(); startTimer(); }

    // init
    goTo(0);
    if (slides.length > 1) startTimer();
  })();

});
