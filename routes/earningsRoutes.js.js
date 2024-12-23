const express = require('express');
const { calculateEarnings } = require('../controllers/earningsController');

const router = express.Router();

// Route for calculating earnings
router.post('/calculate', calculateEarnings);

module.exports = router;
