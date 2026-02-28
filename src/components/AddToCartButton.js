"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className="flex-1 bg-black text-white py-4 text-[11px] font-light uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all duration-300"
       >
      {added ? "Added ✓" : "Add to Bag"}
    </button>
  );
}