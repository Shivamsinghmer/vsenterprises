import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String },
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
