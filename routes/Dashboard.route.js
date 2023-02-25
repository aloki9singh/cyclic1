const express = require("express");

const { bookingModel } = require("../model/FlightModel");
const bookingRouter = express.Router();
require("dotenv").config();

flightRouter.get("/dashboard", async (req, res) => {
  try {
    const flights = await FlightModel.find()
    res.status(200).json({
      success: true,
      Flight: flight,
    });
  } catch (err) {
    console.log({ err: err });
    res.send({ success: false, err: err });
  }
});

module.exports = {
  bookingRouter,
};
