const express = require("express");

const app = express();

//This will only handle GET call to / user
app.get("/user",(req, res)=>{
    res.send({firstName: "Rahul", lastName: "Koli"})
});

app.post("/user",(req, res)=>{
    res.send("Save Data Successfully On Database");
});

app.delete("/user",(req, res)=>{
    res.send("Data Deleted Successfully !");
});

// this will match all the HTTP method API calls to /test
app.use("/get", (req, res)=>{
    res.send("Get the Hello hello hello !!!!!!");
});


app.listen(8000, ()=>{
    console.log("Server is successfully listening on port 3000.....");
});




// app.use("/set", (req, res)=>{
//     res.send("Hello World !!!!!!");
// });


// app.use("/", (req, res )=>{
//     res.send("THIS IS MY CODECHAMP'S DASHBOARD");
//     console.log("Hello");
// });