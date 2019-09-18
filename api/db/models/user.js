const Sequelize = require('sequelize');

/****************************
 * User Model Initialization 
*****************************/
module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "First Name".'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "Last Name".'
        }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "Email Address".'
        },
        isEmail: {
          msg: 'Please provide a valid email.'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "Password".'
        }
      }
    },
  }, { sequelize });
  User.associate = (models) => {
    User.hasMany(models.Course, { foreignKey: 'userId' });
  }
  return User;
};