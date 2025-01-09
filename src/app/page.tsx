import { RatingChart } from './components/rating-chart'
import { SentimentChart } from './components/sentiment-chart'
import { TopHashtags } from './components/top-hashtags'
import { ReviewList } from './components/review-list'
import { OverallStats } from './components/overall-stats'
import { TopReviewers } from './components/top-reviewers'

export default function Home() {
  return (
    <div className="space-y-6">
      <OverallStats />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RatingChart />
        <SentimentChart />
        <TopHashtags />
        <TopReviewers />
      </div>
      <ReviewList />
    </div>
  )
}

