# PottSave

**PottSave** ist eine einfache Progressive Web App (PWA), um Dateien sicher und direkt auf Google Drive zu speichern.  
Entwickelt von Björn Gründel.

---

## 🚀 Funktionen
- Verbindung mit deinem Google-Account via OAuth 2.0
- Speichern beliebiger Dateien (z.B. PDFs, ZIPs, DOCs) auf deinem eigenen Google Drive
- Optionale automatische Erstellung von Tagesordnern (`Uploads/YYYY-MM-DD`)
- Unterstützung für mehrere Dateien gleichzeitig (Batch-Upload)
- PWA: Als App auf dem Smartphone oder Desktop installierbar
- DSGVO-konform: Keine Datenspeicherung auf fremden Servern

---

## 📦 Installation und Nutzung

### 1. Dateien vorbereiten
Lade folgende Dateien in dein GitHub-Repository hoch:
- `index.html`
- `script.js`
- `manifest.json`
- `icon-rounded.svg`
- `impressum.html`
- `datenschutz.html`
- `copyright.html`

**Tipp:**  
Lege alle Dateien im Hauptverzeichnis ab.

---

### 2. GitHub Pages aktivieren
- Gehe in deinem GitHub-Repository auf **Settings > Pages**.
- Wähle **Branch: main** und den Ordner `/ (root)`.
- Speichern.
- Deine App ist jetzt erreichbar unter:  
  `https://deinbenutzername.github.io/deinrepositoryname/`

---

### 3. Google OAuth API einrichten

#### a) Google Cloud Console öffnen
Gehe auf 👉 [Google Cloud Console](https://console.cloud.google.com/)

#### b) Neues Projekt erstellen
- Name z.B. **PottSave**

#### c) OAuth 2.0 einrichten
- **APIs & Services > Anmeldedaten > OAuth-Client-ID erstellen**
- Anwendungstyp: **Webanwendung**
- Ursprungs-URL (JavaScript Origins):  
  z.B. `https://deinbenutzername.github.io`
- Weiterleitungs-URI brauchst du **nicht**.

#### d) API-Schlüssel und Client-ID kopieren

---

### 4. `script.js` anpassen

Öffne die Datei `script.js` und ersetze:

```javascript
const CLIENT_ID = 'HIER_DEINE_CLIENT_ID_EINFÜGEN';
const API_KEY = 'HIER_DEIN_API_KEY_EINFÜGEN';
