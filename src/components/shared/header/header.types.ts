export interface HeaderUser {
  name: string
  role: string
  initials: string
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  user: HeaderUser
  onLogout?: () => void
}
