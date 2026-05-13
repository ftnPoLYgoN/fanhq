/**
 * FanHQ App Controller
 * Wires up data loading, event handling, and routing.
 */
(async function() {
  'use strict';

  // --- DOM References ---
  const grid = document.getElementById('club-grid');
  const tabs = document.getElementById('league-tabs');
  const searchInput = document.getElementById('search-input');
  const overlay = document.getElementById('detail-overlay');
  const detailContent = document.getElementById('detail-content');
  const detailClose = document.getElementById('detail-close');
  const logoHome = document.getElementById('logo-home');
  const statSources = document.getElementById('stat-sources');

  // --- State ---
  let currentLeague = 'alle';
  let currentQuery = '';

  // --- Init ---
  const clubs = await DataLoader.loadIndex();
  statSources.textContent = DataLoader.getTotalSources();
  renderGrid(clubs);

  // --- League Tabs ---
  tabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.league-tab');
    if (!tab) return;

    tabs.querySelectorAll('.league-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentLeague = tab.dataset.league;
    applyFilters();
  });

  // --- Search ---
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentQuery = searchInput.value;
      applyFilters();
    }, 200);
  });

  // --- Logo Home ---
  logoHome.addEventListener('click', () => {
    searchInput.value = '';
    currentQuery = '';
    currentLeague = 'alle';
    tabs.querySelectorAll('.league-tab').forEach(t => t.classList.remove('active'));
    tabs.querySelector('[data-league="alle"]').classList.add('active');
    applyFilters();
    closeDetail();
  });

  // --- Club Card Click ---
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.club-card');
    if (!card) return;
    openDetail(card.dataset.slug, card.dataset.league);
  });

  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const card = e.target.closest('.club-card');
      if (card) openDetail(card.dataset.slug, card.dataset.league);
    }
  });

  // --- Detail Close ---
  detailClose.addEventListener('click', closeDetail);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDetail();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
  });

  // --- Functions ---
  function applyFilters() {
    let filtered = DataLoader.getClubs(currentLeague);
    if (currentQuery.trim()) {
      const q = currentQuery.toLowerCase().trim();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.stadium && c.stadium.toLowerCase().includes(q))
      );
    }
    renderGrid(filtered);
  }

  function renderGrid(clubs) {
    grid.innerHTML = '';
    if (clubs.length === 0) {
      grid.innerHTML = Components.renderNoResults(currentQuery || currentLeague);
      return;
    }
    const fragment = document.createDocumentFragment();
    clubs.forEach((club, i) => {
      const card = Components.renderClubCard(club);
      card.style.animationDelay = `${Math.min(i * 30, 600)}ms`;
      card.style.opacity = '0';
      card.style.animation = `fadeSlideIn 0.4s ease forwards ${Math.min(i * 30, 600)}ms`;
      fragment.appendChild(card);
    });
    grid.appendChild(fragment);

    // Inject keyframe if not exists
    if (!document.getElementById('card-anim-style')) {
      const style = document.createElement('style');
      style.id = 'card-anim-style';
      style.textContent = `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  async function openDetail(slug, league) {
    overlay.classList.add('active');
    detailContent.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
    document.body.style.overflow = 'hidden';

    const data = await DataLoader.loadClub(slug, league);
    if (data) {
      detailContent.innerHTML = Components.renderDetailView(data);
    } else {
      detailContent.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">Daten konnten nicht geladen werden.</p>';
    }
  }

  function closeDetail() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
})();
