"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";
import { motion } from "motion/react";

export function BlogsSection({ initialBlogs, limit, showViewMore = false }) {
	const [blogs, setBlogs] = useState(initialBlogs || []);
	const [loading, setLoading] = useState(!initialBlogs);

	useEffect(() => {
		if (!initialBlogs) {
			async function fetchBlogs() {
				try {
					const response = await fetch("/api/blogs");
					const data = await response.json();
					setBlogs(data);
				} catch (error) {
					console.error("Failed to fetch blogs:", error);
				} finally {
					setLoading(false);
				}
			}
			fetchBlogs();
		}
	}, [initialBlogs]);

    const displayBlogs = limit ? blogs.slice(0, limit) : blogs;

	return (
        <section className="py-16 md:py-20 bg-muted/30">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center space-y-3 mb-12"
                >
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        The Journal
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Latest Insights
                    </h2>
                    <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
                        Thoughtfully curated articles on lifestyle, technology, and modern design.
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array(limit || 6).fill(0).map((_, i) => (
                            <div key={i} className="animate-pulse space-y-3">
                                <div className="bg-muted aspect-[16/10] rounded-2xl" />
                                <div className="space-y-2 px-1">
                                    <div className="h-3 bg-muted rounded w-1/3" />
                                    <div className="h-5 bg-muted rounded w-full" />
                                    <div className="h-4 bg-muted rounded w-3/4" />
                                </div>
                            </div>
                        ))
                    ) : (
                        displayBlogs.map((blog, index) => (
                            <motion.div
                                key={blog._id || blog.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <BlogCard {...blog} />
                            </motion.div>
                        ))
                    )}
                </div>

                {showViewMore && !loading && blogs.length > (limit || 0) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 flex justify-center"
                    >
                        <Button asChild variant="outline" className="rounded-full h-10 px-7 border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary group transition-all duration-200">
                            <Link href="/blogs" className="flex items-center gap-2 text-sm font-medium">
                                View All Articles
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export function BlogCard({
    _id,
    title,
    shortDescription,
    createdAt,
    readTime,
    image,
    author,
    className,
}) {
	return (
        <Link
            href={`/blogs/${_id}`}
            className={cn(
                "group flex flex-col overflow-hidden rounded-2xl bg-white border border-border/50 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1",
                className
            )}>
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                <img
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={image || "https://placehold.co/640x360?text=Blog"} 
                />
            </div>
            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
                    {author && (
                        <span className="flex items-center gap-1">
                            <User className="size-3" />
                            {author}
                        </span>
                    )}
                    {readTime && (
                        <>
                            <span className="size-1 rounded-full bg-border" />
                            <span className="flex items-center gap-1">
                                <Clock className="size-3" />
                                {readTime}
                            </span>
                        </>
                    )}
                </div>
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                    {shortDescription}
                </p>
                <div className="mt-auto pt-2 flex items-center text-xs font-semibold text-primary group-hover:gap-1.5 gap-1 transition-all">
                    Read More
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </div>
            </div>
        </Link>
    );
}
