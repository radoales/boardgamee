import { User } from '../types/user'
import { restApiRequest } from '../utils/api'
import { Invitation } from '../models/invitation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../App'

export const UseGetUserFriendsById = (
  user_id: string
): {
  data?: User[]
  isLoading: boolean
} => {
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

export const useCreateInvitation = () => {
  return useMutation(
    async (params: Partial<Invitation>) => {
      return restApiRequest<Partial<Invitation>>({
        url: 'invitations',
        method: 'POST',
        data: params
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['friends'])
        queryClient.invalidateQueries(['invitations'])
      }
    }
  )
}

export const UseUpdateInvitation = () => {
  return useMutation(
    async (params: Partial<Invitation>) => {
      return await restApiRequest<Partial<Invitation>, Invitation>({
        url: 'invitations',
        method: 'PUT',
        data: params
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['friends'])
        queryClient.invalidateQueries(['invitations'])
      }
    }
  )
}
export const UseGetUserInvitationsById = (user_id: string) => {
  return useQuery(['invitations'], async () => {
    return await restApiRequest<Invitation[]>({
      url: `invitations/${user_id}`
    })
  })
}
