const router = require('express').Router();

router.use('/dancers', require('./dancers'));
router.use('/images', require('./images'));

module.exports = router;
