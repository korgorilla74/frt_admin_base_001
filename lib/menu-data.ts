// lib/menu-data.ts
import type { LucideIcon } from "lucide-react"

export interface MenuItemData {
  title: string
  path?: string
  icon?: LucideIcon
  sectionName?: string
  children?: MenuItemData[]
  isSubItem?: boolean
  isNested?: boolean
}


// import { Home, Users, UserCog, Handshake } from "lucide-react"
// import type { LucideIcon } from "lucide-react"

// export interface MenuItemData {
//   title: string
//   path?: string // Optional for parent sections
//   icon?: LucideIcon // Optional for top-level sections
//   sectionName?: string // For managing collapsible state
//   children?: MenuItemData[]
//   isSubItem?: boolean // To indicate nested items for styling
//   isNested?: boolean // To indicate nested collapsible sections
// }

// export const menuData: MenuItemData[] = [
//   {
//     title: "기본",
//     icon: Home,
//     sectionName: "basic",
//     children: [
//       { title: "내 정보", path: "/" },
//       { title: "대시보드", path: "/dashboard" },
//     ],
//   },
//   {
//     title: "사용자 관리",
//     icon: Users,
//     sectionName: "userManagement",
//     children: [
//       {
//         title: "사용자 조회",
//         sectionName: "userInquiry",
//         isNested: true,
//         children: [
//           { title: "전체 사용자 조회", path: "/user-management/user-inquiry/all-users", isSubItem: true },
//           { title: "비활성 사용자 조회", path: "/user-management/user-inquiry/inactive-users", isSubItem: true },
//         ],
//       },
//       { title: "사용자 등록", path: "/user-management/user-registration" },
//     ],
//   },
//   {
//     title: "시스템 관리",
//     icon: UserCog,
//     sectionName: "systemManagement",
//     children: [
//       {
//         title: "관리자 관리",
//         sectionName: "adminManagement",
//         isNested: true,
//         children: [
//           { title: "관리자 등록", path: "/system-management/admin-management/admin-registration", isSubItem: true },
//           { title: "관리자 조회", path: "/system-management/admin-management/admin-inquiry", isSubItem: true },
//         ],
//       },
//       {
//         title: "권한 관리",
//         sectionName: "permissionManagement",
//         isNested: true,
//         children: [
//           { title: "권한 조회", path: "/system-management/permission-management/permission-inquiry", isSubItem: true },
//           {
//             title: "권한별 사용자 조회",
//             path: "/system-management/permission-management/users-by-permission-inquiry",
//             isSubItem: true,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "파트너 관리",
//     icon: Handshake,
//     sectionName: "partnerManagement",
//     children: [
//       { title: "파트너 조회", path: "/partner-management/partner-inquiry" },
//       { title: "파트너 계약 조회", path: "/partner-management/partner-contract-inquiry" },
//       {
//         title: "파트너 요율 관리",
//         sectionName: "partnerRateManagement",
//         isNested: true,
//         children: [
//           {
//             title: "파트너 요율 조회",
//             path: "/partner-management/partner-rate-management/partner-rate-inquiry",
//             isSubItem: true,
//           },
//           {
//             title: "파트너 요율 등록",
//             path: "/partner-management/partner-rate-management/partner-rate-registration",
//             isSubItem: true,
//           },
//         ],
//       },
//     ],
//   },
// ]
