const { Router } = require('express');
const UserController = require('../controllers/auth.controller');
const router = Router();
router.post('/register', UserController.register);
module.exports = router;
