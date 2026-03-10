"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BlogCard } from "@/components/blogs-section";
import { BookOpen, Search, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch("/api/blogs");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setBlogs(data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background overflow-hidden relative">
            {/* Background Aesthetic */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <header className="mb-20 space-y-6 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary"
                    >
                        <BookOpen className="w-3 h-3" />
                        The Visual Journal
                    </motion.div>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase italic leading-none"
                            >
                                Latest<br className="md:hidden" /> Insights
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-muted-foreground max-w-lg text-sm font-medium leading-relaxed"
                            >
                                Exploring the intersection of design, technology, and modern living. Our journal brings you stories and deep dives from our global community.
                            </motion.p>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative w-full md:w-80 group"
                        >
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search articles..."
                                className="w-full bg-card/40 border border-border/40 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </motion.div>
                    </div>
                </header>

                {/* Featured Blog (Optional, taking first one) */}
                {!loading && blogs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="mb-16 group"
                    >
                        <Link href={`/blogs/${blogs[0]._id}`} className="relative block h-[500px] rounded-[3rem] overflow-hidden border border-border/40">
                             <img 
                                src={blogs[0].image || "https://placehold.co/1200x600?text=Featured+Article"} 
                                alt={blogs[0].title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                                    <Sparkles className="w-3 h-3" /> Featured Post
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-tight max-w-3xl mb-4 group-hover:text-primary transition-colors">
                                    {blogs[0].title}
                                </h2>
                                <p className="text-white/70 text-sm md:text-base font-medium max-w-xl line-clamp-2 mb-6">
                                    {blogs[0].shortDescription}
                                </p>
                                <div className="flex items-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
                                    <span>{blogs[0].author}</span>
                                    <span>•</span>
                                    <span>{blogs[0].readTime}</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="space-y-6">
                                <div className="aspect-[16/10] bg-muted animate-pulse rounded-3xl" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-muted rounded w-1/4" />
                                    <div className="h-8 bg-muted rounded w-full" />
                                    <div className="h-4 bg-muted rounded w-3/4" />
                                </div>
                            </div>
                        ))
                    ) : (
                        blogs.slice(1).map((blog, index) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <BlogCard {...blog} />
                            </motion.div>
                        ))
                    )}
                </div>

                {!loading && blogs.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-muted-foreground font-medium">No articles found. Check back later!</p>
                    </div>
                )}
            </div>
        </main>
    );
}
