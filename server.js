const express = require("express");
const dataBase = require('./config/connect')

const userRouter = require("./routes/user");

const app = express()
app.listen(3000);
console.log('server connected');
app.use(express.json())

app.use("/users", userRouter);

app.get('/',(req,res)=>{res.json({
  server: "connected",
  dataBase:dataBase.message,

});

})