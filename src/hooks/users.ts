import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { User } from '../types/user'
import { firebaseApp } from '../../firebaseConfig'

export const UseGetUsers = (): { data?: User[]; isLoading: boolean } => {
  const [data, setData] = useState<User[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const dbRef = ref(db, 'users')
    onValue(dbRef, (snapshot) => {
      const data: { [key: string]: { accountDetails: User } } = snapshot.val()
      setData(Object.values(data).map((user) => user.accountDetails))
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}

export const UseGetUserFriendsById = (
  id: string
): {
  data?: User[]
  isLoading: boolean
} => {
  const [data, setData] = useState<User[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const dbRef = ref(db, `users/${id}/friends`)
    onValue(dbRef, (snapshot) => {
      const data: { [key: string]: { accountDetails: User } } = snapshot.val()
      setData(Object.values(data).map((user) => user.accountDetails))
      setIsLoading(false)
    })
  }, [id])

  return { data, isLoading }
}

export const UseGetUserById = (id: string): { data?: User } => {
  const [data, setData] = useState<User>()
  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const dbRef = ref(db, `users/${id}`)
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      setData(data.accountDetails)
    })
  }, [id])

  return { data }
}

export const UseCreateUser = () => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const createUser = (id: string, email: string) => {
    const db = getDatabase()
    set(ref(db, `users/${id}/accountDetails`), {
      id,
      email
    })
      .then(() => {
        setIsSuccess(true)
      })
      .catch((error) => {
        setIsError(true)
        setError(error)
      })
  }

  return { createUser, isSuccess, isError, error }
}

export const UseUpdateUser = () => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const updateUser = (id: string, name: string, email: string) => {
    setIsSuccess(undefined)
    setIsError(undefined)
    const db = getDatabase()
    set(ref(db, `users/${id}/accountDetails`), {
      name,
      email,
      id
    })
      .then(() => {
        setIsSuccess(true)
      })
      .catch((error) => {
        setIsError(true)
        setError(error)
      })
  }

  return { updateUser, isSuccess, isError, error }
}
