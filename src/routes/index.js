const express = require('express');
const router = express.Router();

const hello  = require('./api/v1/hello.routes');
const viajes = require('./api/v1/viajes.routes');
const auth = require('./api/v1/auth.routes');
const users = require('./api/v1/users.routes');
const review = require('./api/v1/review.routes');
const message = require('./api/v1/message.routes');


const authorization = require('../middlewares/auth');

// Api v1 routes
router.use('/hello', hello);
router.use('/auth', auth);

router.use('/users', authorization, users);

router.use('/review', authorization, review);

router.use('/message', message);

router.use('/viajes', viajes);
router.get('/viajes', viajes);
router.post('/viajes', viajes);
router.use('/viajes/:id', authorization, viajes)
router.get('/viajes/:id', viajes);
router.put('/viajes/:id', viajes);
router.put('/viajes/join/:id', authorization, viajes)
router.delete('/viajes/:id', authorization, viajes);

router.use('/CreateViaje', authorization, viajes);

router.post('/CreateViaje', viajes);
router.get('/CreateViaje', authorization, viajes);

module.exports = router;