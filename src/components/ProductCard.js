"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-100 flex flex-col h-full">
      
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative overflow-hidden bg-[#F9F9F9] aspect-square"
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-base font-medium text-black mb-1">
          {product.name}
        </h2>

        <p className="text-[12px] text-gray-400 uppercase tracking-wide mb-4">
          {product.category}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-base font-semibold text-black">
            ฿{Number(product.price).toLocaleString()}
          </span>

          <Link
            href={`/products/${product.id}`}
            className="bg-black text-white px-4 py-2 text-[12px] uppercase tracking-wider hover:bg-zinc-800 transition-colors"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  );
}