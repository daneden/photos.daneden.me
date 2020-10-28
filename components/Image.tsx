import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import NextImage from "next/image"
import useIntersect from "../hooks/useIntersection"

const { useEffect, useState } = React

type Props = {
  aspectRatio: number
  camera: string
  description: string
  focalLength: string
  fStop: number
  iso: number
  name: string
  speed: string
  colors: {
    vibrant: string
    darkVibrant: string
    lightVibrant: string
  }
  width: number
  height: number
}

const IS_CLIENT = typeof window !== "undefined"

const thresholdArray = Array.from(Array(10).keys(), (i) => i / 10)

const Placeholder = ({ aspectRatio }: { aspectRatio: number }) => {
  const style = { "--aspect-ratio": aspectRatio } as CSSProperties
  return (
    <div role="presentation" className="placeholder image__img" style={style} />
  )
}

function Image(props: Props): ReactElement {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [ref, entry] = useIntersect({
    rootMargin: "-5%",
    threshold: thresholdArray,
  })
  const {
    aspectRatio,
    camera,
    description,
    fStop,
    focalLength,
    iso,
    name,
    width,
    height,
    colors
  } = props

  useEffect(() => {
    if (entry?.intersectionRatio > 0.1) {
      setOnScreen(true)
    }

    if (entry?.intersectionRatio >= 0.9 && onScreen) {
      document.documentElement.style.setProperty(
        "--background",
        colors.darkVibrant ?? "var(--darkGray)"
      )
      document.documentElement.style.setProperty(
        "--foreground",
        colors.lightVibrant ?? "var(--lightGray)"
      )
    }
  }, [entry, onScreen])

  const url = `/images/${name}`

  const image = (
    <NextImage
      src={url}
      alt={description}
      onLoad={() => setImageLoaded(true)}
      unsized={true}
      priority={true}
      className={"image__img"}
    />
  )

  const speed =
    // If the shutter speed is a fraction, we want to style it appropriately.
    props.speed.includes("/") ? (
      <span className="frac">{props.speed}</span>
    ) : (
      props.speed
    )

  return (
    <div
      ref={ref}
      className="pane pane--image"
      style={
        IS_CLIENT
          ? {
              opacity: Math.max(entry?.intersectionRatio || 0, 0.1),
              transform: `scale(${0.9 + entry?.intersectionRatio / 10})`,
            }
          : null
      }
    >
      <div className="pane__image">
        {image}
      </div>
      <p className="image__info">
        {camera}, {`\u0192${fStop}, `}
        {speed} sec, {focalLength}, <span className="caps">ISO</span> {iso}
      </p>
    </div>
  )
}

export default Image
