const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/user");
const multer = require("multer");
const fs = require("fs-extra");

let fileName = "";

const myStorage = multer.diskStorage({
  destination: "./uploades/users",
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    fileName = fl;
  },
});

const upload = multer({ storage: myStorage });

router.get("/", async (req, res) => {
  try {
    users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("/get/:id", async (req, res) => {
  try {
    id = req.params.id;
    user = await User.findById({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

/* router.post("/add", upload.any("image"), async (req, res) => {
  try {
    user = new User(req.body);
    user.image = fileName;
    savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
}); */

router.post("/register", upload.any("image"), async (req, res) => {
  try {
    user = new User(req.body);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(user.password, salt);
    user.password = cryptedPass;
    user.image = fileName;
    user.imageUrl = `${req.hostname}/getUserImage/${fileName}`;
    savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    data = req.body;
    user = await User.findOne({ name: data.name });

    if (!user) {
      res.status(404).json({ message: "data invalid" });
    } else {
      validpassword = await bcrypt.compareSync(data.password, user.password);
      if (!validpassword) {
        res.status(404).send({ message: "data invalid" });
      } else {
        res.status(200).send({ message: "login Ok" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    id = req.params.id;
    user = await User.findByIdAndDelete({ _id: id });
    await fs.remove(`./uploades/users/${user.image}`);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    id = req.params.id;
    user = req.body;
    updatedUser = await User.findByIdAndUpdate({ _id: id }, user);
    res.status(200).json(await User.findById({ _id: id }));
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
