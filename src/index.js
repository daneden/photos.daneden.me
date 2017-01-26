import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import imageData from './manifest.js';
import SiteInfo from './meta';


imageData.reverse();

ReactDOM.render(
  <App preface={SiteInfo.fullDescription} images={imageData} />,
  document.getElementById('root')
);

// change vertical scroll to horizontal in content
let content = document.querySelector('.site-content')
window.addEventListener('mousewheel', MouseWheelHandler);

function MouseWheelHandler(e) {
  if(content === undefined) {
    content = document.querySelector('.site-content')
  }

  content.scrollTo(content.scrollLeft + e.deltaY, 0)
}
