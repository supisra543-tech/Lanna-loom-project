import sql from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function JewelryPage() {
  const products = await sql`
    SELECT * FROM "Product"
    WHERE category = 'Jewelry'
    ORDER BY id ASC
  `;

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
  {products.map((item) => (
    <div
      key={item.id}
      className="bg-white border border-gray-100 p-6 flex flex-col h-full"
    >
      <a
        href={`/products/${item.id}`}
        className="relative overflow-hidden bg-[#F9F9F9] aspect-square mb-4"
      >
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </a>

      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-medium mb-1">
          {item.name}
        </h3>

        <p className="text-[12px] text-gray-400 uppercase tracking-wide mb-4">
          {item.category}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-semibold">
            ฿{Number(item.price).toLocaleString()}
          </span>

          <a
            href={`/products/${item.id}`}
            className="bg-black text-white px-4 py-2 text-[13px] uppercase tracking-wider hover:bg-zinc-800 transition-colors"
          >
            ดูรายละเอียด
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
    </main>
  );
}