const express = require("express");

const app = express();


app.use("/get", (req, res)=>{
    res.send("Get the Hello hello hello !!!!!!");
});

app.use("/set", (req, res)=>{
    res.send("Hello World !!!!!!");
});


app.use("/", (req, res )=>{
    res.send("THIS IS MY CODECHAMP'S DASHBOARD");
});

app.listen(8000, ()=>{
    console.log("Server is successfully listening on port 3000.....");
});
