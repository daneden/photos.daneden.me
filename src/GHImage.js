import React, { Component } from 'react';
import Imgix from 'react-imgix';

class GHImage extends Component {
  constructor(props) {
    super(props);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.state = {
      imageLoaded: false
    }
  }

  onImageLoad() {
    this.setState({
      imageLoaded: true
    });

    console.log(this.state.imageLoaded)
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
