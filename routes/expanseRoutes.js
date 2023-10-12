const express = require('express');
const router = express.Router();
const expanseController = require('../controllers/expanse');

// Middleware
const userAuthentication = require('../middleware/auth');

// Routes
// router.route('/exp').post(userAuthentication.authenticate, expanseController.createCustomer)       // one method
router.post("/exp", userAuthentication, expanseController.creatingExpanse);     // another method

router.get('/exp', userAuthentication, expanseController.gettingData);

router.delete('/deleteExpanse/:expanseId', userAuthentication, expanseController.deleteExpanseData)

module.exports = router;

