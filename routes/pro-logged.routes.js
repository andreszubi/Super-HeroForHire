const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional.model');
const app = require('../app');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// GET route for displaying the signup form

router.get('/pro-signup', (req, res, next) => {
    res.render('auth/pro-signup');
});

router.post('/pro-signup', async (req, res, next) => {
 const {email, password, name, address,phone, services} = req.body;
    if (email === '' || password === '') {
        res.render('auth/pro-signup', { errorMessage: 'All fields are mandatory. Please provide your email and password.' });
        return;
    }
    const emailRegex = /@/;
    if (!emailRegex.test(email)) {
        res.render('auth/pro-signup', { errorMessage: 'Email format is not valid.' });
        return;
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.render('auth/pro-signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }
    if (services.length === 0) {
        res.render('auth/pro-sign-up', { errorMessage: 'You must select at least one service.' });
        return;
    }

    if (price < 0) {
        res.render('auth/pro-sign-up', { errorMessage: 'Price per hour must be filled out.' });
        return;
    }


    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        await Professional.create({
            email,
            password: hashedPassword,
            name,
            address,
            phone,
            price,
            services
        });
        res.redirect('/pro-profile');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('auth/pro-signup', { errorMessage: error.message });
        } else if (error.code === 11000) {
            res.status(500).render('auth/pro-signup', {
                errorMessage: 'Email needs to be unique. The email is already used.'
            });
        } else {
            next(error);
        }
    }
}) 


module.exports = router