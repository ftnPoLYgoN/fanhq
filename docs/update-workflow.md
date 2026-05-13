# Update Workflow - Datenpflege

Dieser Prozess stellt sicher, dass die FanHQ Daten aktuell und verlässlich bleiben.

## Saisonwechsel (Promotion/Relegation)
1. **Identifikation**: Welche Teams steigen auf/ab?
2. **Migration**: Verschieben der JSON-Dateien in den neuen Ligen-Ordner (z.B. von `bundesliga` zu `zweite-bundesliga`).
3. **Index-Update**: Regeneration des `clubs-index.json`.

## Link-Validierung
- Mindestens einmal pro Quartal (oder vor Saisonstart) sollten die Links geprüft werden.
- Nicht funktionierende Links werden entfernt oder als `uncertain` markiert.

## Neue Vereine hinzufügen
1. Prüfen, ob der Verein bereits existiert (Slug-Check).
2. Neue JSON-Datei basierend auf dem Schema erstellen.
3. Basisdaten ausfüllen.
4. `clubs-index.json` aktualisieren.

## Metadaten-Update
Das Feld `last_checked` in der Vereinsdatei muss bei jeder manuellen Prüfung aktualisiert werden.
Die `confidence` sollte sinken, wenn Daten lange nicht geprüft wurden.
