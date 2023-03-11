import { restApiRequest } from '../utils/api'
import { Invitation } from '../models/invitation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../App'

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
