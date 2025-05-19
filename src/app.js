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
   
    // Creating a new instance of the User Model 
    // console.log(req.body);
    const userObj = new User (req.body);
    const user = new User(userObj);
    try{
       await user.save();
       res.send("Data Saved Successfully ....");
    }catch(err){
        res.status(400).send("Something went wrong ..."+err);
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
app.patch("/user:/userId",async(req, res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{

        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed)
        {
            throw new Error("Update noe Allowed");
        }
        if(data?.skills.length> 10){
            throw new Error("Skills cannot be more than 10");
        }
        // const user = await User.findByIdAndUpdate({_id: userId },data);
        const user = await User.findByIdAndUpdate(userId, data);
        runValidators: true,
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


