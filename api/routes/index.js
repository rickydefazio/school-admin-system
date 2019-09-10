const express = require('express');
const router = express.Router();

// GET request to root route that returns a friendly message to the user. Status code: 200
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the REST API project!',
  });
});

module.exports = router;