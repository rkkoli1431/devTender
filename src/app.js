const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res)=>{
    const user = new User({
        firstName : "Virat",
        lastName : "Kohli",
        emailId : "vk@gmail.com",
        password : "vk@1234",
    });

    try{
        await user.save();
        res.send("Data Saved Successfully ....");
    }catch(err){
        res.status(400).send("Error saving the use ..."+err.massage);
    }

});

connectDb().then(()=>{
    console.log("Database connetion successfully .....");
    
app.listen(8000, ()=>{
    console.log("Server is successfully run on port 8000...");
});
}).catch((err)=>{
    console.log("Database can't estabalish ...");
}) ; 
