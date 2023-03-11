import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../App'
import { User } from '../types/user'
import { restApiRequest } from '../utils/api'

export const UseGetUsers = () => {
  return useQuery(['users'], async () => {
    return await restApiRequest<User[]>({ url: `users` })
  })
}

export const UseGetUserById = (id: string): { data?: User } => {
  return useQuery(
    [`users/${id}`],
    async () => {
      const response = await restApiRequest<User[]>({ url: `users/${id}` })

      return response.length ? response[0] : undefined
    },
    {
      enabled: !!id
    }
  )
}

export const UseUpdateUser = (id: string) => {
  return useMutation(
    async (values: Partial<User>) => {
      return await restApiRequest<Partial<User>>({
        url: 'users',
        method: 'PUT',
        data: values
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`users/${id}`])
        queryClient.invalidateQueries([`users`])
      }
    }
  )
}
