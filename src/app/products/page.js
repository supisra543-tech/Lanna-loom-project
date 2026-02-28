import sql from "@/lib/db";
import Link from "next/link";
import Image from "next/image";


export default async function AllProductsPage({ searchParams }) {
  const params = await searchParams;

  const search = params?.search;
  const category = params?.category;

  const formatText = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);
  let products;

  if (search) {
    products = await sql`
      SELECT * FROM "Product"
      WHERE name ILIKE ${"%" + search + "%"}
         OR category ILIKE ${"%" + search + "%"}
      ORDER BY id ASC
    `;
  } else if (category) {
  products = await sql`
    SELECT * FROM "Product"
    WHERE TRIM(LOWER(category)) = TRIM(LOWER(${category}))
    ORDER BY id ASC
  `;
} else {
    products = await sql`
      SELECT * FROM "Product"
      ORDER BY id ASC
    `;
  }
  

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-8">

        <header className="mb-16">
  <div className=" py-12">
    <h1 className="text-3xl tracking-[0.3em] uppercase font-extralight text-black">
      {search
        ? formatText(search)
        : category
        ? formatText(category)
        : "All Products"}
    </h1>
  </div>
</header>

        {products.length === 0 && (
          <p className="text-gray-400 text-center py-20">
            ไม่พบสินค้าที่ค้นหา
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 p-6 flex flex-col h-full"
            >
              <Link
                href={`/products/${item.id}`}
                className="relative overflow-hidden bg-[#F9F9F9] aspect-square mb-4"
              >
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>

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

                  <Link
                    href={`/products/${item.id}`}
                    className="bg-black text-white px-4 py-2 text-[13px] uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}