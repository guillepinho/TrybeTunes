import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

const MIN_LENGTH = 3;

export class Login extends Component {
  state = {
    user: {
      name: '',
      image: '',
    },
  }

  moreThan3 = () => {
    const { user } = this.state;
    const { name } = user;
    return name.length < MIN_LENGTH;
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState((estAnt) => ({
      user: {
        ...estAnt.user,
        [name]: value,
      },
    }));
  }

  appCreateUser = async () => {
    const { setLoading, removeLoading, setLogged, func } = this.props;
    const { user } = this.state;
    setLoading();
    const { name } = user;
    func(name, 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png');
    await createUser({ name, image: 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png' })
      .then(() => {
        removeLoading();
        setLogged();
      });
  }

  render() {
    const { user } = this.state;
    const { name } = user;
    return (
      <div data-testid="page-login" className="loginComp">
        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968946.png" alt="site logo" width="70px" />
        <h3 className="loginTitle">- LOGIN -</h3>
        <div className="field">
          <label htmlFor="login" className="label">
            <div className="control">
              <input
                className="input is-medium"
                data-testid="login-name-input"
                id="login"
                type="text"
                placeholder="Enter Username"
                name="name"
                value={ name }
                onChange={ this.handleInput }
              />
            </div>
          </label>
        </div>
        <div className="field">
          <div className="control">
            <button
              type="button"
              data-testid="login-submit-button"
              className="button is-light"
              disabled={ this.moreThan3() }
              onClick={ this.appCreateUser }
            >
              Join
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  setLoading: PropTypes.func.isRequired,
  removeLoading: PropTypes.func.isRequired,
  setLogged: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
};

export default Login;
