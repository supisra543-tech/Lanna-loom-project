 "use client";
import "./globals.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { CartProvider, useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";



function Navigation() {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef(null);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isCheckoutPage = pathname?.startsWith("/checkout"); 
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const router = useRouter();
const [keyword, setKeyword] = useState("");

const handleSearch = (e) => {
  e.preventDefault();
  if (!keyword.trim()) return;

  router.push(`/products?search=${keyword}`);
};

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY.current) {
      setShowHeader(true);
    } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
      setShowHeader(false);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
  const fetchSuggestions = async () => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(`/api/search?q=${search}`);
    const data = await res.json();
    setSuggestions(data);
  };
  
  const timeout = setTimeout(fetchSuggestions, 300);
  return () => clearTimeout(timeout);
}, [search]);
  // 1. ต้องวาง useEffect ไว้ตรงนี้ (ก่อนหน้า return ใดๆ) ✅
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isDrawerOpen]);

  useEffect(() => {
  function handleClickOutside(event) {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
      setKeyword(""); // ล้างค่า
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  // 2. เช็คเงื่อนไขหน้า Checkout ตรงนี้ ✅
  if (isCheckoutPage) {
    return (
      <nav className="bg-white border-b border-gray-100 py-8 px-10 relative z-[100]">
        <div className="container mx-auto flex justify-between items-center font-light uppercase tracking-widest text-[11px]">
          <Link href="/checkout" className="text-black">Checkout</Link>
          <Link href="/" className="text-3xl font-bold tracking-[0.4em] text-black">LANNA LOOM</Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-400 text-black">Back to Shop</Link>
            
          </div>
        </div>
      </nav>
    );
  }

  // 3. แสดงผลหน้าปกติ (Home, Products ฯลฯ)
  return (
    <>
      {/* Navbar หน้าหลักของหนู */}
      <header
  className={`fixed top-0 left-0 w-full transition-transform duration-300 z-[100000] ${
    showHeader ? "translate-y-0" : "-translate-y-full"
  } bg-white shadow-sm`}
>
  <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6 ">
    
    {/* LEFT MENU */}
    <nav className="flex gap-6 text-xs tracking-widest font-light">
      <a href="/products" className="hover:opacity-60">All Products</a>
      <a href="/products?category=Jewelry" className="hover:opacity-60">Jewelry</a>
      <a href="/products?category=Appliance" className="hover:opacity-60">Appliance</a>
      <a href="/products?category=Decoration" className="hover:opacity-60">Decoration</a>
    </nav>

    {/* CENTER LOGO */}
        <div className="w-1/3 text-center">
        <Link href="/">
      <h1 className="text-3xl font-bold tracking-[0.4em] text-black">
         LANNA LOOM
      </h1>
      </Link>
    </div>

     {/* Search Icon */}
      <div className="relative">
  <button
    onClick={() => setIsSearchOpen(!isSearchOpen)}
    className="hover:opacity-70 transition"
  >
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {isSearchOpen && (
  <div
  ref={searchRef}
  className="absolute left-1/2 -translate-x-1/2 top-full mt-6 bg-white shadow-xl p-6 rounded-2xl z-50"
>
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border px-5 py-3 rounded-full w-80 outline-none"
      />
    </form>

  </div>
  )}
</div>

    {/* RIGHT BAG */}
    <div className="relative">
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest"
      >
        BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)})
      </button>
    </div>

  </div>
</header>

      {/* ================= SIDE DRAWER SYSTEM (คงเดิมตามโค้ดหนู) ================= */}
      {isDrawerOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', justifyContent: 'flex-end' }}>
          <div 
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsDrawerOpen(false)} 
          />
          <div className="animate-slide-right" style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '100%', backgroundColor: '#ffffff', boxShadow: '-10px 0 50px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', zIndex: 100000 }}>
             <style>{`
               @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
               .animate-slide-right { animation: slideIn 0.3s ease-out forwards; }
             `}</style>
             {/* ... ส่วนหัวและรายการสินค้าในตะกร้าตามโค้ดเดิมของหนู ... */}
             <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#000', margin: 0, letterSpacing: '2px' }}>YOUR BAG ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
                <button onClick={() => setIsDrawerOpen(false)} style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', borderBottom: '2px solid #000', cursor: 'pointer' }}>CLOSE</button>
             </div>
             <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '24px 0', borderBottom: '1px solid #f9f9f9' }}>
                    <div style={{ width: '80px', height: '100px', flexShrink: 0, backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                      <img src={item.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', margin: '0 0 4px 0', textTransform: 'uppercase' }}>{item.name}</h3>
                        <p style={{ fontSize: '10px', color: '#888', margin: 0 }}>{item.category}</p>
                        <p style={{ fontSize: '13px', fontWeight: '900', color: '#000', marginTop: '8px' }}>฿{Number(item.price).toLocaleString()}</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={() => removeFromCart(item.id)} style={{ fontSize: '10px', color: '#888', textDecoration: 'underline', cursor: 'pointer' }}>Remove</button>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd' }}>
                          <button onClick={() => decreaseQuantity(item.id)} style={{ padding: '2px 8px', color: '#000' }}>-</button>
                          <span style={{ padding: '0 8px', fontSize: '12px', color: '#000', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => addToCart(item)} style={{ padding: '2px 8px', color: '#000' }}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             <div style={{ padding: '32px', borderTop: '2px solid #f5f5f5', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>TOTAL</span>
                  <span style={{ fontSize: '18px', fontWeight: '900', color: '#000' }}>฿{totalPrice.toLocaleString()}</span>
                </div>
                <Link href="/checkout" onClick={() => setIsDrawerOpen(false)} style={{ display: 'block', width: '100%', backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '16px 0', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '2px' }}>CHECKOUT NOW</Link>
             </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">

        <CartProvider>
          <div className="flex flex-col min-h-screen">

            <Navigation />

            <main className="flex-1 w-full overflow-x-hidden">
              {children}
            </main>

            <Footer />

          </div>
        </CartProvider>

      </body>
    </html>
  );
}