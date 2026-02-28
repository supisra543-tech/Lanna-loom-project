import sql from "@/lib/db";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const productId = Number(id);

  // ✅ เช็คให้แน่นอนว่าเป็นตัวเลข
  if (Number.isNaN(productId)) return notFound();

  // 🔹 ดึงสินค้าหลัก
  const [product] = await sql`
    SELECT * FROM "Product"
    WHERE id = ${productId}
  `;

  if (!product) return notFound();

  // 🔹 ดึงสินค้าแนะนำ
  const recommendedProducts = await sql`
    SELECT * FROM "Product"
    WHERE id != ${productId}
    AND category = ${product.category}
    ORDER BY id DESC
    LIMIT 4
  `;

  return (
    <main className="min-h-screen bg-white relative z-50 pt-10 pb-20 text-[#1a1a1a]">
      <div className="container mx-auto max-w-[1300px] px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          <div className="w-full lg:flex-1 lg:sticky lg:top-32">
            <div className="bg-[#f7f7f7] aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain mix-blend-multiply"
              />
            </div>
          </div>

          <div className="w-full lg:w-[480px] flex flex-col space-y-6 lg:py-10">
            <div className="flex justify-between items-baseline mb-4">
              <h1 className="text-[28px] font-light tracking-[0.15em] uppercase">
                {product.name}
              </h1>

              <span className="text-[20px] font-light tracking-wide">
                ฿{Number(product.price).toLocaleString()}
              </span>
            </div>

            <p className="text-[12px] text-gray-500 mb-8 uppercase tracking-widest">
              {product.category} | Premium Quality
            </p>

            <div className="flex gap-2 mb-4">
              <AddToCartButton product={product} />
              
            </div>

            <p className="text-[10px] text-gray-400 mb-12 uppercase tracking-widest text-center">
              Free Shipping on all orders above ฿2,500
            </p>

            <div className="border-t border-gray-200 pt-10">
              <span className="text-[11px] tracking-[0.3em] uppercase text-black">
                Description
              </span>

              <div className="text-[14px] leading-[1.9] text-zinc-600 font-light space-y-6 mt-6">
                {product.details && <p>{product.details}</p>}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-2xl font-semibold mb-12">
            สินค้าแนะนำ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {recommendedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}