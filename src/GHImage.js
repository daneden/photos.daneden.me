import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Imgix from 'react-imgix';

class GHImage extends Component {
  constructor(props) {
    super(props);

    // Bind functions
    this.onImageLoad = this.onImageLoad.bind(this);
    this.focusImageInViewport = this.focusImageInViewport.bind(this);

    // Initialise state
    this.state = {
      imageLoaded: false
    };
  }

  // Function to reveal images when they're fully loaded
  onImageLoad() {
    this.setState({
      imageLoaded: true
    });
  }

  // Scroll the image into the viewport
  focusImageInViewport() {
    let node = ReactDOM.findDOMNode(this);
    // TODO: dte
    // Replace this magic number with a responsibly-derived baseline number
    node.parentNode.scrollLeft = node.offsetLeft - 21;
  }

  render() {
    let url = '';

    if(process.env.NODE_ENV && process.env.NODE_ENV === 'DEVELOPMENT') {
      url = `/images/${this.props.name}`
    } else {
      url = `//dephotos.imgix.net/${this.props.name}`
    }

    return (
      <div className="image">
        <div className="m">
          <Imgix
            aggressiveLoad={true}
            customParams={{
              fm: "pjpg"
            }}
            fit={"max"}
            src={url}
            imgProps={{
              onLoad: this.onImageLoad
            }}
            className={this.state.imageLoaded === true ? 'is-loaded' : 'is-not-loaded'} />
        </div>
        <p>
          &fnof;{this.props.fStop},
          {this.props.speed}s,
          {this.props.focalLength},
          ISO {this.props.iso}
        </p>
      </div>
    )
  }
}

export default GHImage;
