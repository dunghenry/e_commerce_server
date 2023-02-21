const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {
    generateAccessToken,
    generateRefreshToken,
} = require('../helpers/generateToken');
const { validationRegister } = require('../utils/validateUser');
class UserController {
    static async register(req, res) {
        const { _, error } = validationRegister(req.body);
        const rs = validationRegister(req.body);
        const [__, ...errors] = rs.error.details;
        if (error) {
            return res.json(errors);
        }
        try {
            return res.status(200).json(req.body);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UserController;
