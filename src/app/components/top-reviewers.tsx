"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: number
  rating: number
}

interface Reviewer {
  id: number
  name: string
  avatar: string
  averageRating: number
}

export function TopReviewers() {
  const [reviewers, setReviewers] = useState<Reviewer[]>([])

  useEffect(() => {
    fetch('/data/reviews.json')
      .then(response => response.json())
      .then(jsonData => {
        const reviewerStats = jsonData.reviews.reduce((acc: { [key: number]: { total: number, count: number } }, review: Review) => {
          if (!acc[review.id]) {
            acc[review.id] = { total: 0, count: 0 }
          }
          acc[review.id].total += review.rating
          acc[review.id].count += 1
          return acc
        }, {})

        const topReviewers = Object.entries(reviewerStats)
          .map(([id, stats]) => ({
            id: Number(id),
            name: `Reviewer ${id}`,
            avatar: `/avatars/avatar${id}.png`,
            averageRating: Number((stats.total / stats.count).toFixed(1))
          }))
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 5)

        setReviewers(topReviewers)
      })
  }, [])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-[#1F77B4] text-xl font-semibold">Top Reviewers</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {reviewers.map((reviewer) => (
            <li key={reviewer.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={reviewer.avatar} alt={reviewer.name} />
                <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{reviewer.name}</p>
                <p className="text-sm text-muted-foreground">Avg. Rating: {reviewer.averageRating}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

