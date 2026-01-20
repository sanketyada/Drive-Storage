const mongoose = require("mongoose")

async function ConnectDB(){
   const connection = mongoose.connect("mongodb://localhost:27017/GoogleDrive").then(()=>{
    console.log("Db connected")
   })
}
module.exports = ConnectDB