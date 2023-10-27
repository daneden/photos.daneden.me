import NextImage from "next/image"
import * as React from "react"

const { useEffect, useState } = React

export type Props = {
  aspectRatio: number
  camera: string
  alt: string
  focalLength: string
  fStop: number
  iso: number
  name: string
  speed: string
  width: number
  height: number
}

function Image(props: Props) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const {
    aspectRatio,
    camera,
    alt: description,
    fStop,
    focalLength,
    iso,
    name,
    width,
    height,
  } = props

  const url = `/images/${name}`

  const image = (
    <NextImage
      alt={description}
      className={`image ${imageLoaded ? "loaded" : "not-loaded"}`}
      height={height}
      onLoad={() => setImageLoaded(true)}
      src={url}
      width={width}
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
    <>
      <div className="pane">
        <div className="image-container">{image}</div>
        <p>
          {camera}, {`\u0192${fStop}, `}
          {speed} sec, {focalLength}, <span className="caps">ISO</span> {iso}
        </p>
      </div>
      <style jsx>{`
        .pane {
          --aspect-ratio: ${aspectRatio};
          display: flex;
          flex: 1 1 100%;
          transition: 0.5s ease;
          transition-property: transform, opacity;
        }

        .image-container {
          height: var(--imgSize);
          width: calc(var(--imgSize) * var(--aspect-ratio));
        }

        .pane :global(.image) {
          border-radius: 4px;
          display: block;
          flex: 0 0 100%;
          object-fit: cover;
          object-position: center;
          transition: 0.3s ease opacity;
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.15);
          height: var(--imgSize);
          max-width: 100%;
        }

        @media (orientation: portrait) {
          .pane {
            height: auto;
            width: auto;
          }

          .image-container {
            width: 100%;
            height: auto;
          }
        }
      `}</style>
    </>
  )
}

export default Image
