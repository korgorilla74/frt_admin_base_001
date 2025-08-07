"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SidebarContextType {
  isSidebarExpanded: boolean
  toggleSidebarExpansion: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true) // true = wide, false = narrow

  const toggleSidebarExpansion = () => {
    setIsSidebarExpanded(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{ isSidebarExpanded, toggleSidebarExpansion }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarExpansion() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebarExpansion must be used within a SidebarProvider")
  }
  return context
}
