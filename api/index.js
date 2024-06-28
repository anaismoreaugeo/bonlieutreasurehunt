const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function checkAndCreateFile() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ logos: [], positions: [], nextIndex: 0 }), 'utf8');
    }
}

function generateRandomPosition(existingPositions) {
    const columns = 'ABCDEFGHIJKL';
    let position;
    do {
        const column = columns[Math.floor(Math.random() * 12)];
        const row = Math.floor(Math.random() * 6) + 1; // Random row between 1 and 5
        position = `${column}${row}`;
    } while (existingPositions.includes(position));
    return position;
}

function addLogoToFile(logo) {
    checkAndCreateFile();

    const data = fs.readFileSync(filePath, 'utf8');
    let json = JSON.parse(data);

    // Vérifier que "logos" et "positions" sont bien des tableaux
    if (!Array.isArray(json.logos)) {
        json.logos = [];
    }
    if (!Array.isArray(json.positions)) {
        json.positions = [];
    }

    // Vérifier que "nextIndex" est bien un nombre
    if (typeof json.nextIndex !== 'number') {
        json.nextIndex = 0;
    }

    let position;
    if (json.logos.length < 50) {
        // Si moins de 50 logos, ajouter le nouveau logo
        position = generateRandomPosition(json.positions);
        json.logos.push(logo);
        json.positions.push(position);
    } else {
        // Remplacer le logo à la position nextIndex
        json.logos[json.nextIndex] = logo;
        position = json.positions[json.nextIndex];
        // Mettre à jour nextIndex de manière circulaire
        json.nextIndex = (json.nextIndex + 1) % 50;
    }

    // Sauvegarder les modifications
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');

    return position;
}

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API' });
});

app.post('/api/add-logo', (req, res) => {
    const logo = req.body.logo;

    const position = addLogoToFile(logo);

    res.json({ message: position });
});

app.get('/api/list-logos', (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    res.json({ data: json });
});

module.exports = app;
