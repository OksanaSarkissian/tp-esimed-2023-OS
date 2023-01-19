const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { body } = require('express-validator');
const { validateBody } = require('./validation/route.validator');

router.post('/login', body('firstName').not().isEmpty(), body('password').not().isEmpty(), async (req, res) => {
  try {
    validateBody(req);
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }
  const foundUser = await userRepository.getUserByFirstName(req.body.firstName);
  if (foundUser) {
    if (await bcrypt.compare(req.body.password, foundUser.password)) {
      res.status(200).send(
        jwt.sign(
          {
            id: req.body.id,
            firstName: req.body.firstName,
            permissions: [foundUser.isAdmin ? 'admin' : ''],
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN },
        ),
      );
    } else {
      res.status(401).send('Mot de passe ou utilisateur incorrect');
    }
  } else {
    res.status(400).send('Unauthorized');
  }
});

exports.initializeRoutes = () => router;
