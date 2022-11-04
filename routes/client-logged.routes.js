const express = require("express");
const router = express.Router();
const Client = require("../models/Client.model");
const bcrypt = require("bcryptjs");
const app = require("../app");

const saltRounds = 10;

// GET route for displaying the signup form

router.get("/client-signup", (req, res, next) => {
  res.render("auth/client-signup");
});

router.post('/auth/client/client-signup', async (req, res, next) => {
    const {email, password} = req.body;
   /* if (email === '' || password === '') {
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
    } */
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    try {
        await Client.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedPassword,
            postalcode: req.body.postalcode,
            phone: req.body.phone,
        });
        res.redirect('/auth/client-login');
    } catch (error) {
       console.log(error.message)
       res.render('auth/client-signup', { errorMessage: 'Something went wrong. Please try again.' });
    } 
});

// GET route for displaying the login form
router.get('/client-login', (req, res, next) => {
    res.render('auth/client-login');
});

router.post('/client-login', async (req, res, next) => {
    const {email, password} = req.body;
   const currentUser = await Client.findOne({email});
    if (!currentUser) {
        res.render('auth/client-login', { errorMessage: 'Email is not registered or is incorrect. Try with another email.' });
        return;
    }
    if (bcrypt.compareSync(password, currentUser.password)) {
        req.session.currentUser = currentUser;
        res.redirect('/client-profile');
    }
});
 


module.exports = router