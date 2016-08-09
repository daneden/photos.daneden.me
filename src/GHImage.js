import React, { Component } from 'react';

class GHImage extends Component {
  render() {
    return (
      <div className="image">
        <div className="m">
          <img alt="" src={this.props.src} />
        </div>
        <p>&fnof;{this.props.fStop}, {this.props.speed}s, {this.props.focalLength}</p>
      </div>
    )
  }
}

export default GHImage;
