import { User } from '../types/user'
import { restApiRequest } from '../utils/api'
import { Invitation } from '../models/invitation'
import { useQuery } from '@tanstack/react-query'

export const UseGetUserFriendsById = (user_id: string) => {
  return useQuery(['friends'], async () => {
    const invitationsResponse = await restApiRequest<Invitation[]>({
      url: `invitations/${user_id}`
    })

    const userIds = invitationsResponse
      .filter((invite) => invite.status === 1)
      .map((invite) =>
        invite.sender_id === user_id ? invite.receiver_id : invite.sender_id
      )

    return await restApiRequest<{ ids: string[] }, User[]>({
      url: `users_by_ids`,
      method: 'POST',
      data: {
        ids: userIds
      }
    })
  })
}
