"use strict";
const fs = require('fs');
const exiftool = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');
const ep = new exiftool.ExiftoolProcess(exiftoolBin);

ep.open().then((pid) => {
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
});

let logData = (exifData) => {
  let fileInfo = [];

  // Transform the data to remove all but the info we care about
  exifData.data.forEach((datum) => {
    let info = {
      fileName: datum.FileName,
      fStop: datum.FNumber,
      shutterSpeed: datum.ShutterSpeed,
      iso: datum.ISO,
      focalLength: datum.FocalLength.replace(' ', '')
    }

    fileInfo.push(info);
  });

  // Sort the image data by filename
  fileInfo.sort((a, b) => {
    let keyA = parseInt(a.fileName.split('.')[0]),
        keyB = parseInt(b.fileName.split('.')[0]);
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
  });

  // Write data to file for the app to consume
  let writeString = `let imageData = ${JSON.stringify(fileInfo)};
    export default imageData;`

  fs.writeFile('./src/manifest.js', writeString, (err) => {
    if(err) return console.log(err);
  });
}
