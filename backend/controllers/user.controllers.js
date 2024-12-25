const { userValidations } = require("../validations");
const { responseMessages } = require("../configs");
const { userServices } = require("../services");
const { crypto, jwt } = require("../utils");

const createUser = async (req, res) => {
  try {
    const { error } = userValidations.createValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ status: false, message: error.message[0] });
    }

    const userExists = await userServices.getUserByEmail(req.body.email);

    if (userExists) {
      return res
        .status(409)
        .json({ status: false, message: responseMessages.USER_ALREADY_EXISTS });
    }

    const { hash, salt } = await crypto.generateHash(req.body.password);

    const user = await userServices.saveUser({
      ...req.body,
      password: hash,
      salt,
    });

    res.status(201).json({
      status: true,
      message: responseMessages.USER_CREATED,
      userId: user._id,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = userValidations.loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ status: false, message: error.message[0] });
    }

    const user = await userServices.getUserByEmail(req.body.email);

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: responseMessages.USER_NOT_FOUND });
    }

    const isValidPassword = await crypto.validateHash(
      req.body.password,
      user.password,
      user.salt
    );

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: false, message: responseMessages.INVALID_PASSWORD });
    }

    const tokens = await jwt.generateTokens({ userId: user._id });

    res.status(201).json({
      status: true,
      message: responseMessages.USER_LOGIN_SUCCESS,
      userId: user._id,
      tokens,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { createUser, loginUser };
