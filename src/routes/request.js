const express=require('express')
const requestRouter=express.Router();

const { userAuth } = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const { firstName } = req.user;
  res.send(`${firstName} has sent a connection request.`);
});



module.exports=requestRouter;