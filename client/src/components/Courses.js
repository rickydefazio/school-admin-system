import React, {Component} from 'react';

class Courses extends Component {

  state = {
    courses: []
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => {
        this.setState({
          courses: data
        });
      })
      .catch(err => console.log('Error fetching and parsing data', err));

    document.title = "Courses";
  }

  render() {
    return (

    )
  }
}

export default Courses;