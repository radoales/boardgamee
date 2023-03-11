export type InvitationType = 'sent' | 'received'

export type UserInvitation = {
  id: string
  userId: string
  type: InvitationType
  status: number
}
