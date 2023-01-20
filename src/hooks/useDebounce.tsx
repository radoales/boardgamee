import { useState, useEffect } from "react"

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("")
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, 1000)
    return () => {
      clearTimeout(handler)
    }
  }, [value])
  return debouncedValue
}

export default useDebounce
