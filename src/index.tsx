import React from "react"
import { render } from "react-snapshot"
import App from "./App"
import "./index.css"
import imageData from "./manifest"
import siteInfo from "./meta"

imageData.reverse()

render(
  <App preface={siteInfo.fullDescription} images={imageData} />,
  document.getElementById("root")
)

let content: HTMLElement = document.body
window.addEventListener("mousewheel", MouseWheelHandler)

function MouseWheelHandler(e) {
  if (content === undefined) {
    content = document.body
  } else {
    content.scrollLeft += e.deltaY
  }
}
