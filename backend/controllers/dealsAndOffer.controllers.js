const { responseMessages } = require("../configs");
const { dealsAndOfferServices } = require("../services");

const createDealsAndOffer = async (req, res) => {
  try {
    const dealsAndOffer = await dealsAndOfferServices.saveDealsAndOffer(
      req.body
    );

    res
      .status(201)
      .json({ status: true, message: responseMessages.DEAL_OFFER_CREATED });
  } catch (error) {
    res.status(400).json({ message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

const getDealsAndOffer = async (req, res) => {
  try {
    const dealsAndOffer = await dealsAndOfferServices.getDealsAndOffer(
      req.params.id
    );

    if (!dealsAndOffer) {
      return res.status(400).json({
        status: false,
        message: responseMessages.DEAL_OFFER_NOT_FOUND,
      });
    }

    res.status(200).json({
      status: true,
      dealsAndOffer,
      message: responseMessages.DEAL_OFFER_RETRIEVED,
    });
  } catch (error) {
    res.status(400).json({ message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

const getDealsAndOffers = async (req, res) => {
  try {
    const dealsAndOffers = await dealsAndOfferServices.getDealsAndOffers();
    res.status(200).json({
      status: true,
      dealsAndOffers,
      message: responseMessages.DEALS_OFFERS_RETRIEVED,
    });
  } catch (error) {
    res.status(400).json({ message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

const updateDealsAndOffer = async (req, res) => {
  try {
    let dealsAndOffer = await dealsAndOfferServices(req.params.id);

    if (!dealsAndOffer) {
      return res.status(400).json({
        status: false,
        message: responseMessages.DEAL_OFFER_NOT_FOUND,
      });
    }

    dealsAndOffer = await dealsAndOfferServices.updateDealsAndOffer(
      req.params.id,
      req.body
    );

    if (!dealsAndOffer) {
      return res.status(400).json({
        status: false,
        message: responseMessages.DEAL_OFFER_NOT_FOUND,
      });
    }

    res.status(200).json({
      status: true,
      message: responseMessages.DEAL_OFFER_UPDATED,
    });
  } catch (error) {
    res.status(400).json({ message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

const deleteDealsAndOffer = async (req, res) => {
  try {
    let dealsAndOffer = await dealsAndOfferServices(req.params.id);

    if (!dealsAndOffer) {
      return res.status(400).json({
        status: false,
        message: responseMessages.DEAL_OFFER_NOT_FOUND,
      });
    }

    dealsAndOffer = await dealsAndOfferServices.deleteDealsAndOffer(
      req.params.id
    );

    res.status(200).json({
      status: true,
      message: responseMessages.DEAL_OFFER_DELETED,
    });
  } catch (error) {
    res.status(400).json({ message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createDealsAndOffer,
  getDealsAndOffer,
  getDealsAndOffers,
  updateDealsAndOffer,
  deleteDealsAndOffer,
};
