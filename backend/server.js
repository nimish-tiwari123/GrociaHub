require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { database } = require("./utils");
const {
  userRoutes,
  categoryRoutes,
  productRoutes,
  adminRoutes,
  dealsAndOfferRoutes,
} = require("./routes");
const app = express();
app.use(express.json());
app.use(cors());

database.connect();

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello From Grocia Hub Server 👋" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dealsAndOffers", dealsAndOfferRoutes);

module.exports = app;
