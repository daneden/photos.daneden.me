type ImageData = {
  filename: String,
  fStop: number,
  shutterSpeed: String,
  iso: number,
  focalLength: String,
}

type AppProps = {
  preface?: String,
  startingImage: number,
  images: Array<ImageData>
}

type GHImageProps = {
  onClick: (i: number) => null,
  scrollIntoView: boolean,
  name: String,
  speed: String,
  iso: number,
  focalLength: String,
  fStop: number,
}

export {
  AppProps,
  ImageData,
  GHImageProps,
}
