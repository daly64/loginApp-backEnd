const express = require("express");
require("./config/connect");

const userRouter = require("./routes/user");
const port = process.env.PORT || 3000;

const app = express();
app.listen(port);
console.log("server connected");
app.use(express.json());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>loginApp API</title>
</head>
<body>

<h1>loginApp REST API port = ${port}</h1>
<h2><a href="/users/all"> Users </a></h2>
</body>
</html>    
    `);
});
