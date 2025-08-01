const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");


authRouter.post("/signup", async (req, res) => {
  try {
    // validate user
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    //Encrypt pass
    const hashPass = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPass,
    });

    await user.save();
    res.send("Data Added Successfully");
  } catch (err) {
    res.status(400).send("Some Error Occured " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid=await user.validatePassword(password)

    if (isPasswordValid) {
      // Create a jwt token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the User
      res.cookie("token", token,{expires:new Date(Date.now()+8*3600000)});

      res.send("User login successful!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout",async (req,res)=>{

  res.cookie("token",null,{expires:new Date(Date.now())})
  res.send("LogOut Successful!!");

})

module.exports = authRouter;
