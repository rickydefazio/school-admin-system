import React from 'react';

/**
  Component to render when user tries to access route without authorization.
 */
const Forbidden = () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>Sorry! You cannot access the requested page.</p>
  </div>
);

export default Forbidden;