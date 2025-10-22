const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

// ✅ SIGNUP
authRouter.post("/signup", async (req, res) => {
  try {
    // validate user data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    // Encrypt password
    const hashPass = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPass,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    // ✅ Set cookie (works in both localhost & production)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // cross-site cookie
      path: "/", // make cookie accessible to all routes
      maxAge: 8 * 3600 * 1000, // 8 hours
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("Some Error Occurred " + err.message);
  }
});

// ✅ LOGIN
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

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create JWT token
      const token = await user.getJWT();

      // ✅ Set cookie properly
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",
        maxAge: 8 * 3600 * 1000,
      });

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// ✅ LOGOUT
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
    expires: new Date(0),
  });
  res.send("LogOut Successful!!");
});

module.exports = authRouter;
