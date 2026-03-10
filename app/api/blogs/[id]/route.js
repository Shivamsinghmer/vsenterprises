import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
