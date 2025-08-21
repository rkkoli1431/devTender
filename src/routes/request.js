const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req, res)=>{

    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                massage: "Invalid status type : "+status });
        }

        // Check the User there exist or not in DB when request without Store

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({massage: "User Not Found !"});
        }

        // IF there is an existing ConnectionRequest 
        
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });

        if(existingConnectionRequest){
            return res.status(400).send({massage: "Connection Request Already Exists !!"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        
        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        });
    }catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
    // res.send(user.firstName +" Connection Request Sent !!");
});

requestRouter.post("/request/review/:status/:requestId",userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepeted", "rejected"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({ massage: "Status not allowed !"})
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        console.log(connectionRequest);

        if(!connectionRequest){
            return res.status(404).json({massage: "Connection Request Not Found"});
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({massage: "Connection request " +status, data }); 

    }catch(err){
        res.status(400).send("ERROR : "+err.massage);
    }
})

module.exports = requestRouter;