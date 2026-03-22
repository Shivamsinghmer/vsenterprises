"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
    Trash2, Plus, Minus, ShoppingBag, 
    ArrowRight, ArrowLeft, Package,
    ShieldCheck, Truck, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="size-20 bg-muted rounded-full flex items-center justify-center mb-6"
        >
            <ShoppingBag className="size-10 text-muted-foreground/50" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our categories to find high-quality products.
        </p>
        <Button asChild className="rounded-full px-8 h-12">
            <Link href="/categories">Start Shopping</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center gap-3 mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold ring-1 ring-primary/20">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={`${item._id}-${JSON.stringify(item.selectedOptions)}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-2xl border border-border/50 shadow-sm"
                >
                  {/* Image */}
                  <div className="size-24 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                        src={item.images?.[0] || "https://placehold.co/200x200?text=Product"} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <div className="flex justify-between items-start mb-1">
                            <Link href={`/products/${item._id}`} className="font-bold text-foreground hover:text-primary transition-colors leading-tight">
                                {item.name}
                            </Link>
                            <span className="font-bold text-foreground">₹{item.price * item.quantity}</span>
                        </div>
                        
                        {/* Selected Options */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {Object.entries(item.selectedOptions).map(([key, val]) => (
                                <span key={key} className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 bg-muted rounded text-muted-foreground border border-border/40">
                                    {key}: {val}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-muted/30">
                            <button 
                                onClick={() => updateQuantity(item._id, item.selectedOptions, item.quantity - 1)}
                                className="p-1.5 hover:bg-white transition-colors"
                            >
                                <Minus className="size-3.5" />
                            </button>
                            <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item._id, item.selectedOptions, item.quantity + 1)}
                                className="p-1.5 hover:bg-white transition-colors"
                            >
                                <Plus className="size-3.5" />
                            </button>
                        </div>

                        <button 
                            onClick={() => removeFromCart(item._id, item.selectedOptions)}
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline pt-4">
                <ArrowLeft className="size-4" />
                Continue Shopping
            </Link>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-border shadow-sm p-6 space-y-6 sticky top-24">
              <h2 className="text-xl font-bold">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && (
                    <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 flex gap-3 text-xs text-orange-800">
                        <Truck className="size-4 shrink-0" />
                        <p>Add <b>₹{500 - subtotal}</b> worth items to get <b>Free Shipping</b>.</p>
                    </div>
                )}
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary text-xl">₹{total}</span>
                </div>
                <p className="text-[10px] text-muted-foreground text-center italic">Inclusive of all taxes and delivery charges (if applicable).</p>
                <Button asChild className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/10 group">
                    <Link href="/checkout">
                        Checkout Now
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
              </div>

              {/* Trust markers */}
              <div className="pt-2 flex flex-col gap-2">
                {[
                    { icon: ShieldCheck, text: "Secure 256-bit encrypted checkout" },
                    { icon: RotateCcw, text: "7-day easy returns & exchange policy" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2 bg-muted/30 rounded-xl">
                        <item.icon className="size-3.5 text-muted-foreground" />
                        <span className="text-[11px] font-medium text-muted-foreground">{item.text}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
