"use client";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
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
        <section className="relative py-24 overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
				<div className="flex flex-col items-center text-center space-y-4 mb-16">
					<div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
						Global Community
					</div>
					<h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none">
						Member<br className="md:hidden"/> Stories
					</h2>
					<p className="max-w-[500px] text-muted-foreground text-sm font-medium leading-relaxed">
						Join thousands of satisfied customers who have transformed their lifestyle with our premium collections.
					</p>
				</div>

				<div
                    className={cn(
                        "flex max-h-[700px] justify-center gap-8 overflow-hidden",
                        "mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
                    )}>
					{!loading ? (
						<>
							<InfiniteSlider direction="vertical" speed={25} speedOnHover={10}>
								{firstColumn.map((testimonial) => (
									<TestimonialsCard key={testimonial._id || testimonial.name} testimonial={testimonial} />
								))}
							</InfiniteSlider>
							<InfiniteSlider
								className="hidden md:flex flex-col gap-6"
								direction="vertical"
								speed={40}
								speedOnHover={15}>
								{secondColumn.map((testimonial) => (
									<TestimonialsCard key={testimonial._id || testimonial.name} testimonial={testimonial} />
								))}
							</InfiniteSlider>
							<InfiniteSlider
								className="hidden lg:flex flex-col gap-6"
								direction="vertical"
								speed={30}
								speedOnHover={12}>
								{thirdColumn.map((testimonial) => (
									<TestimonialsCard key={testimonial._id || testimonial.name} testimonial={testimonial} />
								))}
							</InfiniteSlider>
						</>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
							{Array(3).fill(0).map((_, i) => (
								<div key={i} className="h-[400px] bg-muted animate-pulse rounded-[2.5rem]" />
							))}
						</div>
					)}
				</div>
			</div>
        </section>
    );
}

function TestimonialsCard({
    testimonial,
    className,
    ...props
}) {
	const { quote, image, name, role, company } = testimonial;
	return (
        <figure
            className={cn(
                "w-full max-w-xs rounded-3xl border bg-card p-8 shadow-foreground/10 shadow-lg dark:bg-card/20",
                className
            )}
            {...props}>
            <blockquote>{quote}</blockquote>
            <figcaption className="mt-5 flex items-center gap-2">
				<Avatar className="size-8 rounded-full">
					<AvatarImage alt={`${name}'s profile picture`} src={image} />
					<AvatarFallback>{name.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<cite className="font-medium not-italic leading-5 tracking-tight">
						{name}
					</cite>
					<span className="text-muted-foreground text-sm leading-5 tracking-tight">
						{role} {company && `, ${company}`}
					</span>
				</div>
			</figcaption>
        </figure>
    );
}
