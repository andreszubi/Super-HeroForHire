const express = require("express");
const router = express.Router();
const Professional = require("../models/Professional.model");
const app = require("../app");
const bcrypt = require("bcryptjs");
const {
  proIsLoggedIn,
  proIsLoggedOut,
} = require("../middleware/professional-route-guard.js");
const uploader = require("../middleware/cloudinary.config");

// GET route for displaying the signup form

router.get("/pro-signup", (req, res, next) => {
  res.render("Auth/pro-signup", {proBody: {firstname: "", lastname: "", email: "", password: "", postalcode: "", phone: "", city: "", price: ""}});
});

router.post(
  "/pro-signup",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
      }

      if (req.body.email === "" || req.body.password === "") {
        res.render("Auth/pro-signup", {
          errorMessage:
            "All fields are mandatory. Please provide your email and password.",
        });
        return;
      }

      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!passwordRegex.test(req.body.password)) {
        res.render("Auth/pro-signup", { proBody: req.body,
          errorMessage:
            "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
      }

      const professionalProfile = await Professional.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        city: req.body.city,
        postalcode: req.body.postalcode,
        phone: req.body.phone,
        services: req.body.services,
        price: req.body.price,
        image: req.file.path,
      });
      res.redirect("/auth/pro/pro-login");
    } catch (error) {
      console.log(error.message);
      if (error.code === 11000) {
        res.render("Auth/pro-signup", {
          errorMessage: "Email is already in use.",
        });
        return;
      }
      res.render("Auth/pro-signup", {
        errorMessage: "Something went wrong. Please try again.",
      });
    }
  }
);



//GET/POST route for Login

router.get("/pro-login", (req, res) => {
  res.render("Auth/pro-login");
});

router.post("/pro-login", async (req, res) => {
  const { email, password } = req.body;
  const loggedProUser = await Professional.findOne({ email });
  if (!loggedProUser) {
    //No user with that name//
    res.render("Auth/pro-login", {
      errorMessage: "No user with this email",
    });
  } else {
    if (bcrypt.compareSync(password, loggedProUser.password)) {
      //User with right password//
      req.session.professional = loggedProUser;
      res.redirect(`/Auth/pro/pro-profile/${loggedProUser._id}`);
    } else {
      //User and incorrect password//
      res.render("Auth/pro-login", {
        errorMessage: "Incorrect password!",
      });
    }
  }
});

//GET route to profile

router.get("/pro-profile/:id", proIsLoggedIn, async (req, res, next) => {
  const professional = await Professional.findById(req.params.id);
  res.render("Auth/pro-profile", { professional });
});

//EDIT profile

router.get("/pro-profile-edit/:id", proIsLoggedIn, async (req, res, next) => {
  const professional = await Professional.findById(req.params.id);
  res.render("Auth/pro-profile-edit", { professional });
});

router.put("/pro-profile-edit/:id", proIsLoggedIn, async (req, res, next) => {
  const professional = await Professional.findById(req.params.id);
  const { firstname, lastname, email, city, postalcode, phone, price } =
    req.body;
  professional.firstname = firstname;
  professional.lastname = lastname;
  professional.email = email;
  professional.city = city;
  professional.postalcode = postalcode;
  professional.phone = phone;
  professional.price = price;
  await professional.save();
  res.redirect(`/Auth/pro/pro-profile/${professional._id}`);
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
