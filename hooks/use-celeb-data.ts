"use client"

import { useEffect, useState } from "react"
import qs from "query-string"

export type CelebFilters = {
  celebName?: string
  companyName?: string
  startDate?: string
  endDate?: string
  isActive?: boolean | null
}

export type CelebItem = {
  celebrityNo: number
  celebrityName: string
  realName: string
  email: string
  telephoneNo: string
  companyName: string
  useYn: string
  createDatetime: string
}

export function useCelebData(filters: CelebFilters, page: number, perPage: number) {
  const [data, setData] = useState<CelebItem[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const query = qs.stringify(
        {
          page: page - 1,
          size: perPage,
          celebrityName: filters.celebName,
          companyName: filters.companyName,
          startDate: filters.startDate,
          endDate: filters.endDate,
          useYn: filters.isActive === null ? undefined : filters.isActive ? "Y" : "N",
        },
        { skipNull: true, skipEmptyString: true }
      )

      console.log("🚀 ---------[useCelebData] query::", query)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/svc/celeb/customers?${query}`
        )
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        // console.log("🚀 ---------[useCelebData] res::", res)

        const json = await res.json()
        console.log("🚀 ---------[useCelebData] json::", json)

        setData(json.data.content)
        setTotalItems(json.data.totalElements)
      } catch (err) {
        console.error("🚨 API error:", err)
        setData([])
        setTotalItems(0)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filters, page, perPage])

  return {
    data,
    totalItems,
    loading,
  }
}
