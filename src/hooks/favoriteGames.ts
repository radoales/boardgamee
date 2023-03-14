import { restApiRequest } from '../utils/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../App'
import { UserGame, UserGameDto } from '../models/userGame'
import { useContext } from 'react'
import { SessionContext } from './sessionContext'

export const useGetMyGamesByUserId = () => {
  const { userId } = useContext(SessionContext)
  return useQuery(
    ['usergames'],
    async () => {
      const response = await restApiRequest<UserGame[]>({
        url: `usersgames/${userId}`
      })

      return response
    },
    {
      enabled: !!userId
    }
  )
}

export const useAddToFavoriteGames = (userId: string) => {
  return useMutation(
    async (gameId: string) => {
      return await restApiRequest<UserGameDto>({
        url: 'usersgames',
        method: 'POST',
        data: {
          game_id: gameId,
          user_id: userId
        }
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['games'])
        queryClient.invalidateQueries(['usergames'])
      }
    }
  )
}

export const useRemoveFromFavoriteGames = () => {
  return useMutation(
    async (id: string) => {
      return await restApiRequest<Partial<UserGame>>({
        url: `usersgames/${id}`,
        method: 'DELETE'
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['games'])
        queryClient.invalidateQueries(['usergames'])
      }
    }
  )
}
