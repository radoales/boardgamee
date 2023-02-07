import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { Game } from '../types/boardgame'

type GameContextProp = {
  selectedGame: Game
  setSelectedGame: Dispatch<SetStateAction<Game>>
}

type Props = {
  children: React.ReactNode
}

export const GameContext = createContext({} as GameContextProp)

export const GameProvider: React.FC<Props> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState({} as Game)

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  )
}
