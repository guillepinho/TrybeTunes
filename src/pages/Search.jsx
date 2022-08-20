import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import { Loading } from './Loading';

const MIN_LENGTH = 2;

export class Search extends Component {
  state = {
    inputValue: '',
    searchResult: [],
    currentSearch: '',
    loading: false,
  }

  moreThan2 = () => {
    const { inputValue } = this.state;
    return inputValue.length < MIN_LENGTH;
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  searchSongs = async () => {
    const { inputValue } = this.state;
    this.setState({
      inputValue: '',
      loading: true,
      currentSearch: '',
    });
    const request = await searchAlbumsAPI(inputValue);
    const result = await request;
    this.setState({
      currentSearch: inputValue,
      searchResult: result,
      loading: false,
    });
  }

  cardSongMount = (array) => {
    const thisArray = array.map((item) => {
      const { collectionId, artistName, collectionName, artworkUrl100 } = item;
      return (
        (

          <div className="cardAlbum" key={ collectionId }>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <div>
                <img src={ artworkUrl100 } alt={ collectionName } className="cardImage" />
              </div>
              <div className="cardContent">
                <span className="titleAlbum">{ collectionName }</span>
                <span className="artistName">{ artistName }</span>
              </div>
            </Link>
          </div>

        )
      );
    });
    return thisArray;
  }

  render() {
    const { inputValue, loading, searchResult, currentSearch } = this.state;
    const inputShow = (
      <div className="searchBar field">
        <div className="control">
          <input
            type="text"
            className="input is-success is-rounded"
            placeholder="Artist or Album name"
            data-testid="search-artist-input"
            onChange={ this.handleInput }
            name="inputValue"
            value={ inputValue }
          />
        </div>

        <button
          type="button"
          className="button is-rounded is-success"
          data-testid="search-artist-button"
          disabled={ this.moreThan2() }
          onClick={ this.searchSongs }
        >
          Search
        </button>

      </div>);
    const arrayOfResults = this.cardSongMount(searchResult);
    return (
      <div data-testid="page-search" className="searchComp">
        { loading
         && <Loading wid="200px" imgTrue bg="rgb(36, 36, 36)" font="white" /> }
        { !loading
          && inputShow }
        <div className="results">
          { currentSearch
        && (
          <div className="result-div">
            <span className="title is-6 resulttitle">
              Resultado de álbuns de:
              {` ${currentSearch}`}
            </span>
            <div className="result-cards">
              { arrayOfResults.length
              > 0 ? arrayOfResults
                : 'Nenhum álbum foi encontrado'}
            </div>
          </div>) }
        </div>
      </div>
    );
  }
}

export default Search;
