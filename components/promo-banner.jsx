"use client";
import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Truck, FileText, ShoppingBag, PhoneCall, ShieldCheck } from "lucide-react";

const items = [
    { icon: <Truck className="size-3.5" />, text: "Free Shipping on ₹499+" },
    { icon: <FileText className="size-3.5" />, text: "GST Invoice Available" },
    { icon: <ShoppingBag className="size-3.5" />, text: "1,50,000+ Orders Delivered" },
    { icon: <PhoneCall className="size-3.5" />, text: "Toll Free: 1800 209 0998" },
    { icon: <ShieldCheck className="size-3.5" />, text: "100% Secure Payments" },
];

export function PromoBanner() {
    return (
        <div className="w-full bg-primary py-2 hidden md:block overflow-hidden">
            <InfiniteSlider duration={50} className="flex items-center gap-12">
                {[...items, ...items, ...items].map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 whitespace-nowrap text-[11px] font-medium tracking-wide text-primary-foreground/90"
                    >
                        <span className="text-primary-foreground/70">{item.icon}</span>
                        <span>{item.text}</span>
                        <span className="ml-8 h-3 w-px bg-primary-foreground/20" />
                    </div>
                ))}
            </InfiniteSlider>
        </div>
    );
}

export function MobilePromoBanner() {
    const items = [
        "Free Shipping on ₹499+",
        "GST Invoice Available",
        "1,50,000+ Orders",
        "Toll Free: 1800 209 0998",
        "100% Secure Payments",
    ];

    return (
        <div className="w-full bg-primary py-1.5 overflow-hidden md:hidden">
            <InfiniteSlider duration={25} className="flex items-center gap-10">
                {[...items, ...items].map((text, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 whitespace-nowrap text-[10px] font-medium tracking-wide text-primary-foreground/90"
                    >
                        <span className="size-1 rounded-full bg-primary-foreground/50" />
                        <span>{text}</span>
                    </div>
                ))}
            </InfiniteSlider>
        </div>
    );
}
