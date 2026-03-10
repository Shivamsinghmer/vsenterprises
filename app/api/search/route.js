import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Blog from "@/models/Blog";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json({ products: [], blogs: [] });
    }

    const searchRegex = new RegExp(query, "i");

    // Search Products
    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex }
      ]
    }).limit(5).populate("categoryId");

    // Search Blogs
    const blogs = await Blog.find({
      $or: [
        { title: searchRegex },
        { shortDescription: searchRegex },
        { longDescription: searchRegex }
      ]
    }).limit(3);

    return NextResponse.json({ products, blogs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
