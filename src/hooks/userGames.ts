import { restApiRequest } from '../utils/api'
import { useMutation } from '@tanstack/react-query'
import { Game, GameDto } from '../models/game'
import { queryClient } from '../../App'
import { UserGameDto } from '../models/userGame'

export const useCreateUserGame = () => {
  return useMutation(
    async (params: UserGameDto) => {
      let gameId
      const gamesResponse = await restApiRequest<Game[]>({
        url: `games/${params.game_id}`
      })
      gameId = gamesResponse.length > 0 ? gamesResponse[0].id : ''
      if (gamesResponse.length === 0) {
        const newGame: Game = await restApiRequest<Partial<Game>>({
          url: 'games',
          method: 'POST',
          data: {
            game_id: params.game_id
          }
        })
        gameId = newGame.game_id
      }
      return restApiRequest<UserGameDto>({
        url: 'usersgames',
        method: 'POST',
        data: {
          game_id: gameId,
          user_id: params.user_id
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
