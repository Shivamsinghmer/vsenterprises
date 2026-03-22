import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, default: 'https://placehold.co/600x400?text=Category' },
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
