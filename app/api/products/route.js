import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const newArrival = searchParams.get("newArrival");
    const bestSeller = searchParams.get("bestSeller");
    const onSale = searchParams.get("onSale");
    const limit = searchParams.get("limit");
    const search = searchParams.get("search");
    
    const query = {};
    if (categoryId) query.categoryId = categoryId;
    if (newArrival === "true") query.newArrival = true;
    if (bestSeller === "true") query.bestSeller = true;
    if (onSale === "true") query.onSale = true;
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    let productsQuery = Product.find(query).populate("categoryId");
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }
    
    const products = await productsQuery;
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
