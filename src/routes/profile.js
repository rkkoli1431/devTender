const {userAuth} = require("../middlewares/auth");
const express = require("express");

const profileRouter = express.Router();

// Profile API To Get The Data

profileRouter.get("/profile", userAuth, async (req, res ) => { 
    try{ 
        const user = req.user;
        res.send(user);
}catch(err){
    res.status(400).send("ERROR : "+err.message);
}
});

module.exports = profileRouter;