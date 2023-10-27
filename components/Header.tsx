import { ReactElement } from "react"

const Header = (): ReactElement => {
  return (
    <header className="site-header">
      <h1 className="site-title">
        photos.<a href="https://daneden.me">daneden.me</a>
      </h1>
    </header>
  )
}

export default Header
