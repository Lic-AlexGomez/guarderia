import { cookies } from "next/headers"; // Importa cookies desde next/headers
import { NextResponse } from "next/server"; // Importa NextResponse

export async function GET() {
  const authCookie = (await cookies()).get("auth"); // Añade await aquí

  return NextResponse.json({
    authenticated: authCookie?.value === "authenticated",
  });
}
