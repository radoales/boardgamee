export type InviteStatus = 'sent' | 'received'

export type Invite = {
  id: string
  name: string
  username: string
  status: InviteStatus
}
