import { useEffect, useState } from "react"

export default function useMatchMedia(query) {
  const mq =
    window.matchMedia !== undefined
      ? window.matchMedia(query)
      : { matches: false }
  const [matches, setMatches] = useState(mq.matches)

  useEffect(() => {
    function updateMqMatches(mediaQueryList) {
      setMatches(mediaQueryList.matches)
    }

    if (mq instanceof MediaQueryList) {
      mq.addListener(updateMqMatches)

      return () => {
        mq.removeListener(updateMqMatches)
      }
    }
  }, [mq])

  return matches
}
