const express = require('express');
const app = express();
app.use(express.json());

let items = [];

app.get('/items', (req, res) => {
    res.status(200).json(items);
});

app.post('/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

module.exports = app;
