'use strict';

const reservationService = () => {

  return {
    getTimeStampDatesArray: getTimeStampDatesArray,
    getDateTimeStamp: getDateTimeStamp

  };

  function getDateTimeStamp(date) {
    let dateObj = new Date(date.year, date.month - 1, date.day);

    return dateObj.getTime();
  }

  function getTimeStampDatesArray(beginDate, endDate) {

    beginDate = new Date(beginDate.year, beginDate.month - 1, beginDate.day);
    console.log("begin date " + beginDate);
    endDate = new Date(endDate.year, endDate.month - 1, endDate.day);
    console.log("end date " + endDate);

    for(var arr=[],dt=beginDate; dt<=endDate; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt).getTime());
    }

    return arr;


     // month is 0-based

    return dateObject.getTime();
  }

};

module.exports = reservationService;
