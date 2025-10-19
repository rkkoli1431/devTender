const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies; // This works because cookie-parser is used in app.js

        if (!token) {
            // throw new Error("Token is not valid");
            return res.status(401).send("Please Login !");
        }

        const decoded = jwt.verify(token, "Dev@Tinder$18");
        const { _id } = decoded;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send("ERROR: " + err.message);
    }
};

module.exports = { userAuth };
