import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function InactiveUsersPage() {
  // Dummy inactive user data
  const inactiveUsers = [
    {
      id: 3,
      name: "박민수",
      email: "park.ms@example.com",
      status: "비활성",
      joined: "2023-03-20",
      lastActive: "2024-01-15",
    },
    {
      id: 5,
      name: "정수진",
      email: "jung.sj@example.com",
      status: "비활성",
      joined: "2023-05-12",
      lastActive: "2023-12-01",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">비활성 사용자 목록</CardTitle>
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
                <TableHead>최근 활동</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inactiveUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
