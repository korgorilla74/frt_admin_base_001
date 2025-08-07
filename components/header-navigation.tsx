"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
// import { getBreadcrumbs, getTitleForPath } from "@/lib/menu-paths"
import { Button } from "@/components/ui/button"
import { X, Menu, ChevronLeft, UserCircle, Trash2 } from "lucide-react" // Trash2 아이콘 임포트
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebarExpansion } from "@/context/sidebar-context"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

import { getTitleForPath, getBreadcrumbs } from "@/lib/menu-utils"
import { useMenuStore } from "@/store/menu-store"
import { flattenMenuItems } from "@/lib/menu-utils"

interface RecentView {
  path: string
  title: string
}

const MAX_RECENT_VIEWS = 20 // 최대 노출 갯수를 20개로 설정

const RECENT_VIEWS_STORAGE_KEY = "recentViews"

export default function HeaderNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [recentViews, setRecentViews] = useState<RecentView[]>([])
  const { isSidebarExpanded, toggleSidebarExpansion } = useSidebarExpansion()

  const menuData = useMenuStore(state => state.menuData)
  // const breadcrumbs = getBreadcrumbs(pathname, menuData)

  // ✅ menuData 기준 유효 경로 검사
  const isValidPath = (() => {
    if (menuData.length === 0) return true // 로딩 전이라면 검증 생략
    const validPaths = flattenMenuItems(menuData).map(item => item.path)
    return validPaths.includes(pathname)
  })()
  const breadcrumbs = isValidPath ? getBreadcrumbs(pathname, menuData) : []
  // const title = getTitleForPath(pathname, menuData)

  // const title = isValidPath ? getTitleForPath(pathname, menuData) : "알 수 없는 경로"
  const title = isValidPath ? (getTitleForPath(pathname, menuData) ?? "알 수 없는 경로") : ""

  // Dummy user data for demonstration
  const currentUser = {
    name: "홍길동",
    email: "hong.gildong@example.com",
    avatarUrl: "", // 테스트를 위해 빈 문자열로 설정하여 fallback이 보이도록 함
    initials: "홍",
  }

  // Load recent views from localStorage on initial mount
  useEffect(() => {
    const storedViews = localStorage.getItem(RECENT_VIEWS_STORAGE_KEY)
    if (storedViews) {
      setRecentViews(JSON.parse(storedViews))
    }
  }, [])
  const handleRecentViewClick = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router]
  )

  // Update recent views when pathname changes
  useEffect(() => {
    if (!isValidPath) return

    const currentTitle = getTitleForPath(pathname, menuData)
    if (!currentTitle) return // ❌ title이 null/undefined/빈 문자열이면 추가 안 함

    const currentView: RecentView = { path: pathname, title: currentTitle }

    setRecentViews(prevViews => {
      const filtered = prevViews.filter(view => view.path !== currentView.path)
      const newViews = [currentView, ...filtered].slice(0, MAX_RECENT_VIEWS)

      localStorage.setItem(RECENT_VIEWS_STORAGE_KEY, JSON.stringify(newViews))
      return newViews
    })
  }, [pathname, isValidPath, menuData])

  const handleRemoveRecentView = useCallback((pathToRemove: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent triggering parent onClick (navigation)
    setRecentViews(prevViews => {
      const updatedViews = prevViews.filter(view => view.path !== pathToRemove)
      localStorage.setItem(RECENT_VIEWS_STORAGE_KEY, JSON.stringify(updatedViews))
      return updatedViews
    })
  }, [])

  // 새로운 함수: 모든 최근 열어본 화면 삭제
  const handleClearRecentViews = useCallback(() => {
    setRecentViews([])
    localStorage.removeItem(RECENT_VIEWS_STORAGE_KEY)
  }, [])

  //
  const handleLogout = useCallback(() => {
    signOut({
      callbackUrl: "/login", // 로그아웃 후 이동할 경로
    })
  }, [])

  // const breadcrumbs = getBreadcrumbs(pathname)

  // const breadcrumbs = getBreadcrumbs(pathname, menuData)
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 flex flex-col w-full max-w-full overflow-x-hidden">
      {/* 1. 현재 메뉴 경로 (Breadcrumbs) 및 사용자 정보 */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-base text-gray-600">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSidebarExpansion}
            className="border-r border-gray-200 pr-3 mr-3 bg-transparent"
          >
            {isSidebarExpanded ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{isSidebarExpanded ? "메뉴 접기" : "메뉴 펼치기"}</span>
          </Button>
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.title}-${index}`} className="flex items-center">
              <span
                className={
                  index < breadcrumbs.length - 1 ? "text-gray-600" : "font-semibold text-gray-800"
                }
              >
                {crumb.title}
              </span>
              {index < breadcrumbs.length - 1 && <span className="mx-1">{">"}</span>}
            </span>
          ))}
        </div>

        {/* 로그인 사용자 정보 및 드롭다운 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {/* currentUser.avatarUrl이 있을 때만 이미지 로드, 없으면 fallback 사용 */}
                {currentUser.avatarUrl ? (
                  <AvatarImage
                    src={currentUser.avatarUrl || "/placeholder.svg"}
                    alt={currentUser.name}
                  />
                ) : (
                  <AvatarFallback className="bg-gray-200 text-gray-500">
                    {/* 사람 얼굴 모양 아이콘으로 대체 */}
                    <UserCircle className="h-full w-full" />
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="sr-only">사용자 메뉴 열기</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/")}>내 정보</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 2. 최근 열어본 화면 목록 */}
      <div className="flex flex-nowrap overflow-x-auto gap-0 px-4 py-2 w-full min-w-0 min-h-[60px]">
        {recentViews.length === 0 ? (
          <p className="text-sm text-gray-500 flex items-center h-full py-1.5 px-3">
            최근 열어본 화면이 없습니다.
          </p>
        ) : (
          <>
            {/* 전체 삭제 버튼을 가장 좌측으로 이동 */}
            <Button
              variant="ghost"
              className="flex items-center gap-1 py-1.5 px-3 text-xs rounded-none bg-white hover:bg-gray-50 mr-2"
              onClick={handleClearRecentViews}
            >
              <Trash2 className="h-3 w-3" />
              히스토리삭제
            </Button>
            {recentViews.map(view => (
              <div
                key={view.path}
                className={cn(
                  "flex items-center gap-1 py-1.5 px-3 text-xs rounded-none",
                  "border-r border-gray-200",
                  "bg-white hover:bg-gray-50"
                )}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs rounded-none bg-transparent hover:bg-transparent"
                  onClick={() => handleRecentViewClick(view.path)}
                >
                  {view.title}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 text-gray-500 hover:text-gray-700 hover:bg-transparent"
                  onClick={e => handleRemoveRecentView(view.path, e)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">닫기</span>
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
