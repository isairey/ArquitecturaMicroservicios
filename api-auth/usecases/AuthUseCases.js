const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config');

const registrarDB = async ({ nome, email, senha }) => {
  const senhaHash = await bcrypt.hash(senha, 10);
  const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email
  `;
  const { rows } = await pool.query(query, [nome, email, senhaHash]);
  return rows[0];
};

const loginDB = async ({ email, senha }) => {
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  if (rows.length === 0) throw new Error('Usuário não encontrado');
  const user = rows[0];
  const senhaOk = await bcrypt.compare(senha, user.senha);
  if (!senhaOk) throw new Error('Senha incorreta');
  return { id: user.id, email: user.email };
};

const logoutDB = async (token) => {
  if (!token) throw new Error('Token ausente');

  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) throw new Error('Token inválido');

  const exp = new Date(decoded.exp * 1000); // exp é em segundos
  try {
    await pool.query(
      'INSERT INTO token_blacklist (token, expira_em) VALUES ($1, $2)',
      [token, exp]
    );
  } catch (err) {
    console.error('Erro ao inserir token na blacklist:', err.message);
    throw new Error('Falha ao registrar token na blacklist');
  }
};

const verificarBlacklistDB = async (token) => {
  const { rows } = await pool.query('SELECT * FROM token_blacklist WHERE token = $1', [token]);
  return rows.length > 0;
};

module.exports = { registrarDB, loginDB, logoutDB, verificarBlacklistDB };