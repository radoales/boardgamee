import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { firebaseApp } from '../../firebaseConfig'

export const UseGetFavoritesByUserId = (id: string): { data: string } => {
  const [data, setData] = useState<string>(' ')

  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const starCountRef = ref(db, `users/${id}/games/gameList`)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setData(data ?? '')
    })
  }, [id])

  return { data }
}

export const UseAddGameToMyGamesWithUserId = (id: string) => {
  const [data, setData] = useState<any>()

  const gameIds = UseGetFavoritesByUserId(id)

  const addToFavorites = (gameId: string) => {
    if (!gameIds.data.includes(gameId)) {
      const db = getDatabase(firebaseApp)
      set(ref(db, `users/${id}/games`), {
        gameList: gameIds.data.concat(`${gameId},`)
      })
        .then((data) => {
          setData(data)
        })
        .catch((error) => {
          setData(error)
        })
    }
  }

  return { data, addToFavorites }
}

export const UseRemoveGamefromMyGamesWithUserId = (id: string) => {
  const [data, setData] = useState<any>()

  const gameIds = UseGetFavoritesByUserId(id)

  const removeFromFavorites = (gameId: string) => {
    if (gameIds.data.includes(gameId)) {
      const db = getDatabase(firebaseApp)
      set(ref(db, `users/${id}/games`), {
        gameList: gameIds.data
          .split(',')
          .filter((id) => id !== gameId)
          .join(',')
      })
        .then((data) => {
          setData(data)
        })
        .catch((error) => {
          setData(error)
        })
    }
  }

  return { data, removeFromFavorites }
}
