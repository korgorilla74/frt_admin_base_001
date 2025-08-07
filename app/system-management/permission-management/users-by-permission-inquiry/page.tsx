import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function UsersByPermissionInquiryPage() {
  const usersByPermission = {
    "사용자 관리": [
      { id: 1, name: "김철수", email: "kim.cs@example.com" },
      { id: 2, name: "이영희", email: "lee.yh@example.com" },
    ],
    "게시물 관리": [{ id: 3, name: "박민수", email: "park.ms@example.com" }],
    "시스템 설정": [{ id: 4, name: "최지영", email: "choi.jy@example.com" }],
  }

  // For demonstration, we'll just show users for a default permission
  const defaultPermission = "사용자 관리"
  const currentUsers = usersByPermission[defaultPermission] || []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4 mb-4 border-b">
          <CardTitle className="text-xl font-semibold">권한 선택 및 사용자 목록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="permission-select">권한 선택</Label>
            <Select defaultValue={defaultPermission}>
              <SelectTrigger id="permission-select" className="w-[200px]">
                <SelectValue placeholder="권한을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(usersByPermission).map(permissionName => (
                  <SelectItem key={permissionName} value={permissionName}>
                    {permissionName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    해당 권한을 가진 사용자가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
