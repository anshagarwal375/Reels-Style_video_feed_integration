const foodPartnerModel = require("../models/foodpartner.model");
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const foodPartner = await foodPartnerModel.findById(decoded._id);
    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "please login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usermodel.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({ message: "please login first" });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
