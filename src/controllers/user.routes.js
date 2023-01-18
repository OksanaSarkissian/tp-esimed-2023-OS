const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
require('dotenv').config()

router.get('/', async (req, res) => {
  res.send(await userRepository.getUsers());
});

router.get('/:firstName', async (req, res) => {
  const foundUser = await userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post('/', async (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.password) {
    res.status(400).send("Paramètres manquants")
  } else {
    const existingUser = await userRepository.getUserByFirstName(req.body.firstName);

    if (existingUser) {
      throw new Error('Unable to create the user');
    }

    await userRepository.createUser(req.body);
    res.status(201).end();
  }
});

router.put('/:id', async (req, res) => {
  await userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/:id', async (req, res) => {
  await userRepository.deleteUser(req.params.id);
  res.status(204).end();
});



exports.initializeRoutes = () => router;
