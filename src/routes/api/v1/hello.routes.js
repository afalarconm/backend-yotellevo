const express = require('express');

const db = require('../../../models');

// const { User } = db; hay que verlo en la pagina de sequilize

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send( {message: 'Saludos desde el backend'} );
    }
);

module.exports = router;