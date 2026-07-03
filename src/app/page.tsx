import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import VerifiedSuppliers from "@/components/sections/VerifiedSuppliers";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Services from "@/components/sections/Services";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import MobileApp from "@/components/sections/MobileApp";
import LatestNews from "@/components/sections/LatestNews";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <VerifiedSuppliers />
        <WhyChooseUs />
        <Services />
        <Statistics />
        <Testimonials />
        <MobileApp />
        <LatestNews />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
