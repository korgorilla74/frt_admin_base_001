import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PartnerRateInquiryPage() {
  const rates = [
    { id: 1, partner: "ABC 파트너스", service: "데이터 처리", rate: "0.05 USD/GB", effectiveDate: "2024-01-01" },
    { id: 2, partner: "XYZ 솔루션", service: "API 사용", rate: "0.001 USD/Call", effectiveDate: "2024-03-01" },
    { id: 3, partner: "가나다 협력사", service: "컨설팅", rate: "100 USD/Hour", effectiveDate: "2024-02-15" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">파트너 요율 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>파트너명</TableHead>
                <TableHead>서비스</TableHead>
                <TableHead>요율</TableHead>
                <TableHead>적용일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rates.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell>{rate.id}</TableCell>
                  <TableCell className="font-medium">{rate.partner}</TableCell>
                  <TableCell>{rate.service}</TableCell>
                  <TableCell>{rate.rate}</TableCell>
                  <TableCell>{rate.effectiveDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
