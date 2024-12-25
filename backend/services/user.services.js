const { User } = require("../models");

const saveUser = async (payload) => {
  try {
    console.log(payload);
    const user = new User(payload);
    return await user.save();
  } catch (error) {
    throw new Error("Error while saving user");
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error while fetching user");
  }
};

module.exports = { saveUser, getUserByEmail };
