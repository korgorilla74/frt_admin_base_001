import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  exp: number
  sub: string
  [key: string]: any
}
// ✅✅✅ NextAuth ✅✅✅
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // JWT 사용
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        // API 호출 전에 이메일과 비밀번호가 있는지 확인
        // credentials는 사용자가 입력한 값입니다.
        if (!credentials?.email || !credentials.password) return null

        try {
          // API 호출 : 사용자 인증을 위한 API 엔드포인트
          // 예시: 임시 사용자 인증 API 호출
          // 실제 API 엔드포인트와 요청 형식에 맞게 수정해야 합니다.
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/svc/auth/signin/temp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: credentials.email,
              password: credentials.password,
            }),
          })
          if (!res.ok) return null
          const result = await res.json()

          if (result.status !=='OK') return null
          // ✅ 여기서 result = { status: 'OK', message: 'success', data: { ... } }

          // 예시 응답 구조: { userName, userId, password, accessToken, refreshToken }
          const user = result.data
          // console.log("🚀 ---------[authOptions] user::", user)

          // 1️⃣ 사용자 ID 일치 여부 확인
          if (credentials.email !== user.username) {
            console.warn("❌ 사용자 ID 불일치 credentials.email:", credentials.email," user.userName:", user.username)            
            return null
          }

          const decoded = jwtDecode<DecodedToken>(user.accessToken)
          if (decoded.exp < Math.floor(Date.now() / 1000)) {
            console.log("❌ 토큰 만료됨 ::", decoded, " 현재 시간:", Math.floor(Date.now() / 1000))
            return null
          }

          return {
            id: user.username,
            name: user.username,
            email: user.username,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          }
        } catch (error) {
          console.error("❌ 로그인 오류:", error)
          return null
        }

        // 아래는 예시 코드로, 실제 인증 로직에 맞게 수정해야 합니다.
        // 예시: 이메일과 비밀번호가 일치하는 경우 사용자 객체 반환
        // if (
        //   credentials?.email === "admin@example.com" &&
        //   credentials.password === "admin1234"
        // ) {
        //   return {
        //     id: "1",
        //     name: "홍길동",
        //     email: "admin@example.com",
        //     role: "admin",
        //   }
        // }
        // return null
      },
    }),
  ],
  callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.name = user.name
          token.email = user.email
          token.accessToken = user.accessToken
          token.refreshToken = user.refreshToken
        }
        // console.log("🚀 ---------[authOptions] jwt::", token)
        return token
      },

      async session({ session, token }) {
        if (session.user) {
          session.user.name = token.name as string
          session.user.email = token.email as string
          ;(session as any).accessToken = token.accessToken
          ;(session as any).refreshToken = token.refreshToken
        }
        // console.log("🚀 ---------[authOptions] session::", session)
        return session
      },
    },

    pages: {  
      signIn: "/login",  // 로그인 UI
      // error: "/error",   // 로그인 실패 시
      signOut: "/login" // 로그아웃 UI (옵션)
    },
}
// console.log("-------[router] authOptions::",authOptions)

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }