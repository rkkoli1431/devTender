const express = require("express");
const User = require("./models/user");
const connectDB = require("./config/database");
const {validateSignUpData} = require("./utils/validations");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.use(cookieParser());

// get user by email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
       const user = await User.findOne({emailId: userEmail});
       if(!user){
        res.status(400).send("User not found");
       } else{
        res.send(user);
       }
    }
    catch(err)
    {
        res.send("Something went wrong ....");
    }
});

//Feed API - GET /feed - get all the users from the database

app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong ....");
    }
});

// Post the user data on database all 
app.post("/signup",async(req, res)=>{
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

app.post("/login",async(req, res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid); // This is check the password on login time console print 

        if(isPasswordValid){

            const token = await jwt.sign({_id: user._id}, "Dev@Tinder$18");
            console.log(token);
            // Add the token to cookie and send the response back to the server 
            res.cookie("token", token);
            res.send("User Login Successfully ...");
        }
        else{
            throw new Error("Invalid Password");
        }
    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
});

// Profile API To Get The Data

app.get("/profile",async(req, res )=>{
    try{
    const cookies = req.cookies;
    
    const {token} = cookies;
    console.log(token);
    if(!token)
    {
        throw new Error("Invalid Token");
    }
    // Validate the logi her

    const decodedMassage = await jwt.verify(token, "Dev@Tinder$18");
    
    const {_id} = decodedMassage;
    console.log("Logged In User :"+ _id);

    const user = await User.findByIdOne(_id);
    if(!user){
        throw new Error("User does not exist ");
    }

    res.send(user);
    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
});

//  delete the user from database 
app.delete("/user",async(req, res)=>{
    console.log(req.body);
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        // const user = await User.findByIdAndDelete({_id: userId});
        res.send("Data deleted successfully....");
    }
    catch(err){
        res.status(400).send("Something went wrong ...");
    }
});

// Update the User information on database 
app.patch("/user",async(req, res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try{

        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed)
        {
            throw new Error("Update not Allowed");
        }
        if(data?.skills.length> 10){
            throw new Error("Skills cannot be more than 10");
        }
        // const user = await User.findByIdAndUpdate({_id: userId },data,{
        //     runValidators: true,
        // });
        const user = await User.findByIdAndUpdate(userId, data);
        res.send("User Update Successfully....");
    }
    catch(err){
        res.send("User Updated Fail ....."+err);
    }
});


connectDB().then(()=>{
    console.log("Database connection Successfully ...");
    app.listen(8000,()=>{
    console.log("Server running on port number 8000...");
});
})
.catch((err)=>{
    console.log("Database connot be connected !!!");
})


