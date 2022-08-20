import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUser } from '../services/userAPI';
import { Loading } from './Loading';

export class Header extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    this.appGetUser();
  }

  appGetUser = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        user,
        loading: false,
      });
    });
  }

  render() {
    const { loading } = this.state;
    const { user } = this.props;
    const { loggedUser, userAvatar } = user;
    return (
      <header data-testid="header-component">
        <div className="headerTop">
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968946.png" alt="logo" width="50px" />
          <div data-testid="header-user-name" className="user">
            <img src={ userAvatar } alt="user" className="user-photo" />
            <div className="user-name">
              {loading
                ? <Loading wid="20px" imgTrue={ false } />
                : loggedUser}
            </div>
          </div>
        </div>
        <nav className="navbarTop">
          <div className="link">
            <NavLink
              to="/profile"
              data-testid="link-to-profile"
              activeClassName="linkActive"
            >
              👤 Profile
            </NavLink>
          </div>
          <div className="link">
            <NavLink
              to="/search"
              data-testid="link-to-search"
              activeClassName="linkActive"
            >
              🔎 Search
            </NavLink>
          </div>
          <div className="link">
            <NavLink
              to="/favorites"
              data-testid="link-to-favorites"
              activeClassName="linkActive"
            >
              ❤ Favorites
            </NavLink>
          </div>

          <div className="disabledLink">
            📚 Library
          </div>
          <div className="disabledLink">
            &#10133; Playlists
          </div>
          ______________________________

          <div className="disabledLink">
            T23 - Lo-fi Brasil pros...
          </div>
          <div className="disabledLink">
            Rock BR
          </div>
          <div className="disabledLink">
            90s
          </div>
          <div className="disabledLink">
            My Playlist no. 9
          </div>
          <div className="disabledLink">
            NCS Songs
          </div>
          <div className="disabledLink">
            Indie Rock
          </div>
          <div className="disabledLink">
            This is Arctic Monkeys
          </div>
          <div className="disabledLink">
            Gym Hype
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    loggedUser: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
