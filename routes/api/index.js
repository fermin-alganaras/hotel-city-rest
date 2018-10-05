var router = require('express').Router();

router.use('/cityHotel', require('../../rest/mail/mailController'));
router.use('/cityHotel', require('../../rest/gallery/galleryController'));
router.use('/cityHotel', require('../../rest/pricing/pricingController'));
router.use('/cityHotel', require('../../rest/rooms/roomsController'));
router.use('/cityHotel', require('../../rest/mercadoPago/mercadoPagoController'));
router.use('/cityHotel', require('../../rest/reservations/reservationsController'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
