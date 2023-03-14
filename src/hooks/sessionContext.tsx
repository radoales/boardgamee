import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { Game } from '../types/boardgame'
import { UserGame } from '../models/userGame'

type SessionContextProp = {
  selectedGame: Game
  setSelectedGame: Dispatch<SetStateAction<Game>>
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
  userGames: UserGame[]
  setUserGames: Dispatch<SetStateAction<UserGame[]>>
}

type Props = {
  children: React.ReactNode
}

export const SessionContext = createContext({} as SessionContextProp)

export const GameProvider: React.FC<Props> = ({ children }) => {
  const [userGames, setUserGames] = useState<UserGame[]>([])
  const [selectedGame, setSelectedGame] = useState({} as Game)
  const [userId, setUserId] = useState<string>('')

  return (
    <SessionContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        userId,
        setUserId,
        userGames,
        setUserGames
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
