const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received",userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser ._id,
        }).populate("fromUserId", ["firstName", "lastName"]);

        res.json({
            message: "Data fetch successfully",
            data: connectionRequest,
        });
    }catch(err){
        res.status(400).send("ERROR :" +err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepeted" },
                {fromUseId: loggedInUser._id, status: "accepeted" },
            ],
        }).populate("fromUserId", ["firstName", "lastName"]);

        const data = connectionRequest.map((row) => row.fromUserId);
        res.json({data});
    }catch(err){
        res.status(400).send({massage: err.massage});
    }
});

module.exports = userRouter;

