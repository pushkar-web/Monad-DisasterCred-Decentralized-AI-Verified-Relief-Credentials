const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./database');
const { registryContract, escrowContract } = require('./monad');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// 1. POST /claim
// Receives claim data from the mobile app
app.post('/claim', upload.array('photos', 5), (req, res) => {
    const { did, claimData, aiResult } = req.body;

    // Validate inputs
    if (!did || !claimData) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.run(
        `INSERT INTO claims (did, claimData, aiResult, status) VALUES (?, ?, ?, ?)`,
        [did, claimData, aiResult || '{}', 'Submitted'],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ success: true, message: 'Claim submitted successfully', claimId: this.lastID });
        }
    );
});

// 2. POST /generate-zk
// Simulates ZK proof generation for the claim to avoid storing raw data on-chain
app.post('/generate-zk', async (req, res) => {
    const { did, claimHash } = req.body;

    // In a real app, this would use SnarkJS or similar to prove eligibility.
    // We simulate the output.
    const mockZkProof = "0x" + Math.random().toString(16).slice(2).padStart(64, '0');

    // Optionally automatically record to Monad
    try {
        console.log(`[Monad Testnet] Submitting to registry for ${did}`);
        // If contract is actually deployed with a real PK:
        // const tx = await registryContract.registerVC(did, claimHash, mockZkProof);
        // await tx.wait();

        db.run(`UPDATE claims SET zkProof = ?, status = 'AI Verified' WHERE did = ?`, [mockZkProof, did]);

        res.json({ success: true, proof: mockZkProof, txHash: "0xmocktxhash123... (Hackathon Mode)" });
    } catch (e) {
        console.error("Monad TX error (expected if mock address provided):", e.message);
        res.status(500).json({ error: 'Failed to record on Monad Testnet', details: e.message });
    }
});

// 3. POST /sync
// For offline-first syncing. Batch uploads claims that were taken offline.
app.post('/sync', (req, res) => {
    const { claims } = req.body;
    if (!claims || !Array.isArray(claims)) return res.status(400).json({ error: 'Invalid payload' });

    let inserted = 0;
    claims.forEach(c => {
        db.run(
            `INSERT OR IGNORE INTO claims (did, claimData, aiResult) VALUES (?, ?, ?)`,
            [c.did, JSON.stringify(c.claimData), JSON.stringify(c.aiResult)],
            (err) => { if (!err) inserted++; }
        );
    });

    res.json({ success: true, message: `Synced ${claims.length} claims` });
});

// 4. GET /status/:did
// Used by the victim app tracker card
app.get('/status/:did', (req, res) => {
    db.get(`SELECT * FROM claims WHERE did = ?`, [req.params.did], (err, row) => {
        if (err) return res.status(500).json({ error: 'DB Error' });
        if (!row) return res.status(404).json({ error: 'Claim not found' });

        // Count approvals for the timeline
        db.get(`SELECT COUNT(*) as count FROM approvals WHERE did = ?`, [req.params.did], (err, countRow) => {
            const approvals = countRow ? countRow.count : 0;
            res.json({
                claim: row,
                approvals: approvals,
                thresholdNeeded: 5,
                thresholdMet: approvals >= 3
            });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`DisasterCred Backend running on port ${PORT}`);
    console.log(`Monad RPC: ${process.env.MONAD_RPC_URL}`);
});
