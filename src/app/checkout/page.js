"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { createOrder } from "../cart/actions"; 
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart, addToCart, decreaseQuantity } = useCart();
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("ไม่มีสินค้าในตะกร้าค่ะ");
      return;
    }

    const isAllFilled =
      form.email.trim() &&
      form.phone.trim() &&
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.address.trim();

    if (!isAllFilled) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่องก่อนดำเนินการต่อ");
      return;
    }

    setError("");

    if (!isConsentChecked) {
  setError("กรุณายืนยันการยินยอมให้ใช้ข้อมูลส่วนตัว");
  return;
}
    setIsPending(true);

    const customerData = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      address: form.address,
    };

    try {
      const result = await createOrder(customerData, cart, totalPrice);

      if (result.success) {
        clearCart();
        router.push(`/thank-you?orderId=${result.orderId}`);
      } else {
        alert(result.message || "เกิดข้อผิดพลาดในการสั่งซื้อ");
        setIsPending(false);
      }
    } catch (err) {
      alert("ไม่สามารถเชื่อมต่อฐานข้อมูลได้");
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="px-10 lg:px-24 py-20">
          <h2 className="text-[14px] font-medium tracking-[0.2em] uppercase mb-12">
            Information
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 text-[13px]">
            <Input name="email" placeholder="Email*" onChange={handleChange} />
            <Input name="phone" placeholder="Phone number*" onChange={handleChange} />
            <Input name="firstName" placeholder="First name*" onChange={handleChange} />
            <Input name="lastName" placeholder="Last name*" onChange={handleChange} />
            <Input name="address" placeholder="Address*" onChange={handleChange} />
          </div>
          

          <div className="mt-10 flex items-start gap-3 text-[12px]">
  <input
    type="checkbox"
    id="consent"
    checked={isConsentChecked}
    onChange={(e) => setIsConsentChecked(e.target.checked)}
    className="mt-1 w-4 h-4 accent-black cursor-pointer"
  />

  <label htmlFor="consent" className="leading-relaxed cursor-pointer">
    I consent to the store using my personal information to process my order.
  </label>
</div>

          <button
            onClick={handleCheckout}
            disabled={isPending || cart.length === 0}
            className="mt-16 w-full bg-black text-white py-5 text-[12px] tracking-widest uppercase hover:opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? "Processing..." : "Proceed to Delivery"}
          </button>

          {error && (
            <p className="mt-4 text-[#b91c1c] text-[12px] tracking-wide">
              {error}
            </p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#f5f5f5] px-12 lg:px-16 py-16 border-l border-gray-100 min-h-screen">
          <h3 className="text-[11px] font-medium tracking-[0.3em] uppercase mb-12 opacity-60">
            Order Summary ({cart.length})
          </h3>

          <div className="space-y-10">
            {cart.map((item) => (
  <div key={item.id} className="flex gap-4 pb-10 border-b border-gray-200">

    {/* IMAGE */}
    <div className="w-36 h-60 flex-shrink-0 bg-gray-100 overflow-hidden">
      <img
        src={item.image_url}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* RIGHT SIDE CONTENT */}
    <div className="flex-1 flex flex-col justify-between">

      {/* TOP ROW : NAME + PRICE */}
      <div className="flex justify-between items-start">
        <div>
          <p className="uppercase font-semibold tracking-wider text-[12px]">
            {item.name}
          </p>
          <p className="text-gray-400 text-[11px] mt-2">
            {item.category || "Jewelry"}
          </p>
        </div>

        <p className="font-semibold text-[13px] whitespace-nowrap">
          ฿{(item.price * item.quantity).toLocaleString()}
        </p>
      </div>

      {/* BOTTOM ROW : REMOVE + QTY */}
      <div className="flex justify-between items-center mt-6">

        <div className="flex items-center gap-6 text-[11px]">
          <button className="underline hover:opacity-60">
            Remove
          </button>
          <button className="hover:opacity-60">
            ♡
          </button>
        </div>

        <div className="flex items-center border border-gray-300">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="px-3 py-1 hover:bg-gray-100"
          >
            −
          </button>

          <span className="px-4 text-[12px]">
            {item.quantity}
          </span>

          <button
            onClick={() => addToCart(item)}
            className="px-3 py-1 hover:bg-gray-100"
          >
            +
          </button>
        </div>

      </div>
    </div>

  </div>
))}
          </div>

          {/* TOTAL */}
          <div className="border-t border-gray-200 mt-20 pt-10 flex justify-between items-baseline">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] opacity-80">
              Total
            </span>
            <span className="text-[20px] font-bold tracking-tighter">
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

function Input({ name, placeholder, onChange }) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="border-b border-gray-300 pb-2 focus:outline-none focus:border-black transition bg-transparent"
    />
  );
}