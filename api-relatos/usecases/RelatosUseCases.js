const { pool } = require('../config');
const Relatos = require('../entities/Relatos');

const getRelatosDB = async () => {
    try {
        const query = `
            SELECT 
                id,
                datahora,
                descricao,
                latitude,
                longitude,
                origem,
                tipo,
                usuarioemail
            FROM relatos
            ORDER BY datahora DESC
        `;
        const { rows } = await pool.query(query);
        return rows.map(row => new Relatos(
            row.id,
            row.datahora,
            row.descricao,
            row.latitude,
            row.longitude,
            row.origem,
            row.tipo,
            row.usuarioemail
        ));
    } catch (err) {
        throw "Erro ao buscar relatos: " + err;
    }
}

const addRelatoDB = async (body) => {
    try {
        const { dataHora, descricao, latitude, longitude, origem, tipo, usuarioEmail } = body;
        const query = `
            INSERT INTO relatos (datahora, descricao, latitude, longitude, origem, tipo, usuarioemail)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, TO_CHAR(datahora, 'YYYY-MM-DD HH24:MI:SS') as datahora, descricao, latitude, longitude, origem, tipo, usuarioemail
        `;
        const results = await pool.query(query, [dataHora, descricao, latitude, longitude, origem, tipo, usuarioEmail]);
        const r = results.rows[0];
        return new Relatos(r.id, r.datahora, r.descricao, r.latitude, r.longitude, r.origem, r.tipo, r.usuarioemail);
    } catch (err) {
        throw "Erro ao inserir relato: " + err;
    }
}

const updateRelatoDB = async (body) => {
    try {
        const { id, descricao, tipo } = body;
        const query = `
      UPDATE relatos
      SET descricao = $2, tipo = $3
      WHERE id = $1
      RETURNING id, TO_CHAR(datahora, 'YYYY-MM-DD HH24:MI:SS') as datahora, descricao, latitude, longitude, origem, tipo, usuarioemail
    `;
        const results = await pool.query(query, [id, descricao, tipo]);

        if (results.rowCount === 0) {
            throw `Nenhum relato encontrado com o id ${id} para ser atualizado`;
        }

        const r = results.rows[0];
        return new Relatos(r.id, r.datahora, r.descricao, r.latitude, r.longitude, r.origem, r.tipo, r.usuarioemail);
    } catch (err) {
        throw "Erro ao atualizar relato: " + err;
    }
};

const deleteRelatoDB = async (id) => {
    const client = await pool.connect();
    try {
        const result = await pool.query('DELETE FROM relatos WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            throw new Error(`Nenhum relato encontrado com o id ${id} para ser removido`);
        } else {
            return `Relato de id ${id} removido com sucesso!`;
        }
    } catch (err) {
        throw new Error("Erro ao remover relato: " + err.message);
    }
};


const getRelatoPorIdDB = async (id) => {
    try {
        const query = `
            SELECT 
                id,
                TO_CHAR(datahora, 'YYYY-MM-DD HH24:MI:SS') as datahora,
                descricao,
                latitude,
                longitude,
                origem,
                tipo,
                usuarioemail
            FROM relatos
            WHERE id = $1
        `;
        const results = await pool.query(query, [id]);

        if (results.rowCount === 0) {
            throw `Nenhum relato encontrado com o id ${id}`;
        }

        const r = results.rows[0];
        return new Relatos(r.id, r.datahora, r.descricao, r.latitude, r.longitude, r.origem, r.tipo, r.usuarioemail);
    } catch (err) {
        throw "Erro ao recuperar relato: " + err;
    }
}

module.exports = {
    getRelatosDB,
    addRelatoDB,
    updateRelatoDB,
    deleteRelatoDB,
    getRelatoPorIdDB
}

