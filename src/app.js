const express = require("express");

const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth");


app.use("/admin",adminAuth);
// app.use("/user",userAuth);       also write like this middlewares

app.get("/admin/getData", (req, res)=>{
    res.send("All Data Sent !!!");
});

app.get("/user",userAuth, (req, res)=>{
    res.send("User Data Sent ...");
})

app.get("/admin/deleteData", (req, res)=>{
    res.send("Deleted the user ....");
});


app.listen(8000, ()=>{
    console.log("Server is successfully run on port 8000...");
});