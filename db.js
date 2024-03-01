const mongoose = require("mongoose")

mongoose.connect(process.env.mongo_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err))

// module.exports = db