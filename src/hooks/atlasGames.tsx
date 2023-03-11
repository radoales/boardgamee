import { PUBLIC_BOARDGAME_CLIENT_ID } from '@env'
import { useEffect, useState } from 'react'
import { Boardgames } from '../types/boardgame'
import { BG_API } from '../utils/constants'
import useDebounce from './useDebounce'

export const useGetBoardgames = (search: string, fields?: string) => {
  const [data, setData] = useState<Boardgames>()
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(false)
  const value = useDebounce(search)

  useEffect(() => {
    if (search.length) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      setData(undefined)
    }
  }, [search])

  useEffect(() => {
    if (value.length) {
      fetch(
        `${BG_API}/search?name=${value}&client_id=${PUBLIC_BOARDGAME_CLIENT_ID}&fuzzy_match=true&exact=true${
          fields ? `&fields=${fields}` : ''
        }`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not OK')
          }
          return res.json()
        })
        .then((res) => {
          setData(res)
          setIsLoading(false)
          setIsSuccess(true)
        })
        .catch((error) => {
          setError(`fetch error: ${error}`)
          setIsLoading(false)
          setIsError(true)
        })
    }
  }, [fields, value])
  return { data, error, isLoading, isError, isSuccess }
}

export const useGetBoardgamesByIds = (ids: string, fields?: string) => {
  const [data, setData] = useState<Boardgames>()
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (ids) {
      setIsLoading(true)
      fetch(
        `${BG_API}/search?ids=${ids}&client_id=${PUBLIC_BOARDGAME_CLIENT_ID}&fuzzy_match=true&exact=true${
          fields ? `&fields=${fields}` : ''
        }`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not OK')
          }
          return res.json()
        })
        .then((res) => {
          setData(res)
          setIsLoading(false)
          setIsSuccess(true)
        })
        .catch((error) => {
          setError(`fetch error: ${error}`)
          setIsError(true)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [fields, ids])
  return { data, error, isLoading, isSuccess, isError }
}

export const useGetPopularBoardgames = (search: string, fields?: string) => {
  const [data, setData] = useState<Boardgames>()
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(false)
  const value = useDebounce(search)

  useEffect(() => {
    if (search.length) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      setData(undefined)
    }
  }, [search])

  useEffect(() => {
    if (value.length) {
      fetch(
        `${BG_API}search?client_id=${PUBLIC_BOARDGAME_CLIENT_ID}${
          fields ? `&fields=${fields}` : ''
        }`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not OK')
          }
          return res.json()
        })
        .then((res) => {
          setData(res)
          setIsLoading(false)
          setIsSuccess(true)
        })
        .catch((error) => {
          setError(`fetch error: ${error}`)
          setIsLoading(false)
          setIsError(true)
        })
    }
  }, [fields, value])
  return { data, error, isLoading, isError, isSuccess }
}
