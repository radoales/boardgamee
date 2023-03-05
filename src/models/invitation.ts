export interface Invitation {
  id: string
  sender_id: string
  receiver_id: string
  status: 0 | 1 | 2
  created_at: string
  updated_at: string
}

export interface InvitationDto {
  id: string
  sender_id: string
  receiver_id: string
  status: 0 | 1 | 2
}
