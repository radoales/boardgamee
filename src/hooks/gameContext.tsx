import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { Game } from '../types/boardgame'

type GameContextProp = {
  selectedGame: Game
  setSelectedGame: Dispatch<SetStateAction<Game>>
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

type Props = {
  children: React.ReactNode
}

export const GameContext = createContext({} as GameContextProp)

export const GameProvider: React.FC<Props> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState({} as Game)
  const [userId, setUserId] = useState<string>()

  return (
    <GameContext.Provider
      value={{ selectedGame, setSelectedGame, userId, setUserId }}
    >
      {children}
    </GameContext.Provider>
  )
}
