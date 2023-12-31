const express = require("express");
require("./config/connect");
const cors = require("cors");

const userRouter = require("./routes/user");
const port = process.env.PORT || 3000;

const app = express();
app.listen(port);
console.log("server connected");
app.use(express.json());

app.use(cors());
// app.use(cors({origin: '*'}))

app.use("/users", userRouter);

app.use("/getUserImage", express.static("./uploades/users"));

app.get("/", (req, res) => {

  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>loginApp API</title>
</head>
<body>

<h1>loginApp REST API</h1>
<h4>${req.hostname}</h4>

<h2><a href="/users"> Users </a></h2>

<h4>/users get all </h4>
<h4>/users/get/:id get by id </h4>

<h4>/users/register register user </h4>
<h4>/users/login login user </h4>
<h4>/users/delete/:id delete user </h4>
<h4>/users/update/:id update user </h4>
<h4>/getUserImage/:fileName get user image </h4>

</body>
</html>    
    `);
});
