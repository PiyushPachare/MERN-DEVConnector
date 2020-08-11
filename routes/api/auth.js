const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

//@route  GET api/auth
//@desc   Test route
//@access Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //getting user without password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  //@route    Post api/auth
  //@desc     Authenticate user and get token
  //@access   Public

  router.post(
    "/",
    [
      check("email", "Please include valid Email").isEmail(),
      check("password", "Password required").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
        let user = await User.findOne({ email });

        if (!user) {
          //see if user exists
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        //check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        //Return jsonwebtoken

        const payload = {
          //get payload for jwt with userid
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          // passing payload, secret and getting token
          payload,
          config.get("jwtToken"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );
});

module.exports = router;
