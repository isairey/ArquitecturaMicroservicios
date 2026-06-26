const { loginDB, registrarDB, logoutDB, verificarBlacklistDB } = require('../usecases/AuthUseCases');
const jwt = require('jsonwebtoken');

const SECRET_ACCESS = process.env.JWT_SECRET_ACCESS;
const SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;

const registrar = async (req, res) => {
  try {
    const user = await registrarDB(req.body);
    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await loginDB(req.body);

    const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_ACCESS, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, SECRET_REFRESH, { expiresIn: '7d' });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Token ausente' });

    const tokenBlacklist = await verificarBlacklistDB(refreshToken);
    if (tokenBlacklist) return res.status(403).json({ error: 'Token inválido' });

    const payload = jwt.verify(refreshToken, SECRET_REFRESH);
    const accessToken = jwt.sign({ id: payload.id, email: payload.email }, SECRET_ACCESS, { expiresIn: '15m' });

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

const logout = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.body;

    if (accessToken) await logoutDB(accessToken);
    if (refreshToken) await logoutDB(refreshToken);

    res.json({ message: 'Tokens invalidados com sucesso' });
  } catch (err) {
    console.error('Erro no logout:', err.message);
    res.status(500).json({ error: 'Erro ao invalidar tokens' });
  }
};

module.exports = { registrar, login, refresh, logout };
