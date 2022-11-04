const express = require('express');
const router = express.Router();
const Client = require('../models/Client.model');
const bcrypt = require('bcryptjs');
const app = require('../app');


const saltRounds = 10;

// GET route for displaying the signup form

router.get('/client-signup', (req, res, next) => {
    res.render('auth/client-signup');
});

router.post('/client-signup', async (req, res, next) => {
    const {email, password, name, address,phone} = req.body;
    if (email === '' || password === '') {
        res.render('auth/client-signup', { errorMessage: 'All fields are mandatory. Please provide your email and password.' });
        return;
    }
    const emailRegex = /@/;
    if (!emailRegex.test(email)) {
        res.render('auth/client-signup', { errorMessage: 'Email format is not valid.' });
        return;
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.render('auth/client-signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        await Client.create({
            email,
            password: hashedPassword,
            name,
            address,
            phone,
        });
        res.redirect('auth/client-profile');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('signup/client-signup', { errorMessage: error.message });
        } else if (error.code === 11000) {
            res.status(500).render('auth/client-signup', {
                errorMessage: 'Email needs to be unique. The email is already used.'
            });
        } else {
            next(error);
        }
    } 
});
 


module.exports = router