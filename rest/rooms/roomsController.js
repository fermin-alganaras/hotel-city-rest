'use strict';

const router = require('express').Router();
const CONSTANTS = require('../../constants');
const mongoose = require('mongoose');
const Room = mongoose.model('Room');
const roomService = require('./roomService')();
const reservationService = require('./../reservations/reservationService')();

router.get('/rooms', async function(req, res, next) {
  let room = await Room.find({});

  res.send(room);
})

router.get('/rooms/reservations', async function(req, res, next) {
  let reservations = await Room.find({})
                       .populate({
                          path: 'reservations',
                          select: 'kidPax adultPax beginDate endDate roomNumber'
                        }).exec()
  res.send(reservations);
})

router.post('/rooms', async function(req, res, next){

  // should be done in service getAvailability(pax, beginDate, endDate)
  // rooms = getroomsbypaxamount(req.pax)
  // result = getAvailableRoomsByRange(rooms)
  // if (result) return return true
  console.log(req.body.denomination);
  console.log(req.body.floor);
  console.log(req.body.maxPax);
  console.log(req.body.booking);
  let room = new Room();
  room.denomination = req.body.denomination;
  room.floor = req.body.floor;
  room.maxPax = req.body.maxPax;
  room.booking = req.body.booking;
  room.number = req.body.number;

  room.save(function(err) {
    if(err) console.log(err);

    res.send("Success saving " + room);
  })

});

router.post('/rooms/availability', async function(req, res, next) {
  //params: beginDate, adultPax, kidPax
  let totalPax = req.body.adultPax + req.body.kidPax;
  let bDate = reservationService.getDateTimeStamp(req.body.beginDate);
  let eDate = reservationService.getDateTimeStamp(req.body.endDate);

  let availability = await roomService.getAvailability(bDate, eDate, totalPax);

  res.send(availability);
})

router.put('/rooms', async function(req, res, next) {
  // add reservation to room
  // req.pax, req.beginDate, req.endDate, req.paxName, req.paxLastName
  // new Reservation(req.pax, req.beginDate, req.endDate, req.paxName, req.paxLastName)
  // room = getAvailableRoom(req.pax, req.beginDAte, req.endDate);
  // room.update({ reservations.push(reservation )});
});

router.delete('/rooms', async function(req, res, next) {
  // deletes reservation from room
  // reservationId
  // delete chabon
});
module.exports = router;
