import { ImageSourcePropType } from 'react-native'

export type boardgames = {
  count: number
  games: games[]
}

type games = {
  id: string
  artists: string[]
  description_preview: string
  description: string
  handle: string
  image_url: ImageSourcePropType
  name: string
  max_players: number
  min_players: number
  official_url: string
  min_playtime: number
  max_playtime: number
  rules: string
}
