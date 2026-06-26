const express = require("express");
const cors = require('cors');
require("dotenv").config();

const relatosRoutes = require('./routes/rotasRelatos');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', relatosRoutes);

app.listen(PORT, () => console.log(`api-relatos rodando na porta ${PORT}`));