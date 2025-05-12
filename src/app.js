const express = require("express");
const User = require("./models/user");
const connectDB = require("./config/database");
const app = express();

app.use(express.json());


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
})

//Feed API - GET /feed - get all the users from the database

app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong ....");
    }
})

app.post("/signup",async(req, res)=>{
   
    // Creating a new instance of the User Model 
    // console.log(req.body);
    const userObj = new User (req.body);
    const user = new User(userObj);
    try{
       await user.save();
       res.send("Data Saved Successfully ....");
    }catch(err){
        res.status(400).send("Error saving the user ");
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


