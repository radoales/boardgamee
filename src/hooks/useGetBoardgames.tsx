import { PUBLIC_BOARDGAME_CLIENT_ID } from '@env'
import { useEffect, useState } from 'react'
import { boardgames } from '../types/boardgame'
import useDebounce from './useDebounce'

const useGetBoardgames = (search: string, fields?: string) => {
  const [results, setResults] = useState<boardgames>()
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
        `https://api.boardgameatlas.com/api/search?name=${value}&client_id=${PUBLIC_BOARDGAME_CLIENT_ID}&fuzzy_match=true&exact=true${
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
  }, [value])
  return { results, error, isLoading }
}

export default useGetBoardgames
