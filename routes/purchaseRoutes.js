const express = require('express');
const { recordPurchase } = require('../controllers/purchaseController');

const router = express.Router();

// Route for recording a purchase
router.post('/', recordPurchase);

module.exports = router;
