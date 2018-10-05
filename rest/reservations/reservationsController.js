'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const CONSTANTS = require('../../constants');
const Reservation = mongoose.model('Reservation');
const Room = mongoose.model('Room');
const reservationService = require('./reservationService')();
const _ = require('lodash');

router.get('/reservation', async function(req, res, next) {
  let reservation = await reservation.find({});

  res.send(reservation);
})

// should return
router.post('/reservation', async function(req, res, next){

  try {
    // should add reservations
    // params beginDate, endDate, adultpax, kidPax, roomId

    if (_.isNil(req.body.beginDate) || _.isNil(req.body.endDate) || _.isNil(req.body.adultPax) || _.isNil(req.body.paymentId)) {
      res.send(400);
    }

    let reservation = new Reservation();
    reservation.dates = reservationService.getTimeStampDatesArray(req.body.beginDate, req.body.endDate);
    reservation.adultPax = req.body.adultPax;
    reservation.kidPax = req.body.kidPax || 0;
    reservation.roomNumber = req.body.roomNumber || null;
    reservation.paymentId = req.body.paymentId;
    let bDate = reservationService.getDateTimeStamp(req.body.beginDate);
    let eDate = reservationService.getDateTimeStamp(req.body.endDate);

    let room;

    if(_.isNil(reservation.roomNumber)) {
      let totalPax = reservation.kidPax + reservation.adultPax;

      room = await Room.findOne({ maxPax: totalPax, 'reservations.dates': { $nin: [ bDate , eDate ] }})
              .populate({
                path: 'reservations',
                match: { dates: { $nin: [ bDate , eDate ] }}
              }).exec();

      if(_.isNil(room)) {
        res.send("something went wrong while performing reservation");
      } else { reservation.roomNumber = room.number; }
    } else {
      room = Room.find({ number: reservation.roomNumber });
    }

    await reservation.save();

    room.reservations.push(reservation);
    await room.update({reservations: room.reservations});

    let response = {reservation: reservation, status: "200"};

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

router.put('/reservation', async function(req, res, next) {
  // should modify reservation
  // params beginDate | endDate | adultPax | kidPax | roomId
});

router.delete('/reservation/:id', async function(req, res, next) {
  // reservationId
});
module.exports = router;
