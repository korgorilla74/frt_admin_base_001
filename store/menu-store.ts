// store/menu-store.ts
import { create } from "zustand"
import type { MenuItemData } from "@/lib/menu-data"

interface MenuState {
  menuData: MenuItemData[]
  setMenuData: (data: MenuItemData[]) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  menuData: [],
  setMenuData: (data) => set({ menuData: data }),
}))