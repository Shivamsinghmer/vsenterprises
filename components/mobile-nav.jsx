import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon, Search } from "lucide-react";
import Link from "next/link";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
        <div className="md:hidden">
            <Button
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label="Toggle menu"
                className="md:hidden"
                onClick={() => setOpen(!open)}
                size="icon"
                variant="outline">
				{open ? (
					<XIcon className="size-4.5" />
				) : (
					<MenuIcon className="size-4.5" />
				)}
			</Button>
            {open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop />
					<div
                        className={cn(
                            "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
                            "size-full p-4 overflow-y-auto"
                        )}
                        data-slot={open ? "open" : "closed"}>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
                                <React.Fragment key={link.label}>
                                    <Button asChild className="justify-start" variant="ghost">
                                        <Link href={link.href}>{link.label}</Link>
                                    </Button>
                                    {link.subLinks && link.subLinks.map(sub => (
                                        <Button asChild className="justify-start pl-8 text-muted-foreground" key={sub.label} variant="ghost" size="sm">
                                            <Link href={sub.href}>{sub.label}</Link>
                                        </Button>
                                    ))}
                                </React.Fragment>
							))}
						</div>
						<div className="mt-8 flex flex-col gap-2">
							<div className="relative flex items-center">
								<Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<input
									type="search"
									placeholder="Search products..."
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
							</div>
						</div>
					</div>
				</Portal>
			)}
        </div>
    );
}
