import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

import { Loading } from './Loading';

export class Favorites extends Component {
  state = {
    loading: false,
    favList: JSON.parse(localStorage.getItem('favorite_songs')),
  }

  componentDidMount() {
    this.func();
  }

  func = () => {
    this.setState({
      loading: true,
    }, async () => {
      const list = await getFavoriteSongs();
      this.setState({
        favList: list,
        loading: false,
      });
    });
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
    const { loading, favList } = this.state;
    const favSongs = favList
      .map((each, index) => {
        const { trackName, previewUrl, trackId } = each;
        const isChecked = this.isCheckedFunc(each);
        const style = isChecked ? { color: 'rgb(210, 0, 0)' } : { color: '' };

        return (
          <div className="cardAlbumMusic" key={ index }>
            <div className="cardMusicContent">
              <span className="songName">
                {loading
                  ? (
                    <Loading
                      wid="20px"
                      imgTrue={ false }
                      bg="rgb(36, 36, 36)"
                      font="white"
                    />)
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
                    onChange={ () => this.isFav(each) }
                    checked={ isChecked }
                  />
                  ❤
                </label>
              </div>
            </div>
          </div>
        );
      });

    return (
      <div>
        {loading && (
          <div className="cent">
            <Loading wid="250px" imgTrue bg="rgb(36, 36, 36)" font="white" />
          </div>
        )}
        { !loading && (
          <div className="favPage" data-testid="page-favorites">
            <div className="favTitle">
              Músicas favoritas:
            </div>
            <div className="favSongs">
              { favSongs.length > 0
                ? favSongs
                : <div>Sua lista de músicas favoritas está vazia.</div> }
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
