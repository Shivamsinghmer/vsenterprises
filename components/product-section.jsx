"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function ProductsSection({ 
    title = "Latest Products", 
    subtitle = "Explore our premium selection", 
    filterType = "newArrival",
    limit = 4 
}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                let url = `/api/products?limit=${limit}`;
                
                if (["newArrival", "bestSeller", "onSale"].includes(filterType)) {
                    url += `&${filterType}=true`;
                } else if (filterType) {
                    url += `&categoryId=${filterType}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("API Error:", data.error);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [filterType, limit]);

    return (
        <section className="py-16 md:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-2"
                    >
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                            Featured Collection
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            {title}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            {subtitle}
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Button 
                            onClick={() => window.location.href = "/categories"} 
                            variant="outline" 
                            className="rounded-full h-9 px-5 text-sm font-medium border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary group transition-all duration-200"
                        >
                            View All
                            <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                    </motion.div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array(limit).fill(0).map((_, i) => (
                            <div key={i} className="space-y-3 animate-pulse">
                                <div className="bg-muted aspect-square rounded-2xl" />
                                <div className="space-y-2 px-1">
                                    <div className="h-3 bg-muted rounded w-1/3" />
                                    <div className="h-5 bg-muted rounded w-3/4" />
                                    <div className="h-4 bg-muted rounded w-1/4" />
                                </div>
                            </div>
                        ))
                    ) : (
                        products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product }) {
    const { 
        _id, 
        name, 
        price: defaultPrice, 
        images, 
        rating, 
        onSale, 
        salePrice, 
        newArrival, 
        categoryId,
        isVariantProduct,
        variantOptions,
        pricingData,
        unit
    } = product;

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(_id);

    const [selectedDiameter, setSelectedDiameter] = useState(variantOptions?.diameters?.[0] || "");
    const [selectedLength, setSelectedLength] = useState(variantOptions?.lengths?.[0] || "");
    const [selectedSize, setSelectedSize] = useState(variantOptions?.sizes?.[0] || "");
    const [selectedMaterial, setSelectedMaterial] = useState(variantOptions?.materials?.[0] || "");
    const [currentPrice, setCurrentPrice] = useState(salePrice || defaultPrice);

    useEffect(() => {
        if (isVariantProduct && pricingData) {
            const variantPrice = pricingData.find(v => {
                if (variantOptions?.diameters?.length > 0) {
                    return v.diameter === selectedDiameter && v.length === selectedLength && v.material === selectedMaterial;
                } else if (variantOptions?.sizes?.length > 0) {
                    return v.size === selectedSize && v.material === selectedMaterial;
                }
                return false;
            });

            if (variantPrice) {
                setCurrentPrice(variantPrice.price);
            }
        }
    }, [selectedDiameter, selectedLength, selectedSize, selectedMaterial, isVariantProduct, pricingData, variantOptions]);

    const handleAddToCart = () => {
        const selectedOptions = {};
        if (isVariantProduct) {
            if (variantOptions?.diameters?.length > 0) {
                selectedOptions.diameter = selectedDiameter;
                selectedOptions.length = selectedLength;
            }
            if (variantOptions?.sizes?.length > 0) {
                selectedOptions.size = selectedSize;
            }
            if (variantOptions?.materials?.length > 0) {
                selectedOptions.material = selectedMaterial;
            }
        }
        addToCart({ ...product, price: currentPrice }, 1, selectedOptions);
    };

    const handleWishlist = () => {
        toggleWishlist(product);
    };

    const mainImage = images?.[0] || "https://placehold.co/600x600?text=Product";
    
    return (
        <div className="group relative flex flex-col bg-white border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {newArrival && (
                    <span className="px-2.5 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wide rounded-full">
                        New
                    </span>
                )}
                {onSale && (
                    <span className="px-2.5 py-0.5 bg-red-500 text-white text-[10px] font-semibold uppercase tracking-wide rounded-full">
                        Sale
                    </span>
                )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <button 
                    onClick={handleWishlist}
                    className={cn(
                        "size-8 rounded-full shadow-md flex items-center justify-center transition-colors duration-200",
                        isWishlisted ? "bg-red-500 text-white" : "bg-white text-foreground hover:bg-primary hover:text-primary-foreground"
                    )}
                >
                    <Heart className={cn("size-3.5", isWishlisted && "fill-white")} />
                </button>
                <button 
                    onClick={handleAddToCart}
                    className="size-8 rounded-full bg-white text-foreground shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                    <ShoppingCart className="size-3.5" />
                </button>
            </div>

            {/* Image */}
            <Link href={`/products/${_id}`} className="relative aspect-square overflow-hidden bg-muted/30">
                <img 
                    src={mainImage} 
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Product Info */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {categoryId?.label || "Essentials"}
                    </span>
                    <div className="flex items-center gap-0.5">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] font-medium text-muted-foreground">{rating ? Number(rating).toFixed(1) : "5.0"}</span>
                    </div>
                </div>

                <Link href={`/products/${_id}`}>
                    <h3 className="text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {name}
                    </h3>
                </Link>

                {/* Variant Selectors */}
                {isVariantProduct && (
                    <div className="space-y-2 pb-2">
                        {variantOptions?.diameters?.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label className="text-[10px] font-bold text-muted-foreground w-12 uppercase">DIA</label>
                                <select 
                                    className="text-[11px] bg-muted/50 border-none rounded px-1.5 py-1 focus:ring-1 focus:ring-primary w-full outline-none"
                                    value={selectedDiameter}
                                    onChange={(e) => setSelectedDiameter(e.target.value)}
                                >
                                    {variantOptions.diameters.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                        )}
                        {variantOptions?.lengths?.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label className="text-[10px] font-bold text-muted-foreground w-12 uppercase">Len</label>
                                <select 
                                    className="text-[11px] bg-muted/50 border-none rounded px-1.5 py-1 focus:ring-1 focus:ring-primary w-full outline-none"
                                    value={selectedLength}
                                    onChange={(e) => setSelectedLength(e.target.value)}
                                >
                                    {variantOptions.lengths.map(l => <option key={l} value={l}>{l}mm</option>)}
                                </select>
                            </div>
                        )}
                        {variantOptions?.sizes?.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label className="text-[10px] font-bold text-muted-foreground w-12 uppercase">Size</label>
                                <select 
                                    className="text-[11px] bg-muted/50 border-none rounded px-1.5 py-1 focus:ring-1 focus:ring-primary w-full outline-none"
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                >
                                    {variantOptions.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        )}
                        {variantOptions?.materials?.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label className="text-[10px] font-bold text-muted-foreground w-12 uppercase">Grade</label>
                                <select 
                                    className="text-[11px] bg-muted/50 border-none rounded px-1.5 py-1 focus:ring-1 focus:ring-primary w-full outline-none font-semibold text-primary"
                                    value={selectedMaterial}
                                    onChange={(e) => setSelectedMaterial(e.target.value)}
                                >
                                    {variantOptions.materials.map(m => <option key={m} value={m}>AISI {m}</option>)}
                                </select>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-muted-foreground leading-none">Price per {unit || "pcs"}</span>
                        <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {currentPrice ? `₹${currentPrice}` : "N/A"}
                        </span>
                    </div>
                    <Button 
                        size="sm" 
                        onClick={handleAddToCart}
                        className="h-8 w-8 rounded-lg p-0 shadow-sm transition-all active:scale-95"
                    >
                        <ShoppingCart className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
