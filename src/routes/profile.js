const {userAuth} = require("../middlewares/auth");
const express = require("express");
const { validateEditProfileDate } = require("../utils/validations");

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

    profileRouter.put("/profile/edit", userAuth, async (req, res) => {
        try {
            if(!validateEditProfileDate(req))
            {
                throw new Error("Invalid Edit Request");
            }
            const loggedInUser = req.user;
            // console.log(loggedInUser);

            Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
            await loggedInUser.save();

            // console.log(loggedInUser);

            // res.send(`${loggedInUser.firstName},Your profile updated successfull !!`);
            // This is the good way to sending the response
            res.json({
                message: `${loggedInUser.firstName},Your profile updated successfull !!`,
                data: loggedInUser,
            })
        } catch(err){
            res.status(400).send("ERROR : ", +err.message);
        }
    })

    module.exports = profileRouter;