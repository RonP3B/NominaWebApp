const express = require("express");
const authController = require("../controllers/authController");
const redirects = require("../middlewares/redirects");

const authRouter = express.Router();

authRouter.get("/", redirects.isAuthenticated, authController.getLogin);
authRouter.get("/sign-up", redirects.isAuthenticated, authController.getSignup);
authRouter.get("/reset-pass/find-company", authController.getFindCompany);
authRouter.get("/reset-pass/confirm-code", authController.getConfirmCode);
authRouter.get("/reset-pass/reset-password", authController.getResetPassword);
authRouter.get("/log-out", authController.getLogout);

authRouter.post("/log-in", authController.postLogin);
authRouter.post("/sign-up", authController.postSignUp);
authRouter.post("/reset-pass/find-company", authController.postFindCompany);
authRouter.post("/reset-pass/confirm-code", authController.postConfirmCode);
authRouter.post("/reset-pass/reset-password", authController.postResetPass);

module.exports = authRouter;
