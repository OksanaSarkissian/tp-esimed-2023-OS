const { users } = require('./db');
const uuid = require('uuid');
const bcrypt = require('bcryptjs')
const { User } = require('../models/user.model.js');
const { UUIDV4 } = require('sequelize');


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
  const hashedPassword = await bcrypt.hashSync(body.password, 12)
  console.log("---------------------", hashedPassword)
  const user = body;
  user.password = hashedPassword;
  user.id = uuid.v4()
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
    password: data.password ? bcrypt.hashSync(data.password, 12) : foundUser.password

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