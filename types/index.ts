export type MenuItemType = {
  id: string
  title: string
  url?: string
  children?: MenuItemType[]
}
