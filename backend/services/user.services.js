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

const getUsers = async (queries) => {
  try {
    const { search, pageSize = 10, pageNo = 0 } = queries;
    const limitValue = parseInt(pageSize, 10);
    const offsetValue = parseInt(pageNo, 10) * limitValue;

    const query = {};
    if (search) {
      const searchTerm = search.trim();
      query.name = { $regex: searchTerm, $options: "i" };
    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query).skip(offsetValue).limit(limitValue);

    const totalPages = Math.ceil(totalUsers / limitValue);
    const currentPageNo = Math.floor(offsetValue / limitValue) + 1;

    return {
      users,
      pagination: {
        pageNo: currentPageNo,
        pageSize: limitValue,
        totalPages,
        totalUsers,
      },
    };
  } catch (error) {
    throw new Error("Error while getting all users");
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw new Error("Error while fetching user");
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

const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, user, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error while updating user");
  }
};

module.exports = {
  saveUser,
  getUserByEmail,
  getUserById,
  updateUser,
  getUsers,
};
