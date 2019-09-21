import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {
  
  state = {
    title: '', 
    description: '',
    estimatedTime: '',
    materialsNeeded: '', 
    errors: []
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }



  render() {


    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const {
      firstName, 
      lastName
    } = this.props.context.authenticatedUser;


    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input 
                        id="title" 
                        name="title" 
                        type="text" 
                        className="input-title course--title--input" 
                        placeholder="Course title..."
                        value={title}
                        onChange={this.change} />
                    </div>
                    <p>By {`${firstName} ${lastName}`}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea 
                        id="description" 
                        name="description" 
                        className="" 
                        placeholder="Course description..."
                        value={description}
                        onChange={this.change} />
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text" 
                            className="course--time--input"
                            placeholder="Hours" 
                            value={estimatedTime} 
                            onChange={this.change} />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            className="" 
                            placeholder="List materials..."
                            value={materialsNeeded}
                            onChange={this.change} />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
        )} />
      </div>
    );
  }
}

export default CreateCourse;