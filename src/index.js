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
