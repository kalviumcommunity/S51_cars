const mongoose=require("mongoose")

const evSchema=new mongoose.Schema({
    name:{type:String},
    price:{type:String},
    model:{type:String},
    body_type:{type:String},
    range:{type:String},
    charging_time:{type:String},
    safety_features:{type:String},
    battery_capacity:{type:String},
},{
    Timestamp:true
})

module.exports=mongoose.model("ev",evSchema);