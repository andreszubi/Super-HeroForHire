const proIsLoggedIn = (req, res, next) => {
  if (!req.session.professional) {
    res.redirect("/auth/pro/pro-login");
  } else {
    next();
  }
};

const proIsLoggedOut = (req, res, next) => {
  if (req.session.professional) {
    return res.redirect("/");
  } else {
    next();
  }
};

module.exports = {
  proIsLoggedIn,
  proIsLoggedOut,
};
