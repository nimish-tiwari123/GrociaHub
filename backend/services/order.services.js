const { Order } = require("../models");

const saveOrder = async (data) => {
  try {
    const order = new Order(data);
    return await order.save();
  } catch (error) {
    console.log(error.message);
    throw new Error("Error while saving order");
  }
};

const getOrders = async () => {
  try {
    return await Order.find({}).populate("user","name");
  } catch (error) {
    console.log(error.message);
    throw new Error("Error while fetching orders");
  }
};

const getOrderById = async (id) => {
  try {
    return await Order.findById(id);
  } catch (error) {
    console.log(error.message);
    throw new Error("Error while fetching order");
  }
};

const updateOrder = async (id, data) => {
  try {
    return await Order.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.log(error.message);
    throw new Error("Error while updating order");
  }
};

const deleteOrder = async (id) => {
  try {
    return await Order.findByIdAndDelete(id);
  } catch (error) {
    console.log(error.message);
    throw new Error("Error while deleting order");
  }
};

module.exports = {
  saveOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
