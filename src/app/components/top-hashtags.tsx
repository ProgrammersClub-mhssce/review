"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Review {
  hashtags: string[]
}

export function TopHashtags() {
  const [hashtags, setHashtags] = useState<{ tag: string; count: number }[]>([])

  useEffect(() => {
    fetch('/data/reviews.json')
      .then(response => response.json())
      .then(jsonData => {
        const hashtagCounts = jsonData.reviews.flatMap((review: Review) => review.hashtags)
          .reduce((acc: { [key: string]: number }, tag: string) => {
            acc[tag] = (acc[tag] || 0) + 1
            return acc
          }, {})

          const sortedHashtags = (Object.entries(hashtagCounts) as [string, number][])
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([tag, count]) => ({ tag, count }))
        

        setHashtags(sortedHashtags)
      })
  }, [])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-[#1F77B4] text-xl font-semibold">Top Hashtags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((hashtag) => (
            <Badge key={hashtag.tag} variant="secondary" className="bg-[#9467BD] text-white">
              #{hashtag.tag} ({hashtag.count})
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

