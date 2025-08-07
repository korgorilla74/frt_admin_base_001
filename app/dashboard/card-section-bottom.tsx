// app/dashboard/CardSectionBottom.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CardSectionBottom() {
  return (
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
  )
}
