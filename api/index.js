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

function addLogoToFile(logo) {
    checkAndCreateFile();

    const data = fs.readFileSync(filePath, 'utf8');
    let json = JSON.parse(data);

    // Ensure "logos" key exists and is an array
    if (!Array.isArray(json.logos)) {
        json.logos = [];
    }

    // Add the new logo to the "logos" array
    json.logos.push(logo);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
}

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API' });
});

app.post('/api/add-logo', (req, res) => {
    const logo = req.body.logo

    addLogoToFile(logo)

    res.json({message: req.body.logo})
})

app.get('/api/list-logos', (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    res.json({ logos: json.logos });
})

module.exports = app;