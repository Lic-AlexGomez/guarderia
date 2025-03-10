import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const authCookie = cookies().get("auth")

  return NextResponse.json({
    authenticated: authCookie?.value === "authenticated",
  })
}

