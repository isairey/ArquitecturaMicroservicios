const { getRelatosDB, addRelatoDB, updateRelatoDB, deleteRelatoDB, getRelatoPorIdDB } = require('../usecases/RelatosUseCases');

const getRelatos = async (request, response) => {
      await getRelatosDB()
            .then(data => response.status(200).json(data))
            .catch(err => response.status(400).json({
                  status: 'error',
                  message: 'Erro ao consultar os relatos'
            }))
}

const addRelato = async (request, response) => {
      await addRelatoDB(request.body)
            .then(data => response.status(200).json({
                  status: "success", message: " Relato criado com sucesso",
                  objeto: data
            }))
            .catch(err => response.status(400).json({
                  status: 'error',
                  message: err
            }))
}

const updateRelato = async (request, response) => {
      await updateRelatoDB(request.body)
            .then(data => response.status(200).json(data))
            .catch(err => response.status(400).json({
                  status: 'error',
                  message: err
            }))
}

const deleteRelato = async (request, response) => {
      await deleteRelatoDB(request.params.id)
          .then(() => response.status(200).json({
                id: request.params.id,
                status: "removido"
          }))
            .catch(err => response.status(400).json({
                  status: 'error',
                  message: err
            }))
}

const getRelatoPorId = async (request, response) => {
      await getRelatoPorIdDB(request.params.id)
            .then(data => response.status(200).json(data))
            .catch(err => response.status(400).json({
                  status: 'error',
                  message: err
            }))
}

module.exports = {
      getRelatos, addRelato, updateRelato, deleteRelato, getRelatoPorId
}