const JWT = require("jsonwebtoken");

const generateTokens = async (payload) => {
  try {
    const { ACCESS_SECRET } = process.env;

    const access = JWT.sign(payload, ACCESS_SECRET, {
      expiresIn: "1d",
    });

    const refresh = JWT.sign(payload, ACCESS_SECRET, {
      expiresIn: "3d",
    });

    const tokens = { access, refresh };

    return tokens;
  } catch (error) {
    console.log(error);
    throw new Error("Error generating tokens");
  }
};

module.exports = { generateTokens };
