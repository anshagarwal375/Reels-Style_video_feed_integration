const express = require("express");
const multer = require('multer');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const foodcontroller = require("../controllers/foodcontroller");

const upload = multer({
  storage: multer.memoryStorage()
});

// Correct POST route for creating food
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodcontroller.createFood);

// **ERROR**: GET /api/food handler should not be `createFood`
router.get('/', authMiddleware.authUserMiddleware, foodcontroller.getFoodItems);

// router.get('/food-partner/:id', authMiddleware.authFoodPartnerMiddleware, foodcontroller.getFoodPartnerById);

router.post('/like', authMiddleware.authUserMiddleware, foodcontroller.likeFood);

router.post("/save", authMiddleware.authUserMiddleware, foodcontroller.saveFood);

module.exports = router;
