import React from 'react'
import { Carousel } from "@/components/carousel"
import Link from "next/link"

const Hero = () => {
    const slides = [
        <div key="slide1" className="relative w-full aspect-[3/4] sm:aspect-video lg:aspect-[21/9] max-h-[calc(100vh-140px)] flex items-center justify-center bg-[#f3f4f6] rounded-xl overflow-hidden">
            {/* Desktop Image */}
            <img
                src="/carouselimg1.jpg"
                alt="Slide 1"
                className="absolute inset-0 w-full h-full object-contain hidden md:block"
            />
            {/* Mobile Image */}
            <img
                src="/carouselimg1mobile.jpg"
                alt="Slide 1 Mobile"
                className="absolute inset-0 w-full h-full object-contain block md:hidden"
            />
        </div>,
        <div key="slide2" className="relative w-full aspect-[3/4] sm:aspect-video lg:aspect-[21/9] max-h-[calc(100vh-140px)] flex items-center justify-center bg-[#f3f4f6] rounded-xl overflow-hidden">
            {/* Desktop Image */}
            <img
                src="/carouselimg2.jpg"
                alt="Slide 2"
                className="absolute inset-0 w-full h-full object-contain hidden md:block"
            />
            {/* Mobile Image */}
            <img
                src="/carouselimg2mobile.jpg"
                alt="Slide 2 Mobile"
                className="absolute inset-0 w-full h-full object-contain block md:hidden"
            />
        </div>,
        <div key="slide3" className="relative w-full aspect-[3/4] sm:aspect-video lg:aspect-[21/9] max-h-[calc(100vh-140px)] flex items-center justify-center bg-[#f3f4f6] rounded-xl overflow-hidden">
            {/* Desktop Image */}
            <img
                src="/carouselimg3.jpg"
                alt="Slide 3"
                className="absolute inset-0 w-full h-full object-contain hidden md:block"
            />
            {/* Mobile Image */}
            <img
                src="/carouselimg3mobile.jpg"
                alt="Slide 3 Mobile"
                className="absolute inset-0 w-full h-full object-contain block md:hidden"
            />
        </div>
    ]

    return (
        <section className='w-full max-w-7xl mx-auto py-4 md:py-6 px-4 md:px-8 relative bg-white'>
            <Carousel
                slides={slides}
                options={{ loop: true }}
                showArrows={true}
                showDots={true}
                showPlay={false}
                autoplayDelay={5000}
                className="w-full"
            />
        </section>
    )
}

export default Hero