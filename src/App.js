import React, { Component } from 'react';
import imageData from './manifest.js';

import Header from './Header';
import GHImage from './GHImage';

imageData.reverse();

class App extends Component {
  render() {
    let els = [];
    for(let i = 0; i < imageData.length; i++) {
      let img = imageData[i];
      els.push(<GHImage
        src={'/images/' + img.fileName}
        speed={img.shutterSpeed}
        focalLength={img.focalLength}
        fStop={img.fStop} />)
    }
    return (
      <div className="site-root">
        <Header />
        <main className="site-content">
          {els}
        </main>
      </div>
    );
  }
}

export default App;
