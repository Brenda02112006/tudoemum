const express = require('express');
const path = require('path');
require ('dotenv').config();
require("./database/connection");
const usuarioRoutes = require('./routes/UsersRoutes'); // Importa as rotas de usuário


const app = express();
const port = 3001;

// Configurar o motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar o diretório público para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(usuarioRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.render('index'); // Renderiza o arquivo index.ejs
});

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha, tipoCadastro, categoria, descricao, valorOpcao, valorFixo } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nome || !email || !senha || !tipoCadastro) {
        return res.render('cadastro', { 
            mensagem: { text: 'Campos obrigatórios não preenchidos.', type: 'error' } 
        });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    try {
        // Criação do novo usuário
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

        // Salva o novo usuário no banco de dados
        await novoUsuario.save();

        // Mensagem de sucesso
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

// Servindo a página de cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro', { mensagem: null }); // Passando mensagem null inicialmente
});

app.get('/login', (req, res) => {
    res.render('login'); // Renderiza o arquivo cadastro.ejs
});

app.get('/suporte', (req, res) => {
    res.render('suporte'); // Renderiza o arquivo cadastro.ejs
});

// Simulação de banco de dados com serviços cadastrados
const servicos = [
    { id: 1, titulo: 'Design de Logo', descricao: 'Criação de logotipos.', preco: 250, imagem: '/images/logo-design.jpg' },
    { id: 2, titulo: 'Site Completo', descricao: 'Desenvolvimento de sites.', preco: 1500, imagem: '/images/website.jpg' },
];

// Rota para retornar os serviços cadastrados
app.get('/api/servicos', (req, res) => {
    res.json(servicos);
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

