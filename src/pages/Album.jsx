import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

import { MusicCard } from './MusicCard';

export class Album extends Component {
  state = {
    tracklist: [],
    artist: 'Artist Name',
    collection: 'Collection Name',
  }

  componentDidMount() {
    this.getThisMusic();
  }

  getThisMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const theseMusics = await getMusics(id);
    this.setState({
      artist: theseMusics[0].artistName,
      collection: theseMusics[0].collectionName,
      artwork: theseMusics[0].artworkUrl100,
    });
    const arrayOfTracks = await theseMusics
      .filter((_item, index) => index > 0);
    this.setState({
      tracklist: arrayOfTracks,
    });
  }

  render() {
    const { collection, artist, artwork, tracklist } = this.state;
    const musicCardsArray = tracklist
      .map((music, index) => (
        <MusicCard key={ index } obj={ music } />));

    return (
      <div data-testid="page-album" className="albumComp">
        <div className="albumData">
          <div>
            <img src={ artwork } alt={ collection } className="cardImage" />
          </div>
          <div className="albumContentMusic">
            <h5 data-testid="artist-name">{ artist }</h5>
            <h6 data-testid="album-name">{ collection }</h6>
          </div>
        </div>
        <div className="result-cards-music">
          {musicCardsArray}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
