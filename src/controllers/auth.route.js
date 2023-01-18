const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userRepository = require('../models/user-repository');
const SECRET = 'secretKey'


router.post('/login', async (req, res) => {
    if (!req.body.firstName || !req.body.password) {
        res.status(400).send("Paramètres manquants")
    } else {
        const foundUser = await userRepository.getUserByFirstName(req.body.firstName);
        if (foundUser) {
            if (bcrypt.compare(req.body.password, foundUser.password)) {
                res.status(200).send(jwt.sign({
                    firstName: req.body.firstName
                }, SECRET, { expiresIn: '1h' }))
            console.log("token: " , jwt.sign({
                firstName: req.body.firstName
            }, SECRET, { expiresIn: '1h' }))} else {
                res.status(401).send("Mot de passe ou utilisateur incorrect")
            }

        } else {
            res.status(400).send("Mot de passe ou utilisateur incorrect");
        }
    }
    })

exports.initializeRoutes = () => router;
