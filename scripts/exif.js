"use strict"
const fs = require("fs")
const exiftool = require("node-exiftool")
const exiftoolBin = require("dist-exiftool")
const ep = new exiftool.ExiftoolProcess(exiftoolBin)

const CAMERAS = {
  SONY: {
    "ILCE-6000": "Sony a6000",
  },
  "LEICA CAMERA AG": {
    "LEICA Q (Typ 116)": "Leica Q",
    "LEICA SL2-S": "Leica SL2-S",
  },
}

async function createManifestFromExifData(exifData) {
  let fileInfo = []

  // Transform the data to remove all but the info we care about
  exifData.data.forEach(async (datum) => {
    // The aspect ratio here is actually in terms of
    // height:width (instead of typical width:height)
    // since they all have a fixed height relative to the
    // viewport
    const [width, height] = datum.ImageSize.split("x").map((n) => parseInt(n))
    const aspectRatio = [width, height].reduce((w, h) => w / h)

    const info = {
      aspectRatio,
      camera: CAMERAS[datum.Make][datum.Model] ?? datum.Make,
      fStop: datum.FNumber || 16,
      name: datum.FileName,
      // I only have one manual lens, but this ternary is a hacky workaround.
      focalLength: datum.FocalLength
        ? datum.FocalLength.replace(" ", "")
        : "12mm",
      iso: datum.ISO,
      speed: String(datum.ShutterSpeed),
      alt: datum.Description || "",
      width,
      height,
    }

    fileInfo.push(info)
  })

  // Sort the image data by filename
  fileInfo.sort((a, b) => {
    let keyA = parseInt(a.name.split(".")[0]),
      keyB = parseInt(b.name.split(".")[0])
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  // Write data to file for the app to consume
  let writeString = `import { Props as ImageData } from "../components/Image"
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
