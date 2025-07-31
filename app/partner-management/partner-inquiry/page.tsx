import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PartnerInquiryPage() {
  const partners = [
    { id: 1, name: "ABC 파트너스", type: "일반", contact: "abc@example.com", status: "활성" },
    { id: 2, name: "XYZ 솔루션", type: "프리미엄", contact: "xyz@example.com", status: "활성" },
    { id: 3, name: "가나다 협력사", type: "일반", contact: "gnd@example.com", status: "비활성" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">파트너 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>파트너명</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>{partner.id}</TableCell>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>{partner.type}</TableCell>
                  <TableCell>{partner.contact}</TableCell>
                  <TableCell>{partner.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
