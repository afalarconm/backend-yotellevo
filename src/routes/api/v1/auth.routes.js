const express = require("express");
require("dotenv").config();
const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expiresIn, rounds } = require("../../../utils/auth");

const router = express.Router();

function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign({ user},
        `${secret}`,
        { expiresIn: '10h' },
        (err, token) => { err? reject(err) : resolve(token)});
});
}

// Crear un usuario
// todo el mundo
router.post("/signup", async (req, res) => {

    if (req.body.password === req.body.passwordConfirmation) {
        //encriptar la contraseña
        const { password } = req.body;
        const encryptedPassword = bcrypt.hashSync(password, Number.parseInt(rounds));
        try {
            const user = await User.create({
                userName: req.body.username,
                email: req.body.email,
                password: encryptedPassword
            });
            const token = await generateToken(user);

            return res.status(201).json({
                user: user,
                token: token
            });

        } catch (ValidationError) {
            res.status(500).send("Error de validacion");
            return;
        }
    }
    res.status(400).send("Las contraseñas no coinciden");
});


// Login de un usuario
// todo el mundo
router.post("/login", async (req, res) => {
    const { username, pass } = req.body.params;
    const user = await User.findOne({ where: { userName: username } });

        if (!user) {
            return res.status(401).send("El usuario no existe");
        }
        if (!bcrypt.compare(pass, user.password)) {
            return res.status(401).send("La contraseña es incorrecta");
        }
    const token = await generateToken(user); //generar el token
    const { id, email, admin } = user;
    body = {
        id,
        username: username,
        email,
        admin,
        token: token,
        token_type: "Bearer"
    }
    return res.status(200).json(body);
});









module.exports = router;