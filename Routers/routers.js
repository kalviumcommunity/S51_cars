const express = require('express');
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const Ev = require("../Models/ev.model");
const updateAndPostJoi=require("../validator")
const User= require("../Models/User.model")
const bcrypt=require("bcrypt")
getRouter.get('/getallev', async (req, res) => {
    try {
        const ev = await Ev.find();
        res.status(200).json(ev);
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

getRouter.get('/getev/:id', async (req, res) => {
    try {
        const ev = await Ev.findOne({ _id: req.params.id });
        res.status(200).json(ev);
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

postRouter.post('/addev', async (req, res) => {
    try {
        const{error, value} = updateAndPostJoi(req.body)
        if(error){
            return res.status(400).json(error.details)
        }
        else{
            const {Name,Price,model,bodytype,range,chargingtime,safetyfeatures,batterycapacity,createdby}=req.body;
            const newEv = await Ev.create({Name,Price,model,bodytype,range,chargingtime,safetyfeatures,batterycapacity,createdby});
            res.status(201).json(newEv);
        }
    } catch(err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

putRouter.patch('/updateuser/:id', async (req, res) => {
    try {
        const {error, value} = updateAndPostJoi(req.body)
        if(error){
            return res.status(400).json(error.details)
        }
        else{
            const userId = req.params.id;
            const updateFields = req.body;
            const existingUser = await Ev.findOne({_id: userId });
            if (!existingUser){ 
                return res.status(404).json({ message: 'User not found' });
            }
            
        const updatedUser = await Ev.findOneAndUpdate(
            { _id: userId },
            { $set: updateFields },
            { new: true }
        );

        res.status(200).json(updatedUser);
            }


        

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

deleteRouter.delete('/deleteuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await Ev.findOneAndDelete({_id: userId});
        res.status(200).json("deleted user");
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

postRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("user", username, password)

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid =  bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);
        res.cookie('token', token, { httpOnly: true });
        console.log("token", token, user.username)
        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = { getRouter, postRouter, deleteRouter, putRouter };

