import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { restApiRequest } from '../utils/api'

export const UseGetUsers = (): { data?: User[]; isLoading: boolean } => {
  const [data, setData] = useState<User[]>()
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      const response = await restApiRequest<User[]>({ url: `users` })
      setData(response)
      setIsLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    getData()
  }, [])

  return { data, isLoading }
}

export const UseGetUserById = (id: string): { data?: User } => {
  const [data, setData] = useState<User>()
  const getData = async (id: string) => {
    try {
      const response = await restApiRequest<User[]>({ url: `users/${id}` })
      setData(response[0])
    } catch (error) {}
  }

  useEffect(() => {
    if (id) {
      getData(id)
    }
  }, [id])

  return { data }
}

export const UseUpdateUser = () => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const updateUser = (id: string, name: string, email: string) => {
    setIsSuccess(undefined)
    setIsError(undefined)
    restApiRequest<Partial<User>>({
      url: 'users',
      method: 'PUT',
      data: { id, name, email, username: name }
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
