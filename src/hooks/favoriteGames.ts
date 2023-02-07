import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { firebaseApp } from '../../firebaseConfig'

export const UseGetMyGamesByUserId = (id: string): { data: string } => {
  const [data, setData] = useState<string>(' ')

  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const dbRef = ref(db, `users/${id}/games/gameList`)
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      setData(data ?? '')
    })
  }, [id])

  return { data }
}

export const UseAddGameToMyGamesWithUserId = (id: string) => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()

  const gameIds = UseGetMyGamesByUserId(id)

  const addToMyGames = (gameId: string) => {
    if (!gameIds.data.includes(gameId)) {
      const db = getDatabase(firebaseApp)
      set(ref(db, `users/${id}/games`), {
        gameList: gameIds.data.concat(`${gameId},`)
      })
        .then(() => {
          setIsSuccess(true)
        })
        .catch((error) => {
          setIsError(true)
          setError(error)
        })
    }
  }

  return { addToMyGames, isSuccess, isError, error }
}

export const UseRemoveGamefromMyGamesWithUserId = (id: string) => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()

  const gameIds = UseGetMyGamesByUserId(id)

  const removeFromMyGames = (gameId: string) => {
    if (gameIds.data.includes(gameId)) {
      const db = getDatabase(firebaseApp)
      set(ref(db, `users/${id}/games`), {
        gameList: gameIds.data
          .split(',')
          .filter((id) => id !== gameId)
          .join(',')
      })
        .then(() => {
          setIsSuccess(true)
        })
        .catch((error) => {
          setIsError(true)
          setError(error)
        })
    }
  }

  return { removeFromMyGames, isSuccess, isError, error }
}
