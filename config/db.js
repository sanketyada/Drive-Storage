const mongoose = require("mongoose")

async function ConnectDB(){
   const connection = mongoose.connect("mongodb://localhost:27017/MyDriveProject").then(()=>{
    console.log("Db connected")
   })
}
module.exports = ConnectDB