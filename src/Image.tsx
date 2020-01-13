import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import Imgix from "react-imgix"
import useIntersect from "./useIntersection"

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

const buildThresholdArray = () => Array.from(Array(10).keys(), i => i / 10)

const Placeholder = ({ aspectRatio }: { aspectRatio: number }) => {
  const style = { "--aspect-ratio": aspectRatio } as CSSProperties
  return <div role="presentation" className="placeholder" style={style} />
}

function Image(props: Props): ReactElement {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [ref, entry] = useIntersect({
    rootMargin: "24px",
    threshold: buildThresholdArray(),
  })

  useEffect(() => {
    if (entry?.intersectionRatio > 0) {
      setOnScreen(true)
    }
  }, [entry])

  // Use local images for development
  let url = `https://dephotos.imgix.net/${props.name}`
  if (
    process.env.PUBLIC_URL !== undefined &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toUpperCase() === "DEVELOPMENT"
  ) {
    url = `${process.env.PUBLIC_URL || ""}/images/${props.name}`
  }

  const imgClass = [
    "image__img",
    // Controls transition when the image is in view and loaded
    imageLoaded && onScreen ? "is-loaded" : "is-not-loaded",
  ].join(" ")

  const image = (
    <Imgix
      src={url}
      sizes={`calc((var(--imgSize)) * ${props.aspectRatio})`}
      htmlAttributes={{
        alt: props.description,
        loading: "lazy",
        onLoad: () => setImageLoaded(true),
      }}
      className={imgClass}
    />
  )

  const speed =
    // If the shutter speed is a fraction, we want to style it appropriately.
    String(props.speed).includes("/") ? (
      <span className="frac">{props.speed}</span>
    ) : (
      props.speed
    )

  return (
    <div
      ref={ref}
      className="pane pane--image"
      style={{
        opacity: entry?.intersectionRatio,
        transform: `scale(${0.9 + entry?.intersectionRatio / 10})`,
      }}
    >
      <div className="pane__image">
        {onScreen ? image : <Placeholder aspectRatio={props.aspectRatio} />}
        <noscript>
          <img src={url} alt={props.description} />
        </noscript>
      </div>
      <p className="image__info">
        {props.camera}, {`\u0192${props.fStop}, `}
        {speed} sec, {props.focalLength}, <span className="caps">ISO</span>{" "}
        {props.iso}
      </p>
    </div>
  )
}

export default Image
