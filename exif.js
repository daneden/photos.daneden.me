const fs = require('fs');
const exiftool = require('node-exiftool');
const ep = new exiftool.ExiftoolProcess();

ep.open().then((pid) => {
  console.log('Started exiftool process %s', pid);
  return ep.readMetadata('./images/').then((res) => {
    logData(res);
  });
  // repeat as many times as required
}).then(() => {
  return ep.close().then(() => {
    console.log('Closed exiftool');
  });
});

let logData = (exifData) => {
  let fileInfo = [];

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

  fileInfo.sort((a, b) => {
    let keyA = parseInt(a.fileName.split('.')[0]),
        keyB = parseInt(b.fileName.split('.')[0]);
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
  });

  let writeString = `let imageData = ${JSON.stringify(fileInfo)};
    export default imageData;`

  fs.writeFile('./src/manifest.js', writeString, (err) => {
    if(err) return console.log(err);
  });
}
