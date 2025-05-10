const express = require("express");

const app = express();


app.get("/getUserData",(req, res)=>{
    try{
        // Logic of DB and get the user Data
        throw new Error("egfjgfrjfgrj");
        res.send("User Data Sent....")
    }
    catch(err){
        res.status(500).send("Something went wrong 1 !!!!!");
    }
});

app.use("/",(err, req, res, next)=>{            // in error handaling always use in last because order matter err variable keep it last 
    console.log("Something went wrong !!!");
    if(err){
        res.status(500).send("Something went wrong !!!");
    }
});



app.listen(8000, ()=>{
    console.log("Server is successfully run on port 8000...");
});