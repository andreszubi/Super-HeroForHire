const proIsLoggedIn = (req, res, next) => {
  if (!req.session.professional) {
    return res.redirect("/login");
  }
  next();
};
const proIsLoggedOut = (req, res, next) => {
  if (req.session.professional) {
    return res.redirect("/");
  }
  next();
};

module.exports = {
  proIsLoggedIn,
  proIsLoggedOut,
};
