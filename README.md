# package.json => is configuration file in our projects   or META DATA    
# Create Server - => Using Express JS
# Install express js - > npm install express

# node modules - 
    - all the souce code express js and come into the project and USE IT 
    - to get the code inside the project 

# What is package.json and package-lock.json 

    - package.jso
    - package-lock.json

# Install the  nodemon - > why 
    - for server unstopble
    - How 
    - sudo npm install -g nodemon       -g is globle level access the any where install in system level 
    - npm install -g nodemon
    - nodemon src/app.js                => nodemon automatically take care all of those things if you want save the file nodemon take care

# Server Start Shortcut Tips or Trick 
    - Go the the package.json file and put it those path in script module
    - 1 "start": "node src/app.js",     => this line say not save changes automatically
    - 2 "dev"  : "nodemon src/app.js",  => this line say auto update when you wanted changes in code   (refresh)

# Create the server code in 3 line
    const express = require("express");

    const app = express();

    app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000.....");
});
