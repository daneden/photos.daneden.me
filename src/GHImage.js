// @flow
import React, { Component } from 'react';
import Imgix from 'react-imgix';
import Waypoint from 'react-waypoint';

type GHImageProps = {
  aspectRatio: number,
  camera: string,
  fStop: number,
  focalLength: string,
  iso: number,
  name: string,
  onClick?: () => void,
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

  // Reveal images when they're fully loaded
  onImageLoad() {
    this.setState({
      imageLoaded: true
    });
  }

  setOnScreen(flag: boolean) {
    this.setState({
      onScreen: flag,
    })
  }

  render() {
    let url = `https://dephotos.imgix.net/${this.props.name}`
    const imageName = this.props.name.split('.')[0]

    // Use local images for development
    if(process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT') {
      url = `${process.env.PUBLIC_URL}/images/${this.props.name}`
    }

    const imgClass = [
      (this.state.imageLoaded === true) && (this.state.onScreen === true)
        ? 'is-loaded'
        : 'is-not-loaded',
      'image__img',
    ]

    const image = (
      <Imgix
        customParams={{
          fm: "pjpg",
        }}
        fit={"max"}
        src={url}
        imgProps={{ onLoad: this.onImageLoad }}
        className={imgClass.join(' ')}
      />
    )

    const placeholder = (
      <div
        role="presentation"
        className="image__img"
      />
    )

    const speed = String(this.props.speed).indexOf('/') === -1
                ? (<span>{this.props.speed}</span>)
                : (<span className="frac">{this.props.speed}</span>)

    return (
      <div id={imageName} className="pane page--image">
        <Waypoint
          key={imageName}
          horizontal={true}
          topOffset="-200%"
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
          {this.state.onScreen ? image : placeholder}
        </div>
        <p className="u-mb0">
          {this.props.camera},{" "}
          {`\u0192${this.props.fStop}, `}
          {speed} sec,{" "}
          {this.props.focalLength},{" "}
          ISO {this.props.iso}
        </p>
      </div>
    )
  }
}

export default GHImage;
