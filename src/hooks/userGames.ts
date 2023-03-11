import { restApiRequest } from '../utils/api'
import { useMutation } from '@tanstack/react-query'
import { Game, GameDto } from '../models/game'
import { queryClient } from '../../App'
import { UserGameDto } from '../models/userGame'

export const useCreateUserGame = () => {
  return useMutation(
    async (params: UserGameDto) => {
      const gamesResponse = await restApiRequest<Game[]>({
        url: `games/${params.game_id}`
      })
      if (gamesResponse.length === 0) {
        await restApiRequest<GameDto>({
          url: 'games',
          method: 'POST',
          data: {
            game_id: params.game_id
          }
        })
      }
      return restApiRequest<UserGameDto>({
        url: 'usersgames',
        method: 'POST',
        data: params
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
