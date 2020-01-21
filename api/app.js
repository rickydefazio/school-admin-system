'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const path = require('path');

const { sequelize } = require('./db');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// CORS
app.use(cors());

// parses incoming requests with JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Testing database connection using IIFE
(async () => {
  try {
    // testing connection
    console.log("Testing Connection...")
    await sequelize.authenticate();
    console.log("Connection succesful!");
    
    // syncing
    console.log('Synchronizing the models with the database...');
    await sequelize.sync();

  } catch (e) {
    console.error('Error connecting to the database: ', e); 
  }
})();


// Root route 
const indexRoute = require('./routes');
// app.use(indexRoute);


// TODO setup your api routes here
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);


// For Production Build & Hosting Purposes 
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  });
});


// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
