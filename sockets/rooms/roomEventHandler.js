let mongoose = require('mongoose');
let Room = mongoose.model('Room');

var RoomEventHandler = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        roomsList:           roomsList.bind(this),
        reservationMade:     reservationMade.bind(this), // use the bind function to access this.app
        reservationCanceled: reservationCanceled.bind(this)    // and this.socket in events
    };
}

async function roomsList() {
  let rooms = await Room.find().select('number denomination floor booking');
  // Broadcast message to all sockets
  this.app.emit('roomsList', rooms);
}

function reservationMade(reservation) {
    // Broadcast message to all sockets
    this.app.emit('reservationMade', reservation);
};

function reservationCanceled(reservation) {
    // Reply to sender
    this.app.emit('reservationCanceled', reservation);
};

module.exports = RoomEventHandler;
