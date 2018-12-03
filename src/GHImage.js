// @flow
import * as React from "react"
import { useState } from "react"
import Imgix from "react-imgix"
import Waypoint from "react-waypoint"

type Props = {
  aspectRatio: number,
  camera: string,
  fStop: number,
  focalLength: string,
  iso: number,
  name: string,
  onClick?: () => void,
  speed: string,
}

function GHImage(props: Props): React.Node {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [onScreen, setOnScreen] = useState(false)

  let url = `https://dephotos.imgix.net/${props.name}`
  const imageName = props.name.split(".")[0]

  // Use local images for development
  if (
    process.env.PUBLIC_URL !== undefined &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toUpperCase() === "DEVELOPMENT"
  ) {
    url = `${process.env.PUBLIC_URL || ""}/images/${props.name}`
  }

  const imgClass = [
    imageLoaded === true && onScreen === true ? "is-loaded" : "is-not-loaded",
    "image__img",
  ]

  const image = (
    <Imgix
      customParams={{
        fm: "pjpg",
      }}
      fit={"max"}
      src={url}
      imgProps={{
        onLoad: () => setImageLoaded(true),
      }}
      className={imgClass.join(" ")}
    />
  )

  const placeholder = <div role="presentation" className="image__img" />

  const speed =
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
        {speed} sec, {props.focalLength}, ISO {props.iso}
      </p>
    </div>
  )
}

export default GHImage
