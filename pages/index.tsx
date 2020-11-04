import Head from "next/head"
import React, { useEffect } from "react"
import App from "../components/App"
import imageData from "../data/manifest"
import siteInfo from "../data/meta"

const images = imageData.slice().reverse()

function HomePage() {
  useEffect(() => {
    let content: HTMLElement = document.body
    window.addEventListener("mousewheel", scrollHandler)

    function scrollHandler(e) {
      if (content === undefined) {
        content = document.body
      } else {
        content.scrollLeft += e.deltaY
        content.setAttribute("style", `--scroll-delta: ${content.scrollLeft}`)
      }
    }

    return () => {
      window.removeEventListener("mousewheel", scrollHandler)
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
          content="https://photos.daneden.me/images/00013.jpg"
        />
        <meta property="og:description" content={siteInfo.description} />
      </Head>

      <App preface={siteInfo.fullDescription} images={images} />
    </>
  )
}

export default HomePage
