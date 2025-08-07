"use client"

import React from "react"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import HeaderNavigation from "@/components/header-navigation"
import { useSidebarExpansion } from "@/context/sidebar-context"

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return <LayoutUI>{children}</LayoutUI>
}

function LayoutUI({ children }: { children: React.ReactNode }) {
  const { isSidebarExpanded } = useSidebarExpansion()

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`bg-white shadow-md p-4 border-r border-gray-200 transition-all duration-300
          ${isSidebarExpanded ? "w-64" : "w-20"} flex flex-col`}
      >
        <div className="relative w-full h-[100px] mb-4">
          <Image
            src="/ion-logo.png"
            alt="MyCom Logo"
            fill
            className="object-contain rounded-md"
            priority
          />
        </div>
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col transition-all duration-300 min-w-0 overflow-x-hidden">
        <HeaderNavigation />
        <main className="flex-1 p-2 overflow-auto">{children}</main>
        <footer className="h-[80px] shrink-0 bg-white text-center text-sm text-gray-500 border-t border-gray-200 flex items-center justify-center">
          © 2025 내 회사. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
