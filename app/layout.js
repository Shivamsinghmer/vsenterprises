import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PromoBanner, MobilePromoBanner } from "@/components/promo-banner";

export const metadata = {
  title: "VSEnterprises",
  description: "Shop the best products at VSEnterprises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PromoBanner />
        <MobilePromoBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
