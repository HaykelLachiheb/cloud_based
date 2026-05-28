const express = require('express');
const BinReport = require('../models/BinReport');
const router = express.Router();

// POST /api/reports - Create a new bin report
router.post('/', async (req, res) => {
  try {
    const { coordinates, status, reporter } = req.body;
    const report = new BinReport({
      location: { type: 'Point', coordinates },
      status,
      reporter,
    });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/reports - List all bin reports
router.get('/', async (req, res) => {
  try {
    const reports = await BinReport.find().sort({ reportedAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
