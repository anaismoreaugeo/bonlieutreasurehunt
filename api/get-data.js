const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data.json');

module.exports = (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        const jsonData = data ? JSON.parse(data) : [];
        res.status(200).json(jsonData);
    });
};
