const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

app.get("/", (req, res) => res.send("Api Running"));

const PORT = process.env.PORT || 5000; //process.env.PORT == look for port when deployed & 5000 == local

app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
