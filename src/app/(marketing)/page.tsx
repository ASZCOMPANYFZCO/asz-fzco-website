import {
  HeroSection,
  ValueProposition,
  FeaturedProducts,
  TrustStats,
  LatestNews,
  CTASection,
  MMTAMembership,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueProposition />
      <FeaturedProducts />
      <TrustStats />
      <MMTAMembership />
      <LatestNews />
      <CTASection />
    </>
  );
}
