const{ getRouter, postRouter, deleteRouter, putRouter } = require('./Routers/routers.js')
const bodyParser=require('body-parser')
var express = require("express");
const cors = require("cors")
const cookieParser = require('cookie-parser');


var mongoose = require("mongoose");
const {connectdb, isConnected} = require('./dbconnected.js');
var app = express();
app.use(cookieParser());
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

app.listen(3001,async() => {
    await connectdb();
    console.log("Server is running on port 3001");
});
app.post('/login', (req, res) => {
    const { username } = req.body;
    res.cookie('username', username);
    res.send('Login successful');
});

// Logout endpoint
app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.send('Logout successful');
});
// auth endpoint
const jwt = require('jsonwebtoken');
app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    // Generate JWT token
    const token = jwt.sign({ username: username },process.env.ACCESS_TOKEN);
    res.send({ token });
    res.cookie('token', token);
});


app.use('/',getRouter);
app.use('/',postRouter);
app.use('/',deleteRouter);
app.use('/',putRouter);