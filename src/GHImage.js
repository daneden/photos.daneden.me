import React, { Component } from 'react';
import Imgix from 'react-imgix';

class GHImage extends Component {
  render() {
    return (
      <div className="image">
        <div className="m">
          <Imgix
            aggressiveLoad={true}
            customParams={{
              fm: "pjpg"
            }}
            fit={"max"}
            src={"http://dephotos.imgix.net/" + this.props.name} />
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
