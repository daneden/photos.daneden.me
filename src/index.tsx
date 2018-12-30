import App from "./App"
import React from "react"
import { render } from "react-snapshot"

import "./index.css"
import imageData from "./manifest"
import SiteInfo from "./meta"

imageData.reverse()

render(
  <App preface={SiteInfo.fullDescription} images={imageData} />,
  document.getElementById("root")
)

// change vertical scroll to horizontal in content
let content: HTMLElement | null = document.querySelector(".site-content")
window.addEventListener("mousewheel", MouseWheelHandler)

function MouseWheelHandler(e: Event) {
  if (content && content !== undefined) {
    content.scrollLeft += (e as WheelEvent).deltaY
  } else {
    content = document.querySelector(".site-content")
  }
}
