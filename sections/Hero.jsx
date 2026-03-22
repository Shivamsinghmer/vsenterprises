import React from 'react'
import { Carousel } from "@/components/carousel"
import Link from "next/link"

const Hero = () => {
    const slides = [
        <div key="1" className="w-full aspect-4/3 md:aspect-[3/1] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center">
            <div className="text-center text-white space-y-4 px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">New Collection</p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Premium Electronics</h1>
                <p className="text-white/70 text-sm md:text-base max-w-sm mx-auto">Discover the latest in technology and innovation.</p>
                <Link href="/categories/electronics" className="inline-flex items-center gap-2 mt-2 bg-white text-slate-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">
                    Shop Now →
                </Link>
            </div>
        </div>,
        <div key="2" className="w-full aspect-4/3 md:aspect-[3/1] bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center">
            <div className="text-center text-white space-y-4 px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Best Sellers</p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Trending Now</h1>
                <p className="text-white/70 text-sm md:text-base max-w-sm mx-auto">Our most loved items, chosen by thousands of happy customers.</p>
                <Link href="/shop/best-sellers" className="inline-flex items-center gap-2 mt-2 bg-white text-indigo-700 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">
                    Explore →
                </Link>
            </div>
        </div>,
        <div key="3" className="w-full aspect-4/3 md:aspect-[3/1] bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center">
            <div className="text-center text-white space-y-4 px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Limited Time</p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Sale — Up to 50% Off</h1>
                <p className="text-white/70 text-sm md:text-base max-w-sm mx-auto">Unmissable deals on premium products. Quality meets affordability.</p>
                <Link href="/shop/sale" className="inline-flex items-center gap-2 mt-2 bg-white text-emerald-700 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">
                    View Deals →
                </Link>
            </div>
        </div>,
    ]

    return (
        <section className='w-full max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-8'>
            <Carousel
                slides={slides}
                options={{ loop: true }}
                showArrows={true}
                showDots={true}
                showPlay={false}
                autoplayDelay={4000}
                className="w-full"
            />
        </section>
    )
}

export default Hero