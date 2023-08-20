const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const Employee = databaseObj.define("employee", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  id_company: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  dateOfBirth: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },

  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  imgPath: {
    type: Sequelize.TEXT("long"),
    allowNull: false,
  },

  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  jobPosition: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  salary: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Employee;
