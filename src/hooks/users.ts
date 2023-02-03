import { useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'

import { app } from '../../App'
import { AuthUser } from '../auth/AuthUserprovider'

export const UseGetUsers = (): { data?: AuthUser[]; isLoading: boolean } => {
  const [data, setData] = useState<AuthUser[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase(app)
    const dbRef = ref(db, 'users')
    onValue(dbRef, (snapshot) => {
      const data: { [key: string]: { accountDetails: AuthUser } } =
        snapshot.val()
      setData(Object.values(data).map((user) => user.accountDetails))
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}

export const UseGetUserFriendsById = (
  id: string
): {
  data?: AuthUser[]
  isLoading: boolean
} => {
  const [data, setData] = useState<AuthUser[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase(app)
    const dbRef = ref(db, `users/${id}/friends`)
    onValue(dbRef, (snapshot) => {
      const data: { [key: string]: { accountDetails: AuthUser } } =
        snapshot.val()
      setData(Object.values(data).map((user) => user.accountDetails))
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}

export const UseGetUserById = (id: string): { data?: AuthUser } => {
  const [data, setData] = useState<AuthUser>()
  useEffect(() => {
    const db = getDatabase(app)
    const dbRef = ref(db, `users/${id}`)
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      setData(data.accountDetails)
    })
  }, [])

  return { data }
}

export const UseCreateUser = () => {
  const [data, setData] = useState<any>()
  const createUser = (id: string, email: string) => {
    const db = getDatabase()
    set(ref(db, `users/${id}/accountDetails`), {
      id,
      email
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
    set(ref(db, `users/${id}/accountDetails`), {
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
