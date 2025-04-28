// === PottSave - script.js ===

// === Google API Konfiguration ===
// 👉 Hier musst du deine eigenen Werte einfügen:
const CLIENT_ID = '1058518759383-85o69plleevh2o2ccl4oursc3vbcolkq.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBliDXHXfpKDzvR4Yc6-lESl6WlG-t90Lo';

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/drive.file";

let authorizeButton = document.getElementById('authorize_button');
let uploadSection = document.getElementById('upload_section');
let uploadButton = document.getElementById('upload_button');
let fileInput = document.getElementById('file_input');
let uploadStatus = document.getElementById('upload_status');
let useDateFolder = document.getElementById('use_date_folder');

let folderId = null;

// === Google API Laden und Authentifizieren ===
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        authorizeButton.onclick = handleAuthClick;
    });
}

function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        authorizeButton.style.display = 'none';
        uploadSection.style.display = 'block';
    });
}

// === Uploadlogik ===
uploadButton.onclick = async () => {
    if (!fileInput.files.length) {
        alert('Bitte mindestens eine Datei auswählen.');
        return;
    }

    uploadStatus.innerHTML = "Upload läuft...";
    let files = Array.from(fileInput.files);

    if (useDateFolder.checked) {
        await createDateFolder();
    }

    for (let file of files) {
        await uploadFile(file);
    }

    uploadStatus.innerHTML = "Alle Dateien erfolgreich hochgeladen!";
};

// === Hilfsfunktionen ===

// Ordner für heutiges Datum erstellen
async function createDateFolder() {
    let today = new Date();
    let dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD

    let folderMetadata = {
        'name': dateString,
        'mimeType': 'application/vnd.google-apps.folder'
    };

    // Prüfen ob Ordner schon existiert (vereinfachte Version)
    let response = await gapi.client.drive.files.list({
        'q': `mimeType='application/vnd.google-apps.folder' and name='${dateString}' and trashed=false`,
        'fields': 'files(id, name)'
    });

    if (response.result.files.length > 0) {
        folderId = response.result.files[0].id;
    } else {
        let file = await gapi.client.drive.files.create({
            resource: folderMetadata,
            fields: 'id'
        });
        folderId = file.result.id;
    }
}

// Datei hochladen
async function uploadFile(file) {
    let metadata = {
        'name': file.name,
        'mimeType': file.type
    };

    if (folderId) {
        metadata.parents = [folderId];
    }

    const accessToken = gapi.auth.getToken().access_token;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);

    await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: new Headers({'Authorization': 'Bearer ' + accessToken}),
        body: form,
    });
}

// Starte die Google API Client-Initialisierung
handleClientLoad();
