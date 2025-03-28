"use client"
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface AreaChartProps {
  data: { name: string; value: number }[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showGridLines?: boolean
}

export function AreaChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend = true,
  showGridLines = true,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
        <defs>
          {colors.map((color, index) => (
            <linearGradient key={index} id={`colorValue${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={index} />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip formatter={valueFormatter ? (value) => [valueFormatter(value)] : undefined} />
        {categories.map((category, index) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index]}
            fillOpacity={1}
            fill={`url(#colorValue${index})`}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

