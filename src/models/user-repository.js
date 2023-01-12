const { users } = require('./db');
const uuid = require('uuid');
const md5 = require('md5');
const { User } = require('../models/user.model.js');


exports.getUsers = async () => { return await User.findAll() };

exports.getUserByFirstName = async (firstName) => {
  const userToFind = await User.findAll({
    where: {
      firstName: firstName
    }
  });
  return userToFind[0]
}

exports.createUser = async (body) => {
  console.log("---------------------", body)
  const hashedPassword = md5(body.password);
  const user = body;
  user.password = hashedPassword;

  await User.create(user);
};

exports.updateUser = async (id, data) => {
  const foundUser = await User.findAll({

    where: {

      id: id

    }

  });

  if (!foundUser) {
    throw new Error('User not found');
  }

  await User.update({
    firstName: data.firstName || foundUser.firstName,
    lastName: data.lastName || foundUser.lastName,
    password: data.password ? md5(data.password) : foundUser.password

  }, {
    where: {
      id: id
    }
  })
};

exports.deleteUser = async (id) => {

  const userFound = await User.findAll({

    where: {

      id: id

    }

  });


  if (!userFound) {

    throw new Error('User not found');

  }


  await User.destroy({

    where: {

      id: id

    }

  });

}