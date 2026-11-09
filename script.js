// Perfume Dataset with Categories
const perfumes = [
  {
    id: 1,
    name: "Shiyaaka Snow",
    price: "RM12",
    dupe: "Louis Vuitton Météore (RM1700+)",
    scent: "Crisp citrus, pink pepper, and clean vetiver",
    vibe: "The ultimate 'just stepped out of the shower' clean aura. Super fresh, sharp, and effortlessly professional for early morning classes.",
    category: "Fresh Clean",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Shiyaaka Shadow",
    price: "RM12",
    dupe: "CH Badboy Cobalt (RM460+)",
    scent: "Grapefruit, pink pepper, and rich amber",
    vibe: "Mysterious yet uplifting. Perfect balance of bright citrus up top and a smooth, confident woody dry-down for afternoon hangouts.",
    category: "Woody Amber",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Riiffs Freeze",
    price: "RM12",
    dupe: "Crisp Icy-Citrus & Mint",
    scent: "Icy spearmint, Calabrian bergamot, lemon zest, and black tea",
    vibe: "An absolute air-conditioner in a bottle. Super cooling, sharp, and refreshing—ideal for beating the scorching Malaysian afternoon heat.",
    category: "Aquatic Icy",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Odyssey Mega Man",
    price: "RM13",
    dupe: "YSL Y Eau de Parfum (RM670)",
    scent: "Apple, ginger, sage, and blue woody notes",
    vibe: "The ultimate heavy-hitting compliment magnet. Clean, sweet, and bold—your go-to 'dumb reach' for presentations, dates, or night events.",
    category: "Woody Amber",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Rasasi Hawas Ice",
    price: "RM13",
    dupe: "Paco Rabanne Invictus Aqua (RM490+)",
    scent: "Frozen apple, bergamot, star anise, plum, orange blossom, and ambergris",
    vibe: "The ultimate beast-mode compliment-getter. Super loud, frosty-sweet, and aquatic—built to project heavily and pull attention wherever you go on campus.",
    category: "Aquatic Icy",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800"
  }
];

const ORDER_FORM_URL = "https://forms.gle/Egd8tSz6ENcHgPVP7";
let currentCategory = 'All';

// Render Catalog Cards
function renderCatalog(itemsToRender) {
  const grid = document.getElementById('perfumeGrid');
  if (!grid) return;

  if (itemsToRender.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No matching fragrances found.</div>`;
    return;
  }

  grid.innerHTML = itemsToRender.map(perfume => `
    <article class="perfume-card">
      <div class="card-img-wrapper">
        <img src="${perfume.image}" alt="${perfume.name}" class="card-img" loading="lazy" />
        <span class="badge-dupe">Profile: ${perfume.dupe}</span>
      </div>
      <div class="card-content">
        <div class="card-header">
          <h3 class="card-title">${perfume.name}</h3>
          <span class="card-price">${perfume.price}</span>
        </div>
        <div class="card-scent"><strong>Notes:</strong> ${perfume.scent}</div>
        <p class="card-vibe">${perfume.vibe}</p>
        <div class="card-footer">
          <a href="${ORDER_FORM_URL}" target="_blank" rel="noopener" class="btn-card-order">Order Decant</a>
          <button class="btn-card-detail" onclick="openModal(${perfume.id})">Details</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Filter logic by search & category
function filterPerfumes() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  
  const filtered = perfumes.filter(p => {
    const matchesCategory = currentCategory === 'All' || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(query) || p.scent.toLowerCase().includes(query) || p.dupe.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  renderCatalog(filtered);
}

function setCategory(category, btnElement) {
  currentCategory = category;
  
  // Update active pill styling
  document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  filterPerfumes();
}

// Modal Functions
function openModal(id) {
  const perfume = perfumes.find(p => p.id === id);
  if (!perfume) return;

  const modalBody = document.getElementById('modalBody');
  const modal = document.getElementById('perfumeModal');

  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${perfume.image}" alt="${perfume.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;" />
      <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); font-weight: 600;">5ML Decant Atomizer</span>
      <h2 style="font-family:'Playfair Display', serif; font-size: 1.6rem; margin-top: 4px;">${perfume.name}</h2>
      <div style="font-size: 1.2rem; font-weight: 600; color: var(--text-main); margin-top: 4px;">${perfume.price}</div>
    </div>
    
    <div style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted);">
      <p style="margin-bottom: 12px;"><strong>Inspired By:</strong> ${perfume.dupe}</p>
      <p style="margin-bottom: 12px;"><strong>Key Notes:</strong> ${perfume.scent}</p>
      <p style="margin-bottom: 20px;"><strong>Vibe & Performance:</strong> ${perfume.vibe}</p>
    </div>

    <a href="${ORDER_FORM_URL}" target="_blank" rel="noopener" class="btn-solid" style="display: block; text-align: center; width: 100%;">Order via Google Form ↗</a>
  `;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('perfumeModal');
  if (modal) modal.classList.remove('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(perfumes);

  const closeBtn = document.getElementById('modalClose');
  const modal = document.getElementById('perfumeModal');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
