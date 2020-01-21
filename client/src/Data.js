import config from './config';

/**
  Utility functions for fetching data from API
 */
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    // Check if a body is provided, then turn it's contents into JSON.
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if request requires authentication, then encode given credentials and add authorization headers.
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
  
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /**
   * 
   * @param {string} emailAddress 
   * @param {string} password 
   * Send a GET request to /api/users, provide credentials, and anticipate a 200 status code. 
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  /**
   * 
   * @param {object} user 
   * Send a POST request to /api/users, anticipate a 201 status code.
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Send a GET request to /api/courses, anticipate a 200 status code.
   */
  async getCourses() {
    const response = await this.api(`/courses`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  /**
   * @description Send a GET request to /api/courses/:id, anticipate a 200 status code.
   * @param {string} id 
   * @returns object
   */
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return null;
    }
    else {
      throw new Error();
    }
  }


  /**
   * @description Send a POST request to /api/courses, provide credentials, and anticipate 201 status code.
   * @param {object} course 
   * @param {string} emailAddress 
   * @param {string} password 
   * @returns empty array
   */
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * @description Send a PUT request to /api/courses/:id, provide credentials, and anticipate a 204 status code.
   * @param {string} id 
   * @param {object} course 
   * @param {string} emailAddress 
   * @param {string} password 
   * @returns empty array
   */
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * @description Send a DELETE request to /api/courses/:id, provide credentials, and anticipate a 204 status code. 
   * @param {string} id 
   * @param {string} emailAddress 
   * @param {string} password 
   * @returns empty array
   */
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

}
