"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginationController } from "@/components/ui/pagination-controller"
import type { CelebItem } from "@/hooks/use-celeb-data"

type CelebTableProps = {
  data: CelebItem[]
  totalItems: number
  page: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (count: number) => void
}

export function CelebTable({
  data,
  totalItems,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
}: CelebTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))

  return (
    <div>
      <div className="border-t-2 border-gray-400 border-b-2 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>셀럽명</TableHead>
              <TableHead>실명</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>전화번호</TableHead>
              <TableHead>회사명</TableHead>
              <TableHead>사용 여부</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((celeb) => (
              <TableRow key={celeb.celebrityNo}>
                <TableCell>{celeb.celebrityName}</TableCell>
                <TableCell>{celeb.realName}</TableCell>
                <TableCell>{celeb.email}</TableCell>
                <TableCell>{celeb.telephoneNo}</TableCell>
                <TableCell>{celeb.companyName}</TableCell>
                <TableCell>{celeb.useYn === "Y" ? "사용" : "미사용"}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-sm text-muted-foreground">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center items-center gap-x-4 py-4 mx-auto whitespace-nowrap">
        <div className="text-sm text-muted-foreground shrink-0">총 {totalPages} 페이지</div>
        <PaginationController
          totalItems={totalItems}
          currentPage={page}
          perPage={perPage}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
          maxPageButtons={10}
        />
      </div>
    </div>
  )
}