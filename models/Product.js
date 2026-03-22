import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }, // Base price or default (for display)
  images: { type: [String] },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  onSale: { type: Boolean, default: false },
  salePrice: { type: Number },
  rating: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  bestSeller: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  
  // Custom Variant Fields
  isVariantProduct: { type: Boolean, default: false },
  variantOptions: {
    diameters: [String],
    lengths: [String],
    sizes: [String],
    materials: [String],
  },
  pricingData: [
    {
      diameter: String,
      length: String,
      size: String,
      material: String,
      price: Number, // Price per 100 pcs
    }
  ],
  unit: { type: String, default: "100 pcs" },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
