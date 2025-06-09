const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Post the user data on database all 
authRouter.post("/signup",async(req, res)=>{
   try{
    // Validation of data 
    validateSignUpData(req);

    const {firstName, lastName, emailId, } = req.body;

    const {password} = req.body;
    const passwordHash = await bcrypt.hash(password,10)
   
    // Encrypt the password
    // Creating a new instance of the User Model 
    // console.log(req.body);
    const user = new User ({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
    //  console.log(passwordHash);  check the password is come into the database 
    // const user = new User(console.log(user));
   
       await user.save();
       res.send("Data Saved Successfully ....");
    }catch(err){
        res.status(400).send("ERROR ... "+err.message);
    }
    
});

// Login User API
authRouter.post("/login",async(req, res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
         // This is check the password on login time console print 

        if(isPasswordValid){

            const token = await jwt.sign({_id: user._id}, "Dev@Tinder$18",{ expiresIn: '1d' });
            // Add the token to cookie and send the response back to the server 
            res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000)} // cookie will be removed after 8 hours
);
            res.send("User Login Successfully ...");
        }
        else{
            throw new Error("Invalid Password");
        }
    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
});

authRouter.post("/logout",async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    res.send("Logout Successful !!..");
})

module.exports = authRouter;