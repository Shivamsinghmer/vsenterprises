"use client"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";

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
        <section className="py-16 md:py-20 bg-muted/30">
            <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16">
                    {/* Left: Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                            Support Center
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Everything you need to know about our products, shipping, and returns.
                        </p>
                        <p className="text-sm text-muted-foreground pt-2">
                            Can't find an answer?{" "}
                            <Link href="/contact" className="text-primary font-medium hover:underline underline-offset-4">
                                Contact our support team →
                            </Link>
                        </p>
                    </motion.div>

                    {/* Right: FAQ Items */}
                    <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {loading ? (
                            <div className="space-y-3">
                                {Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="h-14 bg-muted animate-pulse rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <Accordion collapsible defaultValue={questions[0]?._id} type="single" className="space-y-2">
                                {questions.map((item) => (
                                    <AccordionItem
                                        className="border border-border/50 rounded-xl overflow-hidden bg-white px-1 transition-all duration-200 data-[state=open]:border-primary/30 data-[state=open]:bg-white"
                                        key={item._id}
                                        value={item._id}>
                                        <AccordionTrigger className="px-4 py-4 text-sm font-medium text-left hover:no-underline hover:text-primary transition-colors">
                                            {item.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                                            {item.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
