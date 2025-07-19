const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received",userAuth, async(req, res)=>{

    try{
        const loggedInuser = req.user;

        const connectionRequest = await connectionRequest.find({
            toUserId: loggedInuser._id,
            status: "interested",
        });

        res.json({
            message: "Data fetched successfully ",
            data: connectionRequest,
        });
    }catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
})

