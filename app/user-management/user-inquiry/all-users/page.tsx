import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AllUsersPage() {
  // Dummy user data
  const users = [
    { id: 1, name: "김철수", email: "kim.cs@example.com", status: "활성", joined: "2023-01-01" },
    { id: 2, name: "이영희", email: "lee.yh@example.com", status: "활성", joined: "2023-02-10" },
    { id: 3, name: "박민수", email: "park.ms@example.com", status: "비활성", joined: "2023-03-20" },
    { id: 4, name: "최지영", email: "choi.jy@example.com", status: "활성", joined: "2023-04-05" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">사용자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>가입일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
