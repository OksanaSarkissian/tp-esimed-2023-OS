const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const router = express.Router();
const userRepository = require('../models/user-repository');
const {body, validationResult} = require('express-validator')



router.post('/login',body('firstName').not().isEmpty(),body('password').not().isEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).send('Forbidden');
    }
        const foundUser = await userRepository.getUserByFirstName(req.body.firstName);
        if (foundUser) {
            if (await bcrypt.compare(req.body.password, foundUser.password)) {
                res.status(200).send(jwt.sign({
                    id : req.body.id,
                    firstName: req.body.firstName,
                    permissions : [req.body.isAdmin?'admin':'']
                }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }))
            } else {
                res.status(401).send("Mot de passe ou utilisateur incorrect")
            }

        } else {
            res.status(400).send("Mot de passe ou utilisateur incorrect");
        }
    }
    )

exports.initializeRoutes = () => router;
