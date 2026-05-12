import { Avatar, AvatarFallback } from "@/components/shared/avatar/avatar"
import { cn } from "@/lib/utils"

interface ContactCellProps {
  name: string
  email: string
  initials: string
  avatarClassName?: string
}

export function ContactCell({ name, email, initials, avatarClassName }: ContactCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn("text-xs", avatarClassName)}>{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-medium text-text-primary">{name}</p>
        <p className="truncate text-xs text-text-tertiary">{email}</p>
      </div>
    </div>
  )
}
