"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

type BarChartProps = {
  title: string
  labels: string[]
  series: { name: string; data: number[] }[]
  colors: string[]
}

export function BarChart({ title, labels, series, colors }: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ApexChart
          type="bar"
          height={350}
          series={series}
          options={{
            colors: colors,
            chart: {
              stacked: false,
              toolbar: { show: false },
            },
            xaxis: {
              categories: labels,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "25%",
                borderRadius: 4,
              },
            },
            dataLabels: { enabled: false },
            legend: { position: "top" },
          }}
        />
      </CardContent>
    </Card>
  )
}