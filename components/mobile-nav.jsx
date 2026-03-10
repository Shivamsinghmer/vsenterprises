"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon, Search, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SearchComponent } from "@/components/search-component";
import { motion, AnimatePresence } from "motion/react";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);

	return (
        <div className="md:hidden flex items-center gap-2">
            <Button
                aria-label="Toggle search"
                onClick={() => {
                    setShowSearch(!showSearch);
                    if (open) setOpen(false);
                }}
                size="icon"
                variant="ghost"
                className={cn("rounded-full", showSearch && "bg-primary/10 text-primary")}
            >
                <Search className="size-5" />
            </Button>

            <Button
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label="Toggle menu"
                onClick={() => {
                    setOpen(!open);
                    if (showSearch) setShowSearch(false);
                }}
                size="icon"
                variant="outline"
                className="rounded-xl border-border/40 shadow-sm"
            >
				{open ? (
					<XIcon className="size-5" />
				) : (
					<MenuIcon className="size-5" />
				)}
			</Button>

            <AnimatePresence>
                {showSearch && (
                    <Portal className="top-14" id="mobile-search">
                        <PortalBackdrop onClick={() => setShowSearch(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-background/95 backdrop-blur-md p-4 border-b border-border shadow-2xl relative z-50"
                        >
                            <SearchComponent isMobile onClose={() => setShowSearch(false)} />
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <Portal className="top-0 fixed inset-0 z-[60]" id="mobile-menu">
                        <PortalBackdrop onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[85%] bg-background shadow-2xl z-[70] flex flex-col p-6 border-l border-border/50"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Menu</span>
                                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full">
                                    <XIcon className="size-5" />
                                </Button>
                            </div>

                            <div className="flex flex-col gap-6 overflow-y-auto pb-8">
                                {navLinks.map((link) => (
                                    <div key={link.label} className="flex flex-col gap-3">
                                        <Link 
                                            href={link.href} 
                                            onClick={() => setOpen(false)}
                                            className="text-2xl font-black uppercase italic tracking-tighter hover:text-primary transition-colors flex items-center justify-between group"
                                        >
                                            {link.label}
                                            <ArrowRight className="size-5 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                        
                                        {link.subLinks && (
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-l-2 border-primary/10 ml-1 pl-4">
                                                {link.subLinks.map(sub => (
                                                    <Link 
                                                        key={sub.label} 
                                                        href={sub.href} 
                                                        onClick={() => setOpen(false)}
                                                        className="py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto pt-8 border-t border-border/50">
                                <Link 
                                    href="/categories" 
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-center gap-3 w-full rounded-2xl h-14 font-black uppercase italic tracking-widest bg-primary text-primary-foreground hover:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                                >
                                    <ShoppingBag className="size-5" />
                                    Shop Now
                                </Link>
                                <div className="flex flex-col items-center gap-1 mt-6">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                        VS ENTERPRISES
                                    </p>
                                    <p className="text-[8px] font-bold text-muted-foreground/60 uppercase">
                                        Premium Quality Guaranteed
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>
        </div>
    );
}
