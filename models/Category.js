import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  description: { type: String },
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
