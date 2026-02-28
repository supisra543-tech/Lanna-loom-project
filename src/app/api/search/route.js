import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const results = await sql`
    SELECT id, name FROM "Product"
    WHERE name ILIKE ${"%" + query + "%"}
    ORDER BY id DESC
    LIMIT 5
  `;

  return NextResponse.json(results);
}