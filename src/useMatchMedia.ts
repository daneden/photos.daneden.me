import { useEffect, useState } from "react"

export default function useMatchMedia(query) {
  const mq = window?.matchMedia(query)
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
