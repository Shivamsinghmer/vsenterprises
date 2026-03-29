import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Order } from "@/models/Order";

export async function POST(req, { params }) {
  try {
    const { orderId } = await params;
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await connectDB();
    const updated = await Order.findByIdAndUpdate(orderId, {
      invoiceData: buffer,
      invoiceMimeType: file.type,
      invoicePdf: `/api/orders/${orderId}/invoice` 
    }, { new: true });

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, url: `/api/orders/${orderId}/invoice` });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { orderId } = await params;
    await connectDB();
    const order = await Order.findById(orderId);

    if (!order || !order.invoiceData) {
      return new NextResponse("Invoice not found", { status: 404 });
    }

    // Ensure MongoDB Binary wrapper is converted to a raw Node.js Buffer 
    // depending on whether lean() was used or not
    const pdfBuffer = Buffer.from(order.invoiceData.buffer || order.invoiceData);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": order.invoiceMimeType || "application/pdf",
        "Content-Disposition": "inline"
      }
    });
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
