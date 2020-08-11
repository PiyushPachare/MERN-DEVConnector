const express = require("express");
const router = express.Router();

//route for GET api/post
router.get("/", (req, res) => res.send("post route"));

module.exports = router;
