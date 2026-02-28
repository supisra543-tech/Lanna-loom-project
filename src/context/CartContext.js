"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // โหลดจาก localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("my-shop-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // บันทึกทุกครั้งที่ cart เปลี่ยน
  useEffect(() => {
    localStorage.setItem("my-shop-cart", JSON.stringify(cart));
  }, [cart]);

  // เพิ่มสินค้า
  const addToCart = (product) => {
    if (!product?.id) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ลดจำนวน
  const decreaseQuantity = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);

      if (existing?.quantity > 1) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return prev.filter((item) => item.id !== productId);
    });
  };

  // ลบออกทั้งหมด
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // ล้างตะกร้า
  const clearCart = () => {
    setCart([]);
  };

  // 🆕 เพิ่มยอดรวม (แนะนำมาก)
  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  // 🆕 จำนวนสินค้ารวม (โชว์ badge ได้)
  const cartCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);