const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/rotasAuth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`api-auth rodando na porta ${PORT}`);
});