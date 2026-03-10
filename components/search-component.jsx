"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SearchComponent({ isMobile = false, onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=5`);
                const data = await response.json();
                setResults(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    const handleResultClick = () => {
        setIsOpen(false);
        setQuery("");
        if (onClose) onClose();
    };

    return (
        <div ref={containerRef} className={cn("relative", isMobile ? "w-full" : "w-48 lg:w-64")}>
            <div className="relative group">
                <Search className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                    isOpen ? "text-primary" : "text-muted-foreground group-focus-within:text-primary"
                )} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search products..."
                    className={cn(
                        "flex h-11 w-full rounded-full border border-input bg-background/50 px-3 pl-10 pr-10 text-xs shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary lg:text-sm",
                        isMobile ? "h-12 px-4 pl-12" : "focus:w-56 lg:focus:w-72"
                    )}
                />
                {query && (
                    <button 
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted"
                    >
                        <X className="size-3 text-muted-foreground" />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (query.length >= 2 || loading) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn(
                            "absolute top-full mt-2 w-[300px] md:w-[400px] rounded-2xl border border-border bg-background shadow-2xl z-[60] overflow-hidden",
                            isMobile ? "left-0 right-0 w-full" : "right-0"
                        )}
                    >
                        <div className="p-4 bg-muted/30 border-b border-border flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                {loading ? "Searching..." : `Results for "${query}"`}
                            </span>
                            {loading && <Loader2 className="size-3 animate-spin text-primary" />}
                        </div>

                        <div className="max-h-[350px] overflow-y-auto">
                            {results.length > 0 ? (
                                <div className="p-2 space-y-1">
                                    {results.map((product) => (
                                        <Link
                                            key={product._id}
                                            href={`/products/${product._id}`}
                                            onClick={handleResultClick}
                                            className="group flex gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
                                        >
                                            <div className="size-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                <img 
                                                    src={product.images?.[0] || "https://placehold.co/100x100"} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center flex-1">
                                                <h4 className="text-sm font-black uppercase tracking-tight italic line-clamp-1 group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-black text-primary">${product.salePrice || product.price}</span>
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{product.categoryId?.label}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <ArrowRight className="size-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : !loading && (
                                <div className="p-10 text-center space-y-4">
                                    <div className="size-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                                        <Search className="size-5 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground">No products found for your search.</p>
                                </div>
                            )}
                        </div>

                        {results.length > 0 && (
                            <Link 
                                href="/categories" 
                                className="block p-4 text-center text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-colors border-t border-border"
                                onClick={handleResultClick}
                            >
                                View all products
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
