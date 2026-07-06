// ==========================================
// 1. COMPONENTE: CARROSSEL DE INFORMAÇÕES
// ==========================================
const slides = document.querySelectorAll('.slide');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
let currentSlideIndex = 0;

function showSlide(index) {
    if (slides.length === 0) return; // Protege caso não esteja na Home
    
    // Esconde o slide atual
    slides[currentSlideIndex].classList.remove('active');
    
    // Atualiza o índice tratando as bordas (loop)
    currentSlideIndex = index;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    
    // Mostra o novo slide
    slides[currentSlideIndex].classList.add('active');
}

if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => showSlide(currentSlideIndex - 1));
    btnNext.addEventListener('click', () => showSlide(currentSlideIndex + 1));
}


// ==========================================
// 2. COMPONENTE: CALCULADORA DE BOLUS ADAPTATIVA
// ==========================================
const metodoCalculo = document.getElementById('metodo-calculo');
const tipoInsulina = document.getElementById('tipo-insulina');
const blocosRic = document.querySelectorAll('.bloco-ric');
const btnCalcular = document.getElementById('btn-calcular');

if (metodoCalculo) {
    metodoCalculo.addEventListener('change', (e) => {
        if (e.target.value === 'correcao') {
            blocosRic.forEach(bloco => bloco.classList.add('hidden'));
        } else {
            blocosRic.forEach(bloco => bloco.classList.remove('hidden'));
        }
        document.getElementById('resultado-calculo').classList.add('hidden');
    });
}

if (tipoInsulina) {
    tipoInsulina.addEventListener('change', () => {
        document.getElementById('resultado-calculo').classList.add('hidden');
    });
}

if (btnCalcular) {
    btnCalcular.addEventListener('click', () => {
        const metodo = metodoCalculo.value;
        const tipo = tipoInsulina.value;
        const glicemiaAtual = parseFloat(document.getElementById('glicemia-atual').value);
        const glicemiaAlvo = parseFloat(document.getElementById('glicemia-alvo').value);
        const FatorSensibilidade = parseFloat(document.getElementById('fator-sensibilidade').value);
        
        const containerResultado = document.getElementById('resultado-calculo');
        const txtInsulinaBadge = document.getElementById('txt-insulina-badge');
        const alertaTempo = document.getElementById('alerta-tempo-aplicacao');

        if (isNaN(glicemiaAtual) || isNaN(glicemiaAlvo) || isNaN(FatorSensibilidade)) {
            alert('Por favor, preencha os dados de Glicemia e Fator de Sensibilidade.');
            return;
        }

        let calculoCorrecao = 0;
        if (glicemiaAtual > glicemiaAlvo) {
            calculoCorrecao = (glicemiaAtual - glicemiaAlvo) / FatorSensibilidade;
        }

        let calculoCarbo = 0;

        if (metodo === 'completo') {
            const totalCarbo = parseFloat(document.getElementById('total-carbo').value);
            const rIC = parseFloat(document.getElementById('relacao-ch').value);

            if (isNaN(totalCarbo) || isNaN(rIC) || rIC === 0) {
                alert('Por favor, preencha o total de carboidratos e o seu fator RIC.');
                return;
            }

            calculoCarbo = totalCarbo / rIC;
        }

        const calculoTotal = calculoCorrecao + calculoCarbo;

        // Atualiza os números na tela
        document.getElementById('dose-correcao').innerText = calculoCorrecao.toFixed(1);
        document.getElementById('dose-carbo').innerText = calculoCarbo.toFixed(1);
        document.getElementById('dose-total').innerText = calculoTotal.toFixed(1);

        // Altera dinamicamente os textos e alertas com base no tipo de insulina selecionado
        if (tipo === 'ultra') {
            txtInsulinaBadge.innerText = 'Ultra-rápida';
            alertaTempo.innerText = '⏱️ Orientação padrão para Ultra-rápida: Aplicar imediatamente antes de comer (0 a 15 min antes).';
        } else {
            txtInsulinaBadge.innerText = 'Rápida (Regular)';
            alertaTempo.innerText = '⏱️ Orientação padrão para Rápida (Regular): Aplicar de 30 a 45 minutos ANTES de começar a comer.';
        }

        containerResultado.classList.remove('hidden');
    });
}


// ==========================================
// 3. COMPONENTE: SIMULAÇÃO FORMULÁRIO CONTATO
// ==========================================
const formAjuda = document.getElementById('form-ajuda');
const sucessoBox = document.getElementById('sucesso-box');

if (formAjuda && sucessoBox) {
    formAjuda.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        const nome = document.getElementById('nome-user').value;
        const bairro = document.getElementById('bairro-user').value;

        formAjuda.classList.add('hidden'); 

        sucessoBox.innerHTML = `
            <h3 style="color: #1b4d3e; margin-bottom: 8px;">Acolhimento Solicitado com Sucesso!</h3>
            <p>Olá <strong>${nome}</strong>, registramos sua solicitação de suporte para o bairro <strong>${bairro}</strong>.</p>
            <p style="margin-top: 8px; font-size: 0.95rem;">Nossa equipe de apoio entrará em contato via WhatsApp para te auxiliar com materiais informativos oficiais.</p>
        `;
        sucessoBox.classList.remove('hidden');
    });
}