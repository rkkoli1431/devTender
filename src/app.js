const express = require("express");

const app = express();


app.use("/user", (req, res, next)=>{
    console.log("Handaling route user 1 !!");
    // res.send("1st Responce ");
    next();
    
},
(req, res, next) =>{
    console.log("Handaling route user 2 !!");
   // res.send("2nd Responce")
    next();
},
(req, res, next)=>{
    console.log("Handaling route user 3 !!");
    // res.send("3rd Responce");
    next();
    
},(req, res,next)=>{
    console.log("Handaling route user 4 !!")
    // res.send("4th Responce");
    next();
});

app.listen(8000, ()=>{
    console.log("Server is successfully run on port 8000...");
});