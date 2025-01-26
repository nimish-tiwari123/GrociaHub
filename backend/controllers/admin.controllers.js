const { responseMessages } = require("../configs");
const { adminServices } = require("../services");

const dashboardCounts = async (req, res) => {
  try {
    const counts = await adminServices.getCounts();

    return res.status(200).json({
      success: true,
      message: "Dashboard counts retrieved successfully",
      counts,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { dashboardCounts };
