const mongoose = require("mongoose");

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://namaste:taaCUqibXTBafTTW@namastenode.n1zysa6.mongodb.net/devTender");
};

module.exports = connectDb;



