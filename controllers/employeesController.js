const { Employee, Payroll, Vacation } = require("../exports/models");
const { countVacationDays } = require("../exports/util");
const { getAFP, getARS, getISR } = require("../util/getPayroll");
const fs = require("fs");
const crypto = require("crypto");

exports.getEmployeesHome = async (req, res, next) => {
  try {
    const employeesObj = await Employee.findAll({
      where: { id_company: req.session.company.id },
    });

    const employees = employeesObj.map((res) => res.dataValues);

    res.render("employees/employees", { employees });
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.getAdminEmployees = async (req, res, next) => {
  try {
    const employeesObj = await Employee.findAll({
      where: { id_company: req.session.company.id },
    });

    const employees = employeesObj.map((res) => res.dataValues);

    res.render("employees/admin-employees", { employees });
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.getAddEmployee = (req, res, next) => {
  res.render("employees/form-employees");
};

exports.getEditEmployee = async (req, res, next) => {
  const id = req.params.id;

  try {
    const employeeObj = await Employee.findOne({
      where: { id, id_company: req.session.company.id },
    });

    if (!employeeObj) return res.redirect("/employees/admin-employees");

    res.render("employees/form-employees", {
      edit: true,
      employee: employeeObj.dataValues,
    });
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.getEmployeeDetails = async (req, res, next) => {
  const id = req.params.id;

  try {
    const employeeObj = await Employee.findByPk(id, {
      include: [Payroll, Vacation],
    });

    if (!employeeObj) return res.redirect("back");

    res.render("employees/employee-details", {
      employee: employeeObj.get({ plain: true }),
    });
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.postAddEmployee = async (req, res, next) => {
  const imageFile = req.file;
  const {
    name,
    lastName,
    dateOfBirth,
    gender,
    email,
    address,
    phone,
    jobPosition,
    salary,
  } = req.body;

  //--------------------------Validations--------------------------//
  if (
    !name ||
    !lastName ||
    !address ||
    !imageFile ||
    !dateOfBirth ||
    !phone ||
    !email ||
    !gender ||
    !jobPosition ||
    !salary
  ) {
    return res.redirect("back");
  }

  if (!validateEmployeeValues(req)) return res.redirect("back");

  //---------------------End of Validations------------------------//

  const idEmployee = crypto.randomUUID();

  try {
    await Employee.create({
      id: idEmployee,
      id_company: req.session.company.id,
      companyId: req.session.company.id, //Sequelize relation id field
      name: name.toLowerCase(),
      lastName: lastName.toLowerCase(),
      dateOfBirth,
      gender,
      email,
      address,
      imgPath: imageFile.filename,
      phone,
      jobPosition,
      salary,
    });

    const ARS = getARS(salary);
    const AFP = getAFP(salary);
    const ISR = getISR(salary);

    await Payroll.create({
      id: crypto.randomUUID(),
      id_employee: idEmployee,
      employeeId: idEmployee, //Sequelize relation id field
      grossPay: salary,
      netPay: salary - ARS - AFP - ISR,
      ARS,
      AFP,
      ISR,
    });

    req.flash("toastMsg", "Empleado guardado con éxito.");
    res.redirect("/employees/admin-employees");
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.postAddEmployeeVacation = async (req, res, next) => {
  const id = req.params.id;
  const { startDate, endDate } = req.body;

  try {
    const employeeObj = await Employee.findByPk(id, {
      include: [Payroll, Vacation],
    });

    if (!employeeObj || !startDate || !endDate) return res.redirect("back");
    if (new Date(endDate) <= new Date(startDate)) return res.redirect("back");

    const days = countVacationDays(new Date(startDate), new Date(endDate));
    const pay = ((employeeObj.dataValues.salary / 23.83) * days).toFixed(2);

    await Vacation.create({
      id: crypto.randomUUID(),
      id_employee: id,
      employeeId: id,
      startDate,
      endDate,
      days,
      pay,
    });

    await employeeObj.reload();

    res.render("employees/employee-details", {
      employee: employeeObj.get({ plain: true }),
      vacationAdded: true,
    });
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.postEditEmployee = async (req, res, next) => {
  const imageFile = req.file;
  const {
    id,
    name,
    lastName,
    dateOfBirth,
    gender,
    email,
    address,
    phone,
    jobPosition,
    salary,
  } = req.body;

  //--------------------------Validations--------------------------//
  if (
    !id ||
    !name ||
    !lastName ||
    !address ||
    !dateOfBirth ||
    !phone ||
    !email ||
    !gender ||
    !jobPosition ||
    !salary
  ) {
    return res.redirect("back");
  }

  if (!validateEmployeeValues(req)) return res.redirect("back");

  let employeeObj = null;

  try {
    employeeObj = await Employee.findByPk(id);
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }

  if (!employeeObj) return res.redirect("back");

  //---------------------End of Validations------------------------//

  try {
    if (imageFile && imageFile.filename !== employeeObj.dataValues.imgPath) {
      fs.unlinkSync(
        `./public/assets/images/uploaded/${employeeObj.dataValues.imgPath}`
      );
    }

    if (salary !== employeeObj.dataValues.salary) {
      const ARS = getARS(salary);
      const AFP = getAFP(salary);
      const ISR = getISR(salary);

      await Payroll.update(
        {
          grossPay: salary,
          netPay: salary - ARS - AFP - ISR,
          ARS,
          AFP,
          ISR,
        },
        {
          where: { employeeId: employeeObj.dataValues.id },
        }
      );
    }

    await employeeObj.update({
      imgPath: imageFile ? imageFile.filename : employeeObj.dataValues.imgPath,
      name: name.toLowerCase(),
      lastName: lastName.toLowerCase(),
      address,
      dateOfBirth,
      phone,
      email,
      gender,
      jobPosition,
      salary,
    });

    req.flash("toastMsg", "Empleado editado con éxito.");
    res.redirect("/employees/admin-employees");
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

exports.postDeleteEmployee = async (req, res, next) => {
  const id = req.params.id;

  try {
    const employeeObj = await Employee.findByPk(id);

    if (employeeObj) {
      const { imgPath, name, lastName } = employeeObj.dataValues;

      if (imgPath) fs.unlinkSync(`./public/assets/images/uploaded/${imgPath}`);

      await employeeObj.destroy();

      req.flash(
        "toastMsg",
        `El empleado '${name} ${lastName}' ha sido eliminado`
      );
    }

    res.redirect("/employees/admin-employees");
  } catch (error) {
    console.log(`Controller error: ${error}`);
    res.sendStatus(500);
  }
};

const validateEmployeeValues = (req) => {
  const emailRegEx = /^\S+@\S+\.\S+$/;
  const phoneRegEx = /^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  const { email, phone, salary } = req.body;

  if (!emailRegEx.test(email)) {
    req.flash("formMsg", "Correo electronico inválido.");
    return false;
  }

  if (!phoneRegEx.test(phone)) {
    req.flash("formMsg", "Numero de telefono inválido.");
    return false;
  }

  if (isNaN(salary)) {
    req.flash("formMsg", "Sueldo inválido.");
    return false;
  }

  return true;
};
