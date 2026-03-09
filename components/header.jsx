"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";

export const navLinks = [
	{
		label: "Products",
		href: "/categories",
		subLinks: [
			{ label: "Electronics", href: "/categories/electronics", description: "Latest smart devices and gadgets." },
			{ label: "Apparel", href: "/categories/apparel", description: "Trendy activewear and everyday clothing." },
			{ label: "Home Decor", href: "/categories/home", description: "Beautiful items for your living spaces." },
			{ label: "Sports", href: "/categories/sports", description: "Premium gear and training equipment." },
		]
	},
	{
		label: "About",
		href: "/about",
	},
	{
		label: "Shop",
		href: "/shop",
	},
	{
		label: "Sale",
		href: "/shop/sale",
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
                "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
                {
					"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
						scrolled,
				}
            )}>
            <nav
                className={cn(
                    "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
                    {
						"md:px-2": scrolled,
					}
                )}>
				<div className="flex flex-1 items-center justify-start">
					<Link className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50" href="/">
						<Logo className="h-4" />
					</Link>
				</div>
				
				<div className="hidden items-center justify-center md:flex">
					{navLinks.map((link) => {
						if (link.subLinks) {
							return (
								<div key={link.label} className="group relative">
									<Button asChild size="sm" variant="ghost" className="cursor-pointer gap-1 rounded-full px-3">
										<Link href={link.href}>
											{link.label}
											<ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
										</Link>
									</Button>
									<div className="absolute left-1/2 top-[calc(100%+0.5rem)] hidden w-[400px] -translate-x-1/2 group-hover:block">
										<div className="absolute -top-4 left-0 h-4 w-full" />
										<div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur-md animate-in slide-in-from-top-2">
											{link.subLinks.map((sub) => (
												<Link
													key={sub.label}
													href={sub.href}
													className="flex flex-col gap-1 rounded-lg p-3 transition-colors hover:bg-muted/80"
												>
													<span className="text-sm font-semibold leading-none">{sub.label}</span>
													<span className="mt-1 text-xs text-muted-foreground line-clamp-2">{sub.description}</span>
												</Link>
											))}
										</div>
									</div>
								</div>
							);
						}
						return (
							<Button asChild key={link.label} size="sm" variant="ghost" className="rounded-full px-3">
								<Link href={link.href}>{link.label}</Link>
							</Button>
						);
					})}
				</div>

				<div className="flex flex-1 items-center justify-end gap-2">
					<div className="relative hidden items-center md:flex">
						<Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input
							type="search"
							placeholder="Search products..."
							className="flex h-8 w-40 rounded-full border border-input bg-background/50 px-3 py-1 pl-8 text-sm shadow-sm transition-all focus-visible:w-48 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring lg:w-48 lg:focus-visible:w-56"
						/>
					</div>
					<MobileNav />
				</div>
			</nav>
        </header>
    );
}
