document.documentElement.classList.add('js');

const header = document.querySelector('.nav');
const cards = document.querySelectorAll('.grid article, .steps > div, .why > div, .trust > div');

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

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

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
