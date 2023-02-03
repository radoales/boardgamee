import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { app } from '../../App'

export const UseGetFavoritesByUserId = (id: string): { data: string } => {
  const [data, setData] = useState<string>(' ')

  useEffect(() => {
    const db = getDatabase(app)
    const starCountRef = ref(db, `users/${id}/games/gameList`)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setData(data ?? '')
    })
  }, [id])

  return { data }
}

export const UseAddGameToFavoritesWithUserId = (
  id: string,
  gameIds: string
) => {
  const [data, setData] = useState<any>()

  const addToFavorites = (gameId: string) => {
    if (!gameIds.includes(gameId)) {
      const db = getDatabase(app)
      set(ref(db, `users/${id}/games`), {
        gameList: gameIds.concat(`,${gameId}`)
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

export const UseRemoveGamefromFavoritesWithUserId = (
  id: string,
  gameIds: string
) => {
  const [data, setData] = useState<any>()

  const removeFromFavorites = (gameId: string) => {
    if (gameIds.includes(gameId)) {
      const db = getDatabase(app)
      set(ref(db, `users/${id}/games`), {
        gameList: gameIds
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
