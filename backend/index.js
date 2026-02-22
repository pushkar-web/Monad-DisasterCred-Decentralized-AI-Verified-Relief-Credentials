require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database Setup
const db = new sqlite3.Database('./disaster_cred.db', (err) => {
    if (err) console.error('DB Error:', err.message);
    console.log('Connected to SQLite.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS claims (
    id TEXT PRIMARY KEY,
    did TEXT,
    damage_level TEXT,
    eligibility_score INTEGER,
    recommended_aid TEXT,
    status TEXT DEFAULT 'submitted',
    approvals INTEGER DEFAULT 0,
    tx_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Routes
app.post('/claim', (req, res) => {
    const { id, did, damage_level, eligibility_score, recommended_aid } = req.body;
    const query = `INSERT INTO claims (id, did, damage_level, eligibility_score, recommended_aid) VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [id, did, damage_level, eligibility_score, recommended_aid], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Claim recorded locally', id });
    });
});

app.get('/status/:did', (req, res) => {
    const { did } = req.params;
    db.all(`SELECT * FROM claims WHERE did = ?`, [did], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/claims', (req, res) => {
    db.all(`SELECT * FROM claims`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/approve', (req, res) => {
    const { claimId } = req.body;
    db.run(`UPDATE claims SET approvals = approvals + 1 WHERE id = ?`, [claimId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        // Trigger blockchain tx logic here when approvals >= 3
        res.json({ message: 'Approval recorded', approvals: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
