const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Users'); // Caminho para o modelo de usuário
const router = express.Router();

router.post('/cadastro', async (req, res) => {
    const { nome, email, senha, tipoCadastro, categoria, descricao, valorOpcao, valorFixo } = req.body;

    if (!nome || !email || !senha || !tipoCadastro) {
        return res.render('cadastro', { 
            mensagem: { text: 'Campos obrigatórios não preenchidos.', type: 'error' } 
        });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    try {
        const novoUsuario = new Usuario({
            nome,
            email,
            senha: senhaCriptografada,
            tipoCadastro,
            categoria,
            descricao,
            valorOpcao,
            valorFixo
        });

        await novoUsuario.save();

        return res.render('cadastro', { 
            mensagem: { text: 'Cadastro realizado com sucesso!', type: 'success' } 
        });
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        return res.render('cadastro', { 
            mensagem: { text: 'Não foi possível realizar o cadastro.', type: 'error' } 
        });
    }
});


module.exports = router;
