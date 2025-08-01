// components/chart-section.tsx
"use client"

import { DonutChart } from "./charts/donut-chart"
import { BarChart } from "./charts/bar-chart"
import { useChartData } from "../../hooks/use-chart-data"

export function ChartSection() {
  const npsData = useChartData("nps")
  const userTypeData = useChartData("userType")
  const fruitData = useChartData("fruitProduction")
  const populationData = useChartData("populationGrowth")

  return (
    <div className="space-y-6">
      {/* 🔵 도넛 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {npsData?.chartType === "donut" && <DonutChart {...npsData} />}
        {userTypeData?.chartType === "donut" && <DonutChart {...userTypeData} />}
      </div>

      {/* 🔵 바 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fruitData?.chartType === "bar" && (
          <BarChart
            title={fruitData.title}
            labels={fruitData.labels}
            series={fruitData.series}
            colors={fruitData.colors}
          />
        )}
        {populationData?.chartType === "bar" && (
          <BarChart
            title={populationData.title}
            labels={populationData.labels}
            series={populationData.series}
            colors={populationData.colors}
          />
        )}
      </div>
    </div>
  )
}