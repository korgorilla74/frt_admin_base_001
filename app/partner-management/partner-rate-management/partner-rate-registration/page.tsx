import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PartnerRateRegistrationPage() {
  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">새 파트너 요율 정보 입력</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="partner-name">파트너명</Label>
            <Select>
              <SelectTrigger id="partner-name">
                <SelectValue placeholder="파트너를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abc">ABC 파트너스</SelectItem>
                <SelectItem value="xyz">XYZ 솔루션</SelectItem>
                <SelectItem value="gnd">가나다 협력사</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-type">서비스 유형</Label>
            <Input id="service-type" placeholder="예: 데이터 처리, API 사용" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate-value">요율 값</Label>
            <Input id="rate-value" placeholder="예: 0.05 USD/GB" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="effective-date">적용일</Label>
            <Input id="effective-date" type="date" required />
          </div>
          <Button type="submit" className="w-full">
            요율 등록
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
