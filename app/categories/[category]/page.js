"use client";
import React, { useState, useEffect, use } from "react";
import { ProductsSection } from "@/components/product-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function CategoryDetailPage({ params }) {
    const resolvedParams = use(params);
    const categorySlug = resolvedParams.category;
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function findCategory() {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                if (Array.isArray(data)) {
                    const found = data.find(c =>
                        c.href.endsWith(`/${categorySlug}`) ||
                        c.label.toLowerCase() === categorySlug.toLowerCase()
                    );
                    setCategory(found);
                }
            } catch (error) {
                console.error("Failed to find category:", error);
            } finally {
                setLoading(false);
            }
        }
        findCategory();
    }, [categorySlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="size-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading…</p>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
                <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
                    <LayoutGrid className="size-8 text-muted-foreground" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Category Not Found</h1>
                    <p className="text-muted-foreground text-sm">This category doesn't exist or may have been removed.</p>
                </div>
                <Button asChild variant="outline" className="rounded-full px-6">
                    <Link href="/categories">View All Categories</Link>
                </Button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
                {/* Breadcrumb + Back */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="rounded-full gap-2 text-muted-foreground hover:text-foreground -ml-2"
                    >
                        <Link href="/categories">
                            <ArrowLeft className="size-4" />
                            All Categories
                        </Link>
                    </Button>
                    <span className="text-border">·</span>
                    <span className="text-sm text-muted-foreground">{category.label}</span>
                </motion.div>

                {/* Category Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="mb-6 space-y-2"
                >
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">Category</span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        {category.label}
                    </h1>
                    {category.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                            {category.description}
                        </p>
                    )}
                </motion.div>

                {/* Products */}
                <ProductsSection
                    title={category.label}
                    subtitle={category.description || `Explore our premium selection of ${category.label}.`}
                    filterType={category._id}
                    limit={20}
                />
            </div>
        </main>
    );
}
