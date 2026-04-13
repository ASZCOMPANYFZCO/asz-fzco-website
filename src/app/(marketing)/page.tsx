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
  serverGetProductCategories,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, posts, categories] = await Promise.all([
    serverGetProducts(),
    serverGetBlogPostSummaries(),
    serverGetProductCategories(),
  ]);

  const productCount = products.length;

  return (
    <>
      <HeroSection productCount={productCount} />
      <ValueProposition />
      <FeaturedProducts products={products} categories={categories} />
      <TrustStats productCount={productCount} />
      <MMTAMembership />
      <LatestNews posts={posts.slice(0, 3)} />
      <CTASection />
    </>
  );
}
