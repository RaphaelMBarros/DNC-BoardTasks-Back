const mongoose = require('mongoose');
const validator = require('validator');

const esquema = new mongoose.Schema(
    { // Nesse primeiro colchetes, sao criados os campos do esquema: nome, email e senha.
        nome: {
            type: String,
            required: "e' obrigatorio!",
        },
        email: {
            type: String,
            unique: true,
            required: "e' obrigatorio!",
            lowercase: true,
            index: true,
            validate: {
                validator: (valorDigitado) => { return validator.isEmail(valorDigitado) },
                message: 'invalido!'
            }
        },
        senha: {
            type: String,
            required: "e' obrigatorio",
            select: false,
        },
    },
    {  // Esse segundo colchetes e' de configuracao. E esse timestamps cria 2 campos automaticamente, o campo de data de criacao e data da ultima atualizacao  
        timestamps: true
    }
);

const EsquemaUsuario = mongoose.models.Usuario || mongoose.model('Usuario', esquema);
module.exports = EsquemaUsuario;