// -------------------Packages------------------------------- //
require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const multer = require("multer");
const path = require("path");

// -------------------Server Files--------------------------- //
const redirects = require("./middlewares/redirects");
const locals = require("./middlewares/locals");
const { Company, Employee, Payroll, Vacation } = require("./exports/models");
const { imgStorage, databaseObj } = require("./exports/util");
const {
  authRouter,
  employeesRouter,
  notFoundRouter,
} = require("./exports/routers");

// -------------------Server--------------------------------- //
const app = express();
const port = process.env.PORT || 5000;

// -----------------View Engine congiguration---------------- //
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      json: (obj) => JSON.stringify(obj),
      equal: (a, b) => a === b,
      isVacationOver: (endDate) => new Date() >= new Date(endDate),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// --------------------------------Middlewares------------------------------- //
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(multer({ storage: imgStorage }).single("imgPath"));
app.use(session({ secret: "secret", resave: true, saveUninitialized: false }));
app.use(flash());
app.use(locals);
app.use(authRouter);
app.use("/employees", redirects.isUnauthorized, employeesRouter);
app.use(notFoundRouter);

// ----------------------------Sequelize associations------------------------ //
Company.hasMany(Employee, { onDelete: "CASCADE" });
Employee.belongsTo(Company, { constraint: true });

Employee.hasOne(Payroll, { onDelete: "CASCADE" });
Payroll.belongsTo(Employee, { constraint: true });

Employee.hasMany(Vacation, { onDelete: "CASCADE" });
Vacation.belongsTo(Employee, { constraint: true });

// ----------------------------Sequelize Configuration----------------------- //
databaseObj
  .sync()
  .then((res) => app.listen(port, () => console.log(`Listening on ${port}`)))
  .catch((err) => {
    console.log(err);
  });
