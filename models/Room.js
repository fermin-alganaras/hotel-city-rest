
const mongoose = require('mongoose');
let Reservation = mongoose.model('Reservation').schema;

let RoomSchema = new mongoose.Schema({
  number: {
    type: Number
  },
  denomination: {
    type: String
  },
  floor: {
    type: String
  },
  maxPax: {
    type: Number
  },
  booking: {
    type: Boolean
  },
  reservations: [Reservation]
},
{
  usePushEach: true
});

mongoose.model('Room', RoomSchema);
