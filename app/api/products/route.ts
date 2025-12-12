import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const response = await fetch("https://api.vercel.app/products")
  const products = await response.json()
  return Response.json(products)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  }