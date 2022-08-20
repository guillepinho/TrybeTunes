import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Loading extends Component {
  render() {
    const { wid, imgTrue, bg, font } = this.props;
    return (
      <div className="loading" style={ { backgroundColor: bg, color: font } }>
        { imgTrue && <img src="https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif" alt="loading gif" width={ wid } /> }
        <span>Carregando...</span>
      </div>
    );
  }
}

Loading.propTypes = {
  wid: PropTypes.string.isRequired,
  imgTrue: PropTypes.bool.isRequired,
  bg: PropTypes.string,
  font: PropTypes.string,
};

Loading.defaultProps = {
  bg: 'white',
  font: 'black',
};

export default Loading;
