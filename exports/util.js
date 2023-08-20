const databaseObj = require("../util/databaseObj");
const imgStorage = require("../util/imgStorage");
const transporter = require("../util/transporter");
const generateRandomCode = require("../util/randomCode.js");
const getPayroll = require("../util/getPayroll.js");
const countVacationDays = require("../util/countVacationDays");

module.exports = {
  databaseObj,
  imgStorage,
  generateRandomCode,
  transporter,
  getPayroll,
  countVacationDays,
};
