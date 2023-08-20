const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const Vacation = databaseObj.define("vacation", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  id_employee: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },

  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },

  days: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  pay: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Vacation;
