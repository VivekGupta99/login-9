const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase')

//middleware
const userAuthentication = require('../middleware/auth');

// Routes
router.get('/purchasePremium', userAuthentication, purchaseController.purchasePremium);

router.post('/updateTransactionStatus/success', userAuthentication, purchaseController.updateTransactionStatus);

router.post('/updateTransactionStatus/failed', userAuthentication, purchaseController.updateTransactionStatusFailed);

module.exports = router;