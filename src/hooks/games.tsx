import { PUBLIC_BOARDGAME_CLIENT_ID } from '@env'
import { useEffect, useState } from 'react'
import { Boardgames } from '../types/boardgame'
import { BG_API } from '../utils/constants'
import useDebounce from './useDebounce'

export const useGetBoardgames = (search: string, fields?: string) => {
  const [results, setResults] = useState<Boardgames>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const value = useDebounce(search)

  useEffect(() => {
    if (search.length) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      setResults(undefined)
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
          setResults(res)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(`fetch error: ${error}`)
          setIsLoading(false)
        })
    }
  }, [fields, value])
  return { results, error, isLoading }
}

export const useGetBoardgamesByIds = (ids: string, fields?: string) => {
  const [results, setResults] = useState<Boardgames>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (ids.length) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      setResults(undefined)
    }
  }, [ids])

  useEffect(() => {
    if (ids.length) {
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
          setResults(res)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(`fetch error: ${error}`)
          setIsLoading(false)
        })
    }
  }, [fields, ids])
  return { results, error, isLoading }
}

export const useGetPopularBoardgames = (search: string, fields?: string) => {
  const [data, setData] = useState<Boardgames>()
  const [error, setError] = useState<string>()
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
        })
        .catch((error) => {
          setError(`fetch error: ${error}`)
          setIsLoading(false)
        })
    }
  }, [fields, value])
  return { data, error, isLoading }
}
