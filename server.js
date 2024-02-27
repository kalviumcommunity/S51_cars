const{ getRouter, postRouter, deleteRouter, putRouter } = require('./Routers/routers.js')
const bodyParser=require('body-parser')
var express = require("express");
const cors = require("cors")

var mongoose = require("mongoose");
const {connectdb, isConnected} = require('./dbconnected.js');
var app = express();
app.use(bodyParser.json())
app.use(cors())
 app.get("/ping", (req, res) => {
    res.send("pong");
});
app.get('/home', (req, res) => {
    res.json({
      message: isConnected() ? 'Database is connected' : 'disconnected'
    })
});
app.get("/", (req, res) => {
    res.send("Hello guys");
});

app.listen(3000,async() => {
    await connectdb();
    console.log("Server is running on port 3000");
});

app.use('/',getRouter);
app.use('/',postRouter);
app.use('/',deleteRouter);
app.use('/',putRouter);