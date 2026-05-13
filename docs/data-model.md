# Datenmodell-Dokumentation

Dieses Dokument beschreibt das technische Datenmodell von FanHQ.

## JSON-Struktur
Jeder Verein besitzt eine `.json` Datei. Diese Dateien folgen dem [club.schema.json](../data/schemas/club.schema.json).

### Hauptbereiche

#### 1. Basisdaten
Enthält Stammdaten wie Name, Stadt, Stadionname und die aktuelle Liga.
- `slug`: Eindeutiger Identifikator für URLs (z.B. `fc-koeln`).
- `league`: Die aktuelle Liga (z.B. `bundesliga`, `zweite-bundesliga`).

#### 2. Quellen (Sources)
Quellen sind in verschiedene Arrays unterteilt, um die Anzeige in der App zu steuern:
- `offizielle_quellen`: Alles direkt vom Verein (Website, Socials).
- `inoffizielle_quellen`: Fankultur (Blogs, Foren).
- `daten_nachschlagen`: Portale wie Transfermarkt, Kicker, Transfer-Statistiken.
- `medien_berichterstattung`: Lokale und nationale Presse.
- `stadion_matchday`: Anreise, Parken, Gästeinfos.

### Source-Interface
Jedes Objekt in diesen Arrays hat folgende Struktur:
```json
{
  "url": "https://...",
  "name": "Anzeigename",
  "category": "official | fan | stats | media | stadium",
  "source_type": "official-club-site | fan-forum | etc.",
  "trust_level": "official | trusted-third-party | unofficial | uncertain",
  "notes": "Optionale Notiz"
}
```

## Indexdateien
Um Performance-Probleme zu vermeiden, nutzt die App Indexe:
- `clubs-index.json`: Liste aller Vereine mit Basisdaten für Navigation.
- `leagues-index.json`: Definition der verfügbaren Ligen.
