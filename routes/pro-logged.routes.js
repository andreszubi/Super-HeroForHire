const express = require("express");
const router = express.Router();
const Professional = require("../models/Professional.model");
const app = require("../app");
const bcrypt = require("bcryptjs");

// GET route for displaying the signup form

router.get("/pro-signup", (req, res, next) => {
  res.render("auth/pro-signup");
});

router.post("/pro-signup", async (req, res, next) => {
  //   const {
  //     name,
  //     email,
  //     password,
  //     postalcode,
  //     phone,
  //     services,
  //     price,
  //     specialties,
  //   } = req.body;
  if (email === "" || password === "") {
    res.render("auth/pro-signup", {
      errorMessage:
        "All fields are mandatory. Please provide your email and password.",
    });
    return;
  }
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
      specialties: req.body.specialties,
    });
    res.redirect("auth/pro-profile");
  } catch (error) {
    console.log(error.message);
    res.render("auth/pro-signup");

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

router.get("/pro-login", (req, res) => {
  res.render("auth/pro-login");
});

router.post("/pro-login", async (req, res) => {
  const { name, password } = req.body;

  const loggedUser = await User.findOne({ name: name });
  const checkPassword = await bcrypt.compare(password, loggedUser.password);
  if (checkPassword) {
    res.redirect("auth/pro-profile");
  }
});

module.exports = router;
