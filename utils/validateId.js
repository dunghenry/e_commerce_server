const mongoose = require('mongoose');
const validateId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};
const messageInvalidId = (res) => {
    return res.status(400).json({
        message: 'Invalid id',
    });
};
module.exports = { validateId, messageInvalidId };
