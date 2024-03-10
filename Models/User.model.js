const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{type:String},
    passwors: { type: String },
    
});

module.exports = mongoose.model("users", UserSchema); // Correct usage of mongoose.model 
