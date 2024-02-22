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
        const newEv = await Ev.create(req.body);
        res.status(201).json(newEv);
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

putRouter.put('/updateev/:id', async (req, res) => {
    try {
        const updatedEv = await Ev.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEv);
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

deleteRouter.delete('/deleteev/:id', async (req, res) => {
    try {
        const deletedEv = await Ev.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedEv);
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

module.exports = { getRouter, postRouter, deleteRouter, putRouter };

