const crypto = require("crypto");

const generateHash = (
  password,
  salt = crypto.randomBytes(64).toString("hex")
) => {
  try {
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

    return { hash, salt };
  } catch (error) {
    throw new Error("Error generating hash");
  }
};

const validateHash = (password, hash, salt) => {
  try {
    const { hash: newHash } = generateHash(password, salt);
    return newHash === hash;
  } catch (error) {
    throw new Error("Error validating hash");
  }
};

module.exports = { generateHash, validateHash };
