import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import PostShowPage from './components/PostShowPage';
import PostIndexPage from './components/PostIndexPage';
import PostNewPage from './components/PostNewPage';
import SignInPage from './components/SignInPage';
import { User, Session } from "./components/requests";
import AuthRoute from "./AuthRoute";
import PostEditPage from "./components/PostEditPage";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      loading: true
    };

    this.getUser = this.getUser.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    Session.destroy().then(() => {
      this.setState({
        currentUser: null
      });
    });
  }

  getUser() {
    User.current()
      .then(data => {
        if (typeof data.id !== "number") {
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false, currentUser: data });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.getUser();
  }


  render() {

    const { loading, currentUser } = this.state;

    if (loading) {
      return <div />;
    }

    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <NavBar currentUser={currentUser} onSignOut={this.signOut} />
          </header>
          <article>
            <div className="container">
              <div className="article-content">
                {/* this is similar to the routes.rb page in ruby */}
                <Switch>
                  <Route path="/posts" exact component={PostIndexPage} />
                  <AuthRoute
                    isAuthenticated={currentUser}
                    path="/posts/new"
                    component={PostNewPage}
                  />
                  <AuthRoute
                    isAuthenticated={currentUser}
                    path="/posts/:id/edit"
                    component={PostEditPage}
                  />



                  <Route path="/posts/:id" exact component={PostShowPage} />

                  <Route
                    path="/sign_in"
                    render={routeProps => (
                      <SignInPage onSignIn={this.getUser} {...routeProps} />
                    )}
                  />

                </Switch>
              </div>
            </div>
          </article>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
