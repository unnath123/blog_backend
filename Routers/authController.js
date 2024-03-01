const express = require("express");
const authRoute = express.Router();
const {validateRegistrationData} = require("../Functions/AuthFuncs");
const User = require("../class/userClass")


authRoute.post("/register", async (req, res)=>{
    const {name, username, email, password} = req.body;
    console.log(req.body);

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
        const xx = await User.userNameandEmailExist({username, email});
        
        const newUser = User({name, username, email, password}) 
        // const userDB = await newUser.register();
        return res.send({
            status:201,
            message:"user created successfully",
            // data:userDB
        })
    }   
    catch(err){
        return res.send({
            status:400,
            message: "username exist"
        })
    }

})

module.exports = authRoute 