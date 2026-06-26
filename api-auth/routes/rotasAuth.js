const { Router } = require('express');
const {
  registrar,
  login,
  refresh,
  logout
} = require('../controllers/authController');

const { autenticar } = require('../middlewares/authMiddleware');

const router = Router();

// Rotas públicas
router.post('/auth/registrar', registrar);
router.post('/auth/login', login);
router.post('/auth/refresh', refresh);

// Rota protegida
router.post('/auth/logout', autenticar, logout);

module.exports = router;