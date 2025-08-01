import { CardSectionTop } from "./card-section-top"
import { ChartSection } from "./chart-section"
import { CardSectionBottom } from "./card-section-bottom"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <CardSectionTop />
      <ChartSection />
      <CardSectionBottom />
    </div>
  )
}
