import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PartnerContractInquiryPage() {
  const contracts = [
    {
      id: 1,
      partner: "ABC 파트너스",
      type: "기본 계약",
      startDate: "2023-01-01",
      endDate: "2024-12-31",
      status: "유효",
    },
    {
      id: 2,
      partner: "XYZ 솔루션",
      type: "프리미엄 계약",
      startDate: "2023-03-15",
      endDate: "2025-03-14",
      status: "유효",
    },
    {
      id: 3,
      partner: "가나다 협력사",
      type: "기본 계약",
      startDate: "2022-07-01",
      endDate: "2023-06-30",
      status: "만료",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">파트너 계약 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>파트너명</TableHead>
                <TableHead>계약 유형</TableHead>
                <TableHead>시작일</TableHead>
                <TableHead>종료일</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map(contract => (
                <TableRow key={contract.id}>
                  <TableCell>{contract.id}</TableCell>
                  <TableCell className="font-medium">{contract.partner}</TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>{contract.startDate}</TableCell>
                  <TableCell>{contract.endDate}</TableCell>
                  <TableCell>{contract.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
