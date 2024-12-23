const express = require('express');
const { getEarningsReport, getEarningsBreakdown } = require('../controllers/reportsController');

const router = express.Router();

// Route to fetch real-time earnings report
router.get('/earnings/:userId', getEarningsReport);

// Route to fetch breakdown of earnings across levels and referrals
router.get('/earnings/breakdown/:userId', getEarningsBreakdown);

module.exports = router;
