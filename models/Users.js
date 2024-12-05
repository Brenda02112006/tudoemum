const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir o esquema do usuário
const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    tipoCadastro: {
        type: String,
        enum: ['cliente', 'empreendedor'],
        required: true
    },
    categoria: {
        type: String,
        required: function() { return this.tipoCadastro === 'empreendedor'; }
    },
    descricao: {
        type: String,
        required: function() { return this.tipoCadastro === 'empreendedor'; }
    },
    valorOpcao: {
        type: String,
        enum: ['aCombinar', 'fixo'],
        required: function() { return this.tipoCadastro === 'empreendedor'; }
    },
    valorFixo: {
        type: Number,
        required: function() { return this.valorOpcao === 'fixo'; }
    }
});

// Criar o modelo do usuário
const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
