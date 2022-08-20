import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

import { Loading } from './Loading';

export class Profile extends Component {
  state = {
    user: {},
    loading: false,
  }

  componentDidMount() {
    this.func();
  }

  func = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        user,
        loading: false,
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    const { name, image, email, description } = user;

    return (
      <div className="profilePage" data-testid="page-profile">
        {loading && (
          <div className="cent">
            <Loading wid="250px" imgTrue bg="rgb(36, 36, 36)" font="white" />
          </div>
        )}
        { !loading && (
          <div className="profileCard">
            <div className="profileTop">
              <div>
                <img
                  src={ image || 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png' }
                  alt="user-avatar"
                  className="user-avatar"
                  data-testid="profile-image"
                />
              </div>
              <div className="user-edit-button">
                <Link to="/profile/edit">
                  <button
                    type="button"
                    className="button is-success is-small"
                  >
                    Editar perfil
                  </button>
                </Link>
              </div>
            </div>
            <div className="profile-content">
              <div className="profile-name">
                <strong>Name</strong>
                <br />
                { name || 'No name found'}
                <br />
                <br />
              </div>
              <div className="profile-email">
                <strong>E-mail</strong>
                <br />
                {email || 'No e-mail found'}
                <br />
                <br />
              </div>
              <div className="profile-desc">
                <strong>Description</strong>
                <br />
                {description || 'No description found'}
                <br />
                <br />
              </div>

            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
