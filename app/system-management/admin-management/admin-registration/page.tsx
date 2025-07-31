import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminRegistrationPage() {
  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">새 관리자 정보 입력</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-name">이름</Label>
            <Input id="admin-name" placeholder="관리자 이름" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">이메일</Label>
            <Input id="admin-email" type="email" placeholder="admin@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">비밀번호</Label>
            <Input id="admin-password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            관리자 등록
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
