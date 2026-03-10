"use client"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState, useEffect } from "react";

export function FaqsSection() {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchFaqs() {
			try {
				const response = await fetch("/api/faqs");
				const data = await response.json();
				setQuestions(data);
			} catch (error) {
				console.error("Failed to fetch FAQs:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchFaqs();
	}, []);

	return (
        <div className="mx-auto w-full max-w-5xl py-20 px-4 md:px-8 border-x/0 lg:border-x border-border/40">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16">
				<div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                        Support Center
                    </div>
					<h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic leading-[0.9]">
                        Common<br/>Questions
                    </h2>
					<p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm">
						Everything you need to know about our products, shipping, and returns. Can't find an answer? Our support team is always here to help.
					</p>
				</div>
				<div className="space-y-2">
					{loading ? (
						<div className="space-y-4">
							{Array(5).fill(0).map((_, i) => (
								<div key={i} className="h-16 bg-muted animate-pulse rounded-2xl" />
							))}
						</div>
					) : (
						<Accordion collapsible defaultValue={questions[0]?._id} type="single" className="space-y-4">
							{questions.map((item) => (
								<AccordionItem
									className="border border-border/40 rounded-2xl overflow-hidden px-2 transition-all duration-300 data-[state=open]:bg-muted/30 data-[state=open]:border-primary/20 shadow-sm"
									key={item._id}
									value={item._id}>
									<AccordionTrigger className="px-4 py-6 text-sm md:text-base font-bold text-left hover:no-underline hover:text-primary transition-colors">
										{item.title}
									</AccordionTrigger>
									<AccordionContent className="px-4 pb-6 text-muted-foreground text-sm font-medium leading-relaxed">
										{item.content}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</div>
			</div>
            <div className="flex h-14 items-center justify-center border-t">
				<p className="text-muted-foreground">
					Can't find what you're looking for?{" "}
					<a className="text-primary hover:underline" href="#">
						Contact Us
					</a>
				</p>
			</div>
        </div>
    );
}

