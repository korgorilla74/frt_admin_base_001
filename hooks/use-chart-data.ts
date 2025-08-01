// /hooks/use-chart-data.ts
import { useEffect, useState } from "react"

type DonutChartData = {
  chartType: "donut"
  title: string
  labels: string[]
  series: number[]
  colors: string[]
  centerLabel?: string
}

type BarChartData = {
  chartType: "bar"
  title: string
  labels: string[]
  series: {
    name: string
    data: number[]
  }[]
  colors: string[]
}

type ChartType = "nps" | "userType" | "fruitProduction" | "populationGrowth"
type ChartData = DonutChartData | BarChartData

export function useChartData(type: ChartType): ChartData | null {
  const [data, setData] = useState<ChartData | null>(null)

  useEffect(() => {
    if (type === "nps") {
      setData({
        chartType: "donut",
        title: "NPS",
        labels: ["추천", "중립", "비추천"],
        series: [358, 371, 327],
        colors: ["#B4E1C5", "#FFE9AD", "#FFA4A4"],
      })
    } else if (type === "userType") {
      setData({
        chartType: "donut",
        title: "가입자 유형",
        labels: ["무료", "프리미엄", "탈퇴", "관리자"],
        series: [520, 340, 194, 50],
        colors: ["#A5D8FF", "#91FBCF", "#D3B9FF", "#BFBFBF"],
      })
    } else if (type === "fruitProduction") {
      setData({
        chartType: "bar",
        title: "분기별 과일 생산량 (톤)",
        labels: ["Q1", "Q2", "Q3", "Q4"],
        series: [
          { name: "사과", data: [120, 150, 180, 200] },
          { name: "배", data: [100, 130, 160, 190] },
          { name: "포도", data: [90, 100, 140, 170] },
          { name: "복숭아", data: [80, 95, 110, 120] },
        ],
        colors: ["#FF9F40", "#FF6384", "#36A2EB", "#9966FF"],
      })
    } else if (type === "populationGrowth") {
      setData({
        chartType: "bar",
        title: "년도별 국가별 인구 증가량 (백만명)",
        labels: ["2020", "2021", "2022", "2023", "2024"],
        series: [
          { name: "한국", data: [1.2, 1.3, 1.5, 1.4, 1.6] },
          { name: "일본", data: [0.5, 0.6, 0.4, 0.3, 0.2] },
          { name: "미국", data: [3.2, 3.5, 3.7, 4.0, 4.2] },
          { name: "중국", data: [2.8, 2.6, 2.5, 2.3, 2.1] },
          { name: "인도", data: [3.5, 3.8, 4.1, 4.3, 4.5] },
        ],
        colors: ["#4BC0C0", "#36A2EB", "#91FBCF", "#A5D8FF", "#9966FF"],
      })
    }
  }, [type])

  return data
}