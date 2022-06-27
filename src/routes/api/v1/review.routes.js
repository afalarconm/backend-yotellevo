const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const { Review } = require('../../../models');


router.post('/new', async (req, res) => {
    try {
        const review = await Review.create({
            like: req.body.like,
            dislike: req.body.dislike,
            criticado: req.body.criticado,
            UserId: req.body.UserId,
            ViajeId: req.body.ViajeId
        });
        res.status(201).json(review);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

// endpoint para obtener todos los reviews de un viaje
router.get('/viaje/:id', async (req, res) => {
    try {
        const review = await Review.findAll({
            where: { ViajeId: req.params.id }
        })
        .then(review => {
            let hearts = 0;
            let haters = 0;
            for (let i = 0; i < review.length; i++) {
                if (review[i].like) {
                    hearts+=1;
                } else if (review[i].dislike) {
                    haters+=1;
                }
            }
            res.status(200).send({ hearts, haters });
            })
        .catch(error => {
            res.status(400).json({ error: error });
        }
        );



    } catch (e) {
        res.status(400).json({ error: e });
    }
});

// endpoint para obtener todos los reviews de un usuario
router.get('/user/:id', async (req, res) => {
    try {
        const review = await Review.findAll({
            where: { criticado: req.params.id }
        })
        .then(review => {
            let hearts = 0;
            let haters = 0;
            for (let i = 0; i < review.length; i++) {
                if (review[i].like) {
                    hearts+=1;
                } else if (review[i].dislike) {
                    haters+=1;
                }
            }
            res.status(200).send({ hearts, haters });
            })
        .catch(error => {
            res.status(400).json({ error: error });
        }
        );

    } catch (e) {
        res.status(400).json({ error: e });
    }
});




module.exports = router;