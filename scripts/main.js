// 1. Lógica da Página Principal (Regra dos 15g)
const btnRegra = document.getElementById('btn-regra');
const respostaCrise = document.getElementById('resposta-crise');

if (btnRegra && respostaCrise) {
    btnRegra.addEventListener('click', () => {
        respostaCrise.innerHTML = `
            <h4 style="color: #D91656; margin-bottom: 8px;">A REGRA DOS 15 PARA SALVAR SUA GLICOSE:</h4>
            <ol style="margin-left: 20px; line-height: 1.6;">
                <li>Coma ou beba <strong>15g de carboidrato rápido</strong>. Escolha APENAS UMA destas opções:
                    <br>• 1 colher de sopa de açúcar dissolvida em água; ou
                    <br>• 150ml de refrigerante comum (não pode ser Zero!); ou
                    <br>• 1 suco de caixinha pequeno; ou
                    <br>• 3 balas macias.
                </li>
                <li>Sente-se e <strong>espere exatos 15 minutos</strong>.</li>
                <li>Meça a ponta do dedo de novo. Se ainda estiver abaixo de 70, repita o passo 1.</li>
            </ol>
            <p style="margin-top: 12px; font-size: 0.85rem; color: #555;">⚠️ <em>Se a pessoa desmaiar, não coloque nada na boca dela para não engasgar. Ligue 192 (SAMU de Salvador).</em></p>
        `;
        respostaCrise.classList.remove('hidden');
    });
}

// 2. Lógica da Página de Contato (Simulação de envio)
const formAjuda = document.getElementById('form-ajuda');
const sucessoBox = document.getElementById('sucesso-box');

if (formAjuda && sucessoBox) {
    formAjuda.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Impede a página de dar F5

        const nome = document.getElementById('nome-user').value;
        const bairro = document.getElementById('bairro-user').value;

        formAjuda.classList.add('hidden'); // Esconde o form

        sucessoBox.innerHTML = `
            <h3 style="color: #2C7A7B; margin-bottom: 8px;">Acolhimento Solicitado!</h3>
            <p>Tudo certo, <strong>${nome}</strong>. Mapeamos que você está no bairro <strong>${bairro}</strong>.</p>
            <p style="margin-top: 8px;">Disparamos sua dúvida para o nosso grupo de monitores voluntários. Em breve alguém com DDD (71) vai te chamar no WhatsApp para te acalmar. Respire fundo!</p>
        `;
        sucessoBox.classList.remove('hidden');
    });
}