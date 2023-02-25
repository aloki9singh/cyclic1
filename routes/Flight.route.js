const express = require("express");

const { FlightModel } = require("../model/FlightModel");
const flightRouter = express.Router();
require("dotenv").config();

//ALL FLIGHTS
flightRouter.get("/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.status(200).json({
      success: true,
      Flights: flights,
    });
  } catch (err) {
    console.log({ err: err });
    res.send({ success: false, err: err });
  }
});

//INDIVIDUAL Flight
flightRouter.get("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const flight = await FlightModel.findById({ _id: id });
    res.status(200).json({
      success: true,
      Flight: flight,
    });
  } catch (err) {
    console.log({ err: err });
    res.send({ success: false, err: err });
  }
});
//POST Flight
flightRouter.post("/flights", async (req, res) => {
  const payload = req.body;
  try {
    const flight = new FlightModel(payload);
    await flight.save();
    res.status(201).json({
      success: true,
      msg: "Successfully Posted New Flight",
      Flights: flight,
    });
  } catch (err) {
    console.log({ err: err });
    res.send({ success: false, msg: " New Flight Post Error!", err: err });
  }
});
//PUT/PATCH Flight

flightRouter.patch("/flights/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const flight = await FlightModel.findById({ _id: id });
  // const flightID = flight[0].userID;
  // const flightreqID = req.body.userID;
 
  try {
    // if (flightID !== flightreqID) {
    //   res.send({ success: false, err: "You are not Authorized" });
    // } else {
      const flight = await FlightModel.findByIdAndUpdate({ _id: id }, payload);
      res.status(204).json({
        success: true,
        msg: "Successfully Updated the Flight",
        Flights: flight,
       });
    // }
  } catch (err) {
    console.log({ err: err, msg: " Flight Update Error!" });
    res.send({ success: false, msg: " Flight Update Error!", err: err });
  }
});
//DELETE Flight

flightRouter.delete("/flights/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const flight = await FlightModel.findById({ _id: id });
  // const flightID = flight[0].userID;
  // const flightreqID = req.body.userID;

  try {
    // if (flightID !== flightreqID) {
    //   res.send({ success: false, err: "You are not Authorized" });
    // } else {
      const flight = await FlightModel.findByIdAndDelete({ _id: id }, payload);
      res.status(202).json({
        success: true,
        msg: "Successfully Deleted the Flight",
      });
    // }
  } catch (err) {
    console.log({ err: err, msg: " Flight Delete Error!" });
    res.send({ success: false, msg: " Flight Delete Error!", err: err });
  }
});

module.exports = {
  flightRouter,
};
