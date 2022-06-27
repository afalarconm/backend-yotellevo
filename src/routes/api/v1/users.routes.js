const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const { User } = require("../../../models");
dotenv.config();

// Leer los usuarios
router.get("/all", async (req, res) => {
  const users = await User.findAll()
  .catch(err => {
    res.status(500).json({
      message: "Error al obtener los usuarios"
    });
  });
  console.log(req.user);
  res.status(200).json(users);
});

// Obtener un usuario por su id
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  .catch(err => {
    console.log(err);
    return res.status(500).send("Error al obtener el usuario");
  });
  if (!user) {
    return res.status(404).send("El usuario no existe");
  }
  if (user.id !== req.user.id) {
    return res.status(401).send("No tienes permisos para ver este usuario");
  }
  res.status(200).json(user);
});

// Editar la info de un usuario
// solo el usuario que lo creo puede editar su info
router.patch("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  .catch(err => {
    console.log(err);
    return res.status(500).send("Error al obtener el usuario");
  });
  if (!user) {
    return res.status(404).send("El usuario no existe");
  }
  if (user.id !== req.user.id) {
    return res.status(401).send("No tienes permisos para editar este usuario");
  }
  user.update(req.body)
  .then(() => {
    res.status(200).send(user);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).send("Error al actualizar el usuario");
  });
});

// Eliminar un usuario
// solo el usuario que lo creo puede eliminar su info
router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  .catch(err => {
    console.log(err);
    return res.status(500).send("Error al obtener el usuario");
  });
  if (!user) {
    return res.status(404).send("El usuario no existe");
  }
  if (user.id !== req.user.id && !req.user.admin) {
    return res.status(401).send("No tienes permisos para eliminar este usuario");
  }
  user.destroy()
  .then(() => {
    res.status(200).send("Usuario eliminado");
  }
  ).catch(err => {
    console.log(err);
    return res.status(500).send("Error al eliminar el usuario");
  });
});



module.exports = router;