import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PermissionInquiryPage() {
  const permissions = [
    { id: 1, name: "사용자 관리", description: "사용자 정보 조회 및 수정 권한" },
    { id: 2, name: "게시물 관리", description: "게시물 생성, 수정, 삭제 권한" },
    { id: 3, name: "시스템 설정", description: "시스템 전반적인 설정 변경 권한" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">권한 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>권한 이름</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.id}</TableCell>
                  <TableCell className="font-medium">{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
