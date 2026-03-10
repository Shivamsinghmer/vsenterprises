"use client";
import React, { use } from "react";
import { ProductsSection } from "@/components/product-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ShopFilterPage({ params }) {
    const resolvedParams = use(params);
    const filter = resolvedParams.filter;

    // Map URL slug to ProductsSection filterType and pretty title
    const filterMap = {
        "sale": { type: "onSale", title: "Flash Sale", subtitle: "Unmissable deals on premium products." },
        "new-arrivals": { type: "newArrival", title: "New Arrivals", subtitle: "The latest additions to our collection." },
        "best-sellers": { type: "bestSeller", title: "Best Sellers", subtitle: "Most loved products by our community." }
    };

    const currentFilter = filterMap[filter] || { type: filter, title: "Shop", subtitle: "Explre our collection" };

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <Button asChild variant="ghost" className="rounded-full mb-12 hover:bg-muted">
                    <Link href="/categories" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Categories
                    </Link>
                </Button>

                <ProductsSection 
                    title={currentFilter.title}
                    subtitle={currentFilter.subtitle}
                    filterType={currentFilter.type}
                    limit={20}
                />
            </div>
        </main>
    );
}
