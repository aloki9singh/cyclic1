const express = require("express");

const { bookingModel } = require("../model/FlightModel");
const bookingRouter = express.Router();
require("dotenv").config();

flightRouter.post("/booking", async (req, res) => {
  const payload = req.body;
  try {
    const booking = new bookingModel(payload);
    await booking.save();
    res.status(201).json({
      success: true,
      msg: "Successfully Posted New booking",
      bookings: booking,
    });
  } catch (err) {
    console.log({ err: err });
    res.send({ success: false, msg: " New booking Post Error!", err: err });
  }
});

module.exports = {
  bookingRouter,
};
