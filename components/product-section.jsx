"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

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
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            Featured Collection
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic leading-[0.9]">
                            {title}
                        </h2>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm">
                            {subtitle}
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Button onClick={() => window.location.href = "/categories"} variant="outline" className="rounded-full border-border/40 hover:bg-primary hover:text-primary-foreground group transition-all duration-300">
                            View All Collections
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        Array(limit).fill(0).map((_, i) => (
                            <div key={i} className="space-y-4 animate-pulse">
                                <div className="bg-muted aspect-square rounded-[2rem]" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-muted rounded w-1/4" />
                                    <div className="h-6 bg-muted rounded w-full" />
                                    <div className="h-4 bg-muted rounded w-2/4" />
                                </div>
                            </div>
                        ))
                    ) : (
                        products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
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
    const { _id, name, price, images, rating, onSale, salePrice, newArrival, categoryId } = product;
    const mainImage = images?.[0] || "https://placehold.co/600x600?text=Product";
    
    return (
        <div className="group relative flex flex-col bg-card/40 border border-border/40 rounded-[2.5rem] p-4 transition-all duration-500 hover:border-primary/20 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden">
            {/* Badges */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {newArrival && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                        New
                    </span>
                )}
                {onSale && (
                    <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                        Sale
                    </span>
                )}
            </div>

            {/* Icons Overlay */}
            <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                <button className="size-10 rounded-full bg-white/90 dark:bg-black/90 text-foreground shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300 backdrop-blur-sm">
                    <Heart className="size-4" />
                </button>
                <button className="size-10 rounded-full bg-white/90 dark:bg-black/90 text-foreground shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300 backdrop-blur-sm">
                    <ShoppingCart className="size-4" />
                </button>
            </div>

            {/* Image Container */}
            <Link href={`/products/${_id}`} className="relative aspect-square overflow-hidden rounded-[1.8rem] mb-6 bg-muted/50">
                <img 
                    src={mainImage} 
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 px-2 pb-2">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground/60 group-hover:text-primary/70 transition-colors">
                        {categoryId?.label || "Essentials"}
                    </span>
                    <div className="flex items-center gap-1">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-bold text-muted-foreground">{rating || 5.0}</span>
                    </div>
                </div>

                <Link href={`/products/${_id}`}>
                    <h3 className="text-lg font-black leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-center gap-3 mt-auto pt-2">
                    {onSale ? (
                        <>
                            <span className="text-xl font-black text-primary">${salePrice}</span>
                            <span className="text-sm font-medium text-muted-foreground/50 line-through">${price}</span>
                        </>
                    ) : (
                        <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors">${price}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

