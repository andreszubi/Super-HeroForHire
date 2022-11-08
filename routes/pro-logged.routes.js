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
  res.render("auth/pro-signup");
});

router.post("/pro-signup", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const proProfile = await Professional.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      postalcode: req.body.postalcode,
      phone: req.body.phone,
      services: req.body.services,
      price: req.body.price,
    });
    res.redirect(`/auth/pro/pro-login`);
  } catch (error) {
    console.log(error.message);
    res.render("auth/pro-signup", {
      errorMessage: "Something went wrong. Please try again.",
    });

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

//GET/POST route for Login

router.get("/pro-login", (req, res) => {
  res.render("auth/pro-login");
});

router.post("/pro-login", async (req, res) => {
  const { email, password } = req.body;
  const loggedProUser = await Professional.findOne({ email });
  if (!loggedProUser) {
    //No user with that name//
    res.render("auth/pro-login", {
      errorMessage: "No user with this email",
    });
  } else {
    if (bcrypt.compareSync(password, loggedProUser.password)) {
      //User with right password//
      req.session.professional = loggedProUser;
      res.redirect(`/auth/pro/pro-profile/${loggedProUser._id}`);
    } else {
      //User and incorrect password//
      res.render("auth/pro-login", {
        errorMessage: "Incorrect password!",
      });
    }
  }
});

//GET route to profile

router.get("/pro-profile/:id", proIsLoggedIn, async (req, res, next) => {
  const professional = await Professional.findById(req.params.id);
  res.render("auth/pro-profile", { professional });
});

//EDIT profile

router.get("/pro-profile-edit/:id", proIsLoggedIn, async (req, res, next) => {
  const professional = await Professional.findById(req.params.id);
  res.render("auth/pro-profile-edit", { professional });
});

router.put("/pro-profile-edit/:id", proIsLoggedIn, async (req, res, next) => {
  const professional = await Professional.findById(req.params.id);
  const { fullname, email, postalcode, phone, price } = req.body;
  professional.fullname = fullname;
  professional.email = email;
  professional.postalcode = postalcode;
  professional.phone = phone;
  professional.price = price;
  await professional.save();
  res.redirect(`/auth/pro/pro-profile/${professional._id}`);
});

//DELETE profile

router.delete(
  "/pro-profile/delete/:id",
  proIsLoggedIn,
  async (req, res, next) => {
    await Professional.findByIdAndDelete(req.params.id);
    res.redirect("/");
  }
);

//Logout

router.get("/logout", (req, res, next) => {
  req.session.professional = null;
  console.log("logout", req.session);
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
