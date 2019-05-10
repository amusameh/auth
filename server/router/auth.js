const express = require('express');

const auth = require('../controllers/auth');
const secret = require('../controllers/secret');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();

router.post('/api/login', auth.login);
router.post('/api/register', auth.register);
router.get('/api/check-token', checkAuth, auth.checkToken);
router.get('/api/secret', checkAuth, secret.secret);

module.exports = router;
