"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SearchComponent } from "@/components/search-component";

export const navLinks = [
    {
        label: "Shop",
        href: "/categories",
        subLinks: [
            { label: "Electronics", href: "/categories/electronics", description: "Latest smart devices and gadgets." },
            { label: "Apparel", href: "/categories/apparel", description: "Trendy activewear and everyday clothing." },
            { label: "Home Decor", href: "/categories/home", description: "Beautiful items for your living spaces." },
            { label: "Sports", href: "/categories/sports", description: "Premium gear and training equipment." },
            { label: "Sale", href: "/shop/sale", description: "Discounted products." },
            { label: "New Arrivals", href: "/shop/new-arrivals", description: "Latest products." },
            { label: "Best Sellers", href: "/shop/best-sellers", description: "Top-selling products." },
        ]
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Blogs",
        href: "/blogs",
    },
    {
        label: "Contact Us",
        href: "/contact",
    },
];

export function Header() {
    const scrolled = useScroll(10);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 mx-auto w-full max-w-5xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
                {
                    "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-3 md:max-w-5xl md:shadow":
                        scrolled,
                }
            )}>
            <nav
                className={cn(
                    "flex h-16 w-full items-center justify-between px-4 md:h-20 transition-all duration-300 ease-in-out",
                    {
                        "md:h-16 md:px-8": scrolled,
                    }
                )}>
                <div className="flex flex-1 items-center justify-start">
                    <Link className="group relative ml-4 transition-all" href="/">
                        <Logo className="h-14 md:h-18 w-auto transition-transform duration-300 group-hover:scale-[1.03]" />
                    </Link>
                </div>

                <div className="hidden items-center justify-center space-x-8 md:flex">
                    {navLinks.map((link) => {
                        if (link.subLinks) {
                            return (
                                <div key={link.label} className="group relative">
                                    <button className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-foreground/80 transition-all hover:text-primary">
                                        {link.label}
                                        <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                                    </button>
                                    <div className="absolute left-1/2 top-full hidden -translate-x-1/2 pt-4 group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="grid w-[400px] grid-cols-2 gap-2 rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-md">
                                            {link.subLinks.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    className="flex flex-col gap-1 rounded-xl p-3 transition-colors hover:bg-primary/5 border border-transparent hover:border-primary/10"
                                                >
                                                    <span className="text-xs font-black uppercase italic tracking-tight">{sub.label}</span>
                                                    <span className="text-[10px] text-muted-foreground line-clamp-1">{sub.description}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <Link 
                                key={link.label} 
                                href={link.href}
                                className="text-[11px] font-black uppercase tracking-widest text-foreground/80 transition-all hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                    <div className="hidden md:flex">
                        <SearchComponent />
                    </div>
                    <MobileNav />
                </div>
            </nav>
        </header>
    );
}
