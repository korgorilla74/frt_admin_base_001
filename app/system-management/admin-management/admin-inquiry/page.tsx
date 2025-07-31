import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminInquiryPage() {
  const admins = [
    { id: 1, name: "관리자A", email: "adminA@example.com", role: "슈퍼 관리자", lastLogin: "2024-07-18" },
    { id: 2, name: "관리자B", email: "adminB@example.com", role: "일반 관리자", lastLogin: "2024-07-17" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">관리자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>최근 로그인</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>{admin.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
