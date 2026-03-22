"use client";
import React, { useState, useEffect, use } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SingleBlogPage({ params }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await fetch(`/api/blogs/${id}`);
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error("Failed to fetch blog:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id]);

    function handleShare() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading article…</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
                <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
                    <BookOpen className="size-8 text-muted-foreground" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h1>
                    <p className="text-muted-foreground text-sm">This article may have been removed or is unavailable.</p>
                </div>
                <Button asChild variant="outline" className="rounded-full px-6">
                    <Link href="/blogs">Back to Journal</Link>
                </Button>
            </div>
        );
    }

    const formattedDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        : null;

    return (
        <main className="min-h-screen bg-background pb-24">
            {/* Hero Image */}
            <div className="relative w-full h-[55vh] min-h-[380px] overflow-hidden bg-muted">
                <img
                    src={blog.image || "https://placehold.co/1400x700?text=Article"}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />

                {/* Back button */}
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20 text-white"
                    >
                        <Link href="/blogs" className="flex items-center gap-2 text-sm">
                            <ArrowLeft className="size-3.5" />
                            Back to Journal
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-3xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
                {/* Article Card Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl border border-border/50 shadow-sm p-7 md:p-10 mb-8 space-y-5"
                >
                    {/* Tags */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/8 border border-primary/20 px-3 py-1 rounded-full">
                            Insight
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-snug">
                        {blog.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/50 pt-5">
                        {blog.author && (
                            <span className="flex items-center gap-1.5">
                                <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                    {blog.author.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-foreground">{blog.author}</span>
                            </span>
                        )}
                        {formattedDate && (
                            <span className="flex items-center gap-1.5">
                                <Calendar className="size-3.5" />
                                {formattedDate}
                            </span>
                        )}
                        {blog.readTime && (
                            <span className="flex items-center gap-1.5">
                                <Clock className="size-3.5" />
                                {blog.readTime}
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleShare}
                            className="ml-auto rounded-full h-8 px-3 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                        >
                            <Share2 className="size-3.5" />
                            {copied ? "Copied!" : "Share"}
                        </Button>
                    </div>
                </motion.div>

                {/* Article Body */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="bg-white rounded-2xl border border-border/50 shadow-sm p-7 md:p-10 space-y-8"
                >
                    {/* Excerpt / Short Description */}
                    {blog.shortDescription && (
                        <p className="text-base md:text-lg font-medium text-muted-foreground leading-relaxed border-l-4 border-primary pl-5 italic">
                            {blog.shortDescription}
                        </p>
                    )}

                    {/* Main Content */}
                    {blog.longDescription && (
                        <div className="text-[15px] text-foreground/85 leading-[1.85] space-y-5 whitespace-pre-line">
                            {blog.longDescription}
                        </div>
                    )}
                </motion.article>

                {/* Author Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-muted/40 rounded-2xl border border-border/50 p-7"
                >
                    <div className="size-14 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                        {blog.author?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Written by</p>
                        <p className="text-base font-semibold text-foreground">{blog.author}</p>
                        <p className="text-sm text-muted-foreground mt-1">Author at VS Enterprises Journal</p>
                    </div>
                    <div className="sm:ml-auto">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShare}
                            className="rounded-full gap-2 border-border/60"
                        >
                            <Share2 className="size-3.5" />
                            {copied ? "Link copied!" : "Share Article"}
                        </Button>
                    </div>
                </motion.div>

                {/* Back to Journal */}
                <div className="mt-10 text-center">
                    <Button asChild variant="ghost" className="rounded-full text-muted-foreground hover:text-foreground gap-2">
                        <Link href="/blogs">
                            <ArrowLeft className="size-4" />
                            Back to all articles
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
