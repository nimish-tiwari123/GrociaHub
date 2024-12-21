require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {database} = require("./utils");
const app = express();
app.use(express.json());
app.use(cors());

database.connect();

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello 👋" });
});

module.exports = app;
