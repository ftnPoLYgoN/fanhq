const fs = require('fs');
const path = require('path');

const CLUBS_DIR = path.join(__dirname, '../data/clubs');
const INDEX_DIR = path.join(__dirname, '../data/indexes');

const leagues = ['bundesliga', 'zweite-bundesliga', 'dritte-liga'];
const clubsIndex = [];
const leaguesIndex = {};

leagues.forEach(league => {
    const leaguePath = path.join(CLUBS_DIR, league);
    if (!fs.existsSync(leaguePath)) return;

    leaguesIndex[league] = {
        name: league === 'bundesliga' ? '1. Bundesliga' : (league === 'zweite-bundesliga' ? '2. Bundesliga' : '3. Liga'),
        clubs: []
    };

    const files = fs.readdirSync(leaguePath);
    files.forEach(file => {
        if (!file.endsWith('.json')) return;

        const filePath = path.join(leaguePath, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        const clubInfo = {
            id: content.basisdaten.id,
            slug: content.basisdaten.slug,
            name: content.basisdaten.name,
            league: league,
            stadium: content.basisdaten.stadium_name,
            last_updated: content.metadaten.last_checked
        };

        clubsIndex.push(clubInfo);
        leaguesIndex[league].clubs.push({
            id: clubInfo.id,
            name: clubInfo.name,
            slug: clubInfo.slug
        });
    });
});

// Write indexes
fs.writeFileSync(path.join(INDEX_DIR, 'clubs-index.json'), JSON.stringify(clubsIndex, null, 2));
fs.writeFileSync(path.join(INDEX_DIR, 'leagues-index.json'), JSON.stringify(leaguesIndex, null, 2));

console.log('Indexes regenerated successfully!');
console.log(`Total clubs: ${clubsIndex.length}`);
