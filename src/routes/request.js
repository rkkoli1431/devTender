const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth, async (req, res)=>{
    const user = req.user;
    console.log("Connection Request")

    res.send(user.firstName +" Connection Request Sent !!");
})

module.exports = requestRouter;