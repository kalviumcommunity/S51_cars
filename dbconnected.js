require("dotenv").config(); 
const mongoose=require("mongoose")
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.Database)
        console.log("Connected to MongoDB");

    }catch(err){
        console.log("error", err)
    }
    
}
const isConnected = ()=>{
    return mongoose.connection.readyState === 1;
}
module.exports={connectdb, isConnected};