import { PUBLIC_BOARDGAME_CLIENT_ID } from '@env'
import { useEffect, useState } from 'react'

const useGetBoardgames = (search: string) => {
  const [results, setResults] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    if (search.length) {
      fetch(
        `https://api.boardgameatlas.com/api/search?name=${search}&client_id=${PUBLIC_BOARDGAME_CLIENT_ID}&fuzzy_match=true&exact=true`
      )
        .then((res) => res.json())
        .then((res) => console.log(res))
    }
  }, [search])
  return { results, error }
}

export default useGetBoardgames
