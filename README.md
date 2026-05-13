# FanHQ Data Architecture

Dieses Repository enthält die vollständige Datenbasis für das Projekt **FanHQ**. 
Es dient als "Single Source of Truth" für Vereinsinformationen, Quellen und Stadiondaten.

## Projektziel
Aufbau einer sauberen, versionierbaren und agentenfreundlichen Datenstruktur für Fußballvereine (initial Deutschland, 1.-3. Liga).

## Ordnerstruktur
- `/data`: Enthält alle JSON-Daten, Schemas und Indexe.
    - `/schemas`: JSON Schema Definitionen zur Validierung.
    - `/indexes`: Optimierte Dateien für schnelles Laden und Filtern.
    - `/clubs`: Die eigentlichen Vereinsdaten (eine Datei pro Verein).
    - `/meta`: Erlaubte Typen, Kategorien und Metadaten.
- `/docs`: Ausführliche Dokumentation der Datenstrategie.
- `/scripts`: Platzhalter für Update- und Validierungsscripte.

## Nutzung für Agenten
Agenten, die an der Web-App arbeiten (Agent B), lesen ausschließlich aus dem `/data` Verzeichnis. 
Änderungen an der Datenstruktur oder dem Schema sind Agent A (Datenarchitekt) vorbehalten.

Siehe [AGENT_RULES.md](AGENT_RULES.md) für detaillierte Verhaltensregeln.
