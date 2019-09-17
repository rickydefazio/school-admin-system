import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';



class App extends Component {
  state = {

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signout" component={UserSignOut} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;