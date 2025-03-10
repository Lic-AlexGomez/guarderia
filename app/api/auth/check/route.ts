import { cookies } from "next/headers"; // Importa cookies
import { NextResponse } from "next/server"; // Importa NextResponse

export async function POST(request: Request) {
  // Extraer datos del cuerpo de la solicitud
  const { username, password } = await request.json();

  // Validar las credenciales (esto es un ejemplo simple)
  if (username === "admin" && password === "admin123") {
    // Establecer la cookie después de await
    (await cookies()).set("auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    // Devolver respuesta exitosa
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } else {
    // Devolver error si las credenciales son incorrectas
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
