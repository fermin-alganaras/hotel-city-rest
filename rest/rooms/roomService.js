'use strict';

const mongoose = require('mongoose');
const Room = mongoose.model('Room');
const _ = require('lodash');

const roomService = () => {

  return {
    getAvailability: getAvailability

  };


  async function getAvailability(bDate, eDate, totalPax) {

    let room = await Room.findOne({ maxPax: totalPax, 'reservations.dates': { $nin: [ bDate , eDate ] }})
            .populate({
              path: 'reservations',
              match: { dates: { $nin: [ bDate , eDate ] }}
            }).exec();
    let result = !_.isNil(room) ? true : false;

    return result
  }

};

module.exports = roomService;
