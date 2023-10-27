import { ReactElement, ReactNode } from "react"
import altDescriptions from "../data/altDescriptions.json"
import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import Image, { Props as ImageProps } from "./Image"

type Props = {
  preface?: ReactElement
  images: Array<ImageProps>
}

function Preface({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
      <div className="pane pane--text">
        <GlobalStyles />
        <Header />
        {children}
      </div>
      <style jsx>{`
        @media (orientation: landscape) {
          .pane {
            position: sticky;
            left: 0;
            top: 0;
            transform: translateY(
              calc(
                max(
                  min(var(--scroll-delta), 300) / 300 * var(--baseline) * -2,
                  -2rem
                )
              )
            );
          }
        }
      `}</style>
    </>
  )
}

function App(props: Props): ReactElement {
  return (
    <>
      <main className="site-content">
        <Preface>
          <div className="content">{props.preface}</div>
        </Preface>
        {props.images.map((img, i) => (
          <Image
            key={i}
            aspectRatio={img.aspectRatio}
            camera={img.camera}
            fStop={img.fStop}
            focalLength={img.focalLength}
            iso={img.iso}
            name={img.name}
            speed={img.speed}
            alt={altDescriptions[img.name]}
            width={img.width}
            height={img.height}
          />
        ))}
      </main>
      <style jsx>{`
        .content {
          opacity: calc((200 - var(--scroll-delta)) / 200);
        }
      `}</style>
    </>
  )
}

export default App
