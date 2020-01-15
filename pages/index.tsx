import Head from "next/head"
import React, { useEffect } from "react"
import App from "../components/App"
import imageData from "../data/manifest"
import siteInfo from "../data/meta"

const images = imageData.slice().reverse()

function HomePage() {
  useEffect(() => {
    let content: HTMLElement = document.body
    window.addEventListener("mousewheel", MouseWheelHandler)

    function MouseWheelHandler(e) {
      if (content === undefined) {
        content = document.body
      } else {
        content.scrollLeft += e.deltaY
      }
    }

    return () => {
      window.removeEventListener("mousewheel", MouseWheelHandler)
    }
  })

  return (
    <>
      <Head>
        <title>{siteInfo.title}</title>
        <meta name="description" content={siteInfo.description} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_dte" />
        <meta property="og:title" content="Daniel Eden &mdash; Photography" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://dephotos.imgix.net/00013.jpg?auto=format&dpr=2&fm=pjpg&crop=faces&fit=max&w=1&h=900"
        />
        <meta property="og:description" content={siteInfo.description} />

        <link rel="preconnect" href="https://dephotos.imgix.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:500&display=swap&subset=latin-ext"
          rel="stylesheet"
        />
      </Head>
      <App preface={siteInfo.fullDescription} images={images} />
    </>
  )
}

export default HomePage
