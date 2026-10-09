import { fetchLandingProducts } from "@/lib/fetchProducts";
import HeroSection from "./sections/HeroSection";
import CustomerReviewsSection from "./sections/CustomerReviewsSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import SizeChartSection from "./sections/SizeChartSection";
import OrderFormSection from "./sections/OrderFormSection";
import FooterSection from "./sections/FooterSection";
import WhyDifferentSection from "./sections/WhyDifferentSection";
import StickyMobileBar from "@/components/StickyMobileBar";

export default async function Index() {
  const products = await fetchLandingProducts();

  return (
    <>
      <HeroSection products={products} />
      <WhyDifferentSection products={products} />
      <CustomerReviewsSection />
      <WhyChooseUsSection />
      <SizeChartSection products={products} />
      <OrderFormSection products={products} />
      <FooterSection />
      <StickyMobileBar products={products} />
    </>
  );
}
