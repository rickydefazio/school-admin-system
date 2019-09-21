import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {

  state = {
    courseData: [],
    userData: []
  }

  componentDidMount() {
    this.props.context.data.getCourse(this.props.match.params.id)
      .then(data => {
        this.setState({
          courseData: data,
          userData: data.User
        })
      })
      .catch(err => console.log(err))
  }


  render() {

    const {
      courseData,
      userData
    } = this.state;

    const authUser = this.props.context.authenticatedUser;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {authUser && authUser.id === userData.id ?
                <React.Fragment>
                  <span>
                    <Link className="button" to={`/courses/${courseData.id}/update`}>Update Course</Link>
                    <Link className="button" to='/'>Delete Course</Link>
                  </span>
                  <Link className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
              :
                <React.Fragment>
                  <Link className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
              }
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseData.title}</h3>
              <p>By {`${userData.firstName} ${userData.lastName}`}</p>
            </div>
            <div className="course--description">
              <p>{courseData.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseData.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {courseData.materialsNeeded}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseDetail;