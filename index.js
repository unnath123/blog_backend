const express = require("express");
const session = require("express-session");
const mongoDBsession = require("connect-mongodb-session")(session);
require("dotenv").config();
const authRoute = require("./Routers/authController")

const db = require("./db")

const app = express();

app.use(express.json());
app.use("/auth", authRoute)


app.listen("8000", ()=>{
    console.log("Server is running")
})

