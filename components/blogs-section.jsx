"use client";
import { cn } from "@/lib/utils";
import { LazyImage } from "@/components/lazy-image";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
        <div className="mx-auto w-full max-w-6xl py-20 px-4 md:px-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    The Journal
                </div>
				<h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none">
					Latest<br className="md:hidden"/> Insights
				</h2>
				<p className="max-w-[500px] text-muted-foreground text-sm font-medium leading-relaxed">
					Dive into our thoughtfully curated articles exploring the intersection of modern lifestyle, technology, and design.
				</p>
			</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				{loading ? (
					Array(limit || 6).fill(0).map((_, i) => (
						<div key={i} className="animate-pulse space-y-4">
							<div className="bg-muted aspect-[16/10] rounded-3xl" />
							<div className="space-y-2">
                                <div className="h-4 bg-muted rounded w-1/4" />
                                <div className="h-6 bg-muted rounded w-full" />
                                <div className="h-4 bg-muted rounded w-3/4" />
                            </div>
						</div>
					))
				) : (
					displayBlogs.map((blog) => (
						<BlogCard {...blog} key={blog._id || blog.title} />
					))
				)}
			</div>

            {showViewMore && !loading && blogs.length > (limit || 0) && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <Button asChild variant="outline" className="rounded-full h-12 px-8 border-border/40 hover:bg-primary hover:text-primary-foreground group transition-all duration-300">
                        <Link href="/blogs" className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                            View More Articles
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>
            )}
        </div>
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
                "group relative flex flex-col gap-5 overflow-hidden rounded-[2.5rem] bg-card/40 p-5 border border-border/40 transition-all duration-500 hover:border-primary/20 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2",
                className
            )}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.8rem]">
                <img
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={image || "https://placehold.co/640x360?text=insights"} 
                />
            </div>
            <div className="flex flex-col flex-1 px-3 pb-3 space-y-4">
				<div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 transition-colors group-hover:text-primary/70">
					<span>{author}</span>
					<div className="size-1 rounded-full bg-border" />
					<span>{readTime}</span>
				</div>
				<h3 className="line-clamp-2 text-2xl font-black leading-[1.1] tracking-tighter text-foreground group-hover:text-primary transition-colors">
                    {title}
                </h3>
				<p className="line-clamp-2 text-sm font-medium leading-relaxed text-muted-foreground/80">
					{shortDescription}
				</p>
			</div>
        </Link>
    );
}
