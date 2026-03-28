"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { XIcon, MenuIcon, Search, ShoppingBag, ChevronRight, ChevronDown, Phone, Mail, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { SearchComponent } from "@/components/search-component";
import { motion, AnimatePresence } from "motion/react";
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export function MobileNav({ navLinks = [] }) {
	const [open, setOpen] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);
    const [expandedLink, setExpandedLink] = React.useState(null);

    const { getCartCount } = useCart();
    const { getWishlistCount } = useWishlist();

    const cartCount = getCartCount();
    const wishlistCount = getWishlistCount();

    const toggleExpand = (label) => {
        setExpandedLink(expandedLink === label ? null : label);
    };

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
                className={cn("rounded-full h-10 w-10 hover:bg-muted/50 transition-colors", showSearch && "bg-primary/10 text-primary")}
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
                variant="secondary"
                className="rounded-xl h-10 w-10 border-border/40 shadow-sm transition-all active:scale-95"
            >
				{open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
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
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-background shadow-2xl z-[70] flex flex-col border-l border-border/50"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-border/50 bg-muted/20">
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Navigation</span>
                                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full hover:bg-muted/80">
                                    <XIcon className="size-5" />
                                </Button>
                            </div>

                            {/* Nav Links */}
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                {/* Quick Access Buttons */}
                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <Link 
                                        href="/wishlist" 
                                        onClick={() => setOpen(false)}
                                        className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-2xl border border-red-100/50 shadow-sm group active:scale-95 transition-all"
                                    >
                                        <div className="relative mb-2">
                                            <Heart className="size-5 text-red-500 transition-transform group-hover:scale-110" />
                                            {wishlistCount > 0 && (
                                                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-red-50">
                                                    {wishlistCount}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-red-700">Wishlist</span>
                                    </Link>
                                    <Link 
                                        href="/cart" 
                                        onClick={() => setOpen(false)}
                                        className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-2xl border border-primary/10 shadow-sm group active:scale-95 transition-all"
                                    >
                                        <div className="relative mb-2">
                                            <ShoppingCart className="size-5 text-primary transition-transform group-hover:scale-110" />
                                            {cartCount > 0 && (
                                                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-primary/50">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-primary">My Cart</span>
                                    </Link>
                                </div>

                                <div className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <div key={link.label} className="py-2 border-b border-border/40 last:border-0">
                                            {link.label === "Shop" ? (
                                                <div className="space-y-4">
                                                    <button 
                                                        onClick={() => toggleExpand(link.label)}
                                                        className="w-full flex items-center justify-between py-2 text-lg font-semibold text-foreground hover:text-primary transition-colors text-left"
                                                    >
                                                        {link.label}
                                                        <ChevronDown className={cn("size-5 transition-transform duration-300", expandedLink === link.label && "rotate-180")} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {expandedLink === link.label && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden space-y-4 pt-2"
                                                            >
                                                                {/* Categories Group */}
                                                                <div className="space-y-2">
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 pl-4">Categories</span>
                                                                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/10">
                                                                        {link.categories.map(sub => (
                                                                            <Link 
                                                                                key={sub.label} 
                                                                                href={sub.href} 
                                                                                onClick={() => setOpen(false)}
                                                                                className="py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                                                            >
                                                                                {sub.label}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* Specials Group */}
                                                                <div className="space-y-2">
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 pl-4">Collections</span>
                                                                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-border/20">
                                                                        {link.specials.map(sub => (
                                                                            <Link 
                                                                                key={sub.label} 
                                                                                href={sub.href} 
                                                                                onClick={() => setOpen(false)}
                                                                                className="py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                                                            >
                                                                                {sub.label}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link 
                                                    href={link.href} 
                                                    onClick={() => setOpen(false)}
                                                    className="block py-2 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Contact Info */}
                                <div className="mt-10 space-y-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quick Contact</p>
                                    <div className="space-y-3">
                                        <a href="tel:+918318005329" className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
                                            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <Phone className="size-4" />
                                            </div>
                                            +91 98765 43210
                                        </a>
                                        <a href="mailto:info@vsenterprises.com" className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
                                            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <Mail className="size-4" />
                                            </div>
                                            info@vsenterprises.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Auth Section */}
                            <div className="px-6 py-4 border-t border-border/50 bg-muted/10">
                                <Show when="signed-out">
                                    <div className="flex flex-col gap-3">
                                        <SignInButton mode="modal">
                                            <Button variant="outline" className="w-full h-11 rounded-xl text-sm font-bold border-border shadow-sm">
                                                Existing Customer? Sign In
                                            </Button>
                                        </SignInButton>
                                        <SignUpButton mode="modal">
                                            <Button className="w-full h-11 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 bg-primary text-primary-foreground">
                                                Join Now — Create Account
                                            </Button>
                                        </SignUpButton>
                                    </div>
                                </Show>
                                <Show when="signed-in">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-border shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <UserButton afterSignOutUrl="/">
                                                <UserButton.MenuItems>
                                                    <UserButton.Link
                                                        label="My Orders"
                                                        labelIcon={<ShoppingBag className="size-4" />}
                                                        href="/orders"
                                                    />
                                                </UserButton.MenuItems>
                                            </UserButton>

                                            <div>
                                                <p className="text-xs font-bold text-foreground">My Profile</p>
                                                <p className="text-[10px] text-muted-foreground">Manage your account</p>
                                            </div>
                                        </div>
                                    </div>
                                </Show>
                            </div>

                            {/* Footer */}
                            <div className="p-6 bg-muted/30 border-t border-border/50">
                                <Button asChild className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                    <Link href="/categories" onClick={() => setOpen(false)}>
                                        <ShoppingBag className="mr-2 size-4" />
                                        Shop All Products
                                    </Link>
                                </Button>
                                <div className="mt-6 text-center space-y-1">
                                    <p className="text-[10px] font-bold text-foreground/80 uppercase tracking-widest leading-none">
                                        VS ENTERPRISES
                                    </p>
                                    <p className="text-[8px] font-medium text-muted-foreground uppercase leading-none">
                                        Premium Engineering Components
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
