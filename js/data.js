/**
 * FanHQ Data Layer
 * Loads club data from the JSON file structure.
 */
const DataLoader = (() => {
  let clubsIndex = [];
  let leaguesIndex = {};
  let clubCache = {};

  const LEAGUES = ['bundesliga', 'zweite-bundesliga', 'dritte-liga'];
  const LEAGUE_DIRS = {
    'bundesliga': 'data/clubs/bundesliga',
    'zweite-bundesliga': 'data/clubs/zweite-bundesliga',
    'dritte-liga': 'data/clubs/dritte-liga'
  };

  async function loadIndex() {
    try {
      const [clubsRes, leaguesRes] = await Promise.all([
        fetch('data/indexes/clubs-index.json'),
        fetch('data/indexes/leagues-index.json')
      ]);
      clubsIndex = await clubsRes.json();
      leaguesIndex = await leaguesRes.json();
      return clubsIndex;
    } catch (err) {
      console.error('Failed to load indexes:', err);
      return [];
    }
  }

  async function loadClub(slug, league) {
    if (clubCache[slug]) return clubCache[slug];
    try {
      const dir = LEAGUE_DIRS[league];
      const res = await fetch(`${dir}/${slug}.json`);
      const data = await res.json();
      clubCache[slug] = data;
      return data;
    } catch (err) {
      console.error(`Failed to load club ${slug}:`, err);
      return null;
    }
  }

  function getClubs(league) {
    if (!league || league === 'alle') return clubsIndex;
    return clubsIndex.filter(c => c.league === league);
  }

  function searchClubs(query) {
    const q = query.toLowerCase().trim();
    if (!q) return clubsIndex;
    return clubsIndex.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      (c.stadium && c.stadium.toLowerCase().includes(q))
    );
  }

  function getTotalSources() {
    // Estimate: each club averages ~7 sources
    return clubsIndex.length * 7;
  }

  return { loadIndex, loadClub, getClubs, searchClubs, getTotalSources, LEAGUES };
})();
