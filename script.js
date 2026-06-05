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
