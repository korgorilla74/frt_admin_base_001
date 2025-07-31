import { Inter } from "next/font/google"
import "../app/globals.css"
import SessionProviderWrapper from "@/components/session-provider-wrapper"
import ClientLayout from "./client-layout"
import type { Metadata } from "next"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Simple admin dashboard with persistent sidebar",
}

export default async function RootLayout({ children }: { children: ReactNode }) { 
  return (
    <html lang="ko">
      <body className={inter.className}>
        <SessionProviderWrapper>
            <ClientLayout>{children}</ClientLayout>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}