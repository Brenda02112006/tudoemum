document.addEventListener("DOMContentLoaded", function () {
    // Referências aos elementos do formulário
    const tipoCliente = document.getElementById("tipoCliente");
    const tipoEmpreendedor = document.getElementById("tipoEmpreendedor");
    const camposEmpreendedor = document.querySelectorAll("#categoria, #descricao, #valorFixo, input[name='valorOpcao']");
    const cadastroForm = document.getElementById("cadastroForm");
    const mensagemSucesso = document.getElementById("mensagem");
    const charCount = document.getElementById("charCount");
    const descricaoInput = document.getElementById("descricao");
    const valorFixo = document.getElementById("valorFixo");
    const radioValorFixo = document.getElementById("fixo");
    const radioValorCombinar = document.getElementById("aCombinar");

    // Função para alternar visibilidade dos campos com base na seleção de tipo
    function alternarCampos() {
        if (tipoCliente.checked) {
            // Cliente: esconde campos adicionais
            camposEmpreendedor.forEach(campo => {
                campo.disabled = true;
                campo.parentElement.style.display = "none";
            });
        } else if (tipoEmpreendedor.checked) {
            // Empreendedor: exibe campos adicionais
            camposEmpreendedor.forEach(campo => {
                campo.disabled = false;
                campo.parentElement.style.display = "block";
            });
        }
    }

    // Inicializar visibilidade correta dos campos
    alternarCampos();

    // Adicionar eventos aos botões de rádio
    tipoCliente.addEventListener("change", alternarCampos);
    tipoEmpreendedor.addEventListener("change", alternarCampos);

    // Contar caracteres na descrição
    descricaoInput.addEventListener("input", function () {
        const maxChars = 200;
        const currentLength = this.value.length;
        charCount.textContent = `${maxChars - currentLength} caracteres restantes`;
    });

    // Ativar ou desativar campo de valor fixo com base no rádio selecionado
    radioValorCombinar.addEventListener("change", function () {
        valorFixo.disabled = true;
        valorFixo.value = ""; // Limpa o valor se "A combinar" for selecionado
    });

    radioValorFixo.addEventListener("change", function () {
        valorFixo.disabled = false;
    });

    // Lidar com o envio do formulário
    cadastroForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o recarregamento da página

        // Obter valores do formulário
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const tipoCadastro = document.querySelector('input[name="tipoCadastro"]:checked')?.value;
        const categoria = document.getElementById("categoria").value;
        const descricao = document.getElementById("descricao").value;
        const valorOpcao = document.querySelector('input[name="valorOpcao"]:checked')?.value;
        const valorFixoValue = valorFixo.value;

        // Validações básicas
        if (!tipoCadastro) {
            alert("Por favor, selecione o tipo de cadastro (Cliente ou Empreendedor).");
            return;
        }

        if (!nome || !email || !senha) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (tipoCadastro === "empreendedor") {
            if (!categoria || !descricao) {
                alert("Por favor, preencha todos os campos do cadastro de Empreendedor.");
                return;
            }

            if (valorOpcao === "fixo" && !valorFixoValue) {
                alert("Por favor, insira o valor fixo do serviço ou escolha 'A combinar'.");
                return;
            }
        }

        // Simulação de envio do formulário
        mensagemSucesso.textContent = "Cadastro realizado com sucesso!";
        mensagemSucesso.style.display = "block";

        // Resetar o formulário após sucesso
        cadastroForm.reset();
        alternarCampos(); // Atualizar visibilidade após reset
        charCount.textContent = "200 caracteres restantes"; // Resetar contador
    });
});
