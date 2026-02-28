import { neon } from '@neondatabase/serverless';
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const sql = neon(process.env.DATABASE_URL); // 👈 เพิ่มบรรทัดนี้

export default async function HomePage() {
  const featuredProducts = await sql`
    SELECT * FROM "Product" 
    WHERE is_featured = TRUE 
    LIMIT 4
  `;

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. ส่วนรูปตกแต่งร้าน (Main Visuals - 6 รูป) */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* แถวที่ 1 */}
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img src="/images/main7.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Collection 1" />
          </div>
          <div className="aspect-[4/5] bg-gray-200 overflow-hidden">
            <img src="/images/main5.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Collection 2" />
          </div>
          
          {/* แถวที่ 2 */}
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img src="/images/main1.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Collection 3" />
          </div>
          <div className="aspect-[4/5] bg-gray-200 overflow-hidden">
            <img src="/images/main2.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Collection 4" />
          </div>

          {/* แถวที่ 3 */}
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img src="/images/main4.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Collection 5" />
          </div>
          <div className="aspect-[4/5] bg-gray-200 overflow-hidden">
            <img src="/images/main6.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Collection 6" />
          </div>
        </div>
      </section>

      {/* 3. ส่วนสินค้าแนะนำ (Featured Products - 4 ชิ้น) */}
      {/* Recommended Products */}
<section className="w-full bg-[#f6f6f6] py-24">
  <div className="max-w-[1600px] mx-auto px-12">

    {/* Header */}
    <div className="flex justify-between items-center mb-16">
      <h2 className="text-2xl font-semibold tracking-tight">
        Recommended products
      </h2>

      <Link
        href="/products"
        className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition"
      >
        View All
      </Link>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {featuredProducts.map((product) => (
        <div
          key={product.id}
          className="group bg-white p-6 border border-gray-100 flex flex-col"
        >
          {/* Image */}
          <Link
            href={`/products/${product.id}`}
            className="relative aspect-square bg-[#F2F2F2] overflow-hidden mb-6"
          >
            {/* Label ตัวอย่าง */}
            {product.is_new && (
              <span className="absolute top-4 left-4 text-xs font-medium bg-white px-2 py-1">
                New
              </span>
            )}

            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </Link>

          {/* Info */}
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[15px] font-medium">
                {product.name}
              </h3>

             
            </div>

            <p className="text-xs text-gray-400 mb-4">
              {product.category}
            </p>

            <div className="mt-auto">
              <span className="text-base font-semibold">
                ฿{Number(product.price).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


    </main>
  );
}