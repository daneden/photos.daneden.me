import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import imageData from './manifest.js';

imageData.reverse();

let startingIndex = 0;

if(window.location.hash && window.location.hash !== '#') {
  let s = window.location.hash.split('#')[1];
  startingIndex = imageData.findIndex((el) => {
    return s === el.fileName.split('.')[0];
  });
}

ReactDOM.render(
  <App startingImage={startingIndex} images={imageData} />,
  document.getElementById('root')
);
