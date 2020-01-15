import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import Imgix from "react-imgix"
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
}

const IS_CLIENT = typeof window !== "undefined"
const IS_DEV = process.env.NODE_ENV !== "production"

const thresholdArray = Array.from(Array(10).keys(), i => i / 10)

const Placeholder = ({ aspectRatio }: { aspectRatio: number }) => {
  const style = { "--aspect-ratio": aspectRatio } as CSSProperties
  return <div role="presentation" className="placeholder" style={style} />
}

function Image(props: Props): ReactElement {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [ref, entry] = useIntersect({
    rootMargin: "24px",
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
  } = props

  useEffect(() => {
    if (entry?.intersectionRatio > 0) {
      setOnScreen(true)
    }
  }, [entry])

  const url = IS_DEV ? `/images/${name}` : `https://dephotos.imgix.net/${name}`

  const imgClass = [
    "image__img",
    IS_CLIENT
      ? imageLoaded && onScreen
        ? "is-loaded"
        : "is-not-loaded"
      : "ssr",
  ].join(" ")

  const ssrStyle = !IS_CLIENT
    ? ({ "--aspect-ratio": aspectRatio } as CSSProperties)
    : null

  const image = (
    <Imgix
      src={url}
      sizes={`(orientation: portrait) calc(100vw - 1.5rem),
        (orientation: landscape) calc(80vh * ${aspectRatio}),
        300px`}
      htmlAttributes={{
        alt: description,
        loading: "lazy",
        onLoad: () => setImageLoaded(true),
        style: ssrStyle,
      }}
      className={imgClass}
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
        {(onScreen || !IS_CLIENT) && image}
        {!imageLoaded && IS_CLIENT ? (
          <Placeholder aspectRatio={aspectRatio} />
        ) : null}
      </div>
      <p className="image__info">
        {camera}, {`\u0192${fStop}, `}
        {speed} sec, {focalLength}, <span className="caps">ISO</span> {iso}
      </p>
    </div>
  )
}

export default Image
