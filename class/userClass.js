const bcrypt = require("bcrypt")
const userModel = require("../Models/userModel")


const User = class{
    name;
    username;
    email;
    password;

    constructor({name, username, email, password}){
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
    }

    register(){
        new Promise(async(resolve, reject)=>{
            try{
                const hashedPassword = await bcrypt.hash(this.password, Number(process.env.SALT))

                const userObj = new userModel({
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                const userDB = await userObj.save();
                resolve(userDB)
                }
            catch(err){
                reject(err)
            }
        })
    }

    static userNameandEmailExist({username, email}){
        return new Promise(async(resolve, reject)=>{
            try{
                const userExist = await userModel.findOne({
                    $or: [{username: this.username},{email: this.email}]
                })
    
                if(userExist && userExist.username === username) reject("username already exist");
                if(userExist && userExist.email === email) reject("email already exist");
                resolve();
            }
            catch(err){
                reject(err)
            }
          
        })
    }


}