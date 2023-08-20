const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const Payroll = databaseObj.define("payroll", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  id_employee: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  grossPay: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  netPay: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  ARS: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  AFP: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  ISR: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Payroll;
