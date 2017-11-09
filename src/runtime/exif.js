"use strict";
const fs = require('fs');
const exiftool = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');
const ep = new exiftool.ExiftoolProcess(exiftoolBin);

const CAMERAS = {
  'SONY': 'Sony α6000',
  'LEICA CAMERA AG': 'Leica Q',
}

ep.open().then(pid => {
  console.log('Started exiftool process %s', pid);
  return ep.readMetadata('./public/images/').then((res) => {
    logData(res);
  }).catch(error => {
    console.log('Error: ', error);
  });
}).then(() => {
  return ep.close().then(() => {
    console.log('Closed exiftool');
  });
}).catch(error =>{
  console.log(error);
});

let logData = exifData => {
  let fileInfo = [];

  // Transform the data to remove all but the info we care about
  exifData.data.forEach(datum => {
    // The aspect ratio here is actually in terms of
    // height:width (instead of typical width:height)
    // since they all have a fixed height relative to the
    // viewport
    const aspectRatio = datum.ImageSize
      .split('x')
      .map(n => parseInt(n))
      .reduce((w, h) => w/h)

    const info = {
      aspectRatio,
      camera: CAMERAS[datum.Make],
      fStop: datum.FNumber || 16,
      fileName: datum.FileName,
      // I only have one manual lens, but this ternary is a hacky workaround.
      focalLength: datum.FocalLength ? datum.FocalLength.replace(' ', '') : "12mm",
      iso: datum.ISO,
      shutterSpeed: datum.ShutterSpeed,
    }

    fileInfo.push(info)
  })

  // Sort the image data by filename
  fileInfo.sort((a, b) => {
    let keyA = parseInt(a.fileName.split('.')[0]),
        keyB = parseInt(b.fileName.split('.')[0])
    if(keyA < keyB) return -1
    if(keyA > keyB) return 1
    return 0
  })

  // Write data to file for the app to consume
  let writeString = `const imageData = ${JSON.stringify(fileInfo, null, ' ')};
    export default imageData;`

  fs.writeFile('./src/manifest.js', writeString, err => {
    if(err) return console.log(err);
  });
}
