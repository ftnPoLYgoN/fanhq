# 🏟️ FanHQ – Project State & Handoff Document

**Stand:** 13. Mai 2026 (Abschluss der Core-Feature-Phase & UX Audit)

Dieses Dokument dient zukünftigen KI-Agenten und Entwicklern als Einstiegspunkt, um den aktuellen Status der FanHQ App zu verstehen und die Arbeit nahtlos fortzusetzen.

## 📁 Architektur & Tech Stack
- **Tech Stack:** Vanilla HTML5, CSS3 (Custom Properties, Flexbox/Grid, Glassmorphism), Vanilla JavaScript (ES6 Modules). 
- **Keine Build-Tools:** Die App läuft "as is" im Browser (kein Webpack, Vite, React oder npm nötig).
- **Hosting:** Vorbereitet für Static Hosting via GitHub Pages, Netlify oder Vercel (aktuell noch auf "Public" Repository auf GitHub).

## 🗄️ Datenstruktur (Das Herzstück)
- **JSON-Files (`/data/clubs/`):** Das Projekt ist datengetrieben. Jeder der 56 Vereine aus 1. BL, 2. BL und 3. Liga hat ein eigenes JSON-File.
- **Index (`/data/meta/indexes.json`):** Damit die App nicht 56 Dateien beim Start laden muss, gibt es ein zentrales Inhaltsverzeichnis. 
  - ⚠️ **WICHTIG:** Wann immer ein neues Vereins-JSON erstellt oder ein Name/Slug in den JSONs geändert wird, MUSS das Skript `node scripts/generate-indexes.js` ausgeführt werden, um den Index zu aktualisieren!
- **Schema (`/data/schemas/club.schema.json`):** Strikte Vorgaben, wie ein Vereins-JSON auszusehen hat.

## 🎨 UI & UX Errungenschaften
1. **Dynamic Theming:** Da keine echten Logos verwendet werden (Copyright), extrahiert `components.js` aus dem Feld `primary_colors_text` der JSONs die Vereinsfarben. Die Detailansicht des Vereins färbt sich dynamisch passend zum Verein ein (Buttons, Textverläufe, Hintergrund-Nebelschleier).
2. **Mobile First:** Die App ist eine Single Page Application (SPA). Klicks auf Vereine öffnen ein Fullscreen-Overlay mit fließenden Animationen.
3. **Anti-Link-Rot Strategie:** Tote Links wurden radikal entfernt. 
   - *Spielpläne* verweisen auf native Google Sports Widgets (`/search?q=nächste+spiele+Verein`).
   - *Anfahrtsbeschreibungen* verweisen auf Google Maps Queries.
   - Lokale Medien verweisen auf äußerst stabile Öffentlich-Rechtliche Rundfunkanstalten (SWR, WDR, BR) oder auf Such-Queries.

## 📍 Wo finde ich was?
- `index.html`: Das Skelett der App, Suchleiste und Grid-Container.
- `css/styles.css`: Alle Design-Tokens (Farben, Glassmorphism, Layouts).
- `js/app.js`: Die zentrale Anwendungslogik (Daten laden, Such-Logik, Event-Listener).
- `js/components.js`: Rendert die HTML-Elemente (Vereinskarten, Detail-Overlays) und enthält die Logik für das dynamische *Color Theming*.
- `scripts/`: Tools zur Datenpflege (z.B. Index-Generierung).

## 🚀 Zukünftige Roadmap (Next Steps für neue Agenten)
1. **PWA Integration:** Erstellen einer `manifest.json` und eines simplen `service-worker.js`, damit Fans die App auf dem Homescreen installieren können.
2. **Abkürzungs-Mapping:** Aktuell generiert `getInitials()` in `components.js` die Avatare (z.B. "1B" für 1. FC Union Berlin). Eine harte Mapping-Tabelle für perfekte Kürzel (z.B. "FCU") wäre ein schönes Detail-Upgrade.
3. **Live-Daten (Optional):** Integration einer externen API (oder eines GitHub Actions Cronjobs) für echte, tagesaktuelle Tabellenstände anstelle von Kicker-Verlinkungen.
4. **Repository Privacy:** Der User überlegt, das GitHub Repo auf "Private" zu stellen und via Netlify zu hosten. Falls dies gefordert wird, muss der Netlify CLI-Workflow etabliert werden.
