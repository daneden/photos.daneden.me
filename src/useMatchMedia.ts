import { useEffect, useState } from "react"

export default function useMatchMedia(query) {
  const mq = window.matchMedia !== undefined ? window.matchMedia(query) : null
  const [matches, setMatches] = useState(mq !== null ? mq.matches : false)

  useEffect(() => {
    function updateMqMatches(mediaQueryList) {
      setMatches(mediaQueryList.matches)
    }

    if (mq !== null) {
      mq.addListener(updateMqMatches)

      return () => {
        mq.removeListener(updateMqMatches)
      }
    }
  }, [mq])

  return matches
}
