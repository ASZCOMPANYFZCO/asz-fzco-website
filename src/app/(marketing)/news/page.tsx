import { PageHeader } from "@/components/shared";
import { serverGetBlogPosts } from "@/lib/data";
import { NewsFilter } from "./NewsFilter";

export default async function NewsPage() {
  const posts = await serverGetBlogPosts();

  return (
    <>
      <PageHeader
        title="News & Insights"
        subtitle="Stay updated with the latest market trends, industry news, and company updates from ASZ Company."
        breadcrumbs={[{ label: "News" }]}
      />

      <section className="section">
        <div className="container-custom">
          <NewsFilter posts={posts} />
        </div>
      </section>
    </>
  );
}
