const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { models } = require('./db');
const { User } = models;

/*
  1. Parse credentials from authorization header
  2. If they exist, find user with those credentials in database
  3. If user exists, compare user's password hash with hash in database.
  4. If password matches, consider user authenticated and send user information to next middleware.
*/
const authenticateUser = async (req, res, next) => {
  let message = null;
  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({ 
      where: { emailAddress: credentials.name }
    });

    if (user) {
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

      if (authenticated) {
        console.log(`Authentication successful for username: ${credentials.name}`);

        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${credentials.name}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`
    }
  } else {
    message = 'Auth header not found';
  }
  
  if (message) {
    console.warn(message);

    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
}

module.exports = authenticateUser;