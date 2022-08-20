/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { Album } from './pages/Album';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';
import { ProfileEdit } from './pages/ProfileEdit';
import { NotFound } from './pages/NotFound';
import { Loading } from './pages/Loading';
import { Header } from './pages/Header';

class App extends React.Component {
  state = {
    loading: false,
    loggedIn: false,
    loggedUser: '',
    userAvatar: '',
  }

  setLogged = () => {
    this.setState({
      loggedIn: true,
    });
  }

  setLoading = () => {
    this.setState({
      loading: true,
    });
  }

  removeLoading = () => {
    this.setState({
      loading: false,
    });
  }

  getLoggedUser = (user, avatar) => {
    this.setState({
      loggedUser: user,
      userAvatar: avatar,
    });
  }

  render() {
    const { loading, loggedIn, loggedUser, userAvatar } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            { loading
            && (<div className="cent"><Loading wid="200px" imgTrue bg="black" /></div>) }
            { !loggedIn && !loading
            && <Login
              setLoading={ this.setLoading }
              removeLoading={ this.removeLoading }
              setLogged={ this.setLogged }
              func={ this.getLoggedUser }
            /> }
            { loggedIn && <Redirect to="/search" /> }
          </Route>
          <Route>
            <div className="header">
              <Header user={ { loggedUser, userAvatar } } />
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/search" component={ Search } />
                <Route exact path="/album/:id" component={ Album } />
                <Route exact path="/favorites" component={ Favorites } />
                <Route exact path="/profile" component={ Profile } />
                <Route
                  exact
                  path="/profile/edit"
                  render={ (props) => (
                    <ProfileEdit
                      { ...props }
                      func={ this.getLoggedUser }
                    />) }
                />
                <Route path="*" component={ NotFound } />
              </Switch>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
