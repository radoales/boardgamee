import { restApiRequest } from '../utils/api'
import { Invitation } from '../models/invitation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../App'
import { UserInvitation } from '../types/userInvitation'

export const UseGetUserInvitationsById = (user_id: string) => {
  return useQuery(['invitations'], async () => {
    const response = await restApiRequest<Invitation[]>({
      url: `invitations/${user_id}`
    })

    if (response.length > 0) {
      const userInvites: UserInvitation[] = response.map((invite) => {
        return {
          id: invite.id,
          status: invite.status,
          type: invite.sender_id === user_id ? 'sent' : 'received',
          userId:
            invite.sender_id === user_id ? invite.receiver_id : invite.sender_id
        }
      })

      return userInvites
    }

    return []
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

export const UseDeleteInvitation = () => {
  return useMutation(
    async (id: string) => {
      return await restApiRequest<Partial<Invitation>>({
        url: `invitations/${id}`,
        method: 'DELETE'
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
