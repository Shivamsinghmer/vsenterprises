import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Order } from "@/models/Order";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, subtotal, shippingCharges, totalAmount, paymentMethod, transactionId, shippingAddress } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    await connectDB();

    const orderItems = items.map((item) => ({
      product: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      selectedOptions: item.selectedOptions,
      images: item.images,
    }));

    const newOrder = await Order.create({
      clerkId: userId,
      email: user?.emailAddresses[0]?.emailAddress || "Guest",
      items: orderItems,
      subtotal,
      shippingCharges,
      totalAmount,
      status: 'Processing',
      paymentStatus: 'Pending',
      paymentMethod: paymentMethod || 'pending',
      transactionId: transactionId || null,
      shippingAddress: shippingAddress || {},
    });

    return NextResponse.json({ orderId: newOrder._id });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
