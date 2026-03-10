import React from 'react'
import { Carousel } from "@/components/carousel"

const Hero = () => {
    const slides = [
        <div key="1" className="w-full aspect-4/3 md:aspect-[3/1] bg-black rounded-3xl" />,
        <div key="2" className="w-full aspect-4/3 md:aspect-[3/1] bg-black rounded-3xl" />,
        <div key="3" className="w-full aspect-4/3 md:aspect-[3/1] bg-black rounded-3xl" />,
    ]

    return (
        <section className='w-full max-w-7xl mx-auto py-10 px-4 md:px-8'>
            <Carousel
                slides={slides}
                options={{ loop: true }}
                showArrows={false}
                showDots={true}
                showPlay={false}
                autoplayDelay={3500}
                className="w-full"
            />
        </section>
    )
}

export default Hero