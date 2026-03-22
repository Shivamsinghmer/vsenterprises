"use client";
import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
    Heart, ShoppingCart, Trash2, 
    ShoppingBag, Star, LayoutGrid,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product._id);
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="size-20 bg-muted rounded-full flex items-center justify-center mb-6"
        >
            <Heart className="size-10 text-muted-foreground/30" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Save items you love to find them later and add them to your cart in one click.
        </p>
        <Button asChild className="rounded-full px-8 h-12">
            <Link href="/categories">Browse Products</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-bold ring-1 ring-red-100">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                </span>
            </div>
            <Button asChild variant="outline" className="rounded-xl border-border/60">
                <Link href="/categories" className="gap-2">
                    <LayoutGrid className="size-4" />
                    Back to Shop
                </Link>
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlistItems.map((product, idx) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden bg-muted/20">
                    <Link href={`/products/${product._id}`}>
                        <img 
                            src={product.images?.[0] || "https://placehold.co/400x400?text=Product"} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </Link>
                    <button 
                        onClick={() => removeFromWishlist(product._id)}
                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-muted-foreground hover:text-red-500 transition-colors shadow-sm"
                    >
                        <Trash2 className="size-4" />
                    </button>
                    {product.onSale && (
                        <span className="absolute top-4 left-4 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-lg shadow-lg">
                            SALE
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                            {product.categoryId?.label || "Industrial"}
                        </span>
                        <div className="flex items-center gap-1">
                            <Star className="size-3 fill-amber-400 text-amber-400" />
                            <span className="text-[11px] font-bold text-muted-foreground">{product.rating || "5.0"}</span>
                        </div>
                    </div>
                    
                    <Link href={`/products/${product._id}`} className="font-bold text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors mb-3">
                        {product.name}
                    </Link>

                    <div className="mt-auto space-y-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-foreground">₹{product.price}</span>
                            {product.onSale && (
                                <span className="text-xs text-muted-foreground line-through">₹{product.salePrice}</span>
                            )}
                        </div>

                        <Button 
                            onClick={() => handleMoveToCart(product)}
                            className="w-full rounded-2xl h-11 bg-primary hover:bg-primary/90 text-sm font-bold shadow-lg shadow-primary/5 transition-all group"
                        >
                            <ShoppingCart className="size-4 mr-2" />
                            Move to Cart
                            <ArrowRight className="size-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Button>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
