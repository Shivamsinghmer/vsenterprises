"use client";;
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/logo";
import { FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "lucide-react";

const footerLinks = [
	{
		label: "Product",
		links: [
			{ title: "Features", href: "#" },
			{ title: "Pricing", href: "#" },
			{ title: "Testimonials", href: "#" },
			{ title: "Integration", href: "#" },
		],
	},
	{
		label: "Company",
		links: [
			{ title: "FAQs", href: "#" },
			{ title: "About Us", href: "#" },
			{ title: "Privacy Policy", href: "#" },
			{ title: "T&S", href: "#" },
		],
	},
	{
		label: "Resources",
		links: [
			{ title: "Blog", href: "#" },
			{ title: "Changelog", href: "#" },
			{ title: "Brand", href: "#" },
			{ title: "Help", href: "#" },
		],
	},
	{
		label: "Social Links",
		links: [
			{
				title: "Facebook",
				href: "#",
				icon: (
					<FacebookIcon />
				),
			},
			{
				title: "Instagram",
				href: "#",
				icon: (
					<InstagramIcon />
				),
			},
			{
				title: "Youtube",
				href: "#",
				icon: (
					<YoutubeIcon />
				),
			},
			{
				title: "LinkedIn",
				href: "#",
				icon: (
					<LinkedinIcon />
				),
			},
		],
	},
];

export function Footer() {
	return (
        <footer
            className={cn(
                "relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center rounded-t-4xl border-t px-6 md:rounded-t-6xl md:px-8",
                "dark:bg-[radial-gradient(35%_128px_at_50%_0%,--theme(--color-foreground/.1),transparent)]"
            )}>
            <div
                className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur" />
            <div className="grid w-full gap-8 py-6 md:py-8 lg:grid-cols-3 lg:gap-8">
				<AnimatedContainer className="space-y-6">
					<Logo className="h-12 md:h-20 w-auto" />
					<p className="mt-2 text-muted-foreground text-sm leading-relaxed max-w-[280px]">
						Leading the way in premium quality and excellence with VS Enterprises.
					</p>
				</AnimatedContainer>

				<div
                    className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-2 lg:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs">{section.label}</h3>
								<ul className="mt-4 space-y-2 text-muted-foreground text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
                                                className="inline-flex items-center duration-250 hover:text-foreground [&_svg]:me-1 [&_svg]:size-4"
                                                href={link.href}
                                                key={`${section.label}-${link.title}`}>
												{link.icon}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
            <div className="h-px w-full bg-linear-to-r via-border" />
            <div className="flex w-full items-center justify-center py-4">
				<p className="text-muted-foreground text-sm">
					&copy; {new Date().getFullYear()} VS Enterprises. All rights reserved.
				</p>
			</div>
        </footer>
    );
}

function AnimatedContainer({
    className,
    delay = 0.1,
    children
}) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
        <motion.div
            className={className}
            initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
            transition={{ delay, duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}>
            {children}
        </motion.div>
    );
}
