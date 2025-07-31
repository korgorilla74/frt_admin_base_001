import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% 지난 달 대비</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">일일 방문자</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-xs text-muted-foreground">-5.2% 지난 주 대비</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">데이터 사용량</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 TB</div>
            <p className="text-xs text-muted-foreground">+10.0% 지난 달 대비</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>홍길동님이 프로필을 업데이트했습니다. (1분 전)</li>
            <li>새로운 사용자 10명이 가입했습니다. (1시간 전)</li>
            <li>시스템 백업이 완료되었습니다. (어제)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
