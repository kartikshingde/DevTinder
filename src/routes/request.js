const express=require('express')
const requestRouter=express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');
const user = require('../models/user');


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  
  try{

    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const allowedStatus=["ignored","interested"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:"Invalid Status type: "+status,
      })
    }

    

    const toUser=await user.findById(toUserId)
    if(!toUser){
      return res.status(400).json({
        message:"User Not found!"
      })
    }

    // If there is an existing ConnectionRequest
    const existingConnectionRequest=await ConnectionRequest.findOne({
      
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId},
      ],

    });

    if(existingConnectionRequest){
      return res.status(400).json({
        message:"Connection Request Already Exist.",
      })
    }

    


    const connectionRequest=new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data=await connectionRequest.save()

    res.json({
      message:req.user.firstName+" is "+status+" in "+toUser.firstName,
      data,
    })



  }catch(err){
    res.status(400).send("ERROR: "+err.message)
  }

});

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{

  try{
    const loggedInUser=req.user;
    const {status,requestId}=req.params;

    // Validate the status
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:"Status not allowed"
      })
    }

    const newConnectionRequest=await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested",
    })
    if(!newConnectionRequest){
      return res.status(404).json({message:"Connection request not found"})
    }

    newConnectionRequest.status=status;
    const data=await newConnectionRequest.save();

    res.json({message:"Connection request "+status ,data})


    // Kartik => Priti
    // Is priti LoggedIn = toUserId i.e loggedInUser==toUserId
    // status= interested
    // request Id should be valid



  } catch(err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


module.exports=requestRouter;