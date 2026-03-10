import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import FAQ from "@/models/FAQ";

export async function GET() {
  try {
    await dbConnect();
    const faqs = await FAQ.find({});
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
