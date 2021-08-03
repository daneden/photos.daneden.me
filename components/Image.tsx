import * as React from "react"
import NextImage from "next/image"
import useIntersect from "../hooks/useIntersection"

const { useEffect, useState } = React

type Props = {
  aspectRatio: number
  camera: string
  alt: string
  focalLength: string
  fStop: number
  iso: number
  name: string
  speed: string
  colors: {
    vibrant: string
    darkVibrant: string
    lightVibrant: string
    muted: string
  }
  width: number
  height: number
}

const thresholdArray = Array.from(Array(10).keys(), (i) => i / 10)

function Image(props: Props) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [ref, entry] = useIntersect({
    rootMargin: "-5%",
    threshold: thresholdArray,
  })

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
    colors,
  } = props

  useEffect(() => {
    if (entry?.intersectionRatio > 0.5) {
      setOnScreen(true)
    } else {
      setOnScreen(false)
    }

    if (entry?.intersectionRatio >= 0.9 && onScreen) {
      document.documentElement.style.setProperty(
        "--foreground",
        colors.darkVibrant ?? "var(--darkGray)"
      )
      document.documentElement.style.setProperty(
        "--background",
        colors.lightVibrant ?? "var(--lightGray)"
      )
      document.documentElement.style.setProperty(
        "--highlight",
        colors.muted ?? "var(--foreground)"
      )
    }
  }, [colors.darkVibrant, colors.lightVibrant, colors.muted, entry, onScreen])

  const url = `/images/${name}`

  const image = (
    <NextImage
      alt={description}
      className={`image ${imageLoaded ? "loaded" : "not-loaded"}`}
      height={height}
      layout="responsive"
      onLoad={() => setImageLoaded(true)}
      src={url}
      width={width}
      sizes={`(orientation: landscape) calc(80vh * ${aspectRatio}), 100vw`}
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
      <div ref={ref} className="pane">
        <div className="image-container">{image}</div>
        <p>
          {camera}, {`\u0192${fStop}, `}
          {speed} sec, {focalLength}, <span className="caps">ISO</span> {iso}
        </p>
      </div>
      <style jsx>{`
        .image-container {
          opacity: ${onScreen ? 1 : 0.4};
          transition: 0.3s ease;
          transition-property: opacity;
        }
      `}</style>
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
