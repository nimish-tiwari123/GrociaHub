const { responseMessages } = require("../configs");
const { orderServices } = require("../services");

const createOrder = async (req, res) => {
  try {
    const order = await orderServices.saveOrder(req.body);

    res
      .status(201)
      .send({ message: responseMessages.ORDER_CREATED, orderId: order._id });
  } catch (error) {
    res.status(400).json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderServices.getOrders();

    res
      .status(200)
      .json({ message: responseMessages.ORDERS_RETRIEVED, orders });
  } catch (error) {
    res.status(400).json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderServices.getOrderById(req.params.id);

    res.status(200).json({ message: responseMessages.ORDER_RETRIEVED, order });
  } catch (error) {
    res.status(400).json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await orderServices.updateOrder(req.params.id, req.body);

    res.status(200).json({ message: responseMessages.ORDER_UPDATED, order });
  } catch (error) {
    res.status(400).json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await orderServices.deleteOrder(req.params.id);

    res.status(200).json({ message: responseMessages.ORDER_DELETED });
  } catch (error) {
    res.status(400).json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
