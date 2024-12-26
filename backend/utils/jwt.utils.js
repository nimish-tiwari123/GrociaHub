const JWT = require("jsonwebtoken");

const generateTokens = async (payload) => {
  try {
    const { JWT_ACCESS_SECRET } = process.env;

    const access = JWT.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });

    const refresh = JWT.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "3d",
    });

    const tokens = { access, refresh };

    return tokens;
  } catch (error) {
    console.log(error);
    throw new Error("Error generating tokens");
  }
};

const generateToken = async (payload, expiry) => {
  try {
    const { JWT_ACCESS_SECRET } = process.env;

    const token = JWT.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: expiry,
    });

    return token;
  } catch (error) {
    throw new Error(`Error generating forgot password token`);
  }
};

const verifyToken = async (token) => {
  try {
    const { JWT_ACCESS_SECRET } = process.env;

    const decoded = JWT.verify(token, JWT_ACCESS_SECRET);

    return decoded;
  } catch (error) {
    throw new Error(`Error verifying token`);
  }
};

module.exports = { generateTokens, generateToken, verifyToken };
