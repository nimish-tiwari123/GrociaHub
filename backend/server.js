require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { database } = require("./utils");
const { userRoutes, category, categoryRoutes } = require("./routes");
const app = express();
app.use(express.json());
app.use(cors());

database.connect();

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello From Grocia Hub Server 👋" });
});

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
