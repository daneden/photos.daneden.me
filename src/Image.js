// @flow
import * as React from "react"
import Imgix from "react-imgix"
import useIntersect from "./useIntersection"
import useMatchMedia from "./useMatchMedia"

const { useEffect, useState } = React

type Props = {
  aspectRatio: number,
  camera: string,
  fStop: number,
  focalLength: string,
  iso: number,
  name: string,
  speed: string,
}

const KEYFRAMES = 200
const buildThresholdArray = () =>
  Array.from(Array(KEYFRAMES).keys(), i => i / KEYFRAMES)

// Placeholder element for images pending load
const placeholder = <div role="presentation" className="image__img" />

function Image(props: Props): React.Node {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const isPortrait = useMatchMedia("(orientation: portrait)")
  const [ref, entry] = useIntersect({
    threshold: buildThresholdArray(),
  })

  useEffect(() => {
    if (entry.intersectionRatio > 0) {
      setOnScreen(true)
    } else {
      setOnScreen(false)
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
      sizes={`calc((var(--imgHeight)) * ${props.aspectRatio})`}
      htmlAttributes={{
        loading: "lazy",
        onLoad: () => setImageLoaded(true),
      }}
      className={imgClass}
    />
  )

  // The image name will be used as the unique key
  const imageName = props.name.split(".")[0]

  const speed =
    // If the shutter speed is a fraction, we want to style it appropriately.
    String(props.speed).indexOf("/") === -1 ? (
      <span>{props.speed}</span>
    ) : (
      <span className="frac">{props.speed}</span>
    )

  const size = `calc(var(--imgSize) ${isPortrait ? "/" : "*"} ${
    props.aspectRatio
  })`

  return (
    <div
      ref={ref}
      id={imageName}
      className="pane page--image"
      style={{
        opacity: entry.intersectionRatio,
        transform: `scale(${0.9 + entry.intersectionRatio / 10})`,
      }}
    >
      <div
        className="pane__image u-mb0"
        style={{
          minWidth: !isPortrait ? size : "100%",
          minHeight: isPortrait ? size : null,
        }}
      >
        {onScreen ? image : placeholder}
      </div>
      <p className="image__info u-mb0">
        {props.camera}, {`\u0192${props.fStop}, `}
        {speed} sec, {props.focalLength}, <span className="caps">ISO</span>{" "}
        {props.iso}
      </p>
    </div>
  )
}

export default Image
