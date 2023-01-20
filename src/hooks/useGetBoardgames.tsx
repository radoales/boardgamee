import { PUBLIC_BOARDGAME_CLIENT_ID } from '@env'
import { useEffect, useState } from 'react'
import { boardgames } from '../types/boardgame'

const useGetBoardgames = (search: string) => {
  const [results, setResults] = useState<boardgames>()
  const [error, setError] = useState<string>()
  useEffect(() => {
    if (search.length) {
      fetch(
        `https://api.boardgameatlas.com/api/search?name=${search}&client_id=${PUBLIC_BOARDGAME_CLIENT_ID}&fuzzy_match=true&exact=true`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not OK')
          }
          return res.json()
        })
        .then((res) => setResults(res))
        .catch((error) => setError(`fetch error: ${error}`))
    }
  }, [search])
  return { results, error }
}

export default useGetBoardgames
