"use client";
import React, { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
    ArrowLeft, Star, ShoppingCart, Heart,
    ShieldCheck, Truck, RotateCcw, ChevronRight,
    Minus, Plus, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function SingleProductPage({ params }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    
    // Hooks
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const isWishlisted = isInWishlist(id);

    // Variant Selection State
    const [selectedDiameter, setSelectedDiameter] = useState("");
    const [selectedLength, setSelectedLength] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);

    const handleAddToCart = () => {
        if (!product.inStock) return;
        
        const selectedOptions = {};
        if (product.variantOptions?.diameters?.length > 0) {
            selectedOptions.diameter = selectedDiameter;
            selectedOptions.length = selectedLength;
        }
        if (product.variantOptions?.sizes?.length > 0) {
            selectedOptions.size = selectedSize;
        }
        if (product.variantOptions?.materials?.length > 0) {
            selectedOptions.material = selectedMaterial;
        }

        // Add to cart with current selection
        addToCart(
            { ...product, price: currentPrice }, 
            quantity, 
            selectedOptions
        );
    };

    const handleWishlist = () => {
        toggleWishlist(product);
    };

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
                
                // Set initial selections
                if (data?.isVariantProduct) {
                    const opts = data.variantOptions;
                    if (opts?.diameters?.[0]) setSelectedDiameter(opts.diameters[0]);
                    if (opts?.lengths?.[0]) setSelectedLength(opts.lengths[0]);
                    if (opts?.sizes?.[0]) setSelectedSize(opts.sizes[0]);
                    if (opts?.materials?.[0]) setSelectedMaterial(opts.materials[0]);
                    setCurrentPrice(data.salePrice || data.price);
                } else if (data) {
                    setCurrentPrice(data.salePrice || data.price);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product?.isVariantProduct && product?.pricingData) {
            const variantPrice = product.pricingData.find(v => {
                if (product.variantOptions?.diameters?.length > 0) {
                    return v.diameter === selectedDiameter && v.length === selectedLength && v.material === selectedMaterial;
                } else if (product.variantOptions?.sizes?.length > 0) {
                    return v.size === selectedSize && v.material === selectedMaterial;
                }
                return false;
            });

            if (variantPrice) {
                setCurrentPrice(variantPrice.price);
            } else {
                setCurrentPrice(product.salePrice || product.price);
            }
        } else if (product) {
            setCurrentPrice(product.salePrice || product.price);
        }
    }, [selectedDiameter, selectedLength, selectedSize, selectedMaterial, product]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading product…</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
                <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
                    <Package className="size-8 text-muted-foreground" />
                </div>
                <div>
                    <h1 className="text-2xl font-medium text-foreground mb-2">Product Not Found</h1>
                    <p className="text-muted-foreground text-sm max-w-md">
                        We couldn't find the product you're looking for. It may have been discontinued or moved.
                    </p>
                </div>
                <Button asChild variant="outline" className="rounded-full px-6">
                    <Link href="/categories">Browse All Products</Link>
                </Button>
            </div>
        );
    }

    const { 
        name, 
        description, 
        price: defaultPrice, 
        images, 
        rating, 
        onSale, 
        salePrice, 
        newArrival, 
        categoryId, 
        inStock,
        isVariantProduct,
        variantOptions,
        unit
    } = product;

    const allImages = images?.length > 0 ? images : ["https://placehold.co/800x800?text=Product"];
    const discount = onSale ? Math.round(((defaultPrice - salePrice) / defaultPrice) * 100) : 0;

    return (
        <main className="min-h-screen bg-background pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-10">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/categories" className="hover:text-foreground transition-colors">Shop</Link>
                    {categoryId && (
                        <>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <Link href={`/categories/${categoryId?.href?.split("/").pop()}`} className="hover:text-foreground transition-colors">
                                {categoryId.label}
                            </Link>
                        </>
                    )}
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">{name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
                    {/* ── Image Gallery ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        {/* Main image */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-muted">
                            {/* Badges */}
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                {newArrival && (
                                    <span className="px-2.5 py-1 bg-foreground text-background font-mono text-[10px] font-semibold uppercase tracking-widest rounded shadow-sm">
                                        New
                                    </span>
                                )}
                                {onSale && (
                                    <span className="px-2.5 py-1 bg-destructive text-destructive-foreground font-mono text-[10px] font-semibold uppercase tracking-widest rounded shadow-sm">
                                        −{discount}%
                                    </span>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    initial={{ opacity: 0, scale: 1.04 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.3 }}
                                    src={allImages[selectedImage]}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Thumbnail strip */}
                        {allImages.length > 1 && (
                            <div className="flex gap-3">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={cn(
                                            "flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200",
                                            selectedImage === idx
                                                ? "border-primary shadow-sm"
                                                : "border-border/50 hover:border-primary/40 opacity-70 hover:opacity-100"
                                        )}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* ── Product Details ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Category + Rating */}
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-primary">
                                {categoryId?.label || "Component"}
                            </span>
                            <div className="flex items-center gap-1.5 bg-signal/10 border border-signal/30 rounded-md px-2.5 py-1">
                                <Star className="size-3.5 fill-signal text-signal" />
                                <span className="font-mono text-xs font-semibold text-foreground tabular-nums">{rating ? Number(rating).toFixed(1) : "5.0"}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-1">
                            <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-foreground leading-tight">
                                {name}
                            </h1>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 pb-6 border-b border-border">
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Price per {product.unit || "unit"}</span>
                                <div className="flex items-baseline gap-3 mt-1">
                                    <span className="font-mono text-3xl font-bold text-foreground tabular-nums">₹{currentPrice}</span>
                                    {onSale && (
                                        <span className="font-mono text-lg text-muted-foreground line-through tabular-nums">₹{defaultPrice}</span>
                                    )}
                                </div>
                            </div>
                            <span className={cn(
                                "ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border",
                                inStock
                                    ? "bg-success/10 text-success border-success/30"
                                    : "bg-destructive/10 text-destructive border-destructive/30"
                            )}>
                                <span className={cn(
                                    "size-1.5 rounded-full",
                                    inStock ? "bg-success" : "bg-destructive"
                                )} />
                                {inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        {/* Description */}
                        {description && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {description}
                            </p>
                        )}

                        {/* Variant Selectors */}
                        {isVariantProduct && (
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border/40">
                                {variantOptions?.diameters?.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Diameter (DIA)</label>
                                        <select 
                                            className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                            value={selectedDiameter}
                                            onChange={(e) => setSelectedDiameter(e.target.value)}
                                        >
                                            {variantOptions.diameters.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                )}
                                {variantOptions?.lengths?.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Length (mm)</label>
                                        <select 
                                            className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                            value={selectedLength}
                                            onChange={(e) => setSelectedLength(e.target.value)}
                                        >
                                            {variantOptions.lengths.map(l => <option key={l} value={l}>{l}mm</option>)}
                                        </select>
                                    </div>
                                )}
                                {variantOptions?.sizes?.length > 0 && (
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</label>
                                        <select 
                                            className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            {variantOptions.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                )}
                                {variantOptions?.materials?.length > 0 && (
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Material Grade</label>
                                        <div className="flex gap-2">
                                            {variantOptions.materials.map(m => (
                                                <button
                                                    key={m}
                                                    onClick={() => setSelectedMaterial(m)}
                                                    className={cn(
                                                        "flex-1 py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all",
                                                        selectedMaterial === m 
                                                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                                                            : "border-border/60 text-muted-foreground hover:border-primary/40"
                                                    )}
                                                >
                                                    AISI {m}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="flex items-center gap-6">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quantity (Sets)</label>
                            <div className="inline-flex items-center border border-border rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <Minus className="size-3.5" />
                                </button>
                                <span className="px-5 py-2.5 text-sm font-semibold min-w-[3rem] text-center border-x border-border">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <Plus className="size-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3">
                            <Button
                                onClick={handleAddToCart}
                                className={cn(
                                    "flex-1 h-12 rounded-xl text-primary-foreground font-semibold text-sm shadow-sm transition-all",
                                    !inStock 
                                        ? "bg-muted text-muted-foreground pointer-events-none" 
                                        : "bg-primary hover:bg-primary/90 hover:shadow"
                                )}
                                disabled={!inStock}
                            >
                                <ShoppingCart className="mr-2 size-4" />
                                {inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleWishlist}
                                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                className={cn(
                                    "h-12 w-12 rounded-xl border-border transition-all",
                                    isWishlisted && "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/10"
                                )}
                            >
                                <Heart className={cn("size-4", isWishlisted && "fill-destructive text-destructive")} />
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-3 pt-2">
                            {[
                                { icon: <ShieldCheck className="size-4 text-primary" />, title: "Quality", sub: "AISI Standard" },
                                { icon: <Truck className="size-4 text-primary" />, title: "Bulk Shipping", sub: "Standard Rates" },
                                { icon: <RotateCcw className="size-4 text-primary" />, title: "Returnable", sub: "Terms apply" },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-muted/30 border border-border/40">
                                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold text-foreground leading-none mb-0.5">{item.title}</p>
                                        <p className="text-[10px] text-muted-foreground leading-none">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
