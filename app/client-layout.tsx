"use client"

import { useEffect, useState, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import LayoutContent from "@/components/layout-content"
import { SidebarProvider } from "@/context/sidebar-context"
import { useSession } from "next-auth/react"
import { jwtDecode } from "jwt-decode"
import { useMenuStore } from "@/store/menu-store"
import { flattenMenuItems } from "@/lib/menu-utils"
import NotFound from "@/components/custom-not-found"
import { fetchMenuData } from "@/lib/fetch-menu"

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const setMenuData = useMenuStore(state => state.setMenuData)
  const menuData = useMenuStore(state => state.menuData)
  const [loading, setLoading] = useState(true)

  const isPlainPage = ["/login", "/signup", "/error"].some(p => pathname.startsWith(p))

  // 🔐 JWT 유효성 검사
  useEffect(() => {
    if (session?.accessToken) {
      try {
        const decoded = jwtDecode<{ exp: number }>(session.accessToken)
        const now = Math.floor(Date.now() / 1000)
        if (decoded.exp < now) {
          console.warn("🔒 토큰 만료됨 → 로그아웃 처리")
          router.push("/login")
        }
      } catch (err) {
        console.error("JWT 디코딩 실패", err)
        router.push("/login")
      }
    }
  }, [session, router])

  // ⏳ 메뉴 데이터를 초기 로딩
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMenuData()
        setMenuData(data)
      } catch (err) {
        console.error("❌ 메뉴 데이터 로딩 실패", err)
      } finally {
        setLoading(false)
      }
    }

    if (!isPlainPage) {
      load()
    } else {
      setLoading(false) // 예외 페이지는 메뉴 불필요
    }
  }, [pathname, setMenuData, isPlainPage])

  // 🚫 유효하지 않은 경로 판별
  const isValidPath = (() => {
    if (loading || isPlainPage) return true
    const validPaths = flattenMenuItems(menuData).map(item => item.path)
    return validPaths.includes(pathname)
  })()

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-500">로딩 중...</div>
  }
  // 🧭 페이지 조건 처리
  if (isPlainPage) {
    return <>{children}</>
  }

  if (!isValidPath) {
    return <NotFound />
  }

  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  )
}
