import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css';
import Gallery from './Gallery';
import Photo from './Photo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path='/' component={Gallery}/>
            <Route path='/photo/:photoId' component={Photo}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
