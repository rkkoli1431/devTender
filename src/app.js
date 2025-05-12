const express = require("express");
const User = require("./models/user");
const connectDB = require("./config/database");
const app = express();

app.use(express.json());

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


