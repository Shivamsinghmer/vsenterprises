"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { Heart, ShoppingCart, ShoppingBag } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";    
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";
import { SearchComponent } from "@/components/search-component";
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

const defaultNavLinks = [
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Blogs",
        href: "/blogs",
    },
    {
        label: "Contact",
        href: "/contact",
    },
];

export function Header() {
    const scrolled = useScroll(10);
    const { categories } = useCategories();
    const { getCartCount } = useCart();
    const { getWishlistCount } = useWishlist();

    const cartCount = getCartCount();
    const wishlistCount = getWishlistCount();

    const shopSubLinks = categories.map(cat => ({
        label: cat.label,
        href: cat.href,
        description: cat.description || `Explore our ${cat.label} collection.`
    }));

    const specialLinks = [
        { label: "Sale", href: "/shop/sale", description: "Discounted products." },
        { label: "New Arrivals", href: "/shop/new-arrivals", description: "Latest products." },
        { label: "Best Sellers", href: "/shop/best-sellers", description: "Top-selling products." },
    ];

    const currentNavLinks = [
        {
            label: "Shop",
            href: "/categories",
            categories: shopSubLinks,
            specials: specialLinks
        },
        ...defaultNavLinks
    ];

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-white/95 backdrop-blur-md border-b border-border/60 shadow-sm"
                    : "bg-white/80 backdrop-blur-sm border-b border-transparent"
            )}>
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <nav className={cn(
                    "flex items-center justify-between transition-all duration-300",
                    scrolled ? "h-14" : "h-16"
                )}>
                    {/* Logo */}
                    <Link className="flex-shrink-0 transition-opacity hover:opacity-80" href="/">
                        <Logo className="h-10 md:h-17 p-1 w-auto" />
                    </Link>
 
                    {/* Desktop Nav Links */}
                    <div className="hidden items-center gap-1 md:flex">
                        {currentNavLinks.map((link) => {
                            if (link.label === "Shop") {
                                return (
                                    <div key={link.label} className="group relative">
                                        <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground">
                                            {link.label}
                                            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                                        </button>
                                        <div className="absolute left-1/2 top-full hidden -translate-x-1/2 pt-3 group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="w-[580px] rounded-2xl border border-border bg-white p-2 shadow-2xl shadow-black/10 flex divide-x divide-border overflow-hidden">
                                                {/* Main Categories */}
                                                <div className="flex-1 p-3">
                                                    <span className="block px-3 mb-3 text-[10px] font-black uppercase tracking-widest text-primary/60">Product Categories</span>
                                                    <div className="grid grid-cols-2 gap-1">
                                                        {link.categories.map((sub, i) => (
                                                            <Link
                                                                key={i}
                                                                href={sub.href}
                                                                className="flex flex-col gap-0.5 rounded-xl p-3 transition-all hover:bg-primary/5 group/link"
                                                            >
                                                                <span className="text-sm font-bold text-foreground group-hover/link:text-primary transition-colors">{sub.label}</span>
                                                                <span className="text-[10px] text-muted-foreground line-clamp-1">{sub.description}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Specials */}
                                                <div className="w-52 p-3 bg-muted/20">
                                                    <span className="block px-3 mb-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Collections</span>
                                                    <div className="flex flex-col gap-1">
                                                        {link.specials.map((sub, i) => (
                                                            <Link
                                                                key={i}
                                                                href={sub.href}
                                                                className="flex flex-col gap-0.5 rounded-xl p-3 transition-all hover:bg-white hover:shadow-sm group/spec"
                                                            >
                                                                <span className="text-sm font-bold text-foreground group-hover/spec:text-primary transition-colors">{sub.label}</span>
                                                                <span className="text-[10px] text-muted-foreground line-clamp-1">{sub.description}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
 
                    {/* Right Side Actions */}
                    <div className="flex items-center gap-1.5 md:gap-3">
                        <div className="hidden md:flex">
                            <SearchComponent />
                        </div>

                        {/* Wishlist */}
                        <Link href="/wishlist" className="relative hidden sm:flex p-2 rounded-full hover:bg-accent transition-colors group">
                            <Heart className="size-5 text-foreground/70 group-hover:text-red-500 transition-colors" />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in duration-300">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="relative p-2 rounded-full hover:bg-accent transition-colors group">
                            <ShoppingCart className="size-5 text-foreground/70 group-hover:text-primary transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in duration-300">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center gap-2 border-l border-border/60 pl-3 ml-1">
                            <Show when="signed-out">
                                <div className="flex items-center gap-2">
                                    <SignInButton mode="modal">
                                        <Button variant="ghost" className="text-sm font-bold rounded-xl hover:bg-muted/50 transition-all">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button className="text-sm font-bold rounded-xl shadow-md shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                                            Sign Up
                                        </Button>
                                    </SignUpButton>
                                </div>
                            </Show>
                            <Show when="signed-in">
                                <UserButton afterSignOutUrl="/">
                                    <UserButton.MenuItems>
                                        <UserButton.Link
                                            label="My Orders"
                                            labelIcon={<ShoppingBag className="size-4" />}
                                            href="/orders"
                                        />
                                    </UserButton.MenuItems>
                                </UserButton>
                            </Show>
                        </div>

                        <MobileNav navLinks={currentNavLinks} />
                    </div>
                </nav>
            </div>
        </header>
    );
}
