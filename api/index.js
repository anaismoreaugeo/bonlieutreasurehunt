const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function checkAndCreateFile() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ logos: [] }), 'utf8');
    }
}

function calculatePosition(index) {
    const columns = 'ABCDEFGHIJKL';
    const column = columns[index % 12];
    const row = Math.floor(index / 12) + 1;
    return `${column}${row}`;
}

function addLogoToFile(logo) {
    checkAndCreateFile();

    const data = fs.readFileSync(filePath, 'utf8');
    let json = JSON.parse(data);

    // Vérifier que "logos" est bien un tableau
    if (!Array.isArray(json.logos)) {
        json.logos = [];
    }

    // Vérifier que "nextIndex" est bien un nombre
    if (typeof json.nextIndex !== 'number') {
        json.nextIndex = 0;
    }

    let position;
    if (json.logos.length < 72) {
        // Si moins de 72 logos, ajouter le nouveau logo
        json.logos.push(logo);
        position = calculatePosition(json.logos.length - 1);
    } else {
        // Remplacer le logo à la position nextIndex
        json.logos[json.nextIndex] = logo;
        position = calculatePosition(json.nextIndex);
        // Mettre à jour nextIndex de manière circulaire
        json.nextIndex = (json.nextIndex + 1) % 72;
    }

    // Sauvegarder les modifications
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');

    return position;
}


app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API' });
});

app.post('/api/add-logo', (req, res) => {
    const logo = req.body.logo

    const position = addLogoToFile(logo)

    res.json({message: position})
})

app.get('/api/list-logos', (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    res.json({ logos: json.logos });
})

module.exports = app;