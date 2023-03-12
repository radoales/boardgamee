import { restApiRequest } from '../utils/api'
import { useMutation } from '@tanstack/react-query'
import { Game, GameDto } from '../models/game'
import { queryClient } from '../../App'
import { UserGameDto } from '../models/userGame'

export const UseGetMyGamesByUserId = (id: string) => {
  console.log('')
}

export const useAddToFavoriteGames = (userId: string) => {
  return useMutation(
    async (gameId: string) => {
      const gamesResponse = await restApiRequest<Game[]>({
        url: `games/${gameId}`
      })

      gameId = gamesResponse.length > 0 ? gamesResponse[0].id : ''

      if (gamesResponse.length === 0) {
        const newGame = await restApiRequest<GameDto, Game>({
          url: 'games',
          method: 'POST',
          data: {
            game_id: gameId
          }
        })
        gameId = newGame.id
      }

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

export const UseRemoveGamefromMyGamesWithUserId = (id: string) => {
  console.log('')
}
