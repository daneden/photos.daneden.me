// @flow
import GHImage from './GHImage';
import Header from './Header';
import React from 'react';

type ImageData = {
  aspectRatio: number,
  fStop: number,
  fileName: string,
  focalLength: string,
  iso: number,
  shutterSpeed: string,
}

type AppProps = {
  preface?: React.Node,
  images: Array<ImageData>
}

class App extends React.Component {
  props: AppProps;

  renderPreface(props: AppProps): ?React.Node {
    return props.preface !== undefined ? (
      <div className="pane pane--text">
        <Header />
        {props.preface}
      </div>
    ) : null
  }

  render() {
    const preface = this.renderPreface(this.props)

    return (
      <div className="site-root">
        <main className="site-content">
          {preface}
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
