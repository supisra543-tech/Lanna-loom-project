import sql from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function DecorationPage() {
  const products = await sql`SELECT * FROM "Product" WHERE category = 'Decoration' ORDER BY id ASC`;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">ของตกแต่ง</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </main>
  );
}