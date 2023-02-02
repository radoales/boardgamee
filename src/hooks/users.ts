import { useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'

import { app } from '../../App'
import { AuthUser } from '../auth/AuthUserprovider'

export const UseGetUsers = (): { data?: AuthUser[]; isLoading: boolean } => {
  const [data, setData] = useState<AuthUser[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase(app)
    const starCountRef = ref(db, 'users')
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setData(data)
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}

export const UseGetUserById = (id: string): { data?: AuthUser } => {
  const [data, setData] = useState<AuthUser>()
  useEffect(() => {
    const db = getDatabase(app)
    const starCountRef = ref(db, `users/${id}`)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setData(data)
    })
  }, [])

  return { data }
}

export const UseCreateUser = () => {
  const [data, setData] = useState<any>()
  const createUser = (id: string, email: string) => {
    const db = getDatabase()
    set(ref(db, `users/${id}`), {
      email: email,
      id
    })
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        setData(error)
      })
  }

  return { data, createUser }
}

export const UseUpdateUser = () => {
  const [data, setData] = useState<any>()
  const updateUser = (id: string, name: string, email: string) => {
    const db = getDatabase()
    set(ref(db, `users/${id}`), {
      name,
      email,
      id
    })
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        setData(error)
      })
  }

  return { data, updateUser }
}
