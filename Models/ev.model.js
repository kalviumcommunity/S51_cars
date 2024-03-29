const mongoose = require("mongoose");

const evSchema = new mongoose.Schema({
    id:{type:Number},
    Name: { type: String },
    Price: { type: String },
    model: { type: String },
    bodytype: { type: String },
    range: { type: String },
    chargingtime: { type: String },
    safetyfeatures: { type: String },
    batterycapacity: { type: String },
    createdby:{type:String}
}, {
    timestamps: true
});

module.exports = mongoose.model("evs", evSchema); // Correct usage of mongoose.model 
