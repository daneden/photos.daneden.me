import { useEffect, useRef, useState } from "react"

export default function useIntersection({
  root = null,
  rootMargin,
  threshold = 0,
}: {
  root?: Element
  rootMargin?: string
  threshold: number | number[]
}) {
  const [entry, updateEntry] = useState(null)
  const [node, setNode] = useState(null)

  const observer =
    typeof window !== "undefined" && window.IntersectionObserver !== undefined
      ? useRef(
          new window.IntersectionObserver(([entry]) => updateEntry(entry), {
            root,
            rootMargin,
            threshold,
          })
        )
      : null

  useEffect(() => {
    const { current: currentObserver } = observer
    currentObserver.disconnect()

    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node, observer])

  return [setNode, entry]
}
