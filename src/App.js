import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Gallery from './Gallery.jsx';
import Photo from './Photo';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path='/' render={props => <Gallery {...props} />}/>
            <Route path='/photo/:photoId' render={props => <Photo {...props} />}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
