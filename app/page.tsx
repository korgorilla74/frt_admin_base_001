"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useSession } from "next-auth/react"
export default function MyPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <div>
              <h1>안녕하세요, {session?.user?.name || "사용자"}님</h1>
            </div>
            <CardTitle>홍길동</CardTitle>
            <CardDescription>사용자 계정 관리</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">이메일</p>
              <p className="text-base font-semibold">hong.gildong@example.com</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">전화번호</p>
              <p className="text-base font-semibold">010-1234-5678</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">가입일</p>
              <p className="text-base font-semibold">2023년 1월 15일</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">최근 로그인</p>
              <p className="text-base font-semibold">2024년 7월 18일 11:00 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
