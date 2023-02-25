const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  _id: ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "booking" },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {
  BookingModel,
};
