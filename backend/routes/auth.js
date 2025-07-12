const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const multer = require("multer");
const audit = require("../models/audit");
//const { default: isAuthenticated } = require("../miiddleware/isAunthenticated");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    throw new Error(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
});
  

router.post("/login", async (req, res)=>{
  try {
    const{ email, password} =req.body
    const date = new Date();
    const ip = req.ip || req.connection.remoteAddress;
    console.log(date, ip);

    const month = date.getMonth();
    console.log(month,date.getHours() + " : " +  date.getMinutes() + " : " + date.getSeconds());

    const user = await User.findOne({ email });
    if (user) {
      await audit.create({
        userId: user._id,
        email: user.email,
        date: new Date(),
        ipAddress: ip,
      });
      await user.save();
    }
    //console.log(user)
    if (!user) {
      return res.status(409).json({ message: "you not have a register! first go to register " });
    }

    const ismatch = await bcrypt.compare(password, user.password)
    if (!ismatch) {
      return res.status(400).json({message : "invalid  password!"})
    }
    // if(ismatch)
    // {
    //   localStorage.setItem('id',1);
    // }

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET,{
      expiresIn: "1d",
    })
    delete user.password

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        
      })
      
      .json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message })
  }
})

router.get("/history", async (req, res)=>{

  const {id} = req.query;

  try {
    const history = await audit.find({ userId: id });
    res.json(history);
  } catch (error) {
    console.log(error);
  }
});


//export const history = async (req, res) => {
  
//router.route("/history").get(history);

module.exports = router;
