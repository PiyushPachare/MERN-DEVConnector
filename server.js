const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Api Running"));

//Define routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000; //process.env.PORT == look for port when deployed & 5000 == local

app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
