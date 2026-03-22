import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import { User } from "../../../../models/User";
import { auth } from "@clerk/nextjs/server";
import { Product } from "../../../../models/Product"; // needed for population

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let user = await User.findOne({ clerkId: userId })
        .populate('cart.product')
        .populate('wishlist')
        .lean();

    if (!user) {
      // Create user
      user = await User.create({
        clerkId: userId,
        cart: [],
        wishlist: [],
      });
    }

    // Format cart and wishlist for frontend compatibility
    // The frontend expects the populated product object in the cart
    const formattedCart = user.cart.filter(item => item.product).map(item => {
        return {
            ...item.product,
            cartItemId: item._id, // internal db id
            quantity: item.quantity,
            selectedOptions: item.selectedOptions || {},
            price: item.price !== undefined ? item.price : item.product.price, 
        };
    });

    const formattedWishlist = user.wishlist.filter(item => item).map(item => item);

    return NextResponse.json({
      cart: formattedCart,
      wishlist: formattedWishlist
    });
  } catch (error) {
    console.error("Sync GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cart, wishlist } = await req.json();

    await connectDB();

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = new User({ clerkId: userId });
    }

    // Transform front-end cart to backend format
    if (cart) {
      user.cart = cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        selectedOptions: item.selectedOptions || {},
        price: item.price
      }));
    }

    if (wishlist) {
      user.wishlist = wishlist.map(item => typeof item === 'string' ? item : item._id);
    }

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync POST Error:", error);
    return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
  }
}
