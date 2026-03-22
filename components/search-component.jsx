"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SearchComponent({ isMobile = false, onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounced search
    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim().length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=6`);
                const data = await response.json();
                setResults(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Search failed:", error);
                setResults([]);
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

    const handleClear = () => {
        setQuery("");
        setResults([]);
        inputRef.current?.focus();
    };

    const showDropdown = isOpen && query.trim().length >= 2;

    return (
        <div ref={containerRef} className={cn("relative", isMobile ? "w-full" : "w-52 lg:w-64")}>
            {/* Input */}
            <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search products…"
                    className={cn(
                        "w-full h-9 rounded-full border border-border/60 bg-muted/40 pl-10 pr-9 text-sm",
                        "placeholder:text-muted-foreground/60 text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white",
                        "transition-all duration-200"
                    )}
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        <X className="size-3.5" />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute top-full mt-2 z-[60] rounded-2xl border border-border bg-white shadow-xl shadow-black/8 overflow-hidden",
                            isMobile ? "left-0 right-0 w-full" : "right-0 w-[340px]"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-muted/30">
                            <span className="text-xs font-medium text-muted-foreground">
                                {loading
                                    ? "Searching…"
                                    : results.length > 0
                                        ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
                                        : `No results for "${query}"`}
                            </span>
                            {loading && <Loader2 className="size-3.5 animate-spin text-primary" />}
                        </div>

                        {/* Results */}
                        <div className="max-h-[360px] overflow-y-auto">
                            {results.length > 0 ? (
                                <div className="p-2 space-y-0.5">
                                    {results.map((product) => {
                                        const displayPrice = product.onSale ? product.salePrice : product.price;
                                        return (
                                            <Link
                                                key={product._id}
                                                href={`/products/${product._id}`}
                                                onClick={handleResultClick}
                                                className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent transition-colors"
                                            >
                                                {/* Thumbnail */}
                                                <div className="size-14 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/50">
                                                    <img
                                                        src={product.images?.[0] || "https://placehold.co/100x100?text=Product"}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                        {product.name}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-sm font-semibold text-primary">
                                                            ₹{displayPrice}
                                                        </span>
                                                        {product.onSale && (
                                                            <span className="text-xs text-muted-foreground line-through">
                                                                ₹{product.price}
                                                            </span>
                                                        )}
                                                        {product.categoryId?.label && (
                                                            <span className="text-[10px] text-muted-foreground/70 ml-auto">
                                                                {product.categoryId.label}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <ArrowRight className="size-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : !loading ? (
                                <div className="flex flex-col items-center justify-center py-10 gap-3">
                                    <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                                        <Search className="size-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground text-center max-w-[200px]">
                                        No products matched "<span className="font-medium text-foreground">{query}</span>"
                                    </p>
                                </div>
                            ) : null}
                        </div>

                        {/* Footer */}
                        {results.length > 0 && (
                            <Link
                                href={`/categories`}
                                className="flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-primary hover:bg-accent border-t border-border/50 transition-colors"
                                onClick={handleResultClick}
                            >
                                Browse all products
                                <ArrowRight className="size-3" />
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
