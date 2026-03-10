"use client";
import React, { useState, useEffect, use } from "react";
import { ProductsSection } from "@/components/product-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

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
                    // Find the category whose href ends with the slug or matches
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
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
                <h1 className="text-4xl font-black uppercase italic">Category Not Found</h1>
                <Button asChild variant="outline" className="rounded-full">
                    <Link href="/categories">Back to All Categories</Link>
                </Button>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <Button asChild variant="ghost" className="rounded-full mb-12 hover:bg-muted">
                    <Link href="/categories" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> All Categories
                    </Link>
                </Button>

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
