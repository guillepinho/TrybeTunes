import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUser, updateUser } from '../services/userAPI';

import { Loading } from './Loading';

export class ProfileEdit extends Component {
  state = {
    user: {
      name: '',
      image: 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png',
    },
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

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState((estAnt) => ({
      user: {
        ...estAnt.user,
        [name]: value,
      },
    }));
  }

  updateThyUser = async () => {
    const { user } = this.state;
    const { name, image } = user;
    const { history, func } = this.props;
    func(name, image);
    this.setState({
      loading: true,
    }, async () => {
      await updateUser(user);
      history.push({
        pathname: '/profile',
      });
    });
  }

  isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)

  verifyImg = () => {
    const { user } = this.state;
    const { image } = user;
    const showImg = image.match((/(jpg|jpe?g|png|gif)/g)) ? image : 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png';
    return showImg;
  }

  render() {
    const { loading, user } = this.state;
    const { name, image, email, description } = user;

    const allValues = Object.values(user);
    const isDisabled = this.isValidEmail(email)
    && allValues.every((value) => value.length > 0);

    return (
      <div data-testid="page-profile-edit" className="profilePage">
        {loading
          && (
            <div className="cent">
              <Loading wid="250px" imgTrue bg="rgb(36, 36, 36)" font="white" />
            </div>)}
        {!loading && (
          <div className="profileEditCard">

            <img src={ image } alt={ user } className="user-avatar-edit" />

            <div className="field">
              <div className="control">
                <input
                  type="text"
                  name="image"
                  data-testid="edit-input-image"
                  className="input is-success is-small"
                  placeholder="Enter a link to your Image"
                  value={ image }
                  onChange={ this.inputHandler }
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  type="text"
                  name="name"
                  data-testid="edit-input-name"
                  className="input is-success is-small"
                  placeholder="Enter your Name"
                  value={ name }
                  onChange={ this.inputHandler }
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  type="text"
                  name="email"
                  data-testid="edit-input-email"
                  className="input is-success is-small"
                  placeholder="Enter your Email"
                  value={ email }
                  onChange={ this.inputHandler }
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <textarea
                  name="description"
                  data-testid="edit-input-description"
                  className="textarea is-success is-small textareaE"
                  placeholder="Enter your description"
                  rows="5"
                  value={ description }
                  onChange={ this.inputHandler }
                />
              </div>
            </div>

            <div className="save-button-div">
              <button
                type="button"
                data-testid="edit-button-save"
                className="button is-success is-small"
                disabled={ !isDisabled }
                onClick={ () => this.updateThyUser() }
              >
                Save Changes
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  func: PropTypes.func.isRequired,
};

export default ProfileEdit;
