// @flow
import * as React from "react"
import Imgix from "react-imgix"
import { Waypoint } from "react-waypoint"

const { useState } = React

type Props = {
  aspectRatio: number,
  camera: string,
  fStop: number,
  focalLength: string,
  iso: number,
  name: string,
  speed: string,
}

// Placeholder element for images pending load
const placeholder = <div role="presentation" className="image__img" />

function Image(props: Props): React.Node {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [onScreen, setOnScreen] = useState(false)

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

  return (
    <div id={imageName} className="pane page--image">
      <Waypoint
        key={imageName}
        horizontal={true}
        topOffset="-200%"
        bottomOffset="0"
        onEnter={() => setOnScreen(true)}
        onLeave={() => setOnScreen(false)}
      />
      <div
        className="pane__image u-mb0"
        style={{
          minWidth: `calc((var(--imgHeight)) * ${props.aspectRatio})`,
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
