const express = require('express');
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const Ev = require("../Models/ev.model");

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
        const {Name,Price,model,bodytype,range,chargingtime,safetyfeatures,batterycapacity}=req.body;
        const newEv = await Ev.create({Name,Price,model,bodytype,range,chargingtime,safetyfeatures,batterycapacity});
        res.status(201).json(newEv);
    } catch(err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

putRouter.patch('/updateuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateFields = req.body;

        const existingUser = await Ev.findOne({_id: userId });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await Ev.findOneAndUpdate(
            { _id: userId },
            { $set: updateFields },
            { new: true }
        );

        res.status(200).json(updatedUser);
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

module.exports = { getRouter, postRouter, deleteRouter, putRouter };

