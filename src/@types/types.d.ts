declare module "react-imgix"
declare module "react-snapshot"

type ImageDataArray = ImageMetadata[]

interface ImageMetadata {
  aspectRatio: number
  camera: string
  fStop: number
  fileName: string
  focalLength: string
  iso: number
  shutterSpeed: string
}
