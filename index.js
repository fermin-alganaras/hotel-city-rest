var router = require('express').Router();

router.use('/async', require('../../components/things/thingController'));
router.use('/async', require('../../components/policies/policyController'));
router.use('/async', require('../../components/certificates/certificateController'));
router.use('/async', require('../../components/channels/channelController'));
router.use('/async', require('../../components/devices/deviceController'));
router.use('/async', require('../../components/groups/groupController'));
router.use('/async', require('../../components/clientTestController'));



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
