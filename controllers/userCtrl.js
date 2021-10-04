const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const userCtrl = {
  signUp: async (req, res) => {
    // check if the email is present or not
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.errors[0].msg });
    }
    try {
      if (!email || !name || !password) {
        return res.status(400).json({ msg: "Enter the credentials" });
      }

      const checkEmail = await User.findOne({ email });

      if (checkEmail) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      // hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({ name, email, password: hashPassword });

      const savedUser = await newUser.save();

      // token creation

      const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, {
        expiresIn: "180d",
      });

      res.status(200).json({ token: token });

      res.json(newUser);
    } catch (e) {
      console.log(e.message);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.errors[0].msg });
    }

    try {
      // email check
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // check password
      const checkPass = await bcrypt.compare(password, user.password);

      if (!checkPass) {
        return res.status(400).json({ mag: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "180d",
      });

      res.status(200).json({ token });
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = userCtrl;
