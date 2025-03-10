import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  // Simple authentication check
  if (username === "admin" && password === "admin123") {
    // Set a cookie to maintain the session
    cookies().set("auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
}

export async function DELETE() {
  // Clear the auth cookie
  cookies().delete("auth")
  return NextResponse.json({ success: true })
}

