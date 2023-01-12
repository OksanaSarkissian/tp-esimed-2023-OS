const { DataTypes } = require('sequelize');
const {sequelize} = require('../models/sqlite.db')
exports.User = sequelize.define('User', {
    id : {
        primaryKey: true,
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull: false
    },
    firstName : {
        type : DataTypes.STRING,
        allowNull: false
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull: false
    },    
    password : {
        type : DataTypes.STRING,
        allowNull: false
    }
  });