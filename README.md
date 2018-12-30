# photos.daneden.me

A place for my photos to shine (in more glory than Instagram can deliver).

## How does this work?

I used the amazing [create-react-app](https://github.com/facebookincubator/create-react-app) as a starting point for this site, and added a few things to make it my own.

First, there's a symlink to a folder of images which is ignored by git. For me, this folder lives in Dropbox, so I can keep it in sync across my computers and server.

Next, there's the pre-start script [`exif.js`](https://github.com/daneden/photos.daneden.me/blob/master/src/runtime/exif.js). This Node script uses `node-exiftool` to loop over each image in the folder and extract exif data. The particular data I wanted to display was the aperture, shutter speed, ISO, and focal length. This data is dropped into `manifest.js`, which is again ignored by git.

[`index.js`](https://github.com/daneden/photos.daneden.me/blob/master/src/index.js) is what imports the data from `manifest.js` and passes it as props to the images, which are rendered as React components.

The only other custom step is the [`postBuild.js`](https://github.com/daneden/photos.daneden.me/blob/master/src/runtime/postBuild.js) script, which copies the images from the symlinked directory to the build directory when the project is built.
