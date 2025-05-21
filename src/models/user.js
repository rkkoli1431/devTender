const mongoose = require("mongoose");
const validator = require("validator");

const useSchema = mongoose.Schema({
    firstName :{
        type: String,
        required: true,
        trim: true,
        minLenght: 5,
        maxLength: 20,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
        minLenght: 3,
    },

    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validator(value)
        {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address : " +value);
            }
        }
    },

    password: {
        type: String,
        required: true,
        minLenght: 8,
        maxLength : 10,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter the Strong Password :" +value); 
            }
        }
    },

    age: {
        type: Number,
        min: 18,
    },

    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "other"].includes(value))
            {
                throw new Error("Gender data is not valid ");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "Dummy Photo Url",
    },
    about:{
        type: [String],
        default: "This is default about the user !",
    },
    skills:{
        type: [String],
        required: true,
    }
},{ timestamps: true });

const User = mongoose.model("User", useSchema);

module.exports = User;