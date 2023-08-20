exports.isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return res.redirect("/employees");
  }

  next();
};

exports.isUnauthorized = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return res.redirect("/");
  }

  next();
};
