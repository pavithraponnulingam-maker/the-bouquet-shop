const search = document.getElementById('catalogueSearch');
const cards = [...document.querySelectorAll('.catalogue-card')];
search?.addEventListener('input', () => {
  const q = search.value.toLowerCase().trim();
  cards.forEach(card => {
    const text = card.innerText.toLowerCase() + " " + card.dataset.title;
    card.style.display = text.includes(q) ? "" : "none";
  });
});
