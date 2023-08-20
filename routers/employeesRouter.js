const express = require("express");
const employeesController = require("../controllers/employeesController");

const employeesRouter = express.Router();

employeesRouter.get("", employeesController.getEmployeesHome);

employeesRouter.get("/admin-employees", employeesController.getAdminEmployees);

employeesRouter.get("/admin-employees/add", employeesController.getAddEmployee);

employeesRouter.get(
  "/admin-employees/edit/:id",
  employeesController.getEditEmployee
);

employeesRouter.get(
  "/employee-details/:id",
  employeesController.getEmployeeDetails
);

employeesRouter.post(
  "/admin-employees/edit",
  employeesController.postEditEmployee
);

employeesRouter.post(
  "/admin-employees/add",
  employeesController.postAddEmployee
);

employeesRouter.post(
  "/employee-details/:id",
  employeesController.postAddEmployeeVacation
);

employeesRouter.post(
  "/admin-employees/delete/:id",
  employeesController.postDeleteEmployee
);

module.exports = employeesRouter;
