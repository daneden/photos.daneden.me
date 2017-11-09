// @flow
import GHImage from './GHImage';
import Header from './Header';
import React, { Component } from 'react';

type ImageData = {
  aspectRatio: number,
  fStop: number,
  fileName: string,
  focalLength: string,
  iso: number,
  shutterSpeed: string,
}

type AppProps = {
  preface?: String,
  images: Array<ImageData>
}

class App extends Component {
  props: AppProps;

  renderPreface() {
    if(this.props.preface !== undefined) {
      return (
        <div
          dangerouslySetInnerHTML={this.populatePreface()}
          className="pane pane--text"
        />
      )
    }
  }

  // Since dangerouslySetInnerHTML requires an object, this method is
  // used to populate the div
  populatePreface() {
    return {
      __html: this.props.preface
    }
  }

  render() {
    return (
      <div className="site-root">
        <Header />
        <main className="site-content">
          { this.renderPreface() }
          {this.props.images.map((img, i) =>
            <GHImage key={i}
              aspectRatio={img.aspectRatio}
              camera={img.camera}
              fStop={img.fStop}
              focalLength={img.focalLength}
              iso={img.iso}
              name={img.fileName}
              speed={img.shutterSpeed}
            />
          )}
        </main>
      </div>
    );
  }
}

export default App;
