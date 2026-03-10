"use client";
import React, { useState, useEffect, use } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SingleBlogPage({ params }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full" />
                    <div className="h-4 w-32 bg-muted rounded" />
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6">
                <h1 className="text-4xl font-black uppercase italic">Article Not Found</h1>
                <Button asChild variant="outline" className="rounded-full">
                    <Link href="/blogs">Back to Journal</Link>
                </Button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Header / Hero */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <img 
                    src={blog.image || "https://placehold.co/1200x600"} 
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                
                <div className="absolute top-24 left-4 md:left-8 z-20">
                    <Button asChild variant="ghost" className="rounded-full bg-background/20 backdrop-blur-md hover:bg-background/40 border border-white/10 text-white">
                        <Link href="/blogs" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Journal
                        </Link>
                    </Button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-12">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md"
                        >
                            Insight
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic leading-none"
                        >
                            {blog.title}
                        </motion.h1>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground"
                        >
                            <div className="flex items-center gap-2">
                                <User className="size-3 text-primary" />
                                {blog.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="size-3 text-primary" />
                                {blog.createdAt}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="size-3 text-primary" />
                                {blog.readTime}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                <article className="prose prose-invert prose-primary max-w-none">
                    <div className="text-xl font-medium leading-relaxed text-muted-foreground mb-12 italic border-l-4 border-primary pl-6">
                        {blog.shortDescription}
                    </div>
                    
                    <div className="text-foreground/90 leading-relaxed text-lg space-y-8 font-medium whitespace-pre-line">
                        {blog.longDescription}
                    </div>
                </article>

                {/* Footer of the article */}
                <div className="mt-20 pt-10 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary">
                            {blog.author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Written By</p>
                            <p className="text-lg font-black uppercase italic leading-none">{blog.author}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="rounded-full gap-2 border-border/40">
                            <Share2 className="w-4 h-4" /> Share Post
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
