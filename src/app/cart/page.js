"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { createOrder } from "./actions";

export default function CartPage() {
  // ดึงฟังก์ชันมาให้ครบตามที่ระบุใน Context
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart(); 
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    const result = await createOrder(customer, cart, totalPrice);
    
    if (result.success) {
      alert(`สั่งซื้อสำเร็จ! เลขที่ใบสั่งซื้อคือ: ${result.orderId}`);
      clearCart();
      window.location.href = "/";
    } else {
      alert("เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่ค่ะ");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl font-light text-gray-400 uppercase tracking-widest">Bag is empty</h1>
        <a href="/products" className="mt-4 underline text-sm">Continue shopping</a>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-10 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* ฝั่งซ้าย: รายการสินค้า */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mb-8 border-b pb-4 uppercase tracking-tight">
            Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h1>
          {/* ส่วนการแสดงรายการสินค้าในหน้าตะกร้า */}
<div className="divide-y divide-gray-100">
  {cart.map((item) => (
    <div key={item.id} className="py-8 flex flex-col sm:flex-row gap-8 items-start">
      
      {/* 1. จำกัดขนาดรูปภาพให้แน่นอน ไม่ให้ใหญ่เกินไป ✅ */}
      <div className="w-full sm:w-32 h-40 flex-shrink-0">
        <img 
          src={item.image_url} 
          alt={item.name} 
          className="w-full h-full object-cover bg-gray-50 rounded-sm" 
        />
      </div>

      {/* 2. ส่วนข้อมูลสินค้าและปุ่มควบคุม ✅ */}
      <div className="flex-1 flex flex-col justify-between h-40 w-full">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium uppercase tracking-tight text-gray-900">{item.name}</h3>
            <p className="text-sm font-medium">฿{Number(item.price).toLocaleString()}</p>
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{item.category}</p>
        </div>
        
        {/* 3. จัดกลุ่มปุ่ม Remove และปุ่มปรับจำนวนให้อยู่บรรทัดเดียวกัน ✅ */}
        <div className="flex justify-between items-center mt-auto">
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black underline underline-offset-4"
          >
            Remove
          </button>

          <div className="flex items-center border border-gray-200">
            <button 
              onClick={() => decreaseQuantity(item.id)}
              className="px-3 py-1 hover:bg-gray-100 text-gray-400 transition"
            >
              -
            </button>
            <span className="px-4 py-1 text-xs border-x border-gray-200 min-w-[30px] text-center">
              {item.quantity}
            </span>
            <button 
              onClick={() => addToCart(item)} 
              className="px-3 py-1 hover:bg-gray-100 text-gray-400 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>

        {/* ฝั่งขวา: สรุปยอดและฟอร์ม */}
        <div className="w-full lg:w-96 space-y-10">
          <div className="pt-6 space-y-4">
            <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-xl font-medium border-t border-gray-900 pt-6">
              <span>Total:</span>
              <span>฿{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <input 
              placeholder="Full Name" required className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition text-sm"
              onChange={(e) => setCustomer({...customer, name: e.target.value})}
            />
            <input 
              type="email" placeholder="Email Address" required className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition text-sm"
              onChange={(e) => setCustomer({...customer, email: e.target.value})}
            />
            {/* 4. เพิ่มช่องเบอร์โทรศัพท์ที่หายไป ✅ */}
            <input 
              type="tel" placeholder="Phone Number" required className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition text-sm"
              onChange={(e) => setCustomer({...customer, phone: e.target.value})}
            />
            <textarea 
              placeholder="Delivery Address" required className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition text-sm"
              rows="2"
              onChange={(e) => setCustomer({...customer, address: e.target.value})}
            ></textarea>
            
            <button 
              type="submit"
              className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all mt-8"
            >
              Go to Checkout
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}