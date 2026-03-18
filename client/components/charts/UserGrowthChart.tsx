'use client'
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function UserGrowthChart({ data }: { data: { month: string; users: number }[] }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const formatTooltipValue = (value: unknown) => {
    if (typeof value === 'number') return [String(value), 'Users']
    return ['-', 'Users']
  }

  return (
    <div style={{ width: '100%', minWidth: 0 }}>
      <div style={{ width: '100%', minWidth: 0, marginLeft: '-8px' }}>
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 180}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 12 }} width={32} />
            <Tooltip contentStyle={{ background: '#141B2D', border: '1px solid #1C2540', borderRadius: 8, color: '#F1F5F9', fontSize: 13 }} formatter={formatTooltipValue} labelStyle={{ color: '#94A3B8' }} />
            <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#10B981', strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
