import * as React from "react"
import { ReactElement, ReactNode } from "react"
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
}

type Props = {
  preface?: ReactElement
  images: Array<ImageData>
}

function Preface({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="pane pane--text">
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
        />
      ))}
    </main>
  )
}

export default App
