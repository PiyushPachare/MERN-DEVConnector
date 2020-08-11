const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
//@route for POST api/user
//@desc register user
router.post(
  "/",
  //validation
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include valid Email").isEmail(),
    check("password", "Please enter password of length 6 and more").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        //see if user exists
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //get users gravator
      const avatar = gravatar.url(email, {
        s: "200", //status
        r: "pg", //rating
        d: "mm", //default image
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password

      const salt = await bcrypt.genSalt(10); // creating salt

      user.password = await bcrypt.hash(password, salt); // creating hash

      await user.save(); // saving to database

      //Return jsonwebtoken
      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
