class Relatos {
    constructor(id, dataHora, descricao, latitude, longitude, origem, tipo, usuarioEmail){
        this.id = id;
        this.dataHora = dataHora;
        this.descricao = descricao;
        this.latitude = latitude;
        this.longitude = longitude;
        this.origem = origem;
        this.tipo = tipo;
        this.usuarioEmail = usuarioEmail;
    }
}

module.exports = Relatos;