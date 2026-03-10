import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String] },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  onSale: { type: Boolean, default: false },
  salePrice: { type: Number },
  rating: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  bestSeller: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
