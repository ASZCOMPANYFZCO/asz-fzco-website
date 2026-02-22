import {
  HeroSection,
  ValueProposition,
  FeaturedProducts,
  TrustStats,
  LatestNews,
  CTASection,
  MMTAMembership,
} from "@/components/home";
import {
  serverGetProducts,
  serverGetProductCount,
  serverGetBlogPosts,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  // Fetch all data in parallel on the server — no loading spinners!
  const [products, productCount, posts] = await Promise.all([
    serverGetProducts(),
    serverGetProductCount(),
    serverGetBlogPosts(),
  ]);

  return (
    <>
      <HeroSection productCount={productCount} />
      <ValueProposition />
      <FeaturedProducts products={products} />
      <TrustStats />
      <MMTAMembership />
      <LatestNews posts={posts.slice(0, 3)} />
      <CTASection />
    </>
  );
}
