// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Imgix from 'react-imgix';
import { hScrollCenterElementInParent } from './Utils';
import Waypoint from 'react-waypoint';

type GHImageProps = {
  aspectRatio: number,
  fStop: number,
  focalLength: string,
  iso: number,
  name: string,
  onClick: () => void,
  scrollIntoView: boolean,
  speed: string,
}

class GHImage extends Component {
  props: GHImageProps;

  state: {
    imageLoaded: boolean,
    onScreen: boolean,
  };

  constructor(props: GHImageProps) {
    super(props);

    // Initialise state
    this.state = {
      imageLoaded: false,
      onScreen: false,
    };

    (this:any).onImageLoad = this.onImageLoad.bind(this)
  }

  componentDidUpdate() {
    if(this.props.scrollIntoView === true) {
      this.focusImageInViewport();
      window.location.hash = this.props.name.split('.')[0];
    }
  }

  // Reveal images when they're fully loaded
  onImageLoad() {
    this.setState({
      imageLoaded: true
    });
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

  setOnScreen(flag: boolean) {
    this.setState({
      onScreen: flag,
    })
  }

  render() {
    let url = `https://dephotos.imgix.net/${this.props.name}`,
        imageName = this.props.name.split('.')[0];

    // Use local images for development
    if(process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT') {
      url = `${process.env.PUBLIC_URL}/images/${this.props.name}`
    }

    const image = (
      <Imgix
        customParams={{
          fm: "pjpg",
        }}
        fit={"max"}
        src={url}
        imgProps={{ onLoad: this.onImageLoad }}
        className={this.state.imageLoaded === true ? 'is-loaded' : 'is-not-loaded'}
      />
    )

    const placeholder = (
      <img
        src=""
        role="presentation"
        className="is-not-loaded"
      />
    )

    return (
      <div className="pane page--image">
        <Waypoint
          key={imageName}
          horizontal={true}
          topOffset="-100%"
          bottomOffset="0"
          onEnter={this.setOnScreen.bind(this, true)}
          onLeave={this.setOnScreen.bind(this, false)}
        />
        <div
          className="pane__image"
          style={{
            minWidth: `calc((100vh - (9rem)) * ${this.props.aspectRatio})`,
          }}
        >
          <a onClick={this.handleClick.bind(this)} href={'#' + imageName}>
            {this.state.onScreen ? image : placeholder}
          </a>
        </div>
        <p className="u-mb0">
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
