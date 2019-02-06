// @flow
import GHImage from "./GHImage"
import Header from "./Header"
import * as React from "react"

type ImageData = {
  aspectRatio: number,
  camera: string,
  fStop: number,
  fileName: string,
  focalLength: string,
  iso: number,
  shutterSpeed: string,
}

type Props = {
  preface?: React.Node,
  images: Array<ImageData>,
}

function Preface({ children }): React.Node {
  return (
    <div className="pane pane--text">
      <Header />
      {children}
    </div>
  )
}

function App(props: Props): React.Node {
  return (
    <div className="site-root">
      <main className="site-content">
        <Preface>{props.preface}</Preface>
        {props.images.map((img, i) => (
          <GHImage
            key={i}
            aspectRatio={img.aspectRatio}
            camera={img.camera}
            fStop={img.fStop}
            focalLength={img.focalLength}
            iso={img.iso}
            name={img.fileName}
            speed={img.shutterSpeed}
          />
        ))}
      </main>
    </div>
  )
}

export default App
