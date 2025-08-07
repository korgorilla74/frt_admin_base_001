"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"

type PaginationProps = {
  totalItems: number
  currentPage: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (count: number) => void
  maxPageButtons?: number
}

export function PaginationController({
  totalItems,
  currentPage,
  perPage,
  onPageChange,
  onPerPageChange,
  maxPageButtons = 10,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / perPage)
  const [goToPageInput, setGoToPageInput] = useState("")

  const handleGoTo = () => {
    const page = Number(goToPageInput)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page)
      setGoToPageInput("")
    }
  }

  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <div className="w-full flex items-center justify-center gap-2 py-4 mx-auto">
      <span className="text-sm text-muted-foreground">Total {totalItems}</span>

      {/* per page selector */}
      <Select onValueChange={value => onPerPageChange(Number(value))} value={String(perPage)}>
        <SelectTrigger className="w-[80px] text-sm">{perPage}/page</SelectTrigger>
        <SelectContent>
          {[5, 10, 20, 50].map(count => (
            <SelectItem key={count} value={String(count)}>
              {count}/page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* First */}
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <ChevronsLeft className="w-4 h-4" />
      </button>

      {/* Prev */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      {pages.map(page => (
        <button
          key={page}
          className={`px-2 py-1 rounded text-sm ${
            page === currentPage ? "text-blue-600 font-bold" : "text-black"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Last */}
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        <ChevronsRight className="w-4 h-4" />
      </button>

      {/* Go to */}
      <div className="flex items-center gap-1 text-sm">
        <span>Go to</span>
        <Input
          className="w-16 h-8 text-center text-sm"
          value={goToPageInput}
          onChange={e => setGoToPageInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleGoTo()}
        />
      </div>
    </div>
  )
}
