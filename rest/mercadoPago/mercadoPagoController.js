'use strict';

const router = require('express').Router();
const CONSTANTS = require('../../constants');
const _ = require('lodash');
const mercadopagoService = require('./mercadoPagoService')();

router.post('/payments', async function(req, res, next) {
  try {

    if(!req.body.amount || !req.body.token) res.send("Amount and token are required fields")

    let payment = {
      description: 'Reserva Nuevo Hotel City, Mendoza, Argentina',
      transaction_amount: req.body.amount,
      token: req.body.token.id,
      payment_method_id: req.body.payment_method_id,
      installments: 1,
      payer: {
        email: req.body.email,
        identification: {
          type: req.body.token.cardholder.identification.type,
          number: req.body.token.cardholder.identification.number
        }
      }
    };
    let response = await mercadopagoService.doPay(payment);
    if (response.status != "201") {
      response = await mercadoPagoService.retryPayment(payment, idempotency);
    }

    res.send(response);
  } catch (e) {
    res.send(e);
  }
})

module.exports = router;
