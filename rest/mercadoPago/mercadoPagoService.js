'use strict';
const mercadopagoConfig = require('./../../config/mercadoPago');
const mercadopago = require('mercadopago');

mercadopago.configure(mercadopagoConfig);

const mercadopagoService = () => {

  return {
    doPay: doPay
  };

  async function doPay(payment){
    return mercadopago.payment.create(payment);
  }

  async function retryPayment(payment, idempotency){
    return mercadopago.payment.create(payment, {
      qs: {
        idempotency: idempotency
      }
    });
  }

};

  module.exports = mercadopagoService;
  // 
  // .then(function (mpResponse) {
  //   console.log(mpResponse);
  //   return mpResponse;
  // }).catch(function (mpError) {
  //   return mercadopago.payment.create(payment, {
  //     qs: {
  //       idempotency: mpError.idempotency
  //     }
  //   });
  // }).then(
  //   (mpResponse) => {
  //     return mpResponse;
  //   },
  //   (error) => {
  //      throw error;
  //    });
