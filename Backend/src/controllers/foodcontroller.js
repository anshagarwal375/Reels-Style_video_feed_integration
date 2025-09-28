const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const { v4: uuid } = require("uuid");
const saveModel = require("../models/save.model");

async function createFood(req, res) {
  try {
    const fileUploadResult = await storageService.uploadfile(
      req.file.buffer,
      uuid()
    );

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "food created successfully",
      food: foodItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating food", error: error.message });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel
      .find()
      .populate("foodPartner", "name email -_id");

    res.status(200).json({
      message: "food items fetched successfully",
      foodItems: foodItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error: error.message });
  }
}

async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const userId = req.user;

    const isAlreadyLiked = await likeModel.findOne({
      user: userId,
      food: foodId,
    });

    if (isAlreadyLiked) {
      await likeModel.findByIdAndDelete(isAlreadyLiked._id);
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
      return res.status(200).json({
        message: "food unliked successfully",
      });
    }

    const like = await likeModel.create({
      user: userId,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    res.status(201).json({
      message: "food liked successfully",
      like: like,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing like/unlike", error: error.message });
  }
}

async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const userId = req.user;

    const isAlreadySaved = await saveModel.findOne({
      user: userId,
      food: foodId,
    });

    if (isAlreadySaved) {
      await saveModel.deleteOne({
        user: userId,
        food: foodId,
      });
      return res.status(200).json({
        message: "food unsaved successfully",
      });
    }

    const save = await saveModel.create({
      user: userId,
      food: foodId,
    });

    return res.status(201).json({
      message: "food saved successfully",
      save: save,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing save/unsave", error: error.message });
  }
}

module.exports = { createFood, getFoodItems, likeFood, saveFood }
