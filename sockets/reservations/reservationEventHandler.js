let mongoose = require('mongoose');
let Reservation = mongoose.model('Reservation');

var ReservationEventHandler = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        reservationsList: reservationsList.bind(this),
        reservationMade: reservationMade.bind(this), // use the bind function to access this.app
        reservationCanceled:    reservationCanceled.bind(this)    // and this.socket in events
    };
}

async function reservationsList() {
  let reservations = await Reservation.find();
  // Broadcast message to all sockets
  this.app.emit('reservationsList', reservations);
}

function reservationMade(reservation) {
    // Broadcast message to all sockets
    this.app.allSockets.emit('reservationMade', reservation);
};

function reservationCanceled(reservation) {
    // Reply to sender
    this.app.allSockets.emit('reservationCanceled', reservation);
};

module.exports = ReservationEventHandler;
