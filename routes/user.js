const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("get/:id", async (req, res) => {
  try {
    id = req.params.id;
    user = await User.findById({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

/* router.post("/add", async (req, res) => {
  try {
    user = new User(req.body);
    savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
}); */

router.post("/register", async (req, res) => {
  try {
    user = new User(req.body);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(user.password, salt);
    user.password = cryptedPass;
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
      res.status(404).send("name invalid");
    } else {
      validpassword = await bcrypt.compareSync(data.password, user.password);
      if (!validpassword) {
        res.status(404).json(" password invalid");
      } else {
        res.status(200).json(user.name);
      }
    }
  } catch (error) {
    res.status(400).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    id = req.params.id;
    user = await User.findByIdAndDelete({ _id: id });
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
