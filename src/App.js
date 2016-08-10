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
  }

  handleKeyDown(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        this.setState({
          activeImage: this.state.activeImage >= 0 ? this.state.activeImage - 1 : 0
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
    console.log('clicked on', i);
    console.log('activeImage', this.state.activeImage);
    console.log('attempting to set state to new index');
    this.setState({activeImage: i});
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className="site-root">
        <Header />
        <main className="site-content">
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
  startingImage: 0
}

export default App;
