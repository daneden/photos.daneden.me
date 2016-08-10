import React, { Component } from 'react';
import Header from './Header';
import GHImage from './GHImage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: this.props.startingImage
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.renderPreface = this.renderPreface.bind(this);
    this.populatePreface = this.populatePreface.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
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

  handleClick(i) {
    // Set the current active image
    this.setState({activeImage: i});
  }

  renderPreface() {
    if(this.props.preface !== undefined) {
      return (
        <div dangerouslySetInnerHTML={this.populatePreface()} className="pane pane--text" />
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
            fStop={img.fStop} />
          )}
        </main>
      </div>
    );
  }
}

App.defaultProps = {
  startingImage: -1
}

export default App;
