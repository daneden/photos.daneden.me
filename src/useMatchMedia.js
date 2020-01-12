import { useEffect, useState } from "react"

export default function useMatchMedia(query) {
  if (typeof window === undefined || window.matchMedia === undefined) {
    return null
  }

  const mq = window.matchMedia(query)
  const [matches, setMatches] = useState(mq.matches)

  useEffect(() => {
    function updateMqMatches(mediaQueryList) {
      setMatches(mediaQueryList.matches)
    }

    mq.addListener(updateMqMatches)

    return () => {
      mq.removeListener(updateMqMatches)
    }
  }, [mq])

  return matches
}
