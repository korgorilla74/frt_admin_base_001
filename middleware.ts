// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


// ✅✅✅ NextAuth 제공 ✅✅✅ 
export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|login).*)"],
}  