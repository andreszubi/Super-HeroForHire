const express = require("express");
const router = express.Router();
const Professional = require("../models/Professional.model");
const app = require("../app");
const bcrypt = require("bcryptjs");
const {
  proIsLoggedIn,
  proIsLoggedOut,
} = require("../middleware/professional-route-guard.js");

// GET route for displaying the signup form

router.get("/pro-signup", (req, res, next) => {
  res.render("auth/pro-signup", { isConnected: false });
});

router.post("/pro-signup", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    await Professional.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      postalcode: req.body.postalcode,
      phone: req.body.phone,
      services: req.body.services,
      price: req.body.price,
    });
    res.redirect("/auth/pro/pro-profile");
  } catch (error) {
    console.log(error.message);
    res.render("auth/pro-signup", { isConnected: false });

    //   if (email === "" || password === "") {
    //     res.render("auth/pro-signup", {
    //       errorMessage:
    //         "All fields are mandatory. Please provide your email and password.",
    //     });
    //     return;
    //   }
    //   const emailRegex = /@/;
    //   if (!emailRegex.test(email)) {
    //     res.render("auth/pro-signup", {
    //       errorMessage: "Email format is not valid.",
    //     });
    //     return;
    //   }
    //   const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    //   if (!passwordRegex.test(password)) {
    //     res.render("auth/pro-signup", {
    //       errorMessage:
    //         "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    //     });
    //     return;
    //   }
    //   if (services.length === 0) {
    //     res.render("auth/pro-signup", {
    //       errorMessage: "You must select at least one service.",
    //     });
    //     return;
    //   }

    //   if (price < 0) {
    //     res.render("auth/pro-signup", {
    //       errorMessage: "Price per hour must be filled out.",
    //     });
    //     return;
    //   }

    // if (error instanceof mongoose.Error.ValidationError) {
    //   res
    //     .status(500)
    //     .render("auth/pro-signup", { errorMessage: error.message });
    // } else if (error.code === 11000) {
    //   res.status(500).render("auth/pro-signup", {
    //     errorMessage: "Email needs to be unique. The email is already used.",
    //   });
    // } else {
    //   next(error);
    // }
  }
});

router.get("/pro-profile", (req, res, next) => {
  res.render("auth/pro-profile");
});

router.get("/pro-login", (req, res) => {
  res.render("auth/pro-login", { isConnected: false });
});

router.post("/pro-login", async (req, res) => {
  const { email, password } = req.body;
  const loggedProUser = await Professional.findOne({ email });
  if (!loggedProUser) {
    //No user with that name//
    res.render("auth/pro-login", {
      errorMessage: "No user with this username",
      isConnected: false,
    });
  } else {
    if (bcrypt.compareSync(password, loggedProUser.password)) {
      //User with right password//
      req.session.professional = loggedProUser;
      res.redirect("/auth/pro/pro-profile");
    } else {
      //User and incorrect password//
      res.render("auth/pro-login", {
        errorMessage: "Incorrect password!",
        isConnected: false,
      });
    }
  }

  //   const loggedUser = await User.findOne({ name: name });
  //   const checkPassword = await bcrypt.compare(password, loggedUser.password);
  //   if (checkPassword) {

  //   }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/home");
  });
});

module.exports = router;
