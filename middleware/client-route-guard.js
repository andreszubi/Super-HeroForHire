const clientIsLoggedIn = (req, res, next) => {
  if (!req.session.client) {
    return res.redirect("/login");
  }
  next();
};
const clientIsLoggedOut = (req, res, next) => {
  if (req.session.client) {
    return res.redirect("/");
  }
  next();
};

module.exports = {
  clientIsLoggedIn,
  clientIsLoggedOut,
};

//we need to create two different sessions?//
