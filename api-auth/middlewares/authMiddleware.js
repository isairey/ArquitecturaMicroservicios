const jwt = require('jsonwebtoken');
const { verificarBlacklistDB } = require('../usecases/AuthUseCases');

const SECRET_ACCESS = process.env.JWT_SECRET_ACCESS;

const autenticar = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token ausente' });

  const blacklisted = await verificarBlacklistDB(token);
  if (blacklisted) return res.status(403).json({ error: 'Token inválido' });

  try {
    const payload = jwt.verify(token, SECRET_ACCESS);
    req.user = payload;
    next();
  } catch {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = { autenticar };
