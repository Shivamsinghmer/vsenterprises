"use client";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/logo";
import { FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";

const footerLinks = [
	{
		label: "Shop",
		links: [
			{ title: "New Arrivals", href: "/shop/new-arrivals" },
			{ title: "Best Sellers", href: "/shop/best-sellers" },
			{ title: "Electronics", href: "/categories/electronics" },
			{ title: "On Sale", href: "/shop/sale" },
		],
	},
	{
		label: "Company",
		links: [
			{ title: "About Us", href: "/about" },
			{ title: "Blogs", href: "/blogs" },
			{ title: "Contact", href: "/contact" },
			{ title: "FAQs", href: "#" },
		],
	},
	{
		label: "Legal",
		links: [
			{ title: "Privacy Policy", href: "#" },
			{ title: "Terms & Conditions", href: "#" },
			{ title: "Shipping Policy", href: "#" },
			{ title: "Return Policy", href: "#" },
		],
	},
];

const socialLinks = [
	{ icon: <FacebookIcon className="size-4" />, href: "#", label: "Facebook" },
	{ icon: <InstagramIcon className="size-4" />, href: "#", label: "Instagram" },
	{ icon: <YoutubeIcon className="size-4" />, href: "#", label: "Youtube" },
	{ icon: <LinkedinIcon className="size-4" />, href: "#", label: "LinkedIn" },
];

export function Footer() {
	return (
		<footer className="w-full border-t border-border/50 bg-white mt-8">
			<div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
					{/* Brand Column */}
					<AnimatedContainer className="space-y-5 lg:col-span-1">
						<Logo className="h-10 md:h-12 w-auto" />
						<p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
							Premium quality products delivered to your doorstep. Leading the way in excellence since day one.
						</p>
						<div className="flex items-center gap-3">
							{socialLinks.map((s) => (
								<a
									key={s.label}
									href={s.href}
									aria-label={s.label}
									className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary"
								>
									{s.icon}
								</a>
							))}
						</div>
					</AnimatedContainer>

					{/* Links Grid */}
					<div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-3">
						{footerLinks.map((section, index) => (
							<AnimatedContainer delay={0.1 + index * 0.08} key={section.label}>
								<h3 className="mb-4 text-sm font-semibold text-foreground">{section.label}</h3>
								<ul className="space-y-3">
									{section.links.map((link) => (
										<li key={link.title}>
											<Link
												href={link.href}
												className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
											>
												{link.title}
											</Link>
										</li>
									))}
								</ul>
							</AnimatedContainer>
						))}
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} VS Enterprises. All rights reserved.
					</p>
					<p className="text-sm text-muted-foreground">
						Toll Free: <span className="font-medium text-foreground">1800 209 0998</span>
					</p>
				</div>
			</div>
		</footer>
	);
}

function AnimatedContainer({ className, delay = 0.1, children }) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 12 }}
			transition={{ delay, duration: 0.5, ease: "easeOut" }}
			viewport={{ once: true }}
			whileInView={{ opacity: 1, y: 0 }}>
			{children}
		</motion.div>
	);
}
