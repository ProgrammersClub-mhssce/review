"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Star, MessageSquare, TrendingUp, Award, Clock } from 'lucide-react'

interface Review {
  rating: number
  sentiment: string
  hashtags: string[]
}

export function OverallStats() {
  const [stats, setStats] = useState({
    averageRating: 0,
    positivePercentage: 0,
    topHashtag: '',
    averageReviewLength: 0
  })

  useEffect(() => {
    fetch('/data/reviews.json')
      .then(response => response.json())
      .then(jsonData => {
        const reviews = jsonData.reviews
        const totalRating = reviews.reduce((sum: number, review: Review) => sum + review.rating, 0)
        const averageRating = totalRating / totalReviews
        const positiveReviews = reviews.filter((review: Review) => review.sentiment === 'positive').length
        const positivePercentage = (positiveReviews / totalReviews) * 100

        const hashtagCounts = reviews.flatMap((review: Review) => review.hashtags)
          .reduce((acc: { [key: string]: number }, tag: string) => {
            acc[tag] = (acc[tag] || 0) + 1
            return acc
          }, {})
        const topHashtag = Object.entries(hashtagCounts).sort((a, b) => b[1] - a[1])[0][0]

        const totalReviewLength = reviews.reduce((sum: number, review: Review) => sum + review.content.length, 0)
        const averageReviewLength = totalReviewLength / totalReviews

        setStats({
          averageRating: Number(averageRating.toFixed(1)),
          positivePercentage: Number(positivePercentage.toFixed(1)),
          topHashtag,
          averageReviewLength: Math.round(averageReviewLength)
        })
      })
  }, [])

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-[#1F77B4] text-xl font-semibold">Overall Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatBox icon={Star} label="Average Rating" value={stats.averageRating} />
          <StatBox icon={TrendingUp} label="Positive Reviews" value={`${stats.positivePercentage}%`} />
          <StatBox icon={Award} label="Top Hashtag" value={`#${stats.topHashtag}`} />
          <StatBox icon={Clock} label="Avg Review Length" value={`${stats.averageReviewLength} chars`} />
        </div>
      </CardContent>
    </Card>
  )
}

function StatBox({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
      <Icon className="h-8 w-8 mb-2 text-[#1F77B4]" />
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-xl font-bold text-[#333333]">{value}</p>
    </div>
  )
}

