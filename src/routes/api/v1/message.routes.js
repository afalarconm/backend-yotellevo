const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const { Message } = require('../../../models');


router.post('/new', async (req, res) => {
    try {
        const message = await Message.create({
            content: req.body.content,
            author: req.body.author,
            UserId: req.body.UserId,
            ViajeId: req.body.ViajeId
        });
        await Message.findAll({
            where: {
                ViajeId: req.body.ViajeId
            }
        }).then(messages => {
            res.status(200).json(messages);
        }
        );

    } catch (e) {
        res.status(400).json({ error: e });
        console.log(e)
    }
});

// endpoint para obtener todos los mensajes de un viaje
router.get('/viaje/:id', async (req, res) => {
    try {
        console.log(req.body)
         await Message.findAll({
            where: { ViajeId: req.params.id }
        })
        .then(messages => {
            res.status(200).json(messages);
            })
        .catch(error => {
            res.status(400).json({ error: error });
            console.log(ViajeId)
            
        }
        );



    } catch (e) {
        res.status(400).json({ error: e });
    }
});





module.exports = router;