const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data.json');

module.exports = (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body)

        /* const { id, x, y } = req.body;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).json({ error: 'Server error' });
            }

            const jsonData = data ? JSON.parse(data) : [];

            jsonData.push({ id, x, y });

            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).json({ error: 'Server error' });
                }

                res.status(200).json({ message: 'Data added successfully' });
            });
        }); */
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
