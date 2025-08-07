"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CelebTable } from "./celeb-table"
import { useCelebData } from "@/hooks/use-celeb-data"

type CelebFilters = {
  celebName: string
  companyName: string
  startDate: string
  endDate: string
  isActive: boolean | null
}

export default function CelebUsersPage() {
  const [filters, setFilters] = useState<CelebFilters>({
    celebName: "",
    companyName: "",
    startDate: "",
    endDate: "",
    isActive: null,
  })
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const { data, totalItems, loading } = useCelebData(filters, page, perPage)

  // 필터 변경 시 페이지 초기화
  useEffect(() => {
    setPage(1)
  }, [filters])

  const handleSearch = () => {
    // "조회" 버튼을 누르면 filters를 다시 set → useEffect 재실행
    setFilters({ ...filters })
  }

  const handleFieldUpdate = (field: keyof CelebFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Card>
      <CardContent className="space-y-6 pt-10">
        <div className="w-full flex flex-wrap items-end gap-4 justify-between">
          <div className="flex flex-col w-[200px]">
            <Label htmlFor="celebName">셀럽명</Label>
            <Input
              id="celebName"
              defaultValue={filters.celebName}
              onBlur={e => handleFieldUpdate("celebName", e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleFieldUpdate("celebName", (e.target as HTMLInputElement).value)
                }
              }}
            />
          </div>

          <div className="flex flex-col w-[200px]">
            <Label htmlFor="companyName">회사명</Label>
            <Input
              id="companyName"
              defaultValue={filters.companyName}
              onBlur={e => handleFieldUpdate("companyName", e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleFieldUpdate("companyName", (e.target as HTMLInputElement).value)
                }
              }}
            />
          </div>
          <div className="flex flex-col w-[200px]">
            <Label htmlFor="startDate">가입일 From</Label>
            <Input
              type="date"
              id="startDate"
              value={filters.startDate}
              onChange={e => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-[200px]">
            <Label htmlFor="endDate">가입일 To</Label>
            <Input
              type="date"
              id="endDate"
              value={filters.endDate}
              onChange={e => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <Label htmlFor="isActive">사용 여부</Label>
            <ToggleGroup
              type="single"
              value={
                filters.isActive === true
                  ? "active"
                  : filters.isActive === false
                    ? "inactive"
                    : "all"
              }
              onValueChange={value => {
                let isActiveFilter: boolean | null
                if (value === "active") isActiveFilter = true
                else if (value === "inactive") isActiveFilter = false
                else isActiveFilter = null
                setFilters({ ...filters, isActive: isActiveFilter })
              }}
              className="mt-1"
            >
              <ToggleGroupItem
                value="all"
                className="data-[state=on]:bg-blue-600 data-[state=on]:text-white"
              >
                전체
              </ToggleGroupItem>
              <ToggleGroupItem
                value="active"
                className="data-[state=on]:bg-blue-600 data-[state=on]:text-white"
              >
                사용
              </ToggleGroupItem>
              <ToggleGroupItem
                value="inactive"
                className="data-[state=on]:bg-blue-600 data-[state=on]:text-white"
              >
                미사용
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* ✅ 조회 버튼 복원 */}
          <div className="flex-1 flex justify-end">
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white">
              조회
            </Button>
          </div>
        </div>

        {/* ✅ 테이블 */}
        <div className="mt-6 pt-5">
          <CelebTable
            data={data}
            totalItems={totalItems}
            page={page}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </CardContent>
    </Card>
  )
}
