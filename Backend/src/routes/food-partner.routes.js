const express = require('express');
const foodPartnerController = require('../controllers/food-partner.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/food-partner/:id', authMiddleware.authFoodPartnerMiddleware, foodPartnerController.getFoodPartnerById);

module.exports = router;
