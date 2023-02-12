import { ImageSourcePropType } from 'react-native'

export type Boardgames = {
  count: number
  games: Game[]
}

export type Game = {
  id: string
  artists: string[]
  description_preview: string
  description: string
  handle: string
  image_url: string
  thumb_url: string
  name: string
  max_players: number
  min_players: number
  official_url: string
  min_playtime: number
  max_playtime: number
  rules_url: string
  type: string
  average_user_rating: number
  num_user_ratings: number
  min_age: number
}
