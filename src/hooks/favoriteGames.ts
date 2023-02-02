import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { app } from '../../App'

export const UseGetFavoritesByUserId = (
  id: string
): { data?: { id: string }[] } => {
  const [data, setData] = useState<{ id: string }[]>()

  useEffect(() => {
    const db = getDatabase(app)
    const starCountRef = ref(db, `users/${id}/games`)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setData(data)
    })
  }, [id])

  return { data }
}
