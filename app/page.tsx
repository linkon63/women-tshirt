import HeroSection from "@/fashion4/sections/HeroSection";
import CustomerReviewsSection from "@/fashion4/sections/CustomerReviewsSection";
import WhyChooseUsSection from "@/fashion4/sections/WhyChooseUsSection";
import SizeChartSection from "@/fashion4/sections/SizeChartSection";
import OrderFormSection from "@/fashion4/sections/OrderFormSection";
import FooterSection from "@/fashion4/sections/FooterSection";
import WhyDifferentSection from "@/fashion4/sections/WhyDifferentSection";
import StickyMobileBar from "@/components/StickyMobileBar";
import { fetchLandingProducts } from "@/lib/fetchProducts";

export default async function Home() {
  const products = await fetchLandingProducts();

  return (
    <main className="min-h-screen bg-white">
      <HeroSection products={products} />
      <WhyDifferentSection products={products} />
      <CustomerReviewsSection />
      <WhyChooseUsSection />
      <SizeChartSection products={products} />
      <OrderFormSection products={products} />
      <FooterSection />
      <StickyMobileBar products={products} />
    </main>
  );
}
