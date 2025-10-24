require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://devconnectbykartik.netlify.app",
    ],
    credentials: true,
  })
);

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");
const userRouter = require("./src/routes/user");
const s3Router = require("./src/routes/s3Router");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", s3Router);

app.get("/", (req, res) => {
  res.send("hello from express on Vercel !");
});

// Connect to database
connectDB()
  .then(() => {
    console.log("Database connection Established.");
  })
  .catch((err) => {
    console.log("Database Connection Failed..." + err);
  });

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(7777, () => {
    console.log("App is listening on port 7777");
  });
}

module.exports = app;
