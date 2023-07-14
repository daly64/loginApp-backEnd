const mongoose = require("mongoose");

let databaseName = "loginApp";
let localUrl = "mongodb://127.0.0.1:27017/";
let onlinelUrl = "mongodb+srv://daly:Dd123123Dd@cluster1.ktvz4ok.mongodb.net/";

mongoose
  .connect(onlinelUrl + databaseName)
  .then(() => console.log("dataBase connected"))
  .catch((err) => console.log(err.message));

module.exports = mongoose;

