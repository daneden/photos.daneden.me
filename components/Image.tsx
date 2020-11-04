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
    colors,
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
      alt={description}
      className="image"
      height={height}
      layout="responsive"
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
      <div
        ref={ref}
        className="pane"
        style={{
          ...(IS_CLIENT
            ? {
                opacity: Math.max(entry?.intersectionRatio || 0, 0.1),
                transform: `scale(${0.9 + entry?.intersectionRatio / 10})`,
              }
            : {}),
        }}
      >
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
          height: var(--imgSize);
          width: calc(var(--imgSize) * var(--aspect-ratio));
          transition: 0.5s ease;
          transition-property: transform, opacity;
        }

        .pane :global(.image) {
          border-radius: 4px;
          display: block;
          flex: 0 0 100%;
          object-fit: cover;
          object-position: center;
          transition: 0.3s ease opacity;
          opacity: 1;
        }

        @media (orientation: portrait) {
          .pane {
            height: auto;
            width: auto;
          }
        }
      `}</style>
    </>
  )
}

export default Image
