import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Testimonial from "@/models/Testimonial";

const newTestimonials = [
  {
    quote: "The quality of Stainless Steel 304 Hex Bolts and Nuts supplied by VS Enterprises is unmatched. We shifted all our heavy machinery assembly to their fasteners and have seen zero thread galling issues. Highly recommended for industrial needs.",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    name: "Rajesh Sharma",
    role: "Plant Manager",
    company: "Sharma Engineering Works"
  },
  {
    quote: "We source all our PTFE cables and industrial USB cables from them. The heat resistance of their Teflon cables is phenomenal, even in our harsh outdoor substations. Absolute lifesavers for our electrical routing.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anjali Desai",
    role: "Chief Electrical Engineer",
    company: "Desai Power Grids"
  },
  {
    quote: "Finding reliable spring washers that don't lose tension under constant engine vibrations was a struggle until we found VS Enterprises. Their high-tension spring washers hold everything together perfectly on the assembly line.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Vikram Singh",
    role: "Procurement Head",
    company: "Singh Auto Components"
  },
  {
    quote: "Their universal connectors and seal wedges have drastically reduced short circuits in our manufacturing plant. The weatherproofing is rock solid. Best quality electrical terminals we've ever used.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Priya Nair",
    role: "Operations Director",
    company: "Nair Heavy Industries"
  },
  {
    quote: "From pigtail wires to end caps, every single batch passes our strict quality control. The consistency of VS Enterprises' products makes our supply chain incredibly smooth. A trustworthy partner for any Indian manufacturer.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Sanjay Patel",
    role: "Quality Control Inspector",
    company: "Patel Electronics Manufacturing"
  },
  {
    quote: "We order stainless steel plain washers and hex nuts in massive bulk. The delivery is always on time, and the precision grade of the fasteners ensures our infrastructure projects are built to last decades.",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    name: "Meera Reddy",
    role: "Supply Chain Manager",
    company: "Reddy Logistics & Infrastructure"
  },
  {
    quote: "For our solar farm projects, UV resistance and thermal stability are critical. The PTFE insulated cables from VS Enterprises have performed flawlessly in the Rajasthan heat.",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    name: "Arjun Mehta",
    role: "Technical Lead",
    company: "Mehta Solar Solutions"
  },
  {
    quote: "As a major distributor, I need a partner who understands the Indian market's demand for both quality and value. VS Enterprises delivers both every time with their fasteners and connectors.",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    name: "Kavita Gupta",
    role: "Founder",
    company: "Gupta Hardware House"
  },
  {
    quote: "Our textile machines operate in high-humidity environments where rust is a constant threat. Their AISI 316 hex bolts have saved us thousands in replacement costs over the last year.",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    name: "Rohan Das",
    role: "Maintenance Supervisor",
    company: "Das Textiles"
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    // Clear existing testimonials
    await Testimonial.deleteMany({});
    
    // Insert new testimonials
    const created = await Testimonial.insertMany(newTestimonials);
    
    return NextResponse.json({ success: true, count: created.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
