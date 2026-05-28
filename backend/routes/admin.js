const express = require('express');
const User = require('../models/User');
const BinReport = require('../models/BinReport');
const auth = require('../middleware/auth');
const router = express.Router();

// Middleware to check admin role
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

// GET /api/admin/users - List all users
router.get('/users', auth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/reports - List all bin reports (optional, for analytics)
router.get('/reports', auth, requireAdmin, async (req, res) => {
  try {
    const reports = await BinReport.find().sort({ reportedAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
