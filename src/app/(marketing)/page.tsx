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
  serverGetBlogPostSummaries,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  // Only 2 DB connections — product count derived from products list
  const [products, posts] = await Promise.all([
    serverGetProducts(),
    serverGetBlogPostSummaries(),
  ]);

  const productCount = products.length;

  return (
    <>
      <HeroSection productCount={productCount} />
      <ValueProposition />
      <FeaturedProducts products={products} />
      <TrustStats productCount={productCount} />
      <MMTAMembership />
      <LatestNews posts={posts.slice(0, 3)} />
      <CTASection />
    </>
  );
}
