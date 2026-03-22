import Image from "next/image";
import Hero from "@/sections/Hero";
import { ProductsSection } from "@/components/product-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqsSection } from "@/components/faqs";
import { BlogsSection } from "@/components/blogs-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductsSection 
        title="New Arrivals" 
        subtitle="Experience the latest in tech and style. Freshly added to our collection."
        filterType="newArrival"
      />
      <ProductsSection 
        title="Best Sellers" 
        subtitle="Our most loved items. Join the thousands of happy customers who chose these."
        filterType="bestSeller"
      />
      <ProductsSection 
        title="On Sale" 
        subtitle="Unmissable deals on premium products. Quality meets affordability."
        filterType="onSale"
      />
      <BlogsSection limit={3} showViewMore />
      <TestimonialsSection />
      <FaqsSection />
    </main>
  );
}
