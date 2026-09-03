document.documentElement.classList.add('js');

const header = document.querySelector('.nav');
const cards = document.querySelectorAll('.grid article, .catalog-grid article, .steps > div, .why > div, .trust > div, .choose-grid > div');

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card, index) => {
    card.classList.add('reveal');
    card.style.setProperty('--delay', `${Math.min(index % 6, 5) * 55}ms`);
    reveal.observe(card);
  });
} else {
  cards.forEach((card) => card.classList.add('revealed'));
}

if (header) {
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const orb = document.querySelector('.orb');
  window.addEventListener('pointermove', (event) => {
    if (!orb || window.innerWidth < 900) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, { passive: true });
}

// Highlight a catalog card when arriving from a product recommendation link.
const hash = window.location.hash;
if (hash && hash.startsWith('#product-')) {
  const target = document.querySelector(hash);
  if (target) {
    target.classList.add('product-focus');
    setTimeout(() => target.classList.remove('product-focus'), 2200);
  }
}
