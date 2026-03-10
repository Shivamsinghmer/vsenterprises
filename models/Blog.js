import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  href: { type: String, default: "#" },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: String, required: true },
  author: { type: String, required: true },
  readTime: { type: String, required: true },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
