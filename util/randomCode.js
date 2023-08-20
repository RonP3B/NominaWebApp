const crypto = require("crypto");

const generateRandomCode = (length) => {
  const randomBytes = crypto.randomBytes(length);
  const code = randomBytes
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .substr(0, length);

  return code;
};

module.exports = generateRandomCode;
