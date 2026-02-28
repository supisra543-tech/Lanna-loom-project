import sql from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function AppliancePage() {
  const products = await sql`
    SELECT * FROM "Product"
    WHERE category = 'Appliance'
    ORDER BY id ASC
  `;

  
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-8">

        {/* Header */}
        <header className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-2xl font-semibold text-black">
            ของเครื่องใช้ ({products.length} รายการ)
          </h1>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

      </div>
    </main>
  );
}