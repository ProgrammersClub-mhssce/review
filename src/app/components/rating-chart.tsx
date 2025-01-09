"use client"

import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Review {
  rating: number
}

export function RatingChart() {
  const [data, setData] = useState<{ rating: number; count: number }[]>([])

  useEffect(() => {
    fetch('/data/reviews.json')
      .then(response => response.json())
      .then(jsonData => {
        const ratings = jsonData.reviews.reduce((acc: { [key: number]: number }, review: Review) => {
          acc[review.rating] = (acc[review.rating] || 0) + 1
          return acc
        }, {})

        const chartData = Object.entries(ratings).map(([rating, count]) => ({
          rating: Number(rating),
          count: count as number
        }))

        setData(chartData)
      })
  }, [])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-[#1F77B4] text-xl font-semibold">Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2CA02C" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

