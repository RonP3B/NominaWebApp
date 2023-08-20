const locals = (req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.toastMsg = req.flash("toastMsg");
  res.locals.formMsg = req.flash("formMsg");

  next();
};

module.exports = locals;
