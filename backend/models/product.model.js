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
    discount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    images: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
