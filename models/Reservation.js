const mongoose = require('mongoose');

let ReservationSchema = new mongoose.Schema({
  id: {
    type: String
  },
  paymentId: {
    type: String,
    required: true
  },
  kidPax: {
    type: Number
  },
  adultPax: {
    type: Number
  },
  dates: {
    type: [String]
  },
  roomNumber: {
    type: String
  },
  pax: {
    type: String,
    required: true
  }
},
{
  usePushEach: true
});

mongoose.model('Reservation', ReservationSchema);
