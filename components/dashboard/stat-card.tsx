import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: "up" | "down"
  percentage: number
  description?: string
  color?: "blue" | "green" | "purple" | "amber" | "red"
}

export function StatCard({ title, value, icon: Icon, trend, percentage, description, color = "blue" }: StatCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          trendUp: "text-green-600",
          trendDown: "text-red-600",
        }
      case "green":
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          trendUp: "text-green-600",
          trendDown: "text-red-600",
        }
      case "purple":
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
          trendUp: "text-green-600",
          trendDown: "text-red-600",
        }
      case "amber":
        return {
          bg: "bg-amber-50",
          text: "text-amber-600",
          trendUp: "text-green-600",
          trendDown: "text-red-600",
        }
      case "red":
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          trendUp: "text-green-600",
          trendDown: "text-red-600",
        }
      default:
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          trendUp: "text-green-600",
          trendDown: "text-red-600",
        }
    }
  }

  const colors = getColorClasses()

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`rounded-full ${colors.bg} p-3`}>
            <Icon className={`h-5 w-5 ${colors.text}`} />
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? colors.trendUp : colors.trendDown}`}
          >
            {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span>{percentage}%</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
          <p className="text-sm text-slate-500">{title}</p>
          {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

