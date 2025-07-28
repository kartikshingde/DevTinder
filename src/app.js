const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const { validateSignUpData } = require("./src/utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./src/middlewares/auth");
const user = require("./src/models/user");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email Format");
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPassValid = await user.validatePassword(password);

    if (isPassValid) {
      //jwt token
      const token = await user.getJWT();
      res.status(400).send("Some Error Occured ");
    }
  } catch (err) {
    res.send("ERROR:" + err.message);
  }
});

// /profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const { firstName } = req.user;
  res.send(`${firstName} has sent a connection request.`);
});

//Feed Api- GET /feed -  get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send("Something went wrong!");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection Established.");
    app.listen(7777, () => {
      console.log("App is listening on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed..." + err);
  });
