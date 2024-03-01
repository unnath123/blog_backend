const express = require("express");
const authRoute = express.Router();
const {validateRegistrationData} = require("../Functions/AuthFuncs");
const User = require("../class/userClass")


authRoute.post("/register", async (req, res)=>{
    const {name, username, email, password} = req.body;
    // console.log(req.body);

    try{
        await validateRegistrationData({name, username, email, password})
    }
    catch(err){
        return res.send({
            status:400,
            message: "user data error",
            error:err
        })
    }

    try{
            await User.userNameandEmailExist({ email, username });
            const obj = new User({ email, name, username, password });
            const userDb = await obj.register();
            return res.send({
            status: 201,
            message: "Register successfull",
            data: userDb,
            });
    }   
    catch(err){
        return res.send({
            status:400,
            message: "username bbbbb exist"
        })
    }

})

module.exports = authRoute 