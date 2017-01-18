import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import imageData from './manifest.js';
import SiteInfo from './meta';

imageData.reverse();

let startingIndex = -1;

if(window.location.hash && window.location.hash !== '#') {
  let s = window.location.hash.split('#')[1];
  startingIndex = imageData.findIndex((el) => {
    return s === el.fileName.split('.')[0];
  });
}

ReactDOM.render(
  <App preface={SiteInfo.fullDescription} startingImage={startingIndex} images={imageData} />,
  document.getElementById('root')
);
