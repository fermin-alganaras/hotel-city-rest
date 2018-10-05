// Include dependencies

const bodyParser = require('body-parser');
const cors = require('cors');
const CONSTANTS = require('constants');
const mongoose = require('mongoose');
const _ = require('lodash');

require('./models/Reservation');
require('./models/Room');

let RoomsHandler = require('./sockets/rooms/roomEventHandler');
let ReservationsHandler = require('./sockets/reservations/reservationEventHandler');

// Create the server and map POST payload to request parameters object
let http = require('http');
const express = require('express');
let app = express();
var server = http.Server(app);
let io = require('socket.io')(server);  //pass a http.Server instance


// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./routes'));

const dir = `${__dirname}/public`;
app.use(express.static(dir));

var port = process.env.PORT || 9002;

if (process.env.HOTEL_CITY_ENV === "dev") {
  mongoose.connect('mongodb://localhost/hotelCity', function(err, db) {
    if(err) console.log(err);

    console.log("successfully connected to " + db.name);
  });
}

server.listen(port, function() {
    console.log("App is running on port " + port);
});

//  Web socket handling to connect with admin
io.on('connection', function (socket) {
  let eventHandlers = {
    roomsHandler: new RoomsHandler(io.sockets, socket),
    reservationsHandler: new ReservationsHandler(io.sockets, socket)
  };

  _.each(eventHandlers, (category) => {
    var handler = category.handler;
    for (var event in handler) {
        socket.on(event, handler[event]);
    }
  });
  eventHandlers.reservationsHandler.handler.reservationsList();
  eventHandlers.roomsHandler.handler.roomsList();
})
