const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        posicao: {
            type: Number,
            required: "e' obrigatorio", 
        },
        titulo: {
            type: String,
            required: "e' obrigatorio",
        },
        descricao: {
            type: String,
            default: '', // Coloca-se default com string vazia para que o campo fique visivel no banco de dados, mesmo se nao for preenchido.
        },
        status: {
            type: String,
            required: "e' obrigatorio",
        },
        dataEntrega: {
            type: Date,
            default: null,
        },
        usuarioCriador: {
            type: mongoose.Schema.Types.ObjectId, // Aqui informo que o tipo desse campo sera' um id
            ref: 'Usuario', // E aqui eu informo a referencia de qual colecao sera' o id. Neste caso sera' o id da colecao Usuario
            required: "e' obrigatorio",
        },        
    },
    {
        timestamps: true
    }
);

const EsquemaTarefa = mongoose.models.Tarefa || mongoose.model('Tarefa', esquema);
module.exports = EsquemaTarefa;