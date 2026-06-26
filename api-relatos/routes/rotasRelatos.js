const { Router } = require('express');
const {
  getRelatos,
  addRelato,
  updateRelato,
  deleteRelato,
  getRelatoPorId
} = require('../controllers/relatosController');

const { autenticar } = require('../middlewares/authMiddleware');

const router = Router();

router.route('/relatos')
  .get(autenticar, getRelatos)
  .post(autenticar, addRelato);

router.route('/relatos/:id')
  .get(autenticar, getRelatoPorId)
  .put(autenticar, updateRelato)
  .delete(autenticar, deleteRelato);

module.exports = router;