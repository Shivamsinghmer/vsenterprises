"use client";
import React, { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
    ArrowLeft, Star, ShoppingCart, Heart, 
    ShieldCheck, Truck, RotateCcw, ChevronRight,
    Minus, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SingleProductPage({ params }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl rotate-45" />
                    <div className="h-4 w-32 bg-muted rounded" />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
                <h1 className="text-4xl md:text-5xl font-black uppercase italic text-center">Equipment Missing</h1>
                <p className="text-muted-foreground text-center max-w-md">We couldn't find the product you're looking for. It might have been discontinued or moved.</p>
                <Button asChild variant="outline" className="rounded-full px-8">
                    <Link href="/categories">Back to Shop</Link>
                </Button>
            </div>
        );
    }

    const { name, description, price, images, rating, onSale, salePrice, newArrival, categoryId, inStock } = product;
    const allImages = images?.length > 0 ? images : ["https://placehold.co/800x800?text=Product"];

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-12 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/categories" className="hover:text-primary transition-colors">Shop</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href={`/categories/${categoryId?._id}`} className="hover:text-primary transition-colors">{categoryId?.label || "Category"}</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-foreground">{name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Image Gallery */}
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="aspect-square rounded-[3.5rem] overflow-hidden border border-border/40 bg-card/40 relative group"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img 
                                    key={selectedImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    src={allImages[selectedImage]} 
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            
                            {/* Badges on main image */}
                            <div className="absolute top-8 left-8 flex flex-col gap-3">
                                {newArrival && (
                                    <span className="px-4 py-1.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider rounded-full shadow-2xl">
                                        New Release
                                    </span>
                                )}
                                {onSale && (
                                    <span className="px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-2xl">
                                        -{Math.round(((price - salePrice) / price) * 100)}% Off
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-4 gap-4">
                            {allImages.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={cn(
                                        "aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300",
                                        selectedImage === idx ? "border-primary" : "border-border/40 hover:border-primary/40"
                                    )}
                                >
                                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 pb-10 border-b border-border/40"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                    {categoryId?.label || "Essentials"}
                                </span>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-500 border border-yellow-400/20">
                                    <Star className="size-3 fill-yellow-500" />
                                    <span className="text-[10px] font-black">{rating || 4.9}</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic leading-[0.9] text-foreground">
                                {name}
                            </h1>

                            <div className="flex items-center gap-6">
                                {onSale ? (
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-black text-primary">${salePrice}</span>
                                        <span className="text-xl text-muted-foreground/40 line-through font-bold">${price}</span>
                                    </div>
                                ) : (
                                    <span className="text-4xl font-black text-foreground">${price}</span>
                                )}
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md",
                                    inStock ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                )}>
                                    {inStock ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xl">
                                {description || "Experience the perfect blend of performance and style. This premium piece is engineered to complement your modern lifestyle with uncompromising quality."}
                            </p>
                        </motion.div>

                        <div className="py-10 space-y-8">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-6">
                                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Quantity</span>
                                <div className="flex items-center border border-border/40 rounded-2xl p-1 bg-card/40">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="size-10 flex items-center justify-center hover:bg-background rounded-xl transition-colors"
                                    >
                                        <Minus className="size-4" />
                                    </button>
                                    <span className="w-12 text-center font-black">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="size-10 flex items-center justify-center hover:bg-background rounded-xl transition-colors"
                                    >
                                        <Plus className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                                <Button className="h-16 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all text-sm group shadow-xl shadow-primary/20">
                                    <ShoppingCart className="mr-2 size-5" />
                                    Add to Cart
                                </Button>
                                <Button variant="outline" className="h-16 w-16 rounded-2xl border-border/40 hover:bg-card group">
                                    <Heart className="size-6 group-hover:fill-primary group-hover:text-primary transition-colors" />
                                </Button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-10">
                                {[
                                    { icon: <ShieldCheck className="w-5 h-5 text-primary" />, text: "Genuine Quality" },
                                    { icon: <Truck className="w-5 h-5 text-primary" />, text: "Global Shipping" },
                                    { icon: <RotateCcw className="w-5 h-5 text-primary" />, text: "Easy Returns" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                                        <div className="size-10 rounded-xl bg-card border border-border/40 flex items-center justify-center mb-1">
                                            {item.icon}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-tight">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related or More Info could go here */}
            </div>
        </main>
    );
}
