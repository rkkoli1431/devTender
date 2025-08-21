const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName";

userRouter.get("/user/requests/received",userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser ._id,
        }).populate("fromUserId", ["firstName", "lastName"]);

        res.json({
            message: "Data fetch successfully",
            data: connectionRequest,
        })
    }catch(err){
        res.status(400).send("ERROR :" +err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try{
          
        const loggedInUser = req.user;
        console.log(loggedInUser);
        const connectionRequest = await ConnectionRequest.find({
            
        $or: [
            { toUserId: loggedInUser._id, status: "accepted" },
            { fromUserId: loggedInUser._id, status: "accepted" },
        ],
        
    }).populate("fromUserId", USER_SAFE_DATA );
        res.json({ data: connectionRequest });
    }catch(err){
        res.status(400).send({ message: err.message });  
    }
});

module.exports = userRouter;

