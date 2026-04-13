import { PageHeader } from "@/components/shared";
import { serverGetProducts, serverGetProductCategories } from "@/lib/data";
import { ProductsFilter } from "./ProductsFilter";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    serverGetProducts(),
    serverGetProductCategories(),
  ]);

  return (
    <>
      <PageHeader
        title="Our Products"
        subtitle="Premium quality ferro alloys and minor metals for steel, aluminum, and specialty industries worldwide."
        breadcrumbs={[{ label: "Products" }]}
      />

      <section className="section">
        <div className="container-custom">
          <ProductsFilter products={products} categories={categories} />
        </div>
      </section>
    </>
  );
}
