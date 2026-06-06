const search = document.getElementById('catalogueSearch');
const searchableCards = [...document.querySelectorAll('[data-title]')];
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks');
const catalogueModal = document.getElementById('catalogueModal');
const catalogueModalImage = document.getElementById('catalogueModalImage');
const catalogueModalTitle = document.getElementById('catalogueModalTitle');
const catalogueTriggers = document.querySelectorAll('.catalogue-trigger');

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
  '.hero-copy, .hero-media, .section-head, .lookbook-card, .product-showcase-card, .inspiration-card, .feature-copy, .feature-split img, .collection-card, blockquote, .contact-panel, .contacts a'
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

const closeCatalogue = () => {
  catalogueModal?.classList.remove('is-open');
  catalogueModal?.setAttribute('aria-hidden', 'true');
  if (catalogueModalImage) {
    catalogueModalImage.removeAttribute('src');
    catalogueModalImage.alt = '';
  }
};

catalogueTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const src = trigger.dataset.catalogueSrc;
    const title = trigger.dataset.catalogueTitle || 'Price Catalogue';

    if (!src || !catalogueModal || !catalogueModalImage || !catalogueModalTitle) return;

    catalogueModalImage.src = src;
    catalogueModalImage.alt = title;
    catalogueModalTitle.textContent = title;
    catalogueModal.classList.add('is-open');
    catalogueModal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelectorAll('[data-close-catalogue]').forEach((closeButton) => {
  closeButton.addEventListener('click', closeCatalogue);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeCatalogue();
});
