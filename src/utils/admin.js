const { User } = require("../models");

// Creacion de un administrador
// admin is created by default

const createAdmin = async () => {
    const admin = await User.findOne({
        where: {
        admin: true
        }
    });
    if (!admin) {
        const admin = await User.create({
        userName: "admin",
        email: "admin@uc.cl",
        password: "password",
        admin: true
        });
    }
    }
    createAdmin();
module.exports = createAdmin;