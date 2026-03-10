"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Truck, FileText, ShoppingBag, PhoneCall, CheckCircle2 } from "lucide-react";

export function PromoBanner() {
    const items = [
        { icon: <Truck className="size-3" />, text: "Free Shipping on ₹499+" },
        { icon: <FileText className="size-3" />, text: "GST Invoice Available" },
        { icon: <ShoppingBag className="size-3" />, text: "1,50,000+ Orders Delivered" },
        { icon: <PhoneCall className="size-3" />, text: "Toll Free: 1800 209 0998" },
    ];

    return (
        <div className="w-full bg-primary text-white py-2 relative overflow-hidden hidden md:block">
            {/* Background Decorative Gradient - Lower Z-Index */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-primary pointer-events-none z-10" />
            
            <InfiniteSlider duration={40} className="flex items-center gap-12 relative z-20">
                {[...items, ...items, ...items].map((item, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-2 whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-white"
                    >
                        <CheckCircle2 className="size-3 text-white fill-white" />
                        <span className="text-white">{item.text}</span>
                        <div className="ml-10 size-1 rounded-full bg-white" />
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
        "Toll Free: 1800 209 0998"
    ];

    return (
        <div className="w-full bg-primary text-white py-1.5 overflow-hidden bg-primary/95 backdrop-blur-sm md:hidden">
             <InfiniteSlider duration={20} className="flex items-center gap-8">
                {items.map((text, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-2 whitespace-nowrap text-[9px] font-black uppercase tracking-widest"
                    >
                        <CheckCircle2 className="size-2.5 text-white fill-white" />
                        <span>{text}</span>
                    </div>
                ))}
            </InfiniteSlider>
        </div>
    );
}
