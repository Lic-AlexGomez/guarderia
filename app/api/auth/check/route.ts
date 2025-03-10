import { cookies } from "next/headers"; // Importa cookies
import { NextResponse } from "next/server"; // Importa NextResponse

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === "admin" && password === "admin123") {
    // Corregir el uso de cookies() con await
    (await cookies()).set("auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
}