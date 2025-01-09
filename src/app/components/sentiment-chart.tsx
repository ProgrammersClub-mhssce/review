"use client"

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Review {
  sentiment: string
}

const COLORS = ["#2CA02C", "#1F77B4", "#FF7F0E"]

export function SentimentChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    fetch('/data/reviews.json')
      .then(response => response.json())
      .then(jsonData => {
        const sentiments = jsonData.reviews.reduce((acc: { [key: string]: number }, review: Review) => {
          acc[review.sentiment] = (acc[review.sentiment] || 0) + 1
          return acc
        }, {})

        const chartData = Object.entries(sentiments).map(([sentiment, count]) => ({
          name: sentiment,
          value: count as number
        }))

        setData(chartData)
      })
  }, [])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-[#1F77B4] text-xl font-semibold">Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

