"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BlogCard } from "@/components/blogs-section";
import { BookOpen, Search, Newspaper } from "lucide-react";
import Link from "next/link";
import { Clock, User } from "lucide-react";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

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

    const filteredBlogs = blogs.filter((blog) =>
        blog.title?.toLowerCase().includes(search.toLowerCase()) ||
        blog.shortDescription?.toLowerCase().includes(search.toLowerCase())
    );

    const featuredBlog = filteredBlogs[0];
    const restBlogs = filteredBlogs.slice(1);

    return (
        <main className="min-h-screen bg-background pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
                {/* Page Header */}
                <div className="mb-10 space-y-3">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-xs font-semibold uppercase tracking-widest text-primary"
                    >
                        The Journal
                    </motion.span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.07 }}
                                className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                            >
                                Latest Articles
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.14 }}
                                className="text-muted-foreground text-sm leading-relaxed max-w-xl"
                            >
                                Stories and insights from design, technology, and modern living.
                            </motion.p>
                        </div>

                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative w-full md:w-72"
                        >
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search articles…"
                                className="w-full bg-white border border-border/60 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground/60"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Featured Article */}
                {!loading && featuredBlog && !search && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <Link
                            href={`/blogs/${featuredBlog._id}`}
                            className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-border/50 bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden bg-muted/30">
                                <img
                                    src={featuredBlog.image || "https://placehold.co/800x500?text=Featured"}
                                    alt={featuredBlog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                                    Featured
                                </span>
                            </div>
                            {/* Content */}
                            <div className="flex flex-col justify-center p-7 md:p-10 md:w-1/2 space-y-4">
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    {featuredBlog.author && (
                                        <span className="flex items-center gap-1">
                                            <User className="size-3" />
                                            {featuredBlog.author}
                                        </span>
                                    )}
                                    {featuredBlog.readTime && (
                                        <>
                                            <span className="size-1 rounded-full bg-border" />
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3" />
                                                {featuredBlog.readTime}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                                    {featuredBlog.title}
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                    {featuredBlog.shortDescription}
                                </p>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                                    Read Article →
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="animate-pulse space-y-3">
                                <div className="aspect-[16/10] bg-muted rounded-2xl" />
                                <div className="space-y-2 px-1">
                                    <div className="h-3 bg-muted rounded w-1/3" />
                                    <div className="h-5 bg-muted rounded w-full" />
                                    <div className="h-4 bg-muted rounded w-3/4" />
                                </div>
                            </div>
                        ))
                    ) : restBlogs.length > 0 ? (
                        restBlogs.map((blog, index) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                            >
                                <BlogCard {...blog} />
                            </motion.div>
                        ))
                    ) : (
                        !loading && (
                            <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-4 text-center">
                                <Newspaper className="size-10 text-muted-foreground/40" />
                                <p className="text-muted-foreground text-sm">
                                    {search ? `No articles found for "${search}"` : "No articles available yet."}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </main>
    );
}
