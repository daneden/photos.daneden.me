import GHImage from "./GHImage"
import Header from "./Header"
import React from "react"

interface AppProps {
  preface?: JSX.Element
  images: Array<ImageMetadata>
}

interface PrefaceProps {
  children?: React.ReactNode
}

const Preface: React.SFC<PrefaceProps> = ({ children }) => (
  <div className="pane pane--text">
    <Header />
    {children}
  </div>
)

const App: React.SFC<AppProps> = props => (
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
          speed={String(img.shutterSpeed)}
        />
      ))}
    </main>
  </div>
)

export default App
