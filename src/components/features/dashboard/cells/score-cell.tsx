import { Star } from "lucide-react"

interface ScoreCellProps {
  score: number
}

export function ScoreCell({ score }: ScoreCellProps) {
  return (
    <div className="flex items-center gap-2">
      <Star className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" />
      <span className="text-sm font-semibold text-text-primary">{score}</span>
    </div>
  )
}
