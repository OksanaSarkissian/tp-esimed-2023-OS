const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
require('dotenv').config();
const guard = require('express-jwt-permissions')({ requestProperty: 'auth' });
const { body } = require('express-validator');
const { validateBody } = require('./validation/route.validator');

router.get('/', async (req, res) => {
  res.send(await userRepository.getUsers());
});

router.get('/:firstName', guard.check('admin'), async (req, res) => {
  const foundUser = await userRepository.getUserByFirstName(
    req.params.firstName
  );

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post(
  '/',
  body('firstName').not().isEmpty().isAlphanumeric().isLength({ min: 5 }),
  body('lastName').not().isEmpty().isAlphanumeric().isLength({ min: 5 }),
  body('password').not().isEmpty().isAlphanumeric().isLength({ min: 5 }),
  async (req, res) => {
    try {
      validateBody(req);
    } catch (e) {
      res.status(500).send(e.message);
      return;
    }
    const existingUser = await userRepository.getUserByFirstName(
      req.body.firstName
    );

    if (existingUser) {
      return res.status(500).send('Impossible de créer cet utilisateur');
    }

    await userRepository.createUser(req.body);
    res.status(201).end();
  }
);

router.put('/:id', guard.check('admin'), async (req, res) => {
  await userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/:id', guard.check('admin'), async (req, res) => {
  await userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => router;
