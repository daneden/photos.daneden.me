"use strict"
const fs = require("fs")
const exiftool = require("node-exiftool")
const exiftoolBin = require("dist-exiftool")
const ep = new exiftool.ExiftoolProcess(exiftoolBin)
const Vibrant = require("node-vibrant")
const path = require("path")

const CAMERAS = {
  SONY: "Sony a6000",
  "LEICA CAMERA AG": "Leica Q",
}

async function createManifestFromExifData(exifData) {
  let fileInfo = []

  const promises = exifData.data.map(async (datum) => {
    const filePath = path.join(
      process.cwd(),
      "public",
      "images",
      datum.FileName
    )
    const vb = new Vibrant(filePath, { maxDimension: 12 })
    return vb
      .getPalette()
      .then((palette) => {
        return {
          name: datum.FileName,
          vibrant: palette.Vibrant.hex,
          darkVibrant: palette.DarkVibrant.hex,
          lightVibrant: palette.LightVibrant.hex,
          muted: palette.Muted.hex,
        }
      })
      .catch((e) => console.error(e))
  })

  const colors = await Promise.all(promises)

  // Transform the data to remove all but the info we care about
  exifData.data.forEach(async (datum) => {
    // The aspect ratio here is actually in terms of
    // height:width (instead of typical width:height)
    // since they all have a fixed height relative to the
    // viewport
    const [width, height] = datum.ImageSize.split("x").map((n) => parseInt(n))
    const aspectRatio = [width, height].reduce((w, h) => w / h)

    const colorPalette = colors.find((entry) => {
      return entry.name === datum.FileName
    })

    delete colorPalette.name

    const info = {
      aspectRatio,
      camera: CAMERAS[datum.Make],
      fStop: datum.FNumber || 16,
      fileName: datum.FileName,
      // I only have one manual lens, but this ternary is a hacky workaround.
      focalLength: datum.FocalLength
        ? datum.FocalLength.replace(" ", "")
        : "12mm",
      iso: datum.ISO,
      shutterSpeed: String(datum.ShutterSpeed),
      description: datum.Description || "",
      width,
      height,
      colors: colorPalette,
    }

    fileInfo.push(info)
  })

  // Sort the image data by filename
  fileInfo.sort((a, b) => {
    let keyA = parseInt(a.fileName.split(".")[0]),
      keyB = parseInt(b.fileName.split(".")[0])
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  // Write data to file for the app to consume
  let writeString = `import { ImageData } from "../components/App"
const imageData: Array<ImageData> = ${JSON.stringify(fileInfo, null, " ")}
export default imageData`

  fs.writeFile("./data/manifest.ts", writeString, (err) => {
    if (err) return console.log(err)
  })
}

ep.open()
  .then((pid) => {
    console.log(`🏁  Started exiftool process (PID: ${pid})`)
    console.log("📸  Extracting photo metadata...")
    return ep
      .readMetadata("./public/images/")
      .then(async (res) => {
        await createManifestFromExifData(res)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
  })
  .then(() => {
    return ep.close().then(() => {
      console.log("✅  Metadata extracted! Closing exiftool.")
    })
  })
  .catch((error) => {
    console.error("🚨  Error extracting photo metadata!", error)
  })
