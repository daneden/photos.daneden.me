import * as React from "react"
import { ReactElement, ReactNode } from "react"
import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import Image from "./Image"

export type ImageData = {
  aspectRatio: number
  camera: string
  description: string
  fileName: string
  focalLength: string
  fStop: number
  iso: number
  shutterSpeed: string
  width: number
  height: number
  colors: {
    vibrant: string,
    darkVibrant: string,
    lightVibrant: string,
  }
}

type Props = {
  preface?: ReactElement
  images: Array<ImageData>
}

function Preface({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="pane pane--text">
      <GlobalStyles />
      <Header />
      {children}
    </div>
  )
}

function App(props: Props): ReactElement {
  return (
    <main className="site-content">
      <Preface>{props.preface}</Preface>
      {props.images.map((img, i) => (
        <Image
          key={i}
          aspectRatio={img.aspectRatio}
          camera={img.camera}
          fStop={img.fStop}
          focalLength={img.focalLength}
          iso={img.iso}
          name={img.fileName}
          speed={img.shutterSpeed}
          description={img.description}
          colors={img.colors}
          width={img.width}
          height={img.height}
        />
      ))}
    </main>
  )
}

export default App
