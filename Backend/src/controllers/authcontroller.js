const usermodel = require("../models/user.model");
const foodpartnermodel=require("../models/foodpartner.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




// -----------------------//
// controller for registering user
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
// for checking user  already exists or not 
  const isUserAlreadyExists = await usermodel.findOne({
    email,
  });
  if (isUserAlreadyExists) {
    res.status(400).json({
      message: "user already exists",
    });
  }

// --------------------- //




// --hash password----//
  const hashedpassword = await bcrypt.hash(password, 10);
    //create user 
  const user = await usermodel.create({
    fullName,
    password: hashedpassword,
    email,
  });
// -----------------//








//   ---------------------- //
    // create token
  const token = jwt.sign(
    {
        id: user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"user registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
        }
    })

}
// ----------------------- //


async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await usermodel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
  res.cookie("token", token, { httpOnly: true }); // add other options as needed
  
  res.status(200).json({
    message: "user logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName
    },
  });
}


async function logoutUser(req,res){
  // clear the cookie
  res.clearCookie("token");
  res.status(200).json({
    message:"user logged out successfully"
  });
}

async function registerFoodPartner(req,res){
const {Name,email,password,phone,address,contactName}=req.body;
const isFoodPartnerExists=await foodpartnermodel.findOne({
  email
})
if(isFoodPartnerExists){
  return res.status(400).json({
    message:"food partner already exists"
  })
}

const hashedpassword=await bcrypt.hash(password,10);
const foodPartner=await foodpartnermodel.create({
  name,
  email,
  password:hashedpassword,
  phone,
  address,
  contactName
})
const token=jwt.sign({
  id:foodPartner._id,
},process.env.JWT_SECRET)

res.cookie("token",token)

res.status(201).json({
  message:"food partner registered successfully",
  foodPartner:{
    id:foodPartner._id,
    email:foodPartner.email,
    name:foodPartner.name,
    address:foodPartner.address,
    contactName:foodPartner.contactName,
    phone:foodPartner.phone
  }

})

}

async function loginFoodPartner(req,res){
const {email,password}=req.body;
const foodPartner=await foodpartnermodel.findOne({
  email
})
if(!foodPartner){
return res.status(400).json({
  message:"food partner not found"
})
}
const isPasswordValid=await bcrypt.compare(password,foodPartner.password);
if(!isPasswordValid){
  return res.status(400).json({
    message:"invalid password"
  })}
const token=jwt.sign({
  id:foodPartner._id,
},process.env.JWT_SECRET)  
res.cookie("token",token)


res.status(200).json({
  message:"food partner logged in successfully",
  foodPartner:{
    id:foodPartner._id,
    email:foodPartner.email,
    name:foodPartner.name
  }

})
}

function logoutFoodPartner(req,res){
  res.clearCookie("token");
  res.status(200).json({
    message:"food partner logged out successfully"
  })
}
module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner}