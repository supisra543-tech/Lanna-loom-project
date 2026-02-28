"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-4">
        Thank You
      </h1>

      <p className="text-gray-600 mb-8">
        การสั่งซื้อของคุณเสร็จสมบูรณ์แล้วค่ะ
      </p>

      {orderId && (
        <p className="text-[13px] font-semibold mb-12">
          ORDER ID: #{orderId}
        </p>
      )}

      <Link
        href="/"
        className="border border-black px-12 py-4 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition"
      >
        Back to Shop
      </Link>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}