const { Company } = require("../exports/models");
const { transporter, generateRandomCode } = require("../exports/util");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.getLogin = (req, res, next) => {
  res.render("auth/log-in");
};

exports.getSignup = (req, res, next) => {
  res.render("auth/sign-up");
};

exports.getResetPass = (req, res, next) => {
  res.render("auth/reset-pass");
};

exports.getFindCompany = (req, res, next) => {
  res.render("auth/reset-pass", { findUser: true });
};

exports.getConfirmCode = (req, res, next) => {
  if (!req.session.companyRecovery) return res.redirect("back");
  res.render("auth/reset-pass", { confirmCode: true });
};

exports.getResetPassword = (req, res, next) => {
  if (!req.session.companyRecovery) return res.redirect("back");
  res.render("auth/reset-pass", { resetPass: true });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { companyUser, password } = req.body;

    if (!companyUser || !password) return res.redirect("/");

    const company = await Company.findOne({
      where: { companyUser: companyUser.toLowerCase() },
    });

    if (!company) {
      req.flash("formMsg", "Usuario de la empresa invalido");
      return res.redirect("/");
    }

    const isValidPass = await bcrypt.compare(password, company.password);

    if (!isValidPass) {
      req.flash("formMsg", "Contraseña incorrecta");
      return res.redirect("/");
    }

    req.session.isAuthenticated = true;
    req.session.company = company;

    req.session.save((err) => {
      if (err) console.log(`session save error: ${err}`);
      req.flash(
        "toastMsg",
        `Bienvenido al manejo de la empresa ${company.name}`
      );
      return res.redirect("/employees");
    });
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.postSignUp = async (req, res, next) => {
  const {
    name,
    companyUser,
    address,
    website,
    phone,
    email,
    password,
    confirmPassword,
  } = req.body;

  //--------------------------Validations--------------------------//
  const emailRegEx = /^\S+@\S+\.\S+$/;
  const phoneRegEx = /^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

  if (
    !name ||
    !companyUser ||
    !address ||
    !website ||
    !phone ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.redirect("/sign-up");
  }

  if (!emailRegEx.test(email)) {
    req.flash("formMsg", "Correo electronico inválido.");
    return res.redirect("/sign-up");
  }

  if (!phoneRegEx.test(phone)) {
    req.flash("formMsg", "Numero de telefono inválido.");
    return res.redirect("/sign-up");
  }

  if (password.length < 6) {
    req.flash("formMsg", "La contraseña debe tener más de 5 caracteres.");
    return res.redirect("/sign-up");
  }

  let isValidUser = true;

  try {
    const objUser = await Company.findOne({
      where: { companyUser: companyUser.toLowerCase() },
    });
    if (objUser) isValidUser = false;
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }

  if (!isValidUser) {
    req.flash("formMsg", "El usuario ingresado para la empresa ya existe.");
    return res.redirect("/sign-up");
  }

  //---------------------End of Validations------------------------//

  const encryptedPassword = await bcrypt.hash(password, 12);
  const id = crypto.randomUUID();

  try {
    await Company.create({
      id,
      name,
      companyUser: companyUser.toLowerCase(),
      address,
      website,
      phone,
      email,
      password: encryptedPassword,
    });

    transporter.sendMail(
      {
        from: "NominaApp",
        to: email,
        subject: "Registro completado",
        html: `Le damos la bienvenida a la empresa: <strong>${name}</strong> a nuestra plataforma.`,
      },
      (err) => {
        if (err) console.log(`Transporter error: ${err}`);
      }
    );

    req.flash("toastMsg", "La empresa fue registrada con éxito.");
    res.redirect("/");
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.postFindCompany = async (req, res, next) => {
  try {
    const companyUser = req.body.companyUser;

    //--------------------------Validations--------------------------//
    if (!companyUser) return res.redirect("back");

    const company = await Company.findOne({
      where: { companyUser: companyUser.toLowerCase() },
    });

    if (!company) {
      req.flash("formMsg", "No existe una empresa con el usuario dado");
      return res.redirect("back");
    }

    //---------------------End of Validations------------------------//

    const confirmCode = generateRandomCode(7);

    req.session.confirmCode = confirmCode;
    req.session.companyRecovery = company;

    transporter.sendMail(
      {
        from: "NominaApp",
        to: company.email,
        subject: "Código de confimación",
        html: `Tu código de confirmación es: <strong>${confirmCode}<strong>`,
      },
      (err) => {
        if (err) console.log(`Transporter error: ${err}`);
      }
    );

    req.flash("toastMsg", "Recibiste el código en tu correo");
    res.redirect("/reset-pass/confirm-code");
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.postConfirmCode = (req, res, next) => {
  if (!req.body.code) return res.redirect("back");

  if (req.session.confirmCode !== req.body.code) {
    req.flash("formMsg", "El código ingresado es inválido");
    return res.redirect("back");
  }

  delete req.session.confirmCode;
  res.redirect("/reset-pass/reset-password");
};

exports.postResetPass = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;

    //--------------------------Validations--------------------------//

    if (!password || !confirmPassword) return res.redirect("back");

    if (password !== confirmPassword) {
      req.flash("formMsg", "Las contraseñas son diferentes");
      return res.redirect("back");
    }

    //---------------------End of Validations------------------------//

    const company = await Company.findByPk(req.session.companyRecovery.id);
    const securedPassword = await bcrypt.hash(password, 12);

    await company.update({ password: securedPassword });
    req.flash("toastMsg", "Tu contraseña fue cambiada con exito");

    delete req.session.companyRecovery;
    res.redirect("/");
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(`Session destroy error: ${err}`);
    else res.redirect("/");
  });
};
