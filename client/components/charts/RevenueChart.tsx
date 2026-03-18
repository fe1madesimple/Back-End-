'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function RevenueChart({ data }: { data: { month: string; value: number }[] }) {
  const formatTooltipValue = (value: unknown) => {
    if (typeof value === 'number') return [`€${value.toLocaleString()}`, 'MRR']
    return ['-', 'MRR']
  }

  return (
    <div style={{ width: '100%', minWidth: 0 }}>
      <div style={{ width: '100%', minWidth: 0, marginLeft: '-8px' }}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 12 }} tickFormatter={(v) => `€${v.toLocaleString()}`} width={52} />
            <Tooltip contentStyle={{ background: '#141B2D', border: '1px solid #1C2540', borderRadius: 8, color: '#F1F5F9', fontSize: 13 }} formatter={formatTooltipValue} labelStyle={{ color: '#94A3B8' }} />
            <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2.5} fill="url(#blueGrad)" dot={false} activeDot={{ r: 5, fill: '#3B82F6', strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
