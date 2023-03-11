import { restApiRequest } from '../utils/api'
import { useQuery } from '@tanstack/react-query'
import { Game } from '../models/game'

export const useGetGameById = (
  game_id: string
): {
  data?: Game[]
  isLoading: boolean
} => {
  return useQuery(['games'], async () => {
    const gamesResponse = await restApiRequest<Game[]>({
      url: `games/${game_id}`
    })

    return gamesResponse?.length > 0 ? gamesResponse[0] : undefined
  })
}
