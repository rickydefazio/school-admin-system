import React from 'react';
import { Redirect } from 'react-router-dom';


/**
 * @description Redirects user to home page after signing out
 * @param {props} context 
 */
const UserSignOut = ({ context }) => {
  context.actions.signOut();
  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;