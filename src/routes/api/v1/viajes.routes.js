const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Viaje } = require("../../../models");
dotenv.config();
const { validateAddViajeInput } = require("../../../utils/viajes");
const { list } = require("postcss");

router.post("/CreateViaje/", async (req, res) => {
    try {   
      console.log(req.body) 
      if (validateAddViajeInput(req.body)){
        const viaje = await Viaje.create({
          origen: req.body.origen,
          destino: req.body.destino,
          cupos: req.body.cupos,
          hora_inicio: req.body.hora_inicio,
          Precio: req.body.precio,
          Pasajeros: [],
          detalles: req.body.comentarios,
          activo: true,
          UserId: req.body.UserId
        });
        res.status(201).json(viaje);
        } else {
          res.status(400).json({ error: "Invalid input"})
        }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router.get('/viajes', (req, res) => {
  try {
    Viaje.findAll()
      .then(viajes => {
        res.send(viajes)
    });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get('/viajes/:id', (req, res) => {
  try {
    let Viajeid = req.params.id
    Viaje.findOne({
      where: {
        id: Viajeid
      }
    })
      .then(viaje => {
        res.send(viaje)
    });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.put('/viajes/:id', (req, res) => {
  try {
    let viajeId = req.params.id
    let nuevo_viaje = req.body
    Viaje.findOne({
      where: {
        id: viajeId
      }
    })
      .then(viaje => {
        viaje.update(nuevo_viaje)
        .then(viaje_actualizado => {
          res.send(viaje_actualizado)
        })
      })
    }
  catch (e) {
    res.status(400).json({ error: e });
  }
});

// eliminar viaje
router.delete('/viajes/:id', (req, res) => {
  try {
    let viajeId = req.params.id
    Viaje.destroy({
      where: {
        id: viajeId
      }
    })
    res.send("Viaje eliminado")
  }
  catch (e) {
    res.status(400).json({ error: e });
  }
});

// añadir pasajeros al viaje
router.put('/viajes/join/:id', (req, res) => {
  console.log(req.body)
  try {
    let viajeId = req.params.id
    let nuevo_viaje = req.body
    Viaje.findOne({
      where: {
        id: viajeId
      }
    })
      .then(viaje => {
        viaje.update(nuevo_viaje)
        .then(viaje_actualizado => {
          res.send(viaje_actualizado)
        })
      })
    }
  catch (e) {
    res.status(400).json({ error: e });
  }
});



module.exports = router;
