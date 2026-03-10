"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShopPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCategories(data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background overflow-hidden relative">
            {/* Aesthetic backgrounds */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <header className="mb-16 space-y-4 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary"
                    >
                        <ShoppingBag className="w-3 h-3" />
                        Explore Collections
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase italic leading-none"
                    >
                        Our<br className="md:hidden" /> Shop
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground max-w-lg text-sm font-medium leading-relaxed mx-auto md:mx-0"
                    >
                        Discover our curated categories. From high-performance tech to timeless lifestyle essentials, find everything you need to elevate your experience.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="h-64 bg-muted animate-pulse rounded-[2.5rem]" />
                        ))
                    ) : (
                        categories.map((category, index) => (
                            <CategoryCard key={category._id} category={category} index={index} />
                        ))
                    )}
                </div>

                {/* Filter Shortcuts Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-8 md:p-12 rounded-[3.5rem] bg-card border border-border/40 relative overflow-hidden group shadow-2xl shadow-primary/5"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black tracking-tight uppercase italic leading-none">
                                Shop by<br/>Highlights
                            </h2>
                            <p className="text-muted-foreground text-sm font-medium">
                                Fast-track your search with our curated highlight sections.
                            </p>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { label: "New Arrivals", href: "/shop/new-arrivals", icon: <Sparkles className="w-5 h-5" /> },
                                { label: "Best Sellers", href: "/shop/best-sellers", icon: <Layers className="w-5 h-5" /> },
                                { label: "On Sale", href: "/shop/sale", icon: <ShoppingBag className="w-5 h-5" /> }
                            ].map((filter) => (
                                <Link 
                                    key={filter.label} 
                                    href={filter.href}
                                    className="p-6 rounded-3xl bg-background/50 border border-border/40 hover:border-primary/40 hover:bg-card transition-all duration-300 group/item flex flex-col gap-4"
                                >
                                    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                        {filter.icon}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm uppercase tracking-wider">{filter.label}</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

function CategoryCard({ category, index }) {
    const { label, href, description } = category;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link 
                href={href}
                className="group relative flex flex-col min-h-[280px] p-8 bg-card/40 border border-border/40 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/20 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
            >
                {/* Visual decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative z-10 flex flex-col h-full space-y-4">
                    <div className="size-14 rounded-[1.2rem] bg-background border border-border/40 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="text-2xl font-black uppercase tracking-tight italic group-hover:text-primary transition-colors">
                            {label}
                        </h3>
                        <p className="mt-2 text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2">
                            {description || "Explore our premium collection of products curated just for you."}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary pt-4 group-hover:gap-4 transition-all">
                        View Products
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </div>

                {/* Background Text watermark */}
                <div className="absolute -bottom-4 -right-4 text-8xl font-black text-foreground/[0.02] uppercase italic select-none pointer-events-none group-hover:text-primary/[0.03] transition-colors">
                    {label.split(' ')[0]}
                </div>
            </Link>
        </motion.div>
    );
}
