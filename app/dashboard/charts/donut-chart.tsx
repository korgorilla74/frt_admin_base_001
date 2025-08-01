
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

type DonutChartProps = {
  title: string
  series: number[]
  labels: string[]
  colors: string[]
  centerLabel?: string
}

export function DonutChart({ title, series, labels, colors, centerLabel }: DonutChartProps) {
  const total = series.reduce((a, b) => a + b, 0)
  const percentage = series.map((v) => ((v / total) * 100).toFixed(1))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-40 h-40 relative">
            <ApexChart
              type="donut"
              height={160}
              width={160}
              series={series}
              options={{
                chart: { type: "donut" },
                labels,
                colors,
                dataLabels: { enabled: false },
                legend: { show: false },
                stroke: { width: 0 },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        name: { show: false },
                        value: {
                          show: true,
                          fontSize: "24px",
                          fontWeight: 600,
                          formatter: () => centerLabel ?? "",
                        },
                      },
                    },
                  },
                },
              }}
            />
          </div>

          <div className="flex-1 text-sm space-y-2 w-full max-w-xs">
            {labels.map((label, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                  <span>{label}</span>
                </div>
                <div className="text-muted-foreground">
                  {percentage[i]}% <span className="ml-2">{series[i]}명</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between font-medium pt-2 border-t mt-2">
              <span>합계</span>
              <span className="text-muted-foreground">100.0% {total.toLocaleString()}명</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}