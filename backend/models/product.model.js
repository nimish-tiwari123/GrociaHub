const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    stockStatus: { type: String, default: "inStock" },
    discount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    unit: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
