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
    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        this.setState({
          activeImage: this.state.activeImage > 0 ? this.state.activeImage - 1 : 0
        });
        break;
      case 39:
        e.preventDefault();
        this.setState({
          activeImage: this.state.activeImage < this.props.images.length ? this.state.activeImage + 1: this.props.images.length - 1
        });
        break;
      default:
        return;
    }
  }

  handleClick(i) {
    // Set the current active image
    this.setState({activeImage: i});
  }

  populatePreface() {
    return {
      __html: this.props.preface
    }
  }

  renderPreface() {
    if(this.props.preface !== undefined) {
      return (
        <div dangerouslySetInnerHTML={this.populatePreface()} className="pane pane--text">
        </div>
      )
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
