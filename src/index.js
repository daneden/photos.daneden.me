// @flow
import App from "./App"
import React from "react"
import { render } from "react-snapshot"

import "./index.css"
import imageData from "./manifest.js"
import SiteInfo from "./meta"

imageData.reverse()

render(
  <App preface={SiteInfo.fullDescription} images={imageData} />,
  document.getElementById("root")
)

// change vertical scroll to horizontal in content
let content: ?HTMLElement = document.querySelector(".site-content")
window.addEventListener("mousewheel", MouseWheelHandler)

function MouseWheelHandler(e) {
  if (content === undefined) {
    content = document.querySelector(".site-content")
  } else {
    // $FlowFixMe
    content.scrollLeft += e.deltaY
  }
}
