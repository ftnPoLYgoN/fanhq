/**
 * FanHQ UI Components
 * Renders club cards, detail views, and trust badges.
 */
const Components = (() => {

  const LEAGUE_LABELS = {
    'bundesliga': '1. BL',
    'zweite-bundesliga': '2. BL',
    'dritte-liga': '3. Liga'
  };

  const SECTION_CONFIG = [
    { key: 'offizielle_quellen', icon: '🏛️', title: 'Offizielle Quellen' },
    { key: 'inoffizielle_quellen', icon: '👥', title: 'Fan-Community' },
    { key: 'daten_nachschlagen', icon: '📊', title: 'Statistiken & Daten' },
    { key: 'medien_berichterstattung', icon: '📰', title: 'Medienberichte' },
    { key: 'stadion_matchday', icon: '🏟️', title: 'Stadion & Matchday' }
  ];

  const TRUST_LABELS = {
    'official': 'Offiziell',
    'trusted-third-party': 'Vertraut',
    'unofficial': 'Inoffiziell',
    'uncertain': 'Unsicher'
  };

  function getInitials(name) {
    const words = name.replace(/[^a-zA-ZäöüÄÖÜß\s]/g, '').trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }

  function renderClubCard(club) {
    const card = document.createElement('div');
    card.className = 'club-card';
    card.dataset.league = club.league;
    card.dataset.slug = club.slug;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.id = `club-${club.slug}`;

    card.innerHTML = `
      <div class="club-card-header">
        <div class="club-avatar">${getInitials(club.name)}</div>
        <div>
          <div class="club-card-title">${club.name}</div>
          <span class="league-badge ${club.league}">${LEAGUE_LABELS[club.league]}</span>
        </div>
      </div>
      <div class="club-card-meta">
        <span>🏟️ ${club.stadium || '–'}</span>
      </div>
    `;
    return card;
  }

  function renderDetailView(data) {
    const b = data.basisdaten;
    const leagueClass = b.league;

    let scheduleUrl = '';
    const tmSource = data.daten_nachschlagen?.find(s => s.url.includes('transfermarkt.de'));
    if (tmSource) {
      scheduleUrl = tmSource.url.replace('/startseite/', '/spielplan/');
    } else {
      scheduleUrl = `https://www.kicker.de/${leagueClass === 'zweite-bundesliga' ? '2-bundesliga' : leagueClass}/spieltag`;
    }
    const tableUrl = `https://www.kicker.de/${leagueClass === 'zweite-bundesliga' ? '2-bundesliga' : leagueClass}/tabelle`;

    const actionButtonsHTML = `
      <div class="detail-actions">
        <a href="${tableUrl}" target="_blank" rel="noopener noreferrer" class="action-btn">📊 Aktuelle Tabelle</a>
        <a href="${scheduleUrl}" target="_blank" rel="noopener noreferrer" class="action-btn">🗓️ Nächste Spiele</a>
      </div>
    `;

    const statsHTML = `
      <div class="detail-stats">
        <div class="detail-stat">
          <div class="detail-stat-value">${b.city || '–'}</div>
          <div class="detail-stat-label">Stadt</div>
        </div>
        <div class="detail-stat">
          <div class="detail-stat-value">${b.federal_state || '–'}</div>
          <div class="detail-stat-label">Bundesland</div>
        </div>
        <div class="detail-stat">
          <div class="detail-stat-value">${b.stadium_capacity ? b.stadium_capacity.toLocaleString('de-DE') : '–'}</div>
          <div class="detail-stat-label">Kapazität</div>
        </div>
        <div class="detail-stat">
          <div class="detail-stat-value">${b.primary_colors_text || '–'}</div>
          <div class="detail-stat-label">Vereinsfarben</div>
        </div>
      </div>
    `;

    let sectionsHTML = '';
    for (const sec of SECTION_CONFIG) {
      const sources = data[sec.key];
      if (!sources || sources.length === 0) continue;
      sectionsHTML += `
        <div class="detail-section">
          <div class="detail-section-title">${sec.icon} ${sec.title}</div>
          <div class="source-list">
            ${sources.map(s => `
              <div class="source-item">
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" title="${s.name}">${s.name}</a>
                <span class="trust-badge ${s.trust_level}">${TRUST_LABELS[s.trust_level] || s.trust_level}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const stadiumInfo = b.stadium_location
      ? `<p style="color:var(--text-secondary);font-size:0.85rem;margin-top:0.1rem;">📍 ${b.stadium_location}</p>`
      : '';

    return `
      <div class="detail-hero">
        <div class="detail-avatar" style="background:linear-gradient(135deg,${getLeagueColor(leagueClass)});">
          ${getInitials(b.name)}
        </div>
        <div class="detail-hero-text">
          <h2>${b.name}</h2>
          <p>🏟️ ${b.stadium_name || '–'} · <span class="league-badge ${leagueClass}">${LEAGUE_LABELS[leagueClass]}</span></p>
          ${stadiumInfo}
        </div>
      </div>
      ${actionButtonsHTML}
      ${statsHTML}
      ${sectionsHTML}
    `;
  }

  function getLeagueColor(league) {
    const colors = {
      'bundesliga': 'var(--accent-bl), #be123c',
      'zweite-bundesliga': 'var(--accent-2bl), #d97706',
      'dritte-liga': 'var(--accent-3l), #059669'
    };
    return colors[league] || 'var(--text-accent), #0284c7';
  }

  function renderNoResults(query) {
    return `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Kein Verein gefunden</h3>
        <p>Kein Ergebnis für „${query}". Versuch einen anderen Suchbegriff.</p>
      </div>
    `;
  }

  return { renderClubCard, renderDetailView, renderNoResults };
})();
