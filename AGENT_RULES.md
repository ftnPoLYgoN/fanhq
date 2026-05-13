# AGENT_RULES.md - Verhaltensregeln für Agenten

Dieses Dokument definiert die Zuständigkeiten und Regeln für die Zusammenarbeit von KI-Agenten im FanHQ Projekt.

## Rollendefinition

### Agent A (Daten-Agent / Architekt)
- **Eigentümer** des Datenmodells (`/data`).
- Verantwortlich für die Einhaltung des Schemas.
- Einziger Agent, der Dateien in `/data/schemas` und `/data/indexes` ändern darf.
- Erstellt die Vereins-JSONs.

### Agent B (App-Builder)
- **Konsument** der Daten.
- Nutzt die JSON-Dateien und Indexe, um die UI/App zu bauen.
- Darf das Schema **nicht** eigenmächtig ändern.
- Darf keine neuen Felder in Vereinsdateien einführen, ohne Rücksprache mit Agent A.

## Daten-Regeln

1. **Konsistenz**: Alle Vereinsdateien müssen exakt dem `club.schema.json` entsprechen.
2. **Missing Data**: Fehlende Werte müssen konsistent als `null` oder leere Arrays `[]` dargestellt werden. Keine Felder löschen.
3. **Quellentrennung**: Offizielle Quellen (`official`) und Fanquellen (`fan`) müssen strikt getrennt bleiben.
4. **Schreibweise**: Slugs sind immer kleingeschrieben und mit Bindestrichen (Kebab-Case). Beispiel: `fortuna-duesseldorf.json`.
5. **IDs**: Jede ID ist permanent und darf nicht geändert werden.

## Rechtliche Leitplanken

- Keine geschützten Logos/Wappen direkt im Repository speichern (nur Metadaten/Links).
- Keine fremden Texte (z.B. Wikipedia-Artikel) kopieren.
- Markiere unsichere Daten mit dem `trust_level: "uncertain"`.

## Kommunikations-Workflow

Wenn Agent B feststellt, dass Daten fehlen oder das Schema erweitert werden muss:
1. Agent B meldet den Bedarf an Agent A.
2. Agent A aktualisiert das Schema und ggf. die betroffenen JSONs.
3. Erst danach implementiert Agent B die neuen Features.
