import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

import './css/heart.css';
import { Loading } from './Loading';

export class MusicCard extends Component {
  state = {
    favList: JSON.parse(localStorage.getItem('favorite_songs')),
    loading: false,
  }

  async componentDidMount() {
    await getFavoriteSongs();
  }

  isCheckedFunc = (song) => {
    const { favList } = this.state;
    const { trackId } = song;
    const listIds = favList.map((each) => each.trackId);
    const result = listIds.includes(trackId);
    return result;
  }

  isFav = async (song) => {
    const { favList } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      if (this.isCheckedFunc(song)) {
        await removeSong(song);
        const newArray = favList.filter((s) => s.trackId !== song.trackId);
        this.setState({
          favList: newArray,
          loading: false,
        });
        return;
      }

      if (!this.isCheckedFunc(song)) {
        await addSong(song);
        this.setState((estAnt) => ({
          favList: [...estAnt.favList, song],
          loading: false,
        }));
      }
    });
  }

  render() {
    const { obj } = this.props;
    const { trackName, previewUrl, trackId } = obj;
    const { loading } = this.state;

    const isChecked = this.isCheckedFunc(obj);

    const style = isChecked ? { color: 'rgb(210, 0, 0)' } : { color: '' };

    return (
      <div className="cardAlbumMusic">
        <div className="cardMusicContent">
          <span className="artistName">
            {loading
              ? <Loading wid="20px" imgTrue={ false } bg="rgb(36, 36, 36)" font="white" />
              : trackName}
          </span>
        </div>
        <div className="audiodiv">
          <div className="audiocomp">
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
              className="tag audio"
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
          <div className="favorite-heart">
            <label
              htmlFor={ trackId }
              className="theHeart"
              data-testid={ `checkbox-music-${trackId}` }
              style={ style }
            >
              <input
                id={ trackId }
                type="checkbox"
                className="heartInput"
                onChange={ () => this.isFav(obj) }
                checked={ isChecked }
              />
              ❤
            </label>
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  obj: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
