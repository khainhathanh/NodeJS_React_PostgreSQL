const cors = require('cors');
var express = require("express");
require('dotenv').config()


const db = require('../db')
const port = process.env.PORT
const host = process.env.HOST_NAME

// var bodyParser =  require('body-parser');
var app = express();
app.use(cors());
app.use(express.json());

// var urlencodedParser = bodyParser.raw({ type: 'application/json' })
// app.get("/login", db.getUser);

app.post("/getUser", db.findOneUser);
app.post("/authentication", db.authOTP);
app.post("/createUser", db.createUser);
app.put("/updateUser", db.updateUser);
app.delete("/deleteUser/:id",db.deleteUser)
app.get("/users", db.getAllUser);
app.listen(port, host, ()=>{
    console.log(`Express server started on port: ${port}`);
});