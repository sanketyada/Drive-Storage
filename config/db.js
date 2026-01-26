const mongoose = require("mongoose")

async function ConnectDB(){
   const connection = mongoose.connect("mongodb+srv://yadavsanket863_db_user:iFrS6znIVSgGvSjZ@cluster0.cw7yuj4.mongodb.net/?appName=Cluster0/MyDriveProject").then(()=>{
    console.log("Db connected")
   })
}
module.exports = ConnectDB