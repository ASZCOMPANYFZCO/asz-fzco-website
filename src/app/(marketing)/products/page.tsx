import { PageHeader } from "@/components/shared";
import { serverGetProducts } from "@/lib/data";
import { ProductsFilter } from "./ProductsFilter";

export const revalidate = 60; // Cache page for 60s

export default async function ProductsPage() {
  const products = await serverGetProducts();

  return (
    <>
      <PageHeader
        title="Our Products"
        subtitle="Premium quality ferro alloys and minor metals for steel, aluminum, and specialty industries worldwide."
        breadcrumbs={[{ label: "Products" }]}
      />

      <section className="section">
        <div className="container-custom">
          <ProductsFilter products={products} />
        </div>
      </section>
    </>
  );
}
