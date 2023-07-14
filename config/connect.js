const mongoose = require("mongoose");

let databaseName = "loginApp";
let message = "";
mongoose.connect("mongodb://127.0.0.1:27017/" + databaseName)
.then(()=>{
    message='connected'
console.log('dataBase connected');
})
.catch((err)=>{
    message="connection error"
    console.log(err.message);
})



module.exports = {mongoose,message};

