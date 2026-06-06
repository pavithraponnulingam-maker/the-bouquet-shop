const search = document.getElementById('catalogueSearch');
const searchableCards = [...document.querySelectorAll('[data-title]')];
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks');

search?.addEventListener('input', () => {
  const query = search.value.toLowerCase().trim();

  searchableCards.forEach((card) => {
    const text = `${card.innerText} ${card.dataset.title}`.toLowerCase();
    card.classList.toggle('is-hidden', query && !text.includes(query));
  });
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navLinks.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

const revealItems = document.querySelectorAll(
  '.hero-copy, .hero-media, .section-head, .lookbook-card, .inspiration-card, .feature-copy, .feature-split img, .collection-card, blockquote, .contact-panel, .contacts a'
);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => {
    item.classList.add('reveal-item');
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
