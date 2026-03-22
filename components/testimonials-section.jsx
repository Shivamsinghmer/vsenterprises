"use client";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

export function TestimonialsSection() {
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchTestimonials() {
			try {
				const response = await fetch("/api/testimonials");
				const data = await response.json();
				setTestimonials(data);
			} catch (error) {
				console.error("Failed to fetch testimonials:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchTestimonials();
	}, []);

	const firstColumn = testimonials.slice(0, 3);
	const secondColumn = testimonials.slice(3, 6);
	const thirdColumn = testimonials.slice(6, 9);

	return (
        <section className="py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center space-y-3 mb-12"
                >
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Customer Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        What Our Customers Say
                    </h2>
                    <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
                        Join thousands of satisfied customers who have transformed their lifestyle with our premium collections.
                    </p>
                </motion.div>

                <div
                    className={cn(
                        "flex max-h-[640px] justify-center gap-5 overflow-hidden",
                        "mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
                    )}>
                    {!loading ? (
                        <>
                            <InfiniteSlider direction="vertical" speed={22} speedOnHover={10}>
                                {firstColumn.map((testimonial) => (
                                    <TestimonialsCard key={testimonial._id || testimonial.name} testimonial={testimonial} />
                                ))}
                            </InfiniteSlider>
                            <InfiniteSlider
                                className="hidden md:flex flex-col gap-5"
                                direction="vertical"
                                speed={35}
                                speedOnHover={15}>
                                {secondColumn.map((testimonial) => (
                                    <TestimonialsCard key={testimonial._id || testimonial.name} testimonial={testimonial} />
                                ))}
                            </InfiniteSlider>
                            <InfiniteSlider
                                className="hidden lg:flex flex-col gap-5"
                                direction="vertical"
                                speed={28}
                                speedOnHover={12}>
                                {thirdColumn.map((testimonial) => (
                                    <TestimonialsCard key={testimonial._id || testimonial.name} testimonial={testimonial} />
                                ))}
                            </InfiniteSlider>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                            {Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-[360px] bg-muted animate-pulse rounded-2xl" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function TestimonialsCard({ testimonial, className, ...props }) {
	const { quote, image, name, role, company } = testimonial;
	return (
        <figure
            className={cn(
                "w-full max-w-xs rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
                className
            )}
            {...props}>
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
                {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
            </div>
            <blockquote className="text-sm text-foreground/80 leading-relaxed">
                "{quote}"
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
                <Avatar className="size-9 rounded-full">
                    <AvatarImage alt={`${name}'s profile picture`} src={image} />
                    <AvatarFallback className="text-xs font-semibold">{name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <cite className="text-sm font-semibold not-italic text-foreground">
                        {name}
                    </cite>
                    <span className="text-xs text-muted-foreground">
                        {role}{company && `, ${company}`}
                    </span>
                </div>
            </figcaption>
        </figure>
    );
}
