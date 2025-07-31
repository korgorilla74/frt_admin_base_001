'use client';

import React from "react";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import HeaderNavigation from "@/components/header-navigation";
import { SidebarProvider, useSidebarExpansion } from "@/context/sidebar-context";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return ( 
      <LayoutUI>{children}</LayoutUI> 
  );
}

function LayoutUI({ children }: { children: React.ReactNode }) {
  const { isSidebarExpanded } = useSidebarExpansion();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`bg-white shadow-md p-4 border-r border-gray-200 transition-all duration-300
          ${isSidebarExpanded ? "w-64" : "w-20"} flex flex-col`}
      >
        <div
          className={`flex items-center gap-2 mb-6 px-3 py-2 h-24 transition-all duration-300
          ${isSidebarExpanded ? "justify-start" : "justify-center"}`}
        >
          <Image
            src="/placeholder.svg?height=32&width=32&text=App"
            alt="Company Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          {isSidebarExpanded && (
            <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap overflow-hidden">내 회사</h2>
          )}
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
  );
}