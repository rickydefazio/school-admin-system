const express = require('express');
const router = express.Router();
const authenticateUser = require('../auth');
const { models } = require('../db');
const { User, Course } = models;
const bcryptjs = require('bcryptjs');



/***********************
 * USERS ROUTES
***********************/


// Send a GET request to /api/users that returns the currently authenticated user. Status code: 200
router.get('/users', authenticateUser, (req, res, next) => {
  try {
    const user = req.currentUser;
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    });
  } catch (error) {
    next(error);
  }
});


// Send a POST request to /api/users that creates a user, sets the Location header to '/', and return no content. Status code: 201
router.post('/users', async (req, res, next) => {
  try {
    const user = req.body;

    bcryptjs.hashSync(user.password);
    await User.create(user);
    res.location('/').status(201).end();

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      error.status = 400;
      const errors = error.errors.map(err => err.message);
      error.errors = errors;
      console.error('Validation errors: ', errors)
      next(error);
    } else {
      next(error);
    }
  }
});


/***********************
 * COURSES ROUTES
***********************/




// Send a GET request to /api/courses that returns a list of courses (including the user that owns each course) Status code: 200
router.get('/courses', async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [ 
        { model: User, 
          attributes: { 
            exclude: [ "password", "createdAt", "updatedAt" ] 
          } 
        } 
      ],
      attributes: { 
        exclude: [ "createdAt", "updatedAt" ] 
      }
      
    });

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
});


// Send a GET request to /api/courses:id that returns the course (including the user that owns the course) for the provided course ID. Status code: 200
router.get('/courses/:id', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [ 
        { model: User, 
          attributes: { 
            exclude: [ "password", "createdAt", "updatedAt" ] 
          } 
        } 
      ],
      attributes: { 
        exclude: [ "createdAt", "updatedAt" ] 
      }

    });
    if (course) {
      res.status(200).json(course);
    } else {
      const err = new Error('Course Does-Not-Exist');
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
});


// Send a POST request to /api/courses that creates a course, sets the Location header to the URI for the course, and returns no content. Status code: 201
router.post('/courses', authenticateUser, async (req, res, next) => {
  try {
    const user = req.currentUser;
    let course = req.body;
    course.userId = user.id;

    course = await Course.create(course);
    res.status(201).location(`/api/courses/${course.id}`).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      error.status = 400;
      const errors = error.errors.map(err => err.message);
      error.errors = errors;
      console.error('Validation errors: ', errors)
      next(error);
    } else {
      next(error);
    }
  }
});


// Send a PUT request to /api/courses/:id that updates a course and returns no content. Status code: 204
router.put('/courses/:id', authenticateUser, async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.description) {
      const error = new Error('A title and body are required.');
      error.status = 400;
      next(error);
    } else {
      const user = req.currentUser;
      const course = await Course.findByPk(req.params.id, {
        include: [ 
          { model: User } 
        ]
      });

      if (user.id === course.userId) {
        await course.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).end();
      }
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      error.status = 400;
      const errors = error.errors.map(err => err.message);
      error.errors = errors;
      console.error('Validation errors: ', errors)
      next(error);
    } else {
      next(error);
    }
  }
});


// Send a DELETE request to /api/courses/:id that deletes a course and returns no content. Status code: 204
router.delete('/courses/:id', authenticateUser, async (req, res, next) => {
  try {
    const user = req.currentUser;
    const courseToDelete = await Course.findByPk(req.params.id);

    if (user.id === courseToDelete.userId) {
      await courseToDelete.destroy();
      res.status(204).end();
    } else {
      res.status(403).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;