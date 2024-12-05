// Elementos do DOM
const searchInput = document.getElementById('searchInput');
const cardContainer = document.getElementById('cardContainer');

// Função para buscar os serviços
async function fetchServicos() {
    try {
        const response = await fetch('/api/servicos');
        const servicos = await response.json();
        exibirServicos(servicos);
    } catch (error) {
        console.error('Erro ao buscar serviços:', error);
    }
}

// Função para exibir os serviços
function exibirServicos(servicos) {
    cardContainer.innerHTML = ''; // Limpa o container

    if (servicos.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum serviço encontrado.</p>';
        return;
    }

    servicos.forEach(servico => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${servico.imagem}" alt="${servico.titulo}">
            <h3>${servico.titulo}</h3>
            <p>${servico.descricao}</p>
            <div class="price">R$ ${servico.preco.toFixed(2)}</div>
        `;
        cardContainer.appendChild(card);
    });
}

// Função para filtrar os serviços
function filtrarServicos(event) {
    const termo = event.target.value.toLowerCase();
    fetch('/api/servicos')
        .then(response => response.json())
        .then(servicos => {
            const filtrados = servicos.filter(servico =>
                servico.titulo.toLowerCase().includes(termo) ||
                servico.descricao.toLowerCase().includes(termo)
            );
            exibirServicos(filtrados);
        });
}

// Eventos
searchInput.addEventListener('input', filtrarServicos);

// Buscar e exibir os serviços ao carregar a página
fetchServicos();
