// lib/menu-utils.ts
import type { MenuItemData } from "./menu-data"

// 재귀적으로 모든 path를 flat하게 추출
export function flattenMenuItems(items: MenuItemData[]): { title: string; path: string }[] {
  const result: { title: string; path: string }[] = []

  const traverse = (menuItems: MenuItemData[]) => {
    for (const item of menuItems) {
      if (item.path) {
        result.push({ title: item.title, path: item.path })
      }
      if (item.children) {
        traverse(item.children)
      }
    }
  }

  traverse(items)
  return result
}

// 특정 경로에 해당하는 제목 반환
export function getTitleForPath(path: string, menuItems: MenuItemData[]): string | null {
  const breadcrumbs = getBreadcrumbs(path, menuItems)
  return breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].title : null
}

export function getBreadcrumbs(
  path: string,
  menuItems: MenuItemData[]
): { title: string; path?: string }[] {
  const breadcrumbs: { title: string; path?: string }[] = []

  function findPath(items: MenuItemData[], currentPath: MenuItemData[] = []): boolean {
    for (const item of items) {
      const updatedPath = [...currentPath, item]

      if (item.path === path) {
        // ✅ 경로 유무와 관계없이 모든 부모 경로를 Breadcrumb에 포함
        updatedPath.forEach(b => breadcrumbs.push({ title: b.title, path: b.path }))
        return true
      }

      if (item.children && findPath(item.children, updatedPath)) {
        return true
      }
    }

    return false
  }

  findPath(menuItems)

  return breadcrumbs
}
