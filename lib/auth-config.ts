import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  exp: number
  sub: string
  [key: string]: unknown
}

interface CustomUser {
  id: string
  name: string
  email: string
  accessToken: string
  refreshToken: string
}

interface CustomSession {
  user: {
    name?: string | null
    email?: string | null
  }
  accessToken?: string
  refreshToken?: string
}

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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/svc/auth/signin/temp`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: credentials.email,
                password: credentials.password,
              }),
            }
          )
          if (!res.ok) return null
          const result = await res.json()

          if (result.status !== "OK") return null
          // ✅ 여기서 result = { status: 'OK', message: 'success', data: { ... } }

          // 예시 응답 구조: { userName, userId, password, accessToken, refreshToken }
          const user = result.data

          // 1️⃣ 사용자 ID 일치 여부 확인
          if (credentials.email !== user.username) {
            console.warn(
              "❌ 사용자 ID 불일치 credentials.email:",
              credentials.email,
              " user.userName:",
              user.username
            )
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
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser
        token.name = customUser.name
        token.email = customUser.email
        token.accessToken = customUser.accessToken
        token.refreshToken = customUser.refreshToken
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        const customSession = session as CustomSession
        customSession.user.name = token.name as string
        customSession.user.email = token.email as string
        customSession.accessToken = token.accessToken as string
        customSession.refreshToken = token.refreshToken as string
      }
      return session
    },
  },

  pages: {
    signIn: "/login", // 로그인 UI
    signOut: "/login", // 로그아웃 UI (옵션)
  },
}
