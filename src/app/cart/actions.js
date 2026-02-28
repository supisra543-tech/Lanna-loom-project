"use server";

import sql from "@/lib/db";
import { redirect } from "next/navigation";

export async function createOrder(customer, cart, totalPrice) {
  if (!cart || cart.length === 0) return { success: false, message: "ตะกร้าว่างเปล่า" };

  try {
    const orderId = await sql.begin(async (sql) => {
      // 1. Insert ลงตาราง Orders
      const [newOrder] = await sql`
        INSERT INTO "Orders" 
          (customer_name, customer_email, customer_phone, address, total_price, status)
        VALUES 
          (${customer.name}, ${customer.email}, ${customer.phone}, ${customer.address}, ${totalPrice}, 'pending')
        RETURNING id
      `;

      // 2. เตรียมข้อมูลสำหรับ OrderItems
      const itemsToInsert = cart.map(item => ({
        order_id: newOrder.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }));

      // 3. Bulk Insert ลง OrderItems
      await sql`INSERT INTO "OrderItems" ${sql(itemsToInsert)}`;

      return newOrder.id;
    });

    // ถ้าทำสำเร็จ ให้คืนค่า orderId
    return { success: true, orderId };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "ไม่สามารถบันทึกออเดอร์ได้" };
  }
}