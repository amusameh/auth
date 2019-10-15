const express = require('express');

const auth = require('../controllers/auth');
const secret = require('../controllers/secret');
const checkAuth = require('../middlewares/checkAuth');
const authorization = require('../middlewares/authorization');

const router = express.Router();

router.post('/api/login', auth.login);
router.post('/api/register', auth.register);
router.get('/api/check-token', checkAuth, auth.checkToken);
router.get('/api/secret', checkAuth, secret.secret);

router.get('/api/admin', checkAuth, authorization(['admin']), secret.admin);
router.get('/api/user', checkAuth, authorization(['user']), secret.user);
router.get(
  '/api/both',
  checkAuth,
  authorization(['admin', 'user']),
  secret.both
);

module.exports = router;
