// @flow
import * as React from 'react';
import Imgix from 'react-imgix';
import Waypoint from 'react-waypoint';

type Props = {
  aspectRatio: number,
  camera: string,
  fStop: number,
  focalLength: string,
  iso: number,
  name: string,
  onClick?: () => void,
  speed: string,
}

type State = {
  imageLoaded: boolean,
  onScreen: boolean,
}

class GHImage extends React.Component<Props, State> {
  state: State = {
    imageLoaded: true,
    onScreen: false,
  }

  // Reveal images when they're fully loaded
  onImageLoad = () => {
    this.setState({
      imageLoaded: true
    })
  }

  setOnScreen(flag: boolean) {
    this.setState({
      onScreen: flag,
    })
  }

  render(): React.Node {
    let url = `https://dephotos.imgix.net/${this.props.name}`
    const imageName = this.props.name.split('.')[0]

    // Use local images for development
    if(
      process.env.PUBLIC_URL !== undefined &&
      process.env.NODE_ENV &&
      process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT'
    ) {
      url = `${process.env.PUBLIC_URL || ''}/images/${this.props.name}`
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
        imgProps={{
          onLoad: this.onImageLoad
        }}
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
          className="pane__image u-mb0"
          style={{
            minWidth: `calc((var(--imgHeight)) * ${this.props.aspectRatio})`,
          }}
        >
          {this.state.onScreen ? image : placeholder}
        </div>
        <p className="image__info u-mb0">
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
