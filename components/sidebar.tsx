"use client" // This component needs to be a Client Component to use usePathname and useState/useEffect

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react" // 아이콘은 menu-data에서 가져오므로 여기서는 Chevron만 필요
import { useSidebarExpansion } from "@/context/sidebar-context" // Import useSidebarExpansion
 
import { useMenuStore } from "@/store/menu-store"
import type { MenuItemData } from "@/lib/menu-data"

export default function Sidebar() {
  const pathname = usePathname()
  const { isSidebarExpanded } = useSidebarExpansion() // Get sidebar expansion state 
  const menuData = useMenuStore((state) => state.menuData)

  // State to manage the open/closed status of each collapsible section
  // Dynamically initialize based on menuData's sectionNames
   const [openSections, setOpenSections] = useState<Record<string, boolean>>({}) 

  // Load menu data on initial mount
  // URL 로딩되는 메뉴가 펼쳐지도록 
  // 
  useEffect(() => {
    if (menuData.length === 0) return // 메뉴가 아직 로딩되지 않은 경우 무시

    setOpenSections((prev) => {
      const newOpenSections = { ...prev }

      const openRelevantSections = (items: MenuItemData[]) => {
        items.forEach((item) => {
          if (item.children && item.sectionName) {
            const hasActiveChild = item.children.some(
              (child) =>
                child.path === pathname ||
                (child.children && child.children.some((grand) => grand.path === pathname)),
            )
            if (hasActiveChild) {
              newOpenSections[item.sectionName] = true
            }
            openRelevantSections(item.children)
          }
        })
      }
      openRelevantSections(menuData)
      return newOpenSections
    })
  }, [menuData, pathname]) // ✅ menuData를 의존성에 추가
 

  // Function to toggle the open/closed state of a section
  const toggleSection = (sectionName: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }))
  }

  // Helper function to determine if a link is active (only for the exact match)
  const isActiveLink = (href: string) => pathname === href

  // Recursive component to render menu items
  const renderMenuItems = (items: MenuItemData[], isNestedSection = false) => {
    return items.map((item) => {
      if (item.children) {
        // It's a collapsible section
        const Icon = item.icon
        const sectionOpen = item.sectionName ? openSections[item.sectionName] : false
        return (
          <div key={item.title}>
            <div
              onClick={() => item.sectionName && toggleSection(item.sectionName)}
              className={`flex items-center rounded-md text-gray-700 cursor-pointer transition-colors hover:bg-gray-200 whitespace-nowrap overflow-hidden
                ${isSidebarExpanded ? "px-3 py-2 gap-2 justify-between" : "justify-center p-2"}
                ${item.isNested && isSidebarExpanded ? "pl-4" : ""}
              `}
            >
              <div className={`flex items-center gap-2 ${!isSidebarExpanded && "justify-center w-full"}`}>
                {Icon && <Icon className="h-5 w-5" />}
                {isSidebarExpanded && <span>{item.title}</span>}
              </div>
              {isSidebarExpanded &&
                (sectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
            </div>
            {isSidebarExpanded && sectionOpen && (
              <div className={`space-y-2 ${item.isNested ? "pl-4" : "pl-4"}`}>
                {renderMenuItems(item.children, true)}
              </div>
            )}
          </div>
        )
      } else if (item.path) {
        // It's a regular menu item (link)
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center rounded-md text-gray-700 transition-colors whitespace-nowrap overflow-hidden
              ${isSidebarExpanded ? "px-3 py-2 gap-2" : "justify-center p-2"}
              ${isActiveLink(item.path) ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"}
              ${item.isSubItem && isSidebarExpanded ? "pl-8" : ""}
              ${item.isSubItem && !isSidebarExpanded ? "hidden" : ""} // Hide sub-items when sidebar is collapsed
            `}
          >
            {item.title}
          </Link>
        )
      }
      return null
    })
  }

  return <nav className="space-y-4 flex-1 overflow-y-auto">{renderMenuItems(menuData)}</nav>
}
