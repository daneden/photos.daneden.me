import * as React from "react"
import { ReactElement } from "react"

const Header = (): ReactElement => {
  return (
    <header className="site-header">
      <h1 className="site-title">
        <a href="https://daneden.me">Daniel Eden</a> &mdash;&mdash; Photos
      </h1>
    </header>
  )
}

export default Header
