import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/shared/button/button"

interface ActionCellProps {
  onClick?: () => void
}

export function ActionCell({ onClick }: ActionCellProps) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="border-0 text-text-tertiary hover:text-text-primary"
      onClick={onClick}
    >
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  )
}
