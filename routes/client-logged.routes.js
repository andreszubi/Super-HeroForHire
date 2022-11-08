const express = require("express");
const router = express.Router();
const Client = require("../models/Client.model");
const bcrypt = require("bcryptjs");
const app = require("../app");
const {
  clientIsLoggedIn,
  clientIsLoggedOut,
} = require("../middleware/client-route-guard.js");
const Professional = require("../models/Professional.model");

// GET route for displaying the signup form

router.get("/client-signup", (req, res, next) => {
  res.render("auth/client-signup");
});

router.post("/client-signup", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const clientProfile = await Client.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      postalcode: req.body.postalcode,
      phone: req.body.phone,
    });
    res.redirect("/auth/client/client-login");
  } catch (error) {
    console.log(error.message);
    res.render("auth/client-signup", {
      errorMessage: "Something went wrong. Please try again.",
    });
  }
});

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

// GET route for displaying the login form

router.get("/client-login", (req, res, next) => {
  res.render("auth/client-login");
});

router.post("/client-login", async (req, res, next) => {
  const { email, password } = req.body;
  const loggedClientUser = await Client.findOne({ email });
  if (!loggedClientUser) {
    res.render("auth/client-login", {
      errorMessage:
        "Email is not registered or is incorrect. Try with another email.",
    });
    return;
  } else {
    if (bcrypt.compareSync(password, loggedClientUser.password)) {
      req.session.client = loggedClientUser;
      res.redirect(`/auth/client/client-search/${loggedClientUser._id}`);
    } else {
      res.render("auth/client-login", {
        errorMessage: "Incorrect password!",
      });
    }
  }
});

// GET route for SEARCH
router.get("/client-search/:id", clientIsLoggedIn, async (req, res, next) => {
  const client = req.session.client;
  res.render("auth/client-search", { client });
});

// POST route for RESULTS
router.post("/client-search", clientIsLoggedIn, async (req, res, next) => {
  const professional = await Professional.find({ services: "House Cleaning" });
  console.log(professional);
  res.render("auth/client-results", { professional });
});

// GET route for BOOKING CONFIRMATION
router.get("/booking-confirmation", clientIsLoggedIn, async (req, res, next) => {
    const client = req.session.client;
    res.render("auth/booking-confirmation", { client });
  }
);

// GET route for displaying the client profile
router.get("/client-profile/:id", clientIsLoggedIn, async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  res.render("auth/client-profile", { client });
});

//Edit client profile
router.get("/client-profile-edit/:id", clientIsLoggedIn, async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  res.render("auth/client-profile-edit", { client });
  }
);

router.put("/client-profile-edit/:id", clientIsLoggedIn, async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  const { fullname, email, postalcode, phone } = req.body;
  client.fullname = fullname;
  client.email = email;
  client.postalcode = postalcode;
  client.phone = phone;
  await client.save();
  res.redirect(`/auth/client/client-profile/${client._id}`);
  }
);

//DELETE user
router.delete("/client-profile/delete/:id", async (req, res, next) => {
  await Client.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// GET route for logging out
router.get("/logout", (req, res, next) => {
  req.session.client = null;
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
