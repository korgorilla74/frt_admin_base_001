import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function UserRegistrationPage() {
  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">새 사용자 정보 입력</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" placeholder="홍길동" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="example@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">비밀번호 확인</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            사용자 등록
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
