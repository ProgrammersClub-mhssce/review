"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'

interface Review {
  id: number
  link: string
  content: string
  rating: number
  sentiment: string
  images?: string
}

export function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/reviews.json')
      .then(response => response.json())
      .then(jsonData => {
        setReviews(jsonData.reviews)
      })
  }, [])

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-[#1F77B4] text-xl font-semibold">Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 divide-y divide-gray-200">
          {reviews.map((review) => (
            <li key={review.id} className="pt-4 first:pt-0">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <a href={review.link} target="_blank" rel="noopener noreferrer" className="text-[#1F77B4] hover:underline font-medium">
                  Review #{review.id}
                </a>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <Badge variant="outline" className="flex items-center space-x-1 bg-[#FFD700]">
                    <Star className="h-4 w-4" />
                    <span>{review.rating}</span>
                  </Badge>
                  <Badge 
                    variant={review.sentiment === "positive" ? "success" : review.sentiment === "negative" ? "destructive" : "outline"} 
                    className="flex items-center space-x-1"
                  >
                    {review.sentiment === "positive" ? <ThumbsUp className="h-4 w-4" /> : 
                     review.sentiment === "negative" ? <ThumbsDown className="h-4 w-4" /> : 
                     <Minus className="h-4 w-4" />}
                    <span>{review.sentiment}</span>
                  </Badge>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                {review.images && (
                  <button
                    onClick={() => setSelectedImage(review.images)}
                    className="px-2 py-1 bg-[#1F77B4] text-white rounded-md text-sm hover:bg-[#1a6698] transition-colors"
                  >
                    View Photo
                  </button>
                )}
                <a
                  href={`/dashboard/all-reviews#review-${review.id}`}
                  className="text-[#1F77B4] hover:underline text-sm"
                >
                  Read More
                </a>
              </div>
              <p className="mt-2 text-sm text-[#333333]">{review.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <a
            href="/all-reviews"
            className="inline-block px-4 py-2 bg-[#1F77B4] text-white rounded-md hover:bg-[#1a6698] transition-colors"
          >
            View All Reviews
          </a>
        </div>
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
            <div className="bg-white p-2 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
              <img src={selectedImage} alt="Review" className="max-w-full h-auto" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

