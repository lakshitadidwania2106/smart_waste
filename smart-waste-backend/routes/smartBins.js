const express = require('express');
const router = express.Router();
const SmartBin = require('../models/SmartBin');

// TEST ROUTE
router.get('/', async (req, res) => {
    try {
        const bins = await SmartBin.find();
        res.json(bins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
