import React from "react";
import PropTypes from "prop-types";

class Exp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  togglePlay = () => {
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying,
    }));
  };

  render() {
    const { src, type, poster, width, height, customControls } = this.props;
    const { isPlaying } = this.state;

    return (
      <div className="custom-video-player">
        <video
          controls={false}
          src={src}
          type={type}
          poster={poster}
          width={width}
          height={height}
          onClick={this.togglePlay}
        >
          Your browser does not support the video tag.
        </video>
        {customControls && (
          <div className="custom-controls">
            <button onClick={this.togglePlay}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            {/* Add other custom controls as needed */}
          </div>
        )}
      </div>
    );
  }
}

Exp.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  poster: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  customControls: PropTypes.bool,
};

Exp.defaultProps = {
  poster: "",
  width: "100%",
  height: "auto",
  customControls: false,
};

export default Exp;
