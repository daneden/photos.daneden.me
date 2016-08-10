import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Imgix from 'react-imgix';
import { hScrollCenterElementInParent } from './Utils';

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

  componentDidUpdate() {
    if(this.props.scrollIntoView === true) {
      this.focusImageInViewport();
      window.location.hash = this.props.name.split('.')[0];
    }
  }

  // Scroll the image into the viewport
  focusImageInViewport() {
    let node = ReactDOM.findDOMNode(this);
    hScrollCenterElementInParent(node, 500);
  }

  handleClick() {
    this.focusImageInViewport();
    this.props.onClick();
  }

  render() {
    let url = '',
        imageName = this.props.name.split('.')[0];

    // Use local images for development
    if(process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT') {
      url = `/images/${this.props.name}`
    } else {
      url = `https://dephotos.imgix.net/${this.props.name}`
    }

    return (
      <div id={imageName} className="image">
        <div className="m">
          <a onClick={this.handleClick.bind(this)} href={'#' + imageName}>
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
          </a>
        </div>
        <p>
        {`\u0192${this.props.fStop},
          ${this.props.speed}s,
          ${this.props.focalLength},
          ISO ${this.props.iso}`}
        </p>
      </div>
    )
  }
}

export default GHImage;
