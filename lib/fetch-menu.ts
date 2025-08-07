// lib/fetch-menu.ts
import { Home, Users, UserCog, Handshake } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { MenuItemData } from "./menu-data"

// 1. 아이콘 이름 → 컴포넌트 매핑
const iconMap: Record<string, LucideIcon> = {
  Home,
  Users,
  UserCog,
  Handshake,
}

// 2. 서버에서 오는 메뉴 타입
interface RawMenuItem {
  title: string
  path?: string
  icon?: string
  sectionName?: string
  children?: RawMenuItem[]
  isSubItem?: boolean
  isNested?: boolean
}

// 3. 매핑 함수
function mapMenuItems(raw: RawMenuItem[]): MenuItemData[] {
  return raw.map(item => ({
    ...item,
    icon: item.icon ? iconMap[item.icon] : undefined,
    children: item.children ? mapMenuItems(item.children) : undefined,
  }))
}

// 4. fetch + 매핑
// http://localhost:9090/api/svc/menu/list/user
export async function fetchMenuData(): Promise<MenuItemData[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/svc/menu/list/user`, {
    cache: "no-store",
  }) // or credentials: "include" if needed
  if (!res.ok) {
    throw new Error("메뉴 데이터를 불러오지 못했습니다.")
  }

  const result = await res.json()

  if (result.status !== "OK") throw new Error("메뉴 데이터를 불러오지 못했습니다.")
  // console.log("🚀 [fetchMenuData] result.data:", result.data)

  let rawData = result.data

  // ✅ 문자열이라면 JSON.parse 해줌
  if (typeof rawData === "string") {
    try {
      rawData = JSON.parse(rawData)

      // console.log("🚀  rawData:", rawData)
    } catch (e) {
      throw new Error("data 필드가 JSON 배열 문자열이지만 파싱에 실패했습니다.")
    }
  }

  // ✅ 방어 코드
  if (!Array.isArray(rawData)) {
    console.error("❌ result.data is not an array:", rawData)
    throw new Error("API 응답의 'data' 필드가 배열이 아닙니다.")
  }
  return mapMenuItems(rawData)
}
