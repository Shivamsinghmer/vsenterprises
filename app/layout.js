import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PromoBanner, MobilePromoBanner } from "@/components/promo-banner";

export const metadata = {
  title: "VS Enterprises — Premium Quality Products",
  description: "Discover premium electronics, apparel, home decor and more at VS Enterprises. 1,50,000+ orders delivered. Free shipping on ₹499+.",
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <ClerkProvider>
          <CartProvider>
            <WishlistProvider>
              <PromoBanner />
              <MobilePromoBanner />
              <Header />
              {children}
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
