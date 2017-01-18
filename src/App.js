// @flow
import GHImage from './GHImage';
import Header from './Header';
import React, { Component } from 'react';

type ImageData = {
  fileName: string,
  fStop: number,
  shutterSpeed: string,
  iso: number,
  focalLength: string,
}

type AppProps = {
  preface?: String,
  startingImage: number,
  images: Array<ImageData>
}

class App extends Component {
  props: AppProps;

  state: {
    activeImage: number
  };

  constructor(props: AppProps) {
    super(props);
    this.state = {
      activeImage: this.props.startingImage
    };
  }

  static defaultProps = {
    startingImage: -1
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e: SyntheticKeyboardEvent) {
    e = e || window.event;
    let maxIndex = this.props.images.length;

    if(e.keyCode === 37) {
      // Left arrow key
      e.preventDefault();
      this.setState((prev) => {
        return {
          activeImage: prev.activeImage > 0 ? prev.activeImage - 1 : 0
        }
      });
    } else if (e.keyCode === 39) {
      // Right arrow key
      e.preventDefault();
      this.setState((prev) => {
        return {
          activeImage: prev.activeImage < maxIndex ? prev.activeImage + 1 : maxIndex - 1
        }
      });
    }
  }

  handleClick(i: number) {
    // Set the current active image
    this.setState({activeImage: i});
  }

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
              onClick={this.handleClick.bind(this, i)}
              scrollIntoView={this.state.activeImage === i ? true : false}
              name={img.fileName}
              speed={img.shutterSpeed}
              iso={img.iso}
              focalLength={img.focalLength}
              fStop={img.fStop}
            />
          )}
        </main>
      </div>
    );
  }
}

export default App;
