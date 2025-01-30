const { DealsAndOffer } = require("../models");

const saveDealsAndOffer = async (data) => {
  try {
    let dealsAndOffer = new DealsAndOffer(data);
    dealsAndOffer = await dealsAndOffer.save();
    return dealsAndOffer;
  } catch (error) {
    console.log(error);
    throw new Error("Error while saving deals and offer");
  }
};

const getDealsAndOffer = async (id) => {
  try {
    let dealsAndOffer = await DealsAndOffer.findById(id).populate("products");
    return dealsAndOffer;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching deals and offer");
  }
};

const getDealsAndOffers = async () => {
  try {
    let dealsAndOffers = await DealsAndOffer.find({}).populate("products");
    return dealsAndOffers;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching deals and offers");
  }
};

const updateDealsAndOffer = async (id, data) => {
  try {
    let dealsAndOffer = await DealsAndOffer.findByIdAndUpdate(id, data, {
      new: true,
    });
    return dealsAndOffer;
  } catch (error) {
    console.log(error);
    throw new Error("Error while updating deals and offer");
  }
};

const deleteDealsAndOffer = async (id) => {
  try {
    let dealsAndOffer = await DealsAndOffer.findByIdAndDelete(id);
    return dealsAndOffer;
  } catch (error) {
    console.log(error);
    throw new Error("Error while deleting deals and offer");
  }
};

module.exports = {
  saveDealsAndOffer,
  getDealsAndOffer,
  getDealsAndOffers,
  updateDealsAndOffer,
  deleteDealsAndOffer,
};
