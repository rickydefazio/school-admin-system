import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';


class App extends Component {
  state = {

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Courses} />
          <Route path="/signin" component={UserSignIn} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;